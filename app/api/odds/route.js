// /api/odds — fetches live HR prop odds from The Odds API
// Free tier: 500 requests/month. We cache aggressively.
// Sign up free at https://the-odds-api.com

const cache = { data: null, ts: 0 };
const CACHE_MS = 30 * 60 * 1000; // 30 minutes

export async function GET() {
  try {
    if (cache.data && Date.now() - cache.ts < CACHE_MS) {
      return Response.json({ ok: true, data: cache.data, cached: true });
    }

    const apiKey = process.env.ODDS_API_KEY;
    if (!apiKey) {
      return Response.json({ ok: false, error: "ODDS_API_KEY not set" });
    }

    // Fetch MLB batter HR props (over 0.5 HRs = HR yes/no market)
    const url = "https://api.the-odds-api.com/v4/sports/baseball_mlb/events?" + [
      "apiKey=" + apiKey,
      "regions=us",
      "markets=batter_home_runs",
      "oddsFormat=american",
      "dateFormat=iso",
    ].join("&");

    const r = await fetch(url);
    if (!r.ok) {
      const err = await r.text();
      return Response.json({ ok: false, error: "Odds API: " + r.status + " " + err });
    }

    const events = await r.json();
    const hrProps = {};

    events.forEach(event => {
      const awayTeam = event.away_team;
      const homeTeam = event.home_team;

      (event.bookmakers || []).forEach(book => {
        // Prefer DraftKings or FanDuel, fall back to any
        if (!["draftkings","fanduel","betmgm"].includes(book.key)) return;

        (book.markets || []).forEach(market => {
          if (market.key !== "batter_home_runs") return;

          (market.outcomes || []).forEach(outcome => {
            if (outcome.name !== "Over") return; // we want HR yes market
            const playerName = outcome.description;
            const americanOdds = outcome.price;

            // Convert American odds to implied probability
            let impliedProb;
            if (americanOdds > 0) {
              impliedProb = 100 / (americanOdds + 100);
            } else {
              impliedProb = Math.abs(americanOdds) / (Math.abs(americanOdds) + 100);
            }

            // Remove vig: typical HR prop vig is ~10%
            const noVigProb = impliedProb / 1.10;

            if (!hrProps[playerName] || hrProps[playerName].impliedProb < noVigProb) {
              hrProps[playerName] = {
                americanOdds,
                impliedProb: parseFloat((noVigProb * 100).toFixed(1)),
                book: book.key,
              };
            }
          });
        });
      });
    });

    cache.data = hrProps;
    cache.ts = Date.now();

    return Response.json({
      ok: true,
      data: hrProps,
      cached: false,
      count: Object.keys(hrProps).length,
    });

  } catch (err) {
    return Response.json({ ok: false, error: err.message }, { status: 500 });
  }
}
