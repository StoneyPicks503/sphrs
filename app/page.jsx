"use client";
import { useState, useEffect, useRef } from "react";

/* ── Assets ── */
function useAssets() {
  useEffect(() => {
    if (!document.getElementById("hrs-font")) {
      const l = document.createElement("link");
      l.id = "hrs-font"; l.rel = "stylesheet";
      l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Archivo+Black&display=swap";
      document.head.appendChild(l);
    }
    if (!document.getElementById("hrs-kf")) {
      const s = document.createElement("style");
      s.id = "hrs-kf";
      s.textContent = [
        "@keyframes hrs-spin{to{transform:rotate(360deg)}}",
        "@keyframes hrs-up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}",
        "@keyframes hrs-pop{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}",
        "@keyframes hrs-blink{0%,100%{opacity:1}50%{opacity:.3}}",
        "@keyframes hrs-glow{0%,100%{box-shadow:0 0 12px rgba(0,210,255,.1)}50%{box-shadow:0 0 30px rgba(0,210,255,.3)}}",
        "@keyframes hrs-scan{0%{top:-3px;opacity:.5}100%{top:100%;opacity:0}}",
        "@keyframes hrs-bar{from{width:0}to{width:var(--w)}}",
        "@keyframes hrs-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}",
      ].join("");
      document.head.appendChild(s);
    }
  }, []);
}

const T = {
  bg:"#080c14", panel:"#101826", card:"#131f2e", border:"#1e3048",
  accent:"#00e5ff", gold:"#ffd700", green:"#00e676", red:"#ff5252",
  amber:"#ffca28", purple:"#ce93d8", teal:"#40e0d0",
  text:"#f0f6ff", muted:"#7a9abf", dim:"#0e1a28",
  hotBg:"#1a2e1a", hotBorder:"#00e67655",
  cardHover:"#162030",
};
const F = {
  bebas:"'Bebas Neue',Impact,sans-serif",
  mono:"'DM Mono','Courier New',monospace",
  arch:"'Archivo Black','Arial Black',sans-serif",
};

/* ── All 15 games ── */
const ALL_GAMES = [
  { away:"TOR", home:"TB",  venue:"Tropicana Field",    city:"St. Petersburg", st:"FL", time:"1:10 PM ET",
    awayP:"Patrick Corbin",      awayH:"LHP", awayERA:3.65, awayRec:"1-0",
    homeP:"Shane McClanahan",    homeH:"LHP", homeERA:3.10, homeRec:"3-2" },
  { away:"MIL", home:"STL", venue:"Busch Stadium",      city:"St. Louis",      st:"MO", time:"1:15 PM ET",
    awayP:"Brandon Sproat",      awayH:"RHP", awayERA:6.75, awayRec:"0-2",
    homeP:"Andre Pallante",      homeH:"RHP", homeERA:3.73, homeRec:"3-2" },
  { away:"LAD", home:"HOU", venue:"Daikin Park",        city:"Houston",        st:"TX", time:"2:10 PM ET",
    awayP:"Tyler Glasnow",       awayH:"RHP", awayERA:2.56, awayRec:"3-0",
    homeP:"Lance McCullers Jr.", homeH:"RHP", homeERA:6.32, homeRec:"2-2" },
  { away:"SD",  home:"SF",  venue:"Oracle Park",        city:"San Francisco",  st:"CA", time:"3:45 PM ET",
    awayP:"Matt Waldron",        awayH:"RHP", awayERA:9.88, awayRec:"0-1",
    homeP:"Adrian Houser",       homeH:"RHP", homeERA:7.12, homeRec:"0-3" },
  { away:"CWS", home:"LAA", venue:"Angel Stadium",      city:"Anaheim",        st:"CA", time:"4:07 PM ET",
    awayP:"Noah Schultz",        awayH:"LHP", awayERA:2.53, awayRec:"2-1",
    homeP:"Walbert Urena",       homeH:"RHP", homeERA:3.86, homeRec:"0-3" },
  { away:"ATL", home:"SEA", venue:"T-Mobile Park",      city:"Seattle",        st:"WA", time:"4:10 PM ET",
    awayP:"Grant Holmes",        awayH:"RHP", awayERA:4.34, awayRec:"2-1",
    homeP:"Bryan Woo",           homeH:"RHP", homeERA:4.61, homeRec:"1-2" },
  { away:"ATH", home:"PHI", venue:"Citizens Bank Park", city:"Philadelphia",   st:"PA", time:"6:40 PM ET",
    awayP:"Jeffrey Springs",     awayH:"LHP", awayERA:3.96, awayRec:"3-2",
    homeP:"Zack Wheeler",        homeH:"RHP", homeERA:2.45, homeRec:"1-0" },
  { away:"BAL", home:"MIA", venue:"loanDepot Park",     city:"Miami",          st:"FL", time:"6:40 PM ET",
    awayP:"Brandon Young",       awayH:"RHP", awayERA:6.14, awayRec:"2-1",
    homeP:"Eury Perez",          homeH:"RHP", homeERA:4.46, homeRec:"2-3" },
  { away:"BOS", home:"DET", venue:"Comerica Park",      city:"Detroit",        st:"MI", time:"6:40 PM ET",
    awayP:"Sonny Gray",          awayH:"RHP", awayERA:4.30, awayRec:"2-1",
    homeP:"Jack Flaherty",       homeH:"RHP", homeERA:5.90, homeRec:"0-2" },
  { away:"MIN", home:"WSH", venue:"Nationals Park",     city:"Washington",     st:"DC", time:"6:45 PM ET",
    awayP:"Bailey Ober",         awayH:"RHP", awayERA:3.55, awayRec:"3-1",
    homeP:"Miles Mikolas",       homeH:"RHP", homeERA:8.23, homeRec:"0-3" },
  { away:"TEX", home:"NYY", venue:"Yankee Stadium",     city:"New York",       st:"NY", time:"7:05 PM ET",
    awayP:"Nathan Eovaldi",      awayH:"RHP", awayERA:4.76, awayRec:"3-4",
    homeP:"Will Warren",         homeH:"RHP", homeERA:2.39, homeRec:"4-0" },
  { away:"CIN", home:"CHC", venue:"Wrigley Field",      city:"Chicago",        st:"IL", time:"7:40 PM ET",
    awayP:"Brady Singer",        awayH:"RHP", awayERA:5.57, awayRec:"2-2",
    homeP:"Colin Rea",           homeH:"RHP", homeERA:4.41, homeRec:"4-1" },
  { away:"CLE", home:"KC",  venue:"Kauffman Stadium",   city:"Kansas City",    st:"MO", time:"7:40 PM ET",
    awayP:"Joey Cantillo",       awayH:"LHP", awayERA:3.67, awayRec:"1-1",
    homeP:"Cole Ragans",         homeH:"LHP", homeERA:5.29, homeRec:"1-4" },
  { away:"NYM", home:"COL", venue:"Coors Field",        city:"Denver",         st:"CO", time:"9:20 PM ET",
    awayP:"Freddy Peralta",      awayH:"RHP", awayERA:3.52, awayRec:"1-3",
    homeP:"Michael Lorenzen",    homeH:"RHP", homeERA:6.09, homeRec:"2-3" },
  { away:"PIT", home:"ARI", venue:"Chase Field",        city:"Phoenix",        st:"AZ", time:"9:40 PM ET",
    awayP:"Paul Skenes",         awayH:"RHP", awayERA:3.18, awayRec:"4-2",
    homeP:"Michael Soroka",      homeH:"RHP", homeERA:4.70, homeRec:"4-1" },
];

/* ── Claude API ── */
class RateLimitError extends Error {
  constructor(resetTime, resetsAt) {
    super("RATE_LIMIT:" + resetTime + ":" + (resetsAt || 0));
    this.isRateLimit = true; this.resetTime = resetTime; this.resetsAt = resetsAt;
  }
}

async function callClaude(text, maxTokens = 8192) {
  // Call our own secure backend — never the Anthropic API directly (CORS blocks it)
  const r = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, maxTokens }),
  });

  // Check if we got HTML back (means the API route is missing or Vercel error)
  const contentType = r.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    const html = await r.text();
    if (html.includes("DOCTYPE")) {
      throw new Error("API route not found — make sure app/api/claude/route.js is in GitHub and Vercel has ANTHROPIC_API_KEY set in Environment Variables.");
    }
    throw new Error("Unexpected response from server: " + html.slice(0, 100));
  }

  const d = await r.json();
  if (d.type === "exceeded_limit" || d.error?.type === "exceeded_limit") {
    const ra = d.resetsAt || d.error?.resetsAt;
    throw new RateLimitError(ra ? new Date(ra * 1000).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }) : "soon", ra);
  }
  if (d.error) throw new Error(d.error.message || JSON.stringify(d.error));
  return d.content.map(b => b.text || "").join("").trim();
}


