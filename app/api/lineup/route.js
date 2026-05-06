// /api/lineup — fetches live MLB lineups from MLB Stats API
// Free, no key required. Updates as lineups are posted (usually 3-4 hrs before game)

const cache = { data: null, ts: 0 };
const CACHE_MS = 10 * 60 * 1000; // 10 minutes — lineups change

export async function GET() {
  try {
    if (cache.data && Date.now() - cache.ts < CACHE_MS) {
      return Response.json({ ok: true, data: cache.data, cached: true });
    }

    // Get today's schedule with lineups
    const today = new Date().toISOString().split("T")[0];
    const schedUrl = "https://statsapi.mlb.com/api/v1/schedule?" + [
      "sportId=1",
      "date=" + today,
      "hydrate=lineups,probablePitcher(note),team",
      "fields=dates,games,gamePk,teams,away,home,team,name,abbreviation,probablePitcher,fullName,lineups,awayPlayers,homePlayers,person,fullName,id,battingOrder",
    ].join("&");

    const r = await fetch(schedUrl);
    if (!r.ok) return Response.json({ ok: false, error: "MLB API " + r.status });

    const d = await r.json();
    const games = d.dates?.[0]?.games || [];
    const lineups = {};

    games.forEach(game => {
      const awayAbbr = game.teams?.away?.team?.abbreviation;
      const homeAbbr = game.teams?.home?.team?.abbreviation;
      if (!awayAbbr || !homeAbbr) return;

      const key = awayAbbr + homeAbbr;
      const awayPlayers = game.lineups?.awayPlayers || [];
      const homePlayers = game.lineups?.homePlayers || [];

      // Build batting order maps: playerName → batting position
      const awayOrder = {};
      awayPlayers.forEach((p, i) => {
        if (p.person?.fullName) awayOrder[p.person.fullName] = i + 1;
      });
      const homeOrder = {};
      homePlayers.forEach((p, i) => {
        if (p.person?.fullName) homeOrder[p.person.fullName] = i + 1;
      });

      lineups[key] = {
        away: awayAbbr,
        home: homeAbbr,
        awayOrder,
        homeOrder,
        confirmed: awayPlayers.length > 0 || homePlayers.length > 0,
      };
    });

    cache.data = lineups;
    cache.ts = Date.now();

    const confirmedCount = Object.values(lineups).filter(l => l.confirmed).length;
    return Response.json({
      ok: true,
      data: lineups,
      cached: false,
      confirmed: confirmedCount,
      total: Object.keys(lineups).length,
    });

  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
