// /api/schedule — fetches today's MLB schedule with probable pitchers
// Runs server-side (no CORS). Cached 30 minutes.

const cache = { data: null, ts: 0, date: null };
const CACHE_MS = 30 * 60 * 1000;

// Team abbreviation map — MLB API uses full names
const ID_TO_ABBR = {
  108:"LAA", 109:"AZ",  110:"BAL", 111:"BOS", 112:"CHC",
  113:"CIN", 114:"CLE", 115:"COL", 116:"DET", 117:"HOU",
  118:"KC",  119:"LAD", 120:"WSH", 121:"NYM", 133:"ATH",
  134:"PIT", 135:"SD",  136:"SEA", 137:"SF",  138:"STL",
  139:"TB",  140:"TEX", 141:"TOR", 142:"MIN", 143:"PHI",
  144:"ATL", 145:"CWS", 146:"MIA", 147:"NYY", 158:"MIL",
};

// Venue name map — some MLB API venue names differ from our display names
const VENUE_MAP = {
  "Dodger Stadium":                  "UNIQLO Field at Dodger Stadium",
  "Great American Ball Park":        "Great American Ball Park",
  "Oriole Park at Camden Yards":     "Oriole Park at Camden Yards",
  "American Family Field":           "American Family Field",
  "Globe Life Field":                "Globe Life Field",
  "Progressive Field":               "Progressive Field",
  "Rogers Centre":                   "Rogers Centre",
  "Rate Field":                      "Rate Field",
  "Guaranteed Rate Field":           "Rate Field",
  "loanDepot park":                  "loanDepot Park",
  "Petco Park":                      "Petco Park",
  "Chase Field":                     "Chase Field",
  "Oracle Park":                     "Oracle Park",
  "Kauffman Stadium":                "Kauffman Stadium",
  "Fenway Park":                     "Fenway Park",
  "Wrigley Field":                   "Wrigley Field",
  "Coors Field":                     "Coors Field",
  "Yankee Stadium":                  "Yankee Stadium",
  "Citizens Bank Park":              "Citizens Bank Park",
  "Tropicana Field":                 "Tropicana Field",
  "T-Mobile Park":                   "T-Mobile Park",
  "Minute Maid Park":                "Daikin Park",
  "Daikin Park":                     "Daikin Park",
  "Busch Stadium":                   "Busch Stadium",
  "Nationals Park":                  "Nationals Park",
  "Target Field":                    "Target Field",
  "PNC Park":                        "PNC Park",
  "Truist Park":                     "Truist Park",
  "Angel Stadium":                   "Angel Stadium",
  "Comerica Park":                   "Comerica Park",
};

export async function GET() {
  try {
    const today = new Date().toISOString().split("T")[0];

    // Return cache if fresh and same day
    if (cache.data && cache.date === today && Date.now() - cache.ts < CACHE_MS) {
      return Response.json({ ok: true, data: cache.data, cached: true, date: today });
    }

    const url = "https://statsapi.mlb.com/api/v1/schedule?" + [
      "sportId=1",
      "date=" + today,
      "hydrate=probablePitcher(note),linescore,team,venue",
      "fields=dates,games,gamePk,gameDate,status,teams,away,home,team,name,abbreviation,id,probablePitcher,fullName,pitchHand,code,venue,name",
    ].join("&");

    const r = await fetch(url);
    if (!r.ok) return Response.json({ ok: false, error: "MLB API " + r.status });

    const d = await r.json();
    const games = d.dates?.[0]?.games || [];

    // Fetch ERA for all probable pitchers in parallel
    const pitcherIds = new Set();
    games.forEach(g => {
      if (g.teams?.away?.probablePitcher?.id) pitcherIds.add(g.teams.away.probablePitcher.id);
      if (g.teams?.home?.probablePitcher?.id) pitcherIds.add(g.teams.home.probablePitcher.id);
    });

    // Fetch pitcher stats
    const pitcherStats = {};
    await Promise.all([...pitcherIds].map(async id => {
      try {
        const sr = await fetch(
          `https://statsapi.mlb.com/api/v1/people/${id}/stats?stats=season&season=2026&group=pitching` +
          `&fields=stats,splits,stat,era,wins,losses,homeRunsPer9,whip,inningsPitched`
        );
        const sd = await sr.json();
        const stat = sd.stats?.[0]?.splits?.[0]?.stat;
        if (stat) {
          pitcherStats[id] = {
            era:  parseFloat(stat.era)  || null,
            whip: parseFloat(stat.whip) || null,
            hr9:  parseFloat(stat.homeRunsPer9) || null,
            ip:   stat.inningsPitched || "0",
            wins: sd.stats?.[0]?.splits?.[0]?.stat?.wins || 0,
            losses: sd.stats?.[0]?.splits?.[0]?.stat?.losses || 0,
          };
        }
      } catch (_) {}
    }));

    // Build clean game objects
    const result = games
      .filter(g => g.status?.abstractGameState !== "Final") // skip completed games
      .map(g => {
        const awayTeam = g.teams?.away;
        const homeTeam = g.teams?.home;
        const awayAbbr = ID_TO_ABBR[awayTeam?.team?.id] || awayTeam?.team?.abbreviation;
        const homeAbbr = ID_TO_ABBR[homeTeam?.team?.id] || homeTeam?.team?.abbreviation;
        const awayP = awayTeam?.probablePitcher;
        const homeP = homeTeam?.probablePitcher;
        const awayStats = awayP ? (pitcherStats[awayP.id] || {}) : {};
        const homeStats = homeP ? (pitcherStats[homeP.id] || {}) : {};

        // Format game time in ET
        const gameDate = new Date(g.gameDate);
        const timeStr = gameDate.toLocaleTimeString("en-US", {
          hour: "numeric", minute: "2-digit",
          timeZone: "America/New_York"
        }) + " ET";

        const rawVenue = g.venue?.name || "";
        const venue = VENUE_MAP[rawVenue] || rawVenue;

        const awayRec = awayStats.wins != null
          ? `${awayStats.wins}-${awayStats.losses}` : "0-0";
        const homeRec = homeStats.wins != null
          ? `${homeStats.wins}-${homeStats.losses}` : "0-0";

        return {
          away: awayAbbr,
          home: homeAbbr,
          venue,
          time: timeStr,
          awayP:   awayP?.fullName || "TBD",
          awayH:   awayP?.pitchHand?.code === "L" ? "LHP" : awayP ? "RHP" : "RHP",
          awayERA: awayStats.era || null,
          awayRec,
          homeP:   homeP?.fullName || "TBD",
          homeH:   homeP?.pitchHand?.code === "L" ? "LHP" : homeP ? "RHP" : "RHP",
          homeERA: homeStats.era || null,
          homeRec,
        };
      })
      .filter(g => g.away && g.home);

    cache.data = result;
    cache.ts = Date.now();
    cache.date = today;

    return Response.json({
      ok: true,
      data: result,
      cached: false,
      count: result.length,
      date: today,
    });

  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