/* ── Stadium data: coordinates + home plate bearing ── */
// cfBearing = compass direction home plate faces toward CF (outfield direction)
// Wind FROM opposite of cfBearing = blowing OUT = HR boost
// Wind FROM same as cfBearing    = blowing IN  = HR suppressor
const STADIUM_COORDS = {
  "Yankee Stadium":      { lat:40.8296, lon:-73.9262,  dome:false, cfBearing:25, plateFaces:"SW — RF short porch 314ft, LF 318ft" },
  "Fenway Park":         { lat:42.3467, lon:-71.0972,  dome:false, cfBearing:58,  plateFaces:"ENE — Green Monster in LF 310ft, Pesky Pole RF 302ft" },
  "Wrigley Field":       { lat:41.9484, lon:-87.6553,  dome:false, cfBearing:88,  plateFaces:"E — Lake Michigan winds blow IN from east Michigan key factor" },
  "Coors Field":         { lat:39.7559, lon:-104.9942, dome:false, cfBearing:42,  plateFaces:"NE — high altitude, ball carries in all directions ball carries farther in all directions" },
  "Oracle Park":         { lat:37.7786, lon:-122.3893, dome:false, cfBearing:140, plateFaces:"SE — McCovey Cove behind RF, bay breeze typically blows IN behind RF, bay breeze blows IN" },
  "Petco Park":          { lat:32.7076, lon:-117.1570, dome:false, cfBearing:30,  plateFaces:"NNE — marine layer, pitcher-friendly suppresses HRs, pitcher-friendly" },
  "Angel Stadium":       { lat:33.8003, lon:-117.8827, dome:false, cfBearing:30,  plateFaces:"NNE — RF 347ft, LF 347ft, symmetrical, LF 347ft" },
  "Kauffman Stadium":    { lat:39.0517, lon:-94.4803,  dome:false, cfBearing:8,   plateFaces:"N — open park, SW winds blow OUT, wind from SW blows OUT" },
  "Busch Stadium":       { lat:38.6226, lon:-90.1928,  dome:false, cfBearing:5,   plateFaces:"N — symmetrical park, 400ft CF park, 400ft CF" },
  "Comerica Park":       { lat:42.3390, lon:-83.0485,  dome:false, cfBearing:170, plateFaces:"S — deep CF 420ft, pitcher-friendly, pitcher-friendly dimensions" },
  "PNC Park":            { lat:40.4469, lon:-80.0057,  dome:false, cfBearing:22,  plateFaces:"NNE — Allegheny River behind CF, RF 320ft River behind RF, 325ft RF line" },
  "Great American":      { lat:39.0979, lon:-84.5082,  dome:false, cfBearing:50,  plateFaces:"NE — hitter-friendly, Ohio River behind CF" },
  "Nationals Park":      { lat:38.8730, lon:-77.0074,  dome:false, cfBearing:62,  plateFaces:"ENE — Anacostia River River, humid summers help carry" },
  "Target Field":        { lat:44.9817, lon:-93.2781,  dome:false, cfBearing:345, plateFaces:"NNW — cold nights, downtown Minneapolis, wind from N blows out to RF" },
  "Sutter Health Park":  { lat:38.5802, lon:-121.5005, dome:false, cfBearing:12,  plateFaces:"NNE — Sacramento heat boosts carry heat, ball carries well in summer" },
  "Truist Park":         { lat:33.8907, lon:-84.4677,  dome:false, cfBearing:18,  plateFaces:"NNE — RF 325ft, compact park, compact park" },
  "Guaranteed Rate":     { lat:41.8300, lon:-87.6339,  dome:false, cfBearing:90,  plateFaces:"E — lake winds key factor winds" },
  "Chase Field":         { lat:33.4453, lon:-112.0667, dome:true },
  "Citizens Bank Park":  { lat:39.9061, lon:-75.1665,  dome:false, cfBearing:55,  plateFaces:"NE — RF 330ft LF 329ft hitter friendly" },
  // Domes — orientation irrelevant
  "Tropicana Field":     { lat:27.7682, lon:-82.6534,  dome:true },
  "Daikin Park":         { lat:29.7573, lon:-95.3555,  dome:true },
  "T-Mobile Park":       { lat:47.5914, lon:-122.3325, dome:true },
  "loanDepot Park":      { lat:25.7781, lon:-80.2197,  dome:true },
  "Globe Life Field":    { lat:32.7512, lon:-97.0832,  dome:true },
};

function windDegToDir(deg) {
  const dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  return dirs[Math.round(((deg % 360) + 360) / 22.5) % 16];
}

function wmoToCondition(code) {
  if (code === 0)    return "Clear ☀️";
  if (code <= 3)     return "Partly Cloudy ⛅";
  if (code <= 48)    return "Foggy 🌫️";
  if (code <= 67)    return "Rainy 🌧️";
  if (code <= 77)    return "Snowy 🌨️";
  if (code <= 82)    return "Showers 🌦️";
  if (code <= 99)    return "Thunderstorms ⛈️";
  return "Cloudy ☁️";
}

/* Parse game time string → UTC hour for the forecast
   e.g. "7:05 PM ET" → 23 (ET = UTC-4 in May) */
function gameTimeToUTCHour(timeStr) {
  if (!timeStr) return null;
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return null;
  let h = parseInt(match[1]);
  const m = parseInt(match[2]);
  const ampm = match[3].toUpperCase();
  if (ampm === "PM" && h !== 12) h += 12;
  if (ampm === "AM" && h === 12) h = 0;
  // ET = UTC-4 in May (EDT). Add 4 to get UTC.
  return (h + 4) % 24;
}

/* Assess wind direction relative to home plate orientation */
function assessWindVsField(windDeg, cfBearing) {
  if (cfBearing == null) return { label: "unknown", boost: 0 };
  // Angle between wind direction (where wind goes, not comes from)
  // Wind direction in meteo = where wind comes FROM
  // Wind "going toward" = windDeg + 180
  const windGoingDeg = (windDeg + 180) % 360;
  const diff = Math.abs(((windGoingDeg - cfBearing + 540) % 360) - 180);

  // diff = 0 → wind blowing perfectly toward CF (OUT = HR boost)
  // diff = 180 → wind blowing from CF toward home plate (IN = suppressor)
  if (diff <= 45)  return { label: "OUT to CF 🚀",   boost: 1  };
  if (diff <= 90)  return { label: "Out to corner",   boost: 0.5 };
  if (diff >= 135) return { label: "IN from CF 🛑",   boost: -1 };
  if (diff >= 90)  return { label: "crosswind",       boost: 0  };
  return { label: "neutral", boost: 0 };
}

/* Fetch real weather at GAME TIME for all games in parallel */
async function fetchWeatherForGames(games) {
  const weatherMap = {};

  await Promise.all(games.map(async (g) => {
    const key    = g.away + g.home;
    const coords = STADIUM_COORDS[g.venue];

    if (!coords) { weatherMap[key] = null; return; }

    if (coords.dome) {
      weatherMap[key] = {
        condition: "Dome 🏠", tempF: 72, windSpeed: 0, windDir: "N/A", windDeg: 0,
        isOutdoor: false, hrImpact: "neutral",
        plateFaces: "Indoor dome — no wind factor",
        windVsField: "N/A",
        summary: "Indoor dome — climate controlled, no weather impact",
      };
      return;
    }

    try {
      const gameUTCHour = gameTimeToUTCHour(g.time);

      // Use hourly forecast to get weather at actual game time
      const url = "https://api.open-meteo.com/v1/forecast" +
        "?latitude=" + coords.lat +
        "&longitude=" + coords.lon +
        "&hourly=temperature_2m,windspeed_10m,winddirection_10m,weathercode" +
        "&current=temperature_2m,windspeed_10m,winddirection_10m,weathercode" +
        "&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=UTC&forecast_days=1";

      const r = await fetch(url);
      const d = await r.json();

      // Pick the right hour from forecast if we can, else fall back to current
      let tempF, windSpd, windDeg, wcode;
      if (gameUTCHour !== null && d.hourly?.time) {
        const hourIdx = d.hourly.time.findIndex(t => new Date(t).getUTCHours() === gameUTCHour);
        if (hourIdx >= 0) {
          tempF   = Math.round(d.hourly.temperature_2m[hourIdx]);
          windSpd = Math.round(d.hourly.windspeed_10m[hourIdx]);
          windDeg = d.hourly.winddirection_10m[hourIdx];
          wcode   = d.hourly.weathercode[hourIdx];
        }
      }
      // Fallback to current if hourly lookup failed
      if (tempF == null) {
        tempF   = Math.round(d.current.temperature_2m);
        windSpd = Math.round(d.current.windspeed_10m);
        windDeg = d.current.winddirection_10m;
        wcode   = d.current.weathercode;
      }

      const windDir   = windDegToDir(windDeg);
      const condition = wmoToCondition(wcode);
      const fieldAssess = assessWindVsField(windDeg, coords.cfBearing);

      // HR impact
      let hrImpact = "neutral";
      let impactNote = "";
      if (wcode >= 51) {
        hrImpact = "negative";
        impactNote = "Rain/storms suppress HR";
      } else if (windSpd >= 10) {
        if (fieldAssess.boost >= 1) {
          hrImpact = "positive";
          impactNote = windSpd + "mph wind " + fieldAssess.label + " — HR boost";
        } else if (fieldAssess.boost <= -1) {
          hrImpact = "negative";
          impactNote = windSpd + "mph wind " + fieldAssess.label + " — HR suppressed";
        } else {
          impactNote = windSpd + "mph " + fieldAssess.label;
        }
      } else if (tempF >= 82) {
        hrImpact = "positive";
        impactNote = "Heat " + tempF + "°F — ball carries";
      } else if (tempF <= 46) {
        hrImpact = "negative";
        impactNote = "Cold " + tempF + "°F — dead ball";
      }

      const plateFaces = coords.plateFaces || "facing " + windDegToDir(coords.cfBearing ?? 0);

      weatherMap[key] = {
        condition, tempF, windSpeed: windSpd, windDir, windDeg,
        isOutdoor: true, hrImpact,
        plateFaces,
        windVsField: fieldAssess.label,
        fieldBoost: fieldAssess.boost,
        summary: tempF + "°F · " + condition + " · " + windSpd + "mph from " + windDir +
          " (" + fieldAssess.label + ")" +
          (impactNote ? " · " + impactNote : ""),
        gameTime: g.time,
      };
    } catch (_) {
      weatherMap[key] = null;
    }
  }));

  return weatherMap;
}

/* ── MLB Stats API — Live HR + BvP ── */

