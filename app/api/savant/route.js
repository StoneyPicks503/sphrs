// /api/savant — fetches real Statcast data from Baseball Savant
// Runs server-side so no CORS issues
// Caches results in memory for the session

const cache = { data: null, ts: 0 };
const CACHE_MS = 6 * 60 * 60 * 1000; // 6 hours

export async function GET(req) {
  try {
    // Return cached data if fresh
    if (cache.data && Date.now() - cache.ts < CACHE_MS) {
      return Response.json({ ok: true, data: cache.data, cached: true });
    }

    // ── Fetch batter Statcast data ──
    // avg_launch_speed, avg_launch_angle, pull_percent, straightaway_percent, opposite_percent
    const batterUrl = "https://baseballsavant.mlb.com/statcast_search/csv?" + [
      "all=true",
      "hfSea=2026|",
      "player_type=batter",
      "min_results=30",
      "group_by=name",
      "sort_col=xba",
      "sort_order=desc",
      "type=details",
      "hfAB=home_run|",
    ].join("&");

    // Use the leaderboard endpoint — cleaner aggregated data
    const leaderUrl = "https://baseballsavant.mlb.com/leaderboard/expected_statistics?" + [
      "type=batter",
      "year=2026",
      "position=",
      "team=",
      "min=20",
      "csv=true",
    ].join("&");

    // Also fetch exit velocity leaderboard
    const evUrl = "https://baseballsavant.mlb.com/leaderboard/outs_above_average?" +
      "type=Hitting&startYear=2026&endYear=2026&split=no&team=0&range=year&min=q&pos=&roles=&viz=show&csv=true";

    // Fetch both in parallel
    const [leaderRes, hrLeaderRes] = await Promise.all([
      fetch(leaderUrl, { headers: { "User-Agent": "SPHRS/1.0" } }),
      fetch("https://baseballsavant.mlb.com/statcast_leaderboard?type=batter&year=2026&min=30&csv=true",
        { headers: { "User-Agent": "SPHRS/1.0" } })
    ]);

    const players = {};

    // Parse xStats leaderboard
    if (leaderRes.ok) {
      const text = await leaderRes.text();
      const rows = text.split("\n").filter(Boolean);
      if (rows.length > 1) {
        const headers = rows[0].split(",").map(h => h.trim().replace(/"/g,""));
        const nameIdx  = headers.findIndex(h => h === "last_name, first_name" || h.includes("name"));
        const idIdx    = headers.findIndex(h => h === "player_id" || h === "batter");
        const xbaIdx   = headers.findIndex(h => h === "xba");
        const xslgIdx  = headers.findIndex(h => h === "xslg");
        const evIdx    = headers.findIndex(h => h === "avg_hit_speed" || h === "launch_speed");
        const laIdx    = headers.findIndex(h => h === "avg_hit_angle" || h === "launch_angle");
        const hrIdx    = headers.findIndex(h => h === "home_run");

        rows.slice(1).forEach(row => {
          const cols = row.split(",").map(c => c.trim().replace(/"/g,""));
          const rawName = cols[nameIdx] || "";
          // Savant returns "Last, First" — convert to "First Last"
          const nameParts = rawName.split(",").map(s => s.trim());
          const name = nameParts.length === 2
            ? nameParts[1] + " " + nameParts[0]
            : rawName;
          if (!name || name.length < 3) return;
          const id  = cols[idIdx];
          const ev  = parseFloat(cols[evIdx]);
          const la  = parseFloat(cols[laIdx]);
          const xba = parseFloat(cols[xbaIdx]);
          const hr  = parseInt(cols[hrIdx]);
          if (!isNaN(ev)) {
            players[name] = { id, avgEV: ev, avgLA: la, xBA: xba, hr2026: hr };
          }
        });
      }
    }

    // Parse HR-specific Statcast leaderboard for spray data
    if (hrLeaderRes.ok) {
      const text = await hrLeaderRes.text();
      const rows = text.split("\n").filter(Boolean);
      if (rows.length > 1) {
        const headers = rows[0].split(",").map(h => h.trim().replace(/"/g,""));
        const nameIdx  = headers.findIndex(h => h.includes("name"));
        const pullIdx  = headers.findIndex(h => h.toLowerCase().includes("pull"));
        const straightIdx = headers.findIndex(h => h.toLowerCase().includes("straightaway") || h.toLowerCase().includes("center"));
        const oppoIdx  = headers.findIndex(h => h.toLowerCase().includes("oppo"));

        rows.slice(1).forEach(row => {
          const cols = row.split(",").map(c => c.trim().replace(/"/g,""));
          const rawName = cols[nameIdx] || "";
          const nameParts = rawName.split(",").map(s => s.trim());
          const name = nameParts.length === 2 ? nameParts[1] + " " + nameParts[0] : rawName;
          if (!name || !players[name]) return;
          const pull = parseFloat(cols[pullIdx]);
          const straight = parseFloat(cols[straightIdx]);
          const oppo = parseFloat(cols[oppoIdx]);
          if (!isNaN(pull)) {
            players[name].pullPct  = Math.round(pull);
            players[name].centerPct = Math.round(straight);
            players[name].oppoPct  = Math.round(oppo);
          }
        });
      }
    }

    // ── Fetch pitcher data from MLB Stats API ──
    // Get all pitcher stats for 2026 including HR/9
    const pitcherRes = await fetch(
      "https://statsapi.mlb.com/api/v1/stats/leaders?" + [
        "leaderCategories=homeRunsPer9Inn",
        "season=2026",
        "sportId=1",
        "limit=200",
        "statGroup=pitching",
      ].join("&")
    );

    const pitchers = {};
    if (pitcherRes.ok) {
      const data = await pitcherRes.json();
      const leaders = data.leagueLeaders?.[0]?.leaders || [];
      leaders.forEach(l => {
        const name = l.person?.fullName;
        const hr9  = parseFloat(l.value);
        if (name && !isNaN(hr9)) {
          pitchers[name] = { hr9 };
        }
      });
    }

    const result = { batters: players, pitchers };
    cache.data = result;
    cache.ts = Date.now();

    return Response.json({ ok: true, data: result, cached: false, count: Object.keys(players).length });

  } catch (err) {
    console.error("Savant API error:", err);
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