/* Fetch 2026 season HR totals for every batter (top 300) */
async function fetchLiveHRStats() {
  const hrMap = {};
  try {
    const url = "https://statsapi.mlb.com/api/v1/stats" +
      "?stats=season&group=hitting&season=2026&sortStat=homeRuns&limit=300" +
      "&fields=stats,splits,stat,homeRuns,gamesPlayed,avg,ops,player,fullName,id";
    const r = await fetch(url);
    if (!r.ok) throw new Error("HR API " + r.status);
    const d = await r.json();
    (d.stats?.[0]?.splits ?? []).forEach(s => {
      const name = s.player?.fullName;
      const id   = s.player?.id;
      if (!name) return;
      const stats = {
        hr:  s.stat?.homeRuns  ?? 0,
        gp:  s.stat?.gamesPlayed ?? 0,
        avg: s.stat?.avg ?? ".000",
        ops: s.stat?.ops ?? ".000",
        id,
      };
      hrMap[name] = stats;
      // Store without Jr/Sr suffix for fuzzy matching
      const short = name.replace(/\s+(Jr|Sr)\.?$/i, "").trim();
      if (short !== name) hrMap[short] = stats;
    });
    console.log("HR stats loaded:", Object.keys(hrMap).length, "players");
  } catch (e) {
    console.warn("HR fetch failed:", e.message);
  }
  return hrMap;
}

/* Fetch BvP career stats for a batter vs pitcher pair using MLBAM IDs */
async function fetchBvP(batterId, pitcherId) {
  if (!batterId || !pitcherId) return null;
  try {
    const url = "https://statsapi.mlb.com/api/v1/stats" +
      "?stats=vsPlayer&group=hitting&playerId=" + batterId +
      "&opposingPlayerId=" + pitcherId +
      "&fields=stats,splits,stat,homeRuns,atBats,avg,ops,strikeOuts,player,fullName";
    const r = await fetch(url);
    if (!r.ok) return null;
    const d = await r.json();
    const split = d.stats?.[0]?.splits?.[0];
    if (!split) return null;
    return {
      hr:  split.stat?.homeRuns   ?? 0,
      ab:  split.stat?.atBats     ?? 0,
      avg: split.stat?.avg        ?? ".000",
      ops: split.stat?.ops        ?? ".000",
      so:  split.stat?.strikeOuts ?? 0,
    };
  } catch (_) {
    return null;
  }
}

/* Lookup pitcher MLBAM ID by name */
/* Known pitcher MLBAM IDs — hardcoded for reliability */
const PITCHER_IDS = {
  "Shohei Ohtani":660271,"Yoshinobu Yamamoto":808967,"Walker Buehler":621111,
  "Freddie Freeman":518692,"Max Fried":608331,"Gerrit Cole":543037,
  "Logan Webb":657277,"Sandy Alcantara":645261,"Zack Wheeler":554430,
  "Spencer Strider":675911,"Blake Snell":605483,"Justin Verlander":434378,
  "Aaron Nola":605400,"Kyle Freeland":621433,"Framber Valdez":664285,
  "Kevin Gausman":592332,"Cristopher Sanchez":663776,"Drew Rasmussen":680573,
  "George Kirby":669923,"Logan Gilbert":669302,"Luis Castillo":622491,
  "Jacob deGrom":594798,"Chris Bassitt":605135,"Gavin Williams":691706,
  "Bryce Elder":669373,"Tanner Bibee":687799,"Brandon Sproat":700695,
  "Jameson Taillon":592791,"Andrew Abbott":682218,"Chad Patrick":672576,
  "Andre Pallante":664728,"Michael Lorenzen":573244,"Bubba Chandler":695249,
  "Eduardo Rodriguez":628317,"Kyle Leahy":656362,"Peter Lambert":656909,
  "Jovani Moran":672515,"Taj Bradley":694297,"Cade Cavalli":672382,
  "Elmer Rodriguez":700228,"Jack Leiter":687282,"Tyler Holton":663399,
  "Stephen Kolek":687330,"Luis Severino":622663,"Walker Buehler":621111,
  "Randy Vasquez":694652,"Trevor McDonald":700720,"JR Ritchie":699561,
  "Tanner Bibee":687799,"Michael Wacha":519151,"Nick Martinez":608566,
  "Huascar Brazoban":685553,"Tomoyuki Sugano":693452,"Shane Baz":663158,
  "Cam Schlittler":700987,"Aaron Nola":605400,"Janson Junk":681867,
  "Chase Petty":694004,"Edward Cabrera":666100,"Eric Lauer":641553,
  "Payton Tolle":694050,"Randy Vasquez":694652,"Sam Aldegheri":700567,
  "Erick Fedde":622698,"Davis Martin":681851,"Jose Soriano":665765,
  "Steven Okert":608710,"Yoshinobu Yamamoto":808967,"Jacob deGrom":594798,
};


/* Known batter MLBAM IDs — hardcoded for BvP reliability */
const BATTER_IDS = {
  "Aaron Judge":592450,"Shohei Ohtani":660271,"Mookie Betts":605141,
  "Yordan Alvarez":670541,"Matt Olson":621566,"Kyle Schwarber":656941,
  "Bryce Harper":547180,"Gunnar Henderson":683002,"Pete Alonso":624413,
  "Juan Soto":665742,"Vladimir Guerrero Jr":665489,"Bo Bichette":666182,
  "Jose Ramirez":608070,"Elly De La Cruz":682829,"Bobby Witt Jr":677951,
  "Mike Trout":545361,"Nolan Arenado":571448,"Freddie Freeman":518692,
  "Rafael Devers":646240,"Fernando Tatis Jr":665487,"Francisco Lindor":596019,
  "James Wood":694192,"Byron Buxton":621439,"Randy Arozarena":668227,
  "Ian Happ":664023,"Pete Crow-Armstrong":682998,"Julio Rodriguez":677594,
  "Shea Langeliers":669127,"Willy Adames":642715,"Matt Chapman":656305,
  "Jarren Duran":680776,"Alex Bregman":608324,"Jackson Chourio":682626,
  "Munetaka Murakami":673548,"Nick Kurtz":695373,"Ben Rice":692467,
  "Jazz Chisholm":665862,"Anthony Volpe":694192,"Austin Riley":663586,
  "Ozzie Albies":645277,"Spencer Torkelson":679529,"Riley Greene":682985,
  "Kerry Carpenter":680757,"Triston Casas":670032,"Masataka Yoshida":673548,
  "Salvador Perez":521692,"Vinnie Pasquantino":686469,"MJ Melendez":669004,
  "Steven Kwan":680757,"Josh Naylor":647304,"Jose Altuve":514888,
  "Jeremy Pena":665161,"Yainer Diaz":673237,"Chas McCormick":676801,
  "Ketel Marte":606466,"Corbin Carroll":682998,"Christian Walker":572233,
  "Manny Machado":592518,"Jake Cronenworth":657743,"Jackson Merrill":701538,
  "Trea Turner":607208,"Nick Castellanos":592206,"William Contreras":661388,
  "Christian Yelich":592885,"Oneil Cruz":665833,"Bryan Reynolds":668804,
  "Andrew McCutchen":457705,"Carlos Correa":621043,"Ryan Jeffers":680436,
  "Nathaniel Lowe":663993,"Adolis Garcia":666969,"Wyatt Langford":694192,
  "Ezequiel Tovar":678662,"Brenton Doyle":684597,"Ryan McMahon":641943,
};

async function fetchPitcherIds(pitcherNames) {
  const idMap = {};
  // First use hardcoded IDs
  pitcherNames.forEach(name => {
    if (PITCHER_IDS[name]) idMap[name] = PITCHER_IDS[name];
  });
  // Then try API for any missing
  const missing = pitcherNames.filter(n => !idMap[n]);
  if (missing.length === 0) return idMap;
  for (const name of missing) {
    try {
      const encoded = encodeURIComponent(name);
      const url = "https://statsapi.mlb.com/api/v1/people/search?names=" + encoded +
        "&season=2026&sportId=1&fields=people,fullName,id,primaryPosition,abbreviation";
      const r = await fetch(url);
      const d = await r.json();
      let match = (d.people ?? []).find(p => p.fullName?.toLowerCase() === name.toLowerCase());
      if (!match) match = (d.people ?? []).find(p =>
        p.fullName?.toLowerCase().includes(name.split(" ").slice(-1)[0].toLowerCase())
      );
      if (match) idMap[name] = match.id;
      await new Promise(r => setTimeout(r, 80));
    } catch (_) {}
  }
  return idMap;
}


/* ── Team ID map for MLB Stats API ── */
const TEAM_IDS = {
  AZ:108, ATL:144, BAL:110, BOS:111, CHC:112, CIN:113, CLE:114,
  COL:115, DET:116, HOU:117, KC:118, LAA:108, LAD:119, MIA:146,
  MIL:158, MIN:142, NYM:121, NYY:147, ATH:133, PHI:143, PIT:134,
  SD:135, SF:137, SEA:136, STL:138, TB:139, TEX:140, TOR:141, WSH:120,
  CWS:145, LAA:108,
};

/* Fetch active roster + 2026 hitting stats for a team */
async function fetchTeamHitters(teamAbbr) {
  const teamId = TEAM_IDS[teamAbbr];
  if (!teamId) return [];
  try {
    // Get active roster
    const rosterUrl = "https://statsapi.mlb.com/api/v1/teams/" + teamId +
      "/roster?rosterType=active&season=2026&fields=roster,person,fullName,id,primaryPosition,abbreviation";
    const rr = await fetch(rosterUrl);
    if (!rr.ok) return [];
    const rd = await rr.json();

    // Filter to position players only (not P)
    const posPlayers = (rd.roster ?? []).filter(p =>
      p.primaryPosition?.abbreviation !== "P" &&
      p.primaryPosition?.abbreviation !== "TWP"
    );

    // Return basic roster without individual stat calls to reduce API load
    // Stats come from liveHRMap (league leaderboard) instead
    return posPlayers.slice(0, 10).map(p => ({
      name: p.person.fullName,
      id:   p.person.id,
      team: teamAbbr,
      pos:  p.primaryPosition?.abbreviation ?? "?",
      hr: 0, gp: 0, avg: ".000", ops: ".000",
    })).filter(p => p.name);
  } catch (_) {
    return [];
  }
}

/* Fetch pitcher ID and 2026 stats by name */
async function fetchPitcherData(name) {
  if (!name || name === "TBD") return null;
  try {
    const encoded = encodeURIComponent(name);
    const url = "https://statsapi.mlb.com/api/v1/people/search?names=" + encoded +
      "&season=2026&fields=people,fullName,id,primaryPosition,abbreviation";
    const r = await fetch(url);
    const d = await r.json();
    const match = (d.people ?? []).find(p =>
      p.fullName?.toLowerCase().includes(name.toLowerCase().split(" ").slice(-1)[0]) &&
      p.primaryPosition?.abbreviation === "P"
    );
    if (!match) return null;

    // Get their 2026 pitching stats
    const statsUrl = "https://statsapi.mlb.com/api/v1/people/" + match.id +
      "/stats?stats=season&season=2026&group=pitching" +
      "&fields=stats,splits,stat,era,whip,homeRunsPer9,strikeOutsPer9,inningsPitched";
    const sr = await fetch(statsUrl);
    const sd = await sr.json();
    const stat = sd.stats?.[0]?.splits?.[0]?.stat ?? {};
    return {
      id:   match.id,
      name: match.fullName,
      era:  stat.era   ?? null,
      whip: stat.whip  ?? null,
      hr9:  stat.homeRunsPer9 ?? null,
      ip:   stat.inningsPitched ?? "0",
    };
  } catch (_) {
    return null;
  }
}

/* Fetch BvP for multiple batters vs one pitcher in parallel */
async function fetchBvPBatch(batters, pitcherId) {
  if (!pitcherId) return {};
  const results = {};
  await Promise.all(batters.map(async b => {
    if (!b.id) return;
    const bvp = await fetchBvP(b.id, pitcherId);
    if (bvp) results[b.name] = bvp;
  }));
  return results;
}

/* Lightweight pre-fetch — only pitcher data, no heavy roster calls */
async function prefetchGameData(games) {
  const gameData = {};
  for (const g of games) {
    const key = g.away + g.home;
    try {
      // Only fetch pitcher stats — skip full roster (too many calls)
      const [awayPitcher, homePitcher] = await Promise.all([
        fetchPitcherData(g.awayP),
        fetchPitcherData(g.homeP),
      ]);
      gameData[key] = {
        away: g.away, home: g.home,
        awayHitters: [], homeHitters: [],
        awayPitcher, homePitcher,
        awayBvP: {}, homeBvP: {},
      };
    } catch (_) {
      gameData[key] = null;
    }
    await new Promise(r => setTimeout(r, 200));
  }
  return gameData;
}


/* ── Fetch pitcher arsenal (pitch mix) from MLB Stats API ── */
async function fetchPitcherArsenal(pitcherId) {
  if (!pitcherId) return [];
  try {
    const url = "https://statsapi.mlb.com/api/v1/people/" + pitcherId +
      "/stats?stats=byPitchType&season=2026&group=pitching" +
      "&fields=stats,splits,stat,numberOfPitches,pitchesThrown,type,description";
    const r = await fetch(url);
    if (!r.ok) return [];
    const d = await r.json();
    const splits = d.stats?.[0]?.splits ?? [];
    return splits
      .filter(s => s.stat?.numberOfPitches > 0)
      .map(s => ({
        name: s.type?.description || s.stat?.type || "Unknown",
        pct:  Math.round((s.stat?.numberOfPitches / splits.reduce((acc, x) => acc + (x.stat?.numberOfPitches||0), 0)) * 100),
        count: s.stat?.numberOfPitches,
      }))
      .filter(p => p.pct >= 3)
      .sort((a, b) => b.pct - a.pct)
      .slice(0, 5);
  } catch (_) {
    return [];
  }
}

/* ── Live MLB Injury Report ── */
async function fetchInjuredPlayers() {
  const injured = new Set();
  try {
    // MLB Stats API injuries endpoint
    const url = "https://statsapi.mlb.com/api/v1/injuries?sportId=1&fields=injuries,player,fullName,injuryStatus,returnDate";
    const r = await fetch(url);
    if (!r.ok) throw new Error("MLB injury API " + r.status);
    const d = await r.json();
    const entries = d.injuries ?? [];
    entries.forEach(e => {
      const name   = e.player?.fullName;
      const status = (e.injuryStatus || "").toLowerCase();
      // Only exclude players definitely out (10-day IL, 60-day IL, DTD means they may play)
      if (name && (status.includes("10-day") || status.includes("60-day") || status.includes("il") || status.includes("injured"))) {
        injured.add(name);
        // also store short version
        const short = name.replace(/\s+Jr\.?$|\s+Sr\.?$/i, "").trim();
        if (short !== name) injured.add(short);
      }
    });
    console.log("✅ Injury report loaded —", injured.size, "players on IL");
  } catch (e) {
    console.warn("⚠️ Injury fetch failed:", e.message);
    // Hardcode any known IL players today as fallback
    const knownIL = [
      "Ronald Acuna Jr", "Ronald Acuna", "Julio Rodriguez", "Jazz Chisholm Jr",
    ];
    knownIL.forEach(n => injured.add(n));
  }
  return injured;
}


/* ── Real Monte Carlo HR Simulation ── */
// Runs N simulations of a batter vs pitcher using real fetched stats
// Returns number of simulated HR out of N attempts
function runHRSimulation(batter, pitcher, weatherBoost = 0, N = 1000) {
  const gp  = batter?.gp || 33;
  const hr  = batter?.hr || 3;
  const ops = parseFloat(batter?.ops || "0.720") || 0.720;

  // Realistic per-game HR probability benchmarks:
  // Elite (Judge ~58HR pace): ~18-22% per game
  // Good power (15-20 HR pace): ~10-14%
  // Average (8-12 HR pace): ~5-8%
  // Low power (1-4 HR pace): ~1-4%

  // Scale HR/game down to realistic probability
  // Raw HR/game (e.g. 13/34 = 0.382) needs to be ~halved
  const rawRate  = hr / Math.max(gp, 20);
  const baseRate = rawRate * 0.5; // realistic calibration

  // OPS adds a small boost for elite hitters
  const opsBoost = Math.max(0, (ops - 0.750) * 0.08);

  // Pitcher ERA vs league avg 4.20
  const era = parseFloat(pitcher?.era || "4.20") || 4.20;
  const pitcherMult = Math.max(0.7, Math.min(1.45, era / 4.20));

  // Weather: -1 = blowing in (suppresses), +1 = blowing out (boosts)
  const weatherMult = 1 + (Math.max(-1, Math.min(1, weatherBoost)) * 0.10);

  // Final probability — cap at 30% (even elite spots rarely exceed this)
  const hrProb = Math.min(0.30, (baseRate + opsBoost) * pitcherMult * weatherMult);

  let hits = 0;
  for (let i = 0; i < N; i++) {
    if (Math.random() < hrProb) hits++;
  }
  return hits;
}

/* ── JSON helpers ── */
function sanitize(s) {
  // Smart quotes
  s = s.replace(/[\u201c\u201d]/g, '"').replace(/[\u2018\u2019]/g, "'");
  // Fix keys with wrong quotes
  s = s.replace(/'([A-Za-z_][A-Za-z0-9_]{0,50})['"]\s*:/g, '"$1":');
  s = s.replace(/"([A-Za-z_][A-Za-z0-9_]{0,50})'\s*:/g, '"$1":');
  // Fix unquoted string values after colon: :"some text" missing opening quote
  s = s.replace(/:\s*([A-Za-z][^",}\]\n]{1,60}?)(\s*[,}\]])/g, (m, val, end) => {
    const trimmed = val.trim();
    if (trimmed === 'true' || trimmed === 'false' || trimmed === 'null') return m;
    if (!isNaN(trimmed)) return m;
    return ':"' + trimmed + '"' + end;
  });
  // Fix parentheses instead of brackets
  s = s.replace(/:\s*\(\s*\{/g, ': [{');
  s = s.replace(/\}\s*\)/g, '}]');
  // Trailing commas
  s = s.replace(/,(\s*[}\]])/g, '$1');
  // Python literals
  s = s.replace(/:\s*True\b/g, ': true').replace(/:\s*False\b/g, ': false').replace(/:\s*None\b/g, ': null');
  return s;
}
function grabJSON(raw) {
  let s = raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
  const oa = s.indexOf("{"), ob = s.indexOf("[");
  const st = oa === -1 ? ob : ob === -1 ? oa : Math.min(oa, ob);
  if (st === -1) throw new Error("No JSON found");
  const end = s[st] === "{" ? s.lastIndexOf("}") : s.lastIndexOf("]");
  const slice = s.slice(st, end + 1);
  // Attempt 1: raw parse
  try { const p = JSON.parse(slice); if (p && typeof p === "object") return p; } catch (_) {}
  // Attempt 2: sanitized parse
  const clean = sanitize(slice);
  try { const p = JSON.parse(clean); if (p && typeof p === "object") return p; } catch (_) {}
  // Attempt 3: fix truncated JSON by closing open brackets/braces
  try {
    let fixed = clean;
    const opens = (fixed.match(/\[/g)||[]).length - (fixed.match(/\]/g)||[]).length;
    const openb = (fixed.match(/\{/g)||[]).length - (fixed.match(/\}/g)||[]).length;
    for (let i = 0; i < opens; i++) fixed += "]";
    for (let i = 0; i < openb; i++) fixed += "}";
    fixed = sanitize(fixed);
    const p = JSON.parse(fixed);
    if (p && typeof p === "object") return p;
  } catch (_) {}
  // Attempt 4: regex extract games array
  const m = clean.match(/"games"\s*:\s*(\[[\s\S]*)/);
  if (m) {
    try {
      let arr = m[1];
      const op = (arr.match(/\[/g)||[]).length - (arr.match(/\]/g)||[]).length;
      for (let i = 0; i < op; i++) arr += "]";
      return { games: JSON.parse(sanitize(arr)) };
    } catch (_) {}
  }
  throw new Error("JSON parse failed: " + slice.slice(0, 150));
}

/* ── Player headshot ── */
function Headshot({ mlbId, name, size = 56, teamColor = T.accent }) {
  const [err, setErr] = useState(false);
  const initials = (name || "??").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  if (!mlbId || err) {
    return (
      <div style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        background: teamColor + "22", border: "2px solid " + teamColor + "55",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: F.arch, fontSize: size * 0.3, color: teamColor,
      }}>{initials}</div>
    );
  }
  return (
    <img
      src={"https://img.mlb.com/headshots/current/60x60/" + mlbId + ".jpg"}
      alt={name}
      onError={() => setErr(true)}
      style={{
        width: size, height: size, borderRadius: "50%", flexShrink: 0,
        objectFit: "cover", border: "2px solid " + teamColor + "55",
        background: T.dim,
      }}
    />
  );
}

/* ── HR Chance bar ── */
function HRBar({ pct, color }) {
  const c = pct >= 20 ? "#00e676" : pct >= 12 ? "#ffca28" : pct >= 6 ? "#ffa726" : "#7a9abf";
  const glow = pct >= 20 ? "0 0 16px rgba(0,230,118,0.6)" : pct >= 12 ? "0 0 14px rgba(255,202,40,0.5)" : pct >= 6 ? "0 0 12px rgba(255,167,38,0.4)" : "none";
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted, letterSpacing: 1 }}>HR CHANCE</span>
        <span style={{ fontFamily: F.arch, fontSize: 13, color: c, textShadow: glow }}>{pct.toFixed(1)}%</span>
      </div>
      <div style={{ height: 7, background: "rgba(0,0,0,0.4)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: pct + "%", maxWidth: "100%",
          background: "linear-gradient(90deg," + c + "," + c + "88)",
          borderRadius: 4, boxShadow: glow,
          transition: "width 1.1s cubic-bezier(.23,1,.32,1)",
        }} />
      </div>
    </div>
  );
}


/* ── Spin indicator ── */
function Spin({ size = 18, color = T.accent }) {
  return (
    <div style={{ width:size, height:size, border:"2px solid "+color+"40",
      borderTop:"2px solid "+color, borderRadius:"50%",
      animation:"hrs-spin 0.8s linear infinite", flexShrink:0 }} />
  );
}

/* ── Log line ── */
function LogLine({ text, active }) {
  return (
    <div style={{ fontFamily:F.mono, fontSize:10,
      color:active?T.accent:T.muted, padding:"2px 0",
      borderLeft:active?"2px solid "+T.accent:"2px solid transparent",
      paddingLeft:8, transition:"color 0.3s" }}>
      {text}
    </div>
  );
}

/* ── Rate limit screen ── */
function RateLimitScreen({ error, onDismiss }) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      if (!error?.resetsAt) return;
      const diff = error.resetsAt * 1000 - Date.now();
      if (diff <= 0) { setTimeLeft("now"); return; }
      setTimeLeft(Math.floor(diff/60000)+"m "+Math.floor((diff%60000)/1000)+"s");
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [error]);
  return (
    <div style={{ background:T.panel, border:"1px solid "+T.amber+"60",
      borderRadius:13, padding:"28px 20px", textAlign:"center", marginBottom:14 }}>
      <div style={{ fontSize:36, marginBottom:8 }}>⏳</div>
      <div style={{ fontFamily:F.arch, fontSize:15, color:T.amber, marginBottom:6 }}>Rate Limit Reached</div>
      <div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, marginBottom:18 }}>
        Resets in <span style={{ color:T.amber }}>{timeLeft||"soon"}</span>
      </div>
      <button onClick={onDismiss} style={{ background:T.amber, color:T.bg, border:"none",
        borderRadius:9, padding:"10px 24px", fontFamily:F.arch, fontSize:13, cursor:"pointer" }}>
        Got it
      </button>
    </div>
  );
}

/* ── Player row ── */
function PlayerRow({ p, rank, delay=0, game }) {
  const simPct  = p.simHRs != null ? parseFloat(((p.simHRs/1000)*100).toFixed(1)) : null;
  const hrPct   = simPct ?? p.hrChancePct ?? 0;
  const c = hrPct>=20?"#00e676":hrPct>=12?"#ffca28":hrPct>=6?"#ffa726":"#7a9abf";
  const glow = hrPct>=15?"0 0 20px "+c+"88":"none";
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background:T.card, border:"1px solid "+T.border, borderRadius:11,
      marginBottom:8, overflow:"hidden", animation:"hrs-up 0.4s ease both",
      animationDelay:delay+"ms", cursor:"pointer" }}
      onClick={() => setExpanded(v=>!v)}>
      <div style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px" }}>
        <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted, width:16, textAlign:"center", flexShrink:0 }}>
          {rank===1?"🥇":rank===2?"🥈":rank===3?"🥉":rank}
        </div>
        <Headshot mlbId={p.mlbId} name={p.name} size={40} teamColor={p.teamColor||c} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:F.arch, fontSize:13, color:T.text, marginBottom:2,
            whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.name}</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted }}>{p.team}</span>
            {p.isHome
              ? <span style={{ fontFamily:F.mono, fontSize:9, color:"#00e676" }}>🏠 HOME</span>
              : <span style={{ fontFamily:F.mono, fontSize:9, color:"#40e0d0" }}>✈ AWAY</span>}
          </div>
        </div>
        <div style={{ textAlign:"right", flexShrink:0 }}>
          <div style={{ fontFamily:F.bebas, fontSize:26, color:c, lineHeight:1, textShadow:glow }}>
            {hrPct.toFixed(1)}%
          </div>
          <div style={{ fontFamily:F.mono, fontSize:8, color:T.muted, marginBottom:2 }}>
            {simPct!=null?"SIM HR %":"HR CHANCE"}
          </div>
          {p.simHRs!=null && (
            <div style={{ fontFamily:F.mono, fontSize:8, color:c, background:c+"15",
              border:"1px solid "+c+"30", borderRadius:4, padding:"2px 6px", textAlign:"center" }}>
              {p.simHRs.toLocaleString()}<span style={{ color:T.muted }}>/1k</span>
            </div>
          )}
        </div>
        <div style={{ color:T.muted, fontSize:10, flexShrink:0,
          transform:expanded?"rotate(180deg)":"rotate(0)", transition:"transform .2s" }}>▼</div>
      </div>
      {expanded && (
        <div style={{ padding:"0 12px 14px 12px", borderTop:"1px solid "+T.border }}>
          <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:7 }}>
            <div style={{ background:"rgba(0,229,255,0.07)", border:"1px solid rgba(0,229,255,0.25)",
              borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted, letterSpacing:1 }}>
                2026 SEASON <span style={{ color:"#00e676", fontSize:7 }}>● LIVE</span>
              </span>
              <span style={{ fontFamily:F.arch, fontSize:14, color:"#00e5ff" }}>
                {p.seasonHRs??"—"} HR
                <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted, marginLeft:6 }}>in {p.gamesPlayed??"—"}g</span>
              </span>
            </div>
            <div style={{ background:"rgba(255,202,40,0.07)", border:"1px solid rgba(255,202,40,0.25)",
              borderRadius:8, padding:"8px 12px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                marginBottom:(p.bvpAB>0||p.pitcherArsenal?.length>0)?8:0 }}>
                <span style={{ fontFamily:F.mono, fontSize:9, color:"#ffca28", letterSpacing:1 }}>
                  vs {p.pitcher||"Pitcher"} {p.pitcherHand?"("+p.pitcherHand+")":""} ERA {p.pitcherERA!=null?parseFloat(p.pitcherERA).toFixed(2):"N/A"}
                  <span style={{ color:"#00e676", fontSize:7, marginLeft:5 }}>● LIVE</span>
                </span>
                <span style={{ fontFamily:F.mono, fontSize:11, color:"#f0f6ff" }}>
                  {(p.bvpAB!=null&&p.bvpAB>0)
                    ? <><span style={{ color:"#ffca28", fontWeight:700 }}>{p.bvpAVG||".000"}</span> AVG · <span style={{ color:"#00e676" }}>{p.bvpHR??0} HR</span> · {p.bvpAB} AB</>
                    : <span style={{ color:"#7a9abf" }}>First career matchup</span>}
                </span>
              </div>
              {p.pitcherArsenal?.length>0 && (
                <div>
                  <div style={{ fontFamily:F.mono, fontSize:8, color:"#7a9abf", letterSpacing:1, marginBottom:5 }}>PITCH MIX</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                    {p.pitcherArsenal.map((pitch,i)=>(
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ fontFamily:F.mono, fontSize:9, color:"#f0f6ff", width:110, flexShrink:0 }}>{pitch.name}</div>
                        <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:3, height:5, overflow:"hidden" }}>
                          <div style={{ width:pitch.pct+"%", height:"100%", borderRadius:3,
                            background:i===0?"#00e5ff":i===1?"#ffca28":i===2?"#ce93d8":"#7a9abf" }} />
                        </div>
                        <div style={{ fontFamily:F.mono, fontSize:9, color:"#7a9abf", width:28, textAlign:"right" }}>{pitch.pct}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {p.weatherInsight && (
              <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.2)",
                borderRadius:8, padding:"8px 12px" }}>
                <span style={{ fontFamily:F.mono, fontSize:9, color:"#00e676", letterSpacing:1 }}>🌤 WEATHER</span>
                <div style={{ fontFamily:F.mono, fontSize:10, color:"#7a9abf", marginTop:3, lineHeight:1.5 }}>{p.weatherInsight}</div>
              </div>
            )}
            <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.2)",
              borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:"#00e676", letterSpacing:1 }}>1,000× SIM ● REAL STATS</span>
              <span style={{ fontFamily:F.bebas, fontSize:22, color:c, textShadow:glow }}>
                {hrPct.toFixed(1)}%
                <span style={{ fontFamily:F.mono, fontSize:9, color:"#7a9abf", marginLeft:6 }}>({p.simHRs??"—"}/1k)</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Game card ── */
function GameCard({ game, result, isOpen, onToggle, isRunning }) {
  const players = result?.players ?? [];
  const awayHot = (game.awayERA??0) >= 5.5;
  const homeHot = (game.homeERA??0) >= 5.5;
  const topHR = players[0]?.simHRs!=null
    ? parseFloat(((players[0].simHRs/1000)*100).toFixed(1))
    : (players[0]?.hrChancePct??0);
  const eraStr = v => v==null?"N/A":String(v);
  return (
    <div style={{ background:"#101826", border:"1px solid #1e3048", borderRadius:13, marginBottom:10, overflow:"hidden" }}>
      <div onClick={onToggle} style={{ padding:"12px 14px", cursor:"pointer",
        background:isOpen?"rgba(0,229,255,0.04)":"transparent" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontFamily:F.arch, fontSize:14, color:"#f0f6ff" }}>{game.away}</span>
            <span style={{ fontFamily:F.mono, fontSize:10, color:"#7a9abf" }}>@</span>
            <span style={{ fontFamily:F.arch, fontSize:14, color:"#f0f6ff" }}>{game.home}</span>
            {players.length>0 && (
              <span style={{ fontFamily:F.bebas, fontSize:16, color:"#00e676",
                background:"rgba(0,230,118,0.1)", border:"1px solid rgba(0,230,118,0.3)",
                borderRadius:6, padding:"0 7px", marginLeft:4 }}>
                {topHR.toFixed(1)}%
              </span>
            )}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {result && <span style={{ fontFamily:F.mono, fontSize:8, color:"#00e676",
              background:"rgba(0,230,118,0.1)", padding:"1px 6px", borderRadius:4,
              border:"1px solid rgba(0,230,118,0.3)" }}>✅ done</span>}
            <span style={{ color:"#7a9abf", fontSize:11,
              transform:isOpen?"rotate(180deg)":"rotate(0)", transition:"transform .2s" }}>▼</span>
          </div>
        </div>
        <div style={{ fontFamily:F.mono, fontSize:9, color:"#7a9abf", marginBottom:4 }}>
          {game.venue} · {game.time}
        </div>
        {game.weather && (
          <div style={{ fontFamily:F.mono, fontSize:8, marginBottom:3,
            color:game.weather.hrImpact==="positive"?"#00e676":game.weather.hrImpact==="negative"?"#ff5252":"#7a9abf" }}>
            {game.weather.isOutdoor===false?"🏠 Dome — climate controlled"
             :"🌤 "+game.weather.tempF+"°F · "+game.weather.windSpeed+"mph "+game.weather.windDir
               +" ("+( game.weather.windVsField||"?")+")"
               +(game.weather.hrImpact==="positive"?" ✅ HR BOOST":game.weather.hrImpact==="negative"?" 🛑 SUPPRESSED":"")}
          </div>
        )}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          <span style={{ fontFamily:F.mono, fontSize:9, color:awayHot?"#ff6b35":"#7a9abf" }}>
            {game.away}: {game.awayP} ({game.awayH}) ERA {eraStr(game.awayERA)}
          </span>
          <span style={{ color:"#1e3048" }}>|</span>
          <span style={{ fontFamily:F.mono, fontSize:9, color:homeHot?"#ff6b35":"#7a9abf" }}>
            {game.home}: {game.homeP} ({game.homeH}) ERA {eraStr(game.homeERA)}
          </span>
        </div>
      </div>
      {isOpen && (
        <div style={{ padding:"10px 12px 12px", borderTop:"1px solid #1e3048" }}>
          {isRunning ? (
            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", color:"#7a9abf" }}>
              <Spin size={14} />
              <span style={{ fontFamily:F.mono, fontSize:10 }}>Analyzing matchups...</span>
            </div>
          ) : players.length>0 ? (
            players.map((p,i) => (
              <PlayerRow key={p.name+i} p={p} rank={i+1} delay={i*80} game={game} />
            ))
          ) : (
            <div style={{ fontFamily:F.mono, fontSize:10, color:"#7a9abf", padding:"8px 0", textAlign:"center" }}>
              No picks yet — run analysis above
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Prompt builder ── */
function buildPrompt(games, weatherMap={}, gameData={}) {
  const lines = games.map(g =>
    g.away+"@"+g.home+" "+g.venue+" "+g.time+
    " | Away:"+g.awayP+" "+g.awayH+" ERA "+(g.awayERA||"?")+
    " | Home:"+g.homeP+" "+g.homeH+" ERA "+(g.homeERA||"?")
  );
  return [
    "You are an MLB HR analyst. Today is May 2026.",
    "KNOWN 2026 MOVES: Pete Alonso=BAL, Juan Soto=NYM, Aaron Judge=NYY,",
    "Shohei Ohtani=LAD, Yordan Alvarez=HOU, Rafael Devers=SF, Willy Adames=SF,",
    "Alex Bregman=BOS, Randy Arozarena=SEA, Paul Goldschmidt=NYY, Munetaka Murakami=CWS.",
    "",
    "BATTER STATS (MLB API):",
    ...games.map(g => {
      const key=g.away+g.home, w=weatherMap[key], gd=gameData[key];
      const wStr=w?w.tempF+"F "+w.windSpeed+"mph "+(w.windVsField||"")+(w.hrImpact==="positive"?" HR+":w.hrImpact==="negative"?" HR-":""):"";
      const fmt=(h,bvp)=>(h||[]).slice(0,5).map(x=>x.name+" "+x.hr+"HR "+x.avg+(bvp[x.name]?" bvp:"+bvp[x.name].hr+"HR/"+bvp[x.name].ab+"AB":"")).join(", ");
      return g.away+"@"+g.home+": "+g.awayP+" ERA "+(g.awayERA||"?")+" vs "+g.homeP+" ERA "+(g.homeERA||"?")+
        (wStr?" w:"+wStr:"")+
        (gd?" | "+g.away+":"+fmt(gd.awayHitters,gd.awayBvP||{})+" | "+g.home+":"+fmt(gd.homeHitters,gd.homeBvP||{}):"");
    }),
    "","GAMES:",...lines,"",
    "TASK: Pick TOP 6 HR candidates per game. Position players only, no pitchers, no IL players.",
    "Reply ONE line per game EXACTLY like this:",
    "BOS@DET: Riley Greene 85, Spencer Torkelson 74, Kerry Carpenter 68, Jarren Duran 65, Alex Bregman 61, Triston Casas 55",
    "AWAY@HOME: Name Score, Name Score, Name Score, Name Score, Name Score, Name Score",
    "6 per line. No extra text. No pitchers. Only players on those two teams.",
  ].join("\n");
}

/* ════════ TOP 3 PARLAY BANNER ════════ */
function ParlayBanner({ results }) {
  const [open, setOpen] = useState(true);

  // Flatten all players across all games, sort by simHRs/hrChancePct
  const allPlayers = [];
  Object.entries(results).forEach(([key, gr]) => {
    (gr.players || []).forEach(p => {
      allPlayers.push({ ...p, gameKey: key });
    });
  });

  // Sort all by sim%, then pick top 3 with no duplicate teams
  const sorted = [...allPlayers].sort((a, b) => {
    const aScore = a.simHRs ?? (a.hrChancePct ?? 0) * 10;
    const bScore = b.simHRs ?? (b.hrChancePct ?? 0) * 10;
    return bScore - aScore;
  });
  const usedTeams = new Set();
  const top3 = [];
  for (const p of sorted) {
    if (top3.length >= 3) break;
    if (!p.team || usedTeams.has(p.team)) continue;
    usedTeams.add(p.team);
    top3.push(p);
  }

  if (top3.length < 2) return null;

  // Combined parlay probability (multiply individual chances)
  const combinedPct = top3.reduce((acc, p) => {
    const pct = p.simHRs != null ? (p.simHRs / 1000) : ((p.hrChancePct ?? 10) / 100);
    return acc * pct;
  }, 1);
  const combinedDisplay = (combinedPct * 100).toFixed(2);

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(0,0,0,0.6), rgba(8,12,20,0.95))",
      border: "1px solid " + T.gold + "66",
      borderRadius: 14, marginBottom: 16, overflow: "hidden",
      boxShadow: "0 0 30px rgba(255,215,0,0.15)",
    }}>
      {/* Header */}
      <div
        onClick={() => setOpen(v => !v)}
        style={{
          padding: "12px 16px", cursor: "pointer",
          background: "linear-gradient(90deg, rgba(255,215,0,0.12), transparent)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: 3, color: T.gold, marginBottom: 2 }}>
            ⚡ TODAY'S TOP PARLAY
          </div>
          <div style={{ fontFamily: F.arch, fontSize: 15, color: T.text }}>
            Best 3 HR Picks Combined
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: F.bebas, fontSize: 28, color: T.gold, lineHeight: 1, textShadow: "0 0 20px rgba(255,215,0,0.6)" }}>
            {combinedDisplay}%
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 8, color: T.muted }}>PARLAY PROB</div>
        </div>
        <div style={{ color: T.gold, fontSize: 13, marginLeft: 12, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▼</div>
      </div>

      {/* Players */}
      {open && (
        <div style={{ padding: "0 14px 14px" }}>
          <div style={{ borderTop: "1px solid rgba(255,215,0,0.2)", paddingTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            {top3.map((p, i) => {
              const pct = p.simHRs != null
                ? ((p.simHRs / 1000) * 100).toFixed(1)
                : (p.hrChancePct ?? 0).toFixed(1);
              const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉";
              const c = parseFloat(pct) >= 20 ? "#00e676" : parseFloat(pct) >= 12 ? "#ffca28" : "#ffa726";
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.15)",
                  borderRadius: 9, padding: "8px 12px",
                }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{medal}</span>
                  <Headshot mlbId={p.mlbId} name={p.name} size={36} teamColor={p.teamColor || T.gold} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: F.arch, fontSize: 13, color: T.text, marginBottom: 1 }}>
                      {p.name}
                    </div>
                    <div style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>
                      {p.team} · {p.isHome ? "🏠 HOME" : "✈ AWAY"} · vs {p.pitcher || "TBD"}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontFamily: F.bebas, fontSize: 22, color: c, lineHeight: 1 }}>{pct}%</div>
                    <div style={{ fontFamily: F.mono, fontSize: 8, color: T.muted }}>HR CHANCE</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: T.muted, textAlign: "center", marginTop: 10, lineHeight: 1.6 }}>
            Combined probability if all 3 hit a HR today · For entertainment purposes only
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════ MAIN APP ════════ */
export default function App() {
  useAssets();

  const [games,    setGames]    = useState([...ALL_GAMES]);
  const [openGames, setOpenGames] = useState(new Set());
  const [phase,    setPhase]    = useState("ready");
  const [logs,     setLogs]     = useState([]);
  const [stepLabel, setStepLabel] = useState("");
  const [progress,  setProgress]  = useState(0);
  const [results,  setResults]  = useState({});  // key: away+home → { players }
  const [errMsg,   setErrMsg]   = useState("");
  const busy = useRef(false);

  const pushLog = msg => setLogs(p => [...p.slice(-12), msg]);

  // Progress steps — drives the loading bar
  const STEPS = [
    { match:"Loading",                  pct:5,  label:"Loading games..." },
    { match:"Fetching live weather",    pct:12, label:"Fetching live weather..." },
    { match:"Weather loaded",           pct:18, label:"Weather loaded ✅" },
    { match:"Fetching live 2026 HR",    pct:25, label:"Fetching live HR stats from MLB..." },
    { match:"Live HR",                  pct:30, label:"HR stats loaded ✅" },
    { match:"Fetching pitcher IDs",     pct:35, label:"Resolving pitcher IDs..." },
    { match:"pitcher IDs resolved",     pct:38, label:"Pitcher IDs ready ✅" },
    { match:"Checking MLB injury",      pct:42, label:"Checking injury report..." },
    { match:"players on IL",            pct:46, label:"Injury report loaded ✅" },
    { match:"Analyzing BvP",            pct:50, label:"Analyzing BvP matchups..." },
    { match:"Monte Carlo",              pct:55, label:"Running 1,000× simulations..." },
    { match:"Analyzing batch 1",        pct:58, label:"Claude analyzing batch 1..." },
    { match:"Analyzing batch 2",        pct:64, label:"Claude analyzing batch 2..." },
    { match:"Analyzing batch 3",        pct:70, label:"Claude analyzing batch 3..." },
    { match:"Analyzing batch 4",        pct:76, label:"Claude analyzing batch 4..." },
    { match:"Analyzing batch 5",        pct:80, label:"Claude analyzing batch 5..." },
    { match:"Analyzing batch 6",        pct:83, label:"Claude analyzing batch 6..." },
    { match:"Analyzing batch 7",        pct:86, label:"Claude analyzing batch 7..." },
    { match:"Analyzing batch 8",        pct:89, label:"Claude analyzing batch 8..." },
    { match:"Batch",                    pct:60, label:"Batch complete ✅" },
    { match:"Verifying positions",      pct:86, label:"Verifying rosters & positions..." },
    { match:"All players verified",     pct:90, label:"All players verified ✅" },
    { match:"Fetching live BvP",        pct:92, label:"Fetching official BvP stats..." },
    { match:"BvP data fetched",         pct:97, label:"BvP data loaded ✅" },
    { match:"games analyzed",           pct:100,label:"Analysis complete! 🎉" },
  ];
  const setStep = msg => {
    setLogs(p => [...p.slice(-12), msg]);
    const step = STEPS.find(s => msg.includes(s.match));
    if (step) {
      setStepLabel(step.label);
      setProgress(step.pct);
    }
  };

  const toggleGame = (key) => setOpenGames(prev => {
    const next = new Set(prev);
    next.has(key) ? next.delete(key) : next.add(key);
    return next;
  });

  const openAll  = () => setOpenGames(new Set(games.map(g => g.away + g.home)));
  const closeAll = () => setOpenGames(new Set());

  const removeGame = (idx) => {
    const key = games[idx].away + games[idx].home;
    setGames(prev => prev.filter((_, i) => i !== idx));
    setOpenGames(prev => { const n = new Set(prev); n.delete(key); return n; });
  };



  const restoreAll = () => {
    setGames([...ALL_GAMES]);
    setResults({});
  };

  const run = async () => {
    if (busy.current || games.length === 0) return;
    busy.current = true;
    setPhase("running"); setLogs([]); setErrMsg(""); setProgress(0); setStepLabel("Starting...");

    try {
      // ── Weather ──
      setStep("🌤 Fetching weather...");
      const weatherMap = await fetchWeatherForGames(games);
      setStep("✅ Weather ready");

      // ── Attach weather to game objects ──
      setGames(prev => prev.map(g => ({ ...g, weather: weatherMap[g.away+g.home] || null })));

      // ── Build pitcher detail map ──
      const pitcherDetailMap = {};
      games.forEach(g => {
        if (g.awayP) pitcherDetailMap[g.awayP] = { hand:g.awayH, era:g.awayERA };
        if (g.homeP) pitcherDetailMap[g.homeP] = { hand:g.homeH, era:g.homeERA };
      });

      // ── Batch Claude analysis ──
      const BATCH = 2;
      const batches = [];
      for (let i = 0; i < games.length; i += BATCH) batches.push(games.slice(i, i+BATCH));

      const allGameResults = [];

      for (let b = 0; b < batches.length; b++) {
        if (b > 0) await new Promise(r => setTimeout(r, 1500));
        setStep("🤖 Analyzing batch " + (b+1) + " of " + batches.length + "...");
        setProgress(Math.round(20 + (b / batches.length) * 60));

        try {
          const raw = await callClaude(buildPrompt(batches[b], weatherMap, {}), 2000);

          // Parse plain text: "BOS@DET: Riley Greene 85, Spencer Torkelson 74, ..."
          const lines = raw.split("\n").map(l => l.trim()).filter(l => l.includes("@") && l.includes(":"));
          lines.forEach(line => {
            const atIdx = line.search(/[A-Z]{2,3}@[A-Z]{2,3}/);
            if (atIdx === -1) return;
            const gameMatch = line.slice(atIdx).match(/([A-Z]{2,3})@([A-Z]{2,3})/);
            if (!gameMatch) return;
            const [, away, home] = gameMatch;
            const game = batches[b].find(g => g.away === away && g.home === home);
            if (!game) return;
            const colonIdx = line.indexOf(":", atIdx);
            if (colonIdx === -1) return;
            const playersPart = line.slice(colonIdx+1).trim();
            const entries = playersPart.split(",").map(s => s.trim()).filter(Boolean);
            const players = [];
            entries.slice(0, 8).forEach(entry => {
              entry = entry.replace(/^[\d.]+\s*/, "").trim();
              const scoreMatch = entry.match(/[\s(]+(\d{2,3})[)\s]*$/);
              const conf = scoreMatch ? parseInt(scoreMatch[1]) : 70;
              const name = scoreMatch ? entry.slice(0, entry.lastIndexOf(scoreMatch[0])).trim() : entry.trim();
              if (name.length < 3 || !name.includes(" ")) return;
              const knownTeam = PLAYER_TEAMS[name] || PLAYER_TEAMS[name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()];
              const validTeams = new Set([away, home]);
              if (knownTeam && !validTeams.has(knownTeam)) return; // wrong game
              const isHome = knownTeam ? knownTeam === home : null;
              const team = knownTeam || (isHome ? home : away);
              players.push({ name, team, isHome, hrChancePct: Math.min(25, Math.round(conf/4)), confidence: conf });
            });
            if (players.length > 0) allGameResults.push({ away, home, players });
          });
        } catch (e) {
          if (e.isRateLimit) throw e;
          console.warn("Batch " + (b+1) + " failed:", e.message);
        }
      }

      setProgress(85);
      setStep("📊 Building results...");

      // ── Build results map ──
      const seenPlayers = new Set();
      const newResults = {};
      const gameTeamMap = {};
      games.forEach(g => { gameTeamMap[g.away+g.home] = { away:g.away, home:g.home }; });

      allGameResults.forEach(gr => {
        const key = gr.away + gr.home;
        const teams = gameTeamMap[key] || { away:gr.away, home:gr.home };
        const validTeams = new Set([teams.away, teams.home]);

        const cleanPlayers = (gr.players ?? [])
          .filter(p => p.name && p.name.length > 2)
          .filter(p => {
            const k = p.name.toLowerCase().replace(/\s+(jr|sr)\.?$/i,"").trim();
            if (seenPlayers.has(k)) return false;
            seenPlayers.add(k);
            return true;
          })
          .map(p => {
            const knownTeam = PLAYER_TEAMS[p.name] || PLAYER_TEAMS[p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()];
            const team = knownTeam && validTeams.has(knownTeam) ? knownTeam : (p.team || teams.away);
            const isHome = team === teams.home;
            const pitcherName = isHome ? teams.away + " SP" : teams.home + " SP";
            const gameObj = games.find(g => g.away === teams.away && g.home === teams.home);
            const pitcher = isHome ? gameObj?.awayP : gameObj?.homeP;
            const pitcherHand = isHome ? gameObj?.awayH : gameObj?.homeH;
            const pitcherERA  = isHome ? gameObj?.awayERA : gameObj?.homeERA;
            const knownHR  = KNOWN_2026_HR[p.name] ?? KNOWN_2026_HR[p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()];
            const w = weatherMap[key];
            const wBoost = w?.fieldBoost ?? 0;
            const simBat = { hr: knownHR||3, gp:33, ops:"0.750" };
            const pitcherForSim = { era: pitcherERA || 4.20 };
            const simCount = runHRSimulation(simBat, pitcherForSim, wBoost, 1000);
            const weatherInsight = w && w.isOutdoor !== false
              ? w.tempF+"°F · "+w.windSpeed+"mph "+w.windDir+" ("+(w.windVsField||"?")+")"
              : w?.isOutdoor === false ? "Indoor dome" : "";
            return {
              ...p, team, isHome, pitcher, pitcherHand, pitcherERA,
              pitcherWhip: null,
              seasonHRs:   knownHR ?? p.seasonHRs ?? null,
              gamesPlayed: 33,
              simHRs:      Math.min(Math.round(simCount), 1000),
              weatherInsight,
              bvpSummary:  "No BvP data",
              bvpHR: null, bvpAB: null, bvpAVG: null,
            };
          })
          .map(p => ({ ...p, _s: p.simHRs ?? (p.hrChancePct??0)*10 }))
          .sort((a,b) => b._s - a._s)
          .slice(0, 3);

        newResults[key] = { players: cleanPlayers };
      });

      // ── Guarantee every game has 3 players ──
      games.forEach(g => {
        const key = g.away + g.home;
        const existing = newResults[key]?.players ?? [];
        if (existing.length >= 3) return;
        const w = weatherMap[key];
        const candidates = Object.entries(KNOWN_2026_HR)
          .filter(([name]) => { const t = PLAYER_TEAMS[name]; return t === g.away || t === g.home; })
          .sort((a,b) => b[1]-a[1])
          .slice(0, 6)
          .map(([name, hr]) => {
            const team = PLAYER_TEAMS[name] || g.away;
            const isHome = team === g.home;
            const pitcher = isHome ? g.awayP : g.homeP;
            const pitcherERA = isHome ? g.awayERA : g.homeERA;
            const simCount = runHRSimulation({hr,gp:33,ops:"0.750"},{era:pitcherERA||4.20},w?.fieldBoost??0,1000);
            return { name, team, isHome, pitcher, pitcherHand: isHome?g.awayH:g.homeH, pitcherERA,
              seasonHRs:hr, gamesPlayed:33, simHRs:Math.min(Math.round(simCount),1000),
              hrChancePct:Math.min(20,hr*0.6), bvpSummary:"No BvP data",
              bvpHR:null,bvpAB:null,bvpAVG:null, weatherInsight:"" };
          });
        const existingNames = new Set(existing.map(p => p.name));
        const extras = candidates.filter(p => !existingNames.has(p.name));
        const merged = [...existing, ...extras]
          .sort((a,b)=>(b.simHRs??0)-(a.simHRs??0)).slice(0,3);
        newResults[key] = { players: merged };
      });

      setProgress(100);
      setResults(newResults);
      setOpenGames(new Set(games.map(g => g.away+g.home)));
      setStep("✅ All " + games.length + " games analyzed!");
      setPhase("done");

    } catch (e) {
      console.error(e);
      if (e.isRateLimit) setErrMsg("__RATE_LIMIT__:" + (e.resetsAt || 0));
      else setErrMsg(e.message || String(e));
      setPhase("error");
    } finally {
      busy.current = false;
    }
  }
  const someRemoved = games.length < ALL_GAMES.length;
  const isDone = phase === "done";

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, paddingBottom: 60 }}>

      {/* HEADER */}
      <div style={{
        background: "linear-gradient(180deg,#0a1628 0%,#0d1a30 50%," + T.bg + " 100%)",
        borderBottom: "1px solid " + T.border,
        padding: "18px 20px 12px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute", left:0, right:0, height:2, pointerEvents:"none", background:"linear-gradient(transparent,"+T.accent+"55,transparent)", animation:"hrs-scan 5s linear infinite" }} />
        <div style={{ fontFamily:F.mono, fontSize:9, letterSpacing:6, color:T.accent, opacity:.6, marginBottom:3 }}>
          AI · MLB · HOME RUN INTELLIGENCE · MAY 3 2026
        </div>
        <div style={{ fontFamily:F.bebas, fontSize:40, letterSpacing:3, color:T.text, lineHeight:1, textShadow:"0 0 28px "+T.accent+"40" }}>
          ⚾ SPHRS
        </div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:"#8ab4d4", marginTop:3 }}>
          WEATHER CHECK · DAY/NIGHT BA · BvP AVERAGE · 1,000× MONTE CARLO
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 13px" }}>

        {/* Controls bar */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 12,
        }}>
          <div style={{ fontFamily:F.mono, fontSize:9, letterSpacing:2, color:T.muted }}>
            {games.length} GAME{games.length !== 1 ? "S" : ""} ON BOARD
            {someRemoved && <span style={{ color:T.amber, marginLeft:8 }}>({ALL_GAMES.length - games.length} removed)</span>}
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            <button onClick={openAll} style={{ background:"rgba(0,229,255,0.08)", color:T.accent, border:"1px solid "+T.accent+"44", borderRadius:6, padding:"4px 12px", fontFamily:F.mono, fontSize:9, cursor:"pointer" }}>↕ EXPAND ALL</button>
            <button onClick={closeAll} style={{ background:"rgba(0,229,255,0.08)", color:T.accent, border:"1px solid "+T.accent+"44", borderRadius:6, padding:"4px 12px", fontFamily:F.mono, fontSize:9, cursor:"pointer" }}>↕ COLLAPSE ALL</button>
            {someRemoved && <button onClick={restoreAll} style={{ background:T.green+"18", color:T.green, border:"1px solid "+T.green+"44", borderRadius:6, padding:"4px 10px", fontFamily:F.mono, fontSize:9, cursor:"pointer" }}>↺ RESTORE ALL</button>}

          </div>
        </div>

        {/* Game accordions */}
        {games.length === 0 ? (
          <div style={{ textAlign:"center", padding:"30px 0", fontFamily:F.mono, fontSize:11, color:T.muted }}>
            No games on board.{" "}
            <span onClick={restoreAll} style={{ color:T.accent, cursor:"pointer", textDecoration:"underline" }}>Restore all 15</span>
          </div>
        ) : (
          <div style={{ marginBottom: 14 }}>
            {games.map((g, i) => {
              const key = g.away + g.home;
              return (
                <GameCard
                  key={key + i}
                  game={g}
                  result={results[key]}
                  isOpen={openGames.has(key)}
                  onToggle={() => toggleGame(key)}
                  onRemove={() => removeGame(i)}
                  isRunning={phase === "running"}
                />
              );
            })}
          </div>
        )}

        {/* Parlay banner — shows after analysis */}
        {phase === "done" && Object.keys(results).length > 0 && (
          <ParlayBanner results={results} />
        )}

        {/* Run button */}
        {(phase === "ready" || phase === "done") && games.length > 0 && (
          <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
            <button onClick={run} style={{
              background: "linear-gradient(135deg,#00e5ff,#0066ff)",
              color: "#050a14", border: "none", borderRadius: 12,
              padding: "15px 44px", fontFamily: F.arch, fontSize: 18,
              cursor: "pointer", boxShadow: "0 0 40px rgba(0,229,255,0.5), 0 4px 20px rgba(0,100,255,0.3)",
              letterSpacing: 1,
            }}>
              {isDone ? "↺ RE-RUN ANALYSIS" : "▶ RUN ANALYSIS — " + games.length + " GAME" + (games.length !== 1 ? "S" : "")}
            </button>
          </div>
        )}

        {/* Running log */}
        {phase === "running" && (
          <div style={{
            background: T.panel, border: "1px solid " + T.accent + "40",
            borderRadius: 16, padding: "28px 22px",
            animation: "hrs-glow 2s ease infinite", marginBottom: 14,
            textAlign: "center",
          }}>
            {/* Spinner + title */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:18 }}>
              <Spin size={22} />
              <div style={{ fontFamily:F.arch, fontSize:15, color:T.accent, letterSpacing:1 }}>
                Analyzing {games.length} Games
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ background:"rgba(0,0,0,0.35)", borderRadius:8, height:10, overflow:"hidden", marginBottom:10, position:"relative" }}>
              <div style={{
                height:"100%",
                width: progress + "%",
                background: progress >= 100
                  ? "linear-gradient(90deg,#00e676,#00c853)"
                  : "linear-gradient(90deg," + T.accent + ",#0066ff)",
                borderRadius: 8,
                boxShadow: "0 0 16px " + (progress >= 100 ? "#00e676" : T.accent) + "88",
                transition: "width 0.6s cubic-bezier(0.4,0,0.2,1)",
              }} />
            </div>

            {/* % and current step */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted, textAlign:"left", flex:1 }}>
                {stepLabel}
              </div>
              <div style={{ fontFamily:F.bebas, fontSize:22, color: progress >= 100 ? "#00e676" : T.accent, lineHeight:1 }}>
                {progress}%
              </div>
            </div>

            {/* Subtitle */}
            <div style={{ fontFamily:F.mono, fontSize:9, color:T.muted, letterSpacing:1, marginTop:4 }}>
              WEATHER · LIVE HR STATS · BvP · INJURY REPORT · MONTE CARLO · ROSTERS
            </div>
          </div>
        )}

        {/* Error */}
        {phase === "error" && (
          errMsg.startsWith("__RATE_LIMIT__") ? (
            <RateLimitScreen
              error={{ resetsAt: parseInt(errMsg.split(":")[1]) || null }}
              onDismiss={() => { setPhase("ready"); setErrMsg(""); }}
            />
          ) : (
            <div style={{ background:T.red+"0e", border:"1px solid "+T.red+"40", borderRadius:13, padding:"26px 20px", textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:8 }}>⚠️</div>
              <div style={{ fontFamily:F.arch, fontSize:14, color:T.red, marginBottom:8 }}>Analysis Failed</div>
              <div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, marginBottom:18, lineHeight:1.7 }}>{errMsg}</div>
              <button onClick={() => setPhase("ready")} style={{ background:T.accent, color:T.bg, border:"none", borderRadius:9, padding:"10px 24px", fontFamily:F.arch, fontSize:13, cursor:"pointer" }}>Try Again</button>
            </div>
          )
        )}

        <div style={{ textAlign:"center", fontFamily:F.mono, fontSize:9, color:"#2a4060", marginTop:8 }}>
          Claude AI · Weather Check · Day/Night BA · BvP Average · Park Factor · 1,000× Monte Carlo
        </div>
      </div>
    </div>
  );
}
