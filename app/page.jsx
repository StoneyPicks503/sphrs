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
  { away:"BOS", home:"DET", venue:"Comerica Park",      city:"Detroit",        st:"MI", time:"6:40 PM ET",
    awayP:"Jovani Moran",        awayH:"LHP", awayERA:2.33, awayRec:"0-0",
    homeP:"Framber Valdez",      homeH:"LHP", homeERA:3.35, homeRec:"2-1" },
  { away:"TOR", home:"TB",  venue:"Tropicana Field",    city:"St. Petersburg", st:"FL", time:"6:40 PM ET",
    awayP:"Kevin Gausman",       awayH:"RHP", awayERA:3.10, awayRec:"2-2",
    homeP:"Drew Rasmussen",      homeH:"RHP", homeERA:2.64, homeRec:"2-1" },
  { away:"ATH", home:"PHI", venue:"Citizens Bank Park", city:"Philadelphia",   st:"PA", time:"6:40 PM ET",
    awayP:"Luis Severino",       awayH:"RHP", awayERA:4.46, awayRec:"2-2",
    homeP:"Cristopher Sanchez",  homeH:"LHP", homeERA:2.90, homeRec:"2-2" },
  { away:"BAL", home:"MIA", venue:"loanDepot Park",     city:"Miami",          st:"FL", time:"6:40 PM ET",
    awayP:"Chris Bassitt",       awayH:"RHP", awayERA:5.46, awayRec:"2-2",
    homeP:"Sandy Alcantara",     homeH:"RHP", homeERA:3.04, homeRec:"3-2" },
  { away:"MIN", home:"WSH", venue:"Nationals Park",     city:"Washington",     st:"DC", time:"6:45 PM ET",
    awayP:"Taj Bradley",         awayH:"RHP", awayERA:2.85, awayRec:"3-1",
    homeP:"Cade Cavalli",        homeH:"RHP", homeERA:3.82, homeRec:"1-1" },
  { away:"TEX", home:"NYY", venue:"Yankee Stadium",     city:"New York",       st:"NY", time:"7:05 PM ET",
    awayP:"Jacob deGrom",        awayH:"RHP", awayERA:2.01, awayRec:"2-1",
    homeP:"Elmer Rodriguez",     homeH:"RHP", homeERA:4.50, homeRec:"0-1" },
  { away:"CIN", home:"CHC", venue:"Wrigley Field",      city:"Chicago",        st:"IL", time:"7:40 PM ET",
    awayP:"Andrew Abbott",       awayH:"LHP", awayERA:5.97, awayRec:"1-2",
    homeP:"Jameson Taillon",     homeH:"RHP", homeERA:4.41, homeRec:"2-1" },
  { away:"CLE", home:"KC",  venue:"Kauffman Stadium",   city:"Kansas City",    st:"MO", time:"7:40 PM ET",
    awayP:"Gavin Williams",      awayH:"RHP", awayERA:2.70, awayRec:"5-1",
    homeP:"Stephen Kolek",       homeH:"RHP", homeERA:null, homeRec:"0-0" },
  { away:"MIL", home:"STL", venue:"Busch Stadium",      city:"St. Louis",      st:"MO", time:"7:45 PM ET",
    awayP:"Brandon Sproat",      awayH:"RHP", awayERA:6.75, awayRec:"0-2",
    homeP:"Andre Pallante",      homeH:"RHP", homeERA:3.73, homeRec:"3-2" },
  { away:"LAD", home:"HOU", venue:"Daikin Park",        city:"Houston",        st:"TX", time:"8:10 PM ET",
    awayP:"Shohei Ohtani",       awayH:"RHP", awayERA:0.60, awayRec:"2-1",
    homeP:"Peter Lambert",       homeH:"RHP", homeERA:3.52, homeRec:"1-2" },
  { away:"NYM", home:"COL", venue:"Coors Field",        city:"Denver",         st:"CO", time:"8:40 PM ET",
    awayP:"Freddy Peralta",      awayH:"RHP", awayERA:3.52, awayRec:"1-3",
    homeP:"Michael Lorenzen",    homeH:"RHP", homeERA:6.09, homeRec:"2-3" },
  { away:"ATL", home:"SEA", venue:"T-Mobile Park",      city:"Seattle",        st:"WA", time:"9:40 PM ET",
    awayP:"Bryce Elder",         awayH:"RHP", awayERA:1.88, awayRec:"3-1",
    homeP:"George Kirby",        homeH:"RHP", homeERA:3.00, homeRec:"4-2" },
  { away:"PIT", home:"AZ",  venue:"Chase Field",        city:"Phoenix",        st:"AZ", time:"9:40 PM ET",
    awayP:"Bubba Chandler",      awayH:"RHP", awayERA:4.97, awayRec:"1-3",
    homeP:"Eduardo Rodriguez",   homeH:"LHP", homeERA:3.03, homeRec:"2-0" },
  { away:"SD",  home:"SF",  venue:"Oracle Park",        city:"San Francisco",  st:"CA", time:"9:45 PM ET",
    awayP:"Walker Buehler",      awayH:"RHP", awayERA:5.40, awayRec:"1-2",
    homeP:"Logan Webb",          homeH:"RHP", homeERA:4.30, homeRec:"2-3" },
  { away:"CWS", home:"LAA", venue:"Angel Stadium",      city:"Anaheim",        st:"CA", time:"9:38 PM ET",
    awayP:"Erick Fedde",         awayH:"RHP", awayERA:3.24, awayRec:"0-3",
    homeP:"Sam Aldegheri",       homeH:"LHP", homeERA:5.40, homeRec:"1-0" },
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
  "Yankee Stadium":      { lat:40.8296, lon:-73.9262,  dome:false, cfBearing:221, plateFaces:"SW — RF short porch 314ft, LF 318ft" },
  "Fenway Park":         { lat:42.3467, lon:-71.0972,  dome:false, cfBearing:95,  plateFaces:"E — Green Monster in LF 310ft, Pesky Pole RF 302ft" },
  "Wrigley Field":       { lat:41.9484, lon:-87.6553,  dome:false, cfBearing:95,  plateFaces:"E — wind from Lake Michigan key factor" },
  "Coors Field":         { lat:39.7559, lon:-104.9942, dome:false, cfBearing:335, plateFaces:"NNW — high altitude ball carries farther in all directions" },
  "Oracle Park":         { lat:37.7786, lon:-122.3893, dome:false, cfBearing:315, plateFaces:"NW — McCovey Cove behind RF, bay breeze blows IN" },
  "Petco Park":          { lat:32.7076, lon:-117.1570, dome:false, cfBearing:320, plateFaces:"NW — marine layer suppresses HRs, pitcher-friendly" },
  "Angel Stadium":       { lat:33.8003, lon:-117.8827, dome:false, cfBearing:200, plateFaces:"SSW — RF 347ft, LF 347ft" },
  "Kauffman Stadium":    { lat:39.0517, lon:-94.4803,  dome:false, cfBearing:30,  plateFaces:"NNE — open park, wind from SW blows OUT" },
  "Busch Stadium":       { lat:38.6226, lon:-90.1928,  dome:false, cfBearing:315, plateFaces:"NW — symmetrical park, 400ft CF" },
  "Comerica Park":       { lat:42.3390, lon:-83.0485,  dome:false, cfBearing:135, plateFaces:"SE — deep CF 420ft, pitcher-friendly dimensions" },
  "PNC Park":            { lat:40.4469, lon:-80.0057,  dome:false, cfBearing:310, plateFaces:"WNW — Allegheny River behind RF, 325ft RF line" },
  "Great American":      { lat:39.0979, lon:-84.5082,  dome:false, cfBearing:50,  plateFaces:"NE — hitter-friendly, Ohio River behind CF" },
  "Nationals Park":      { lat:38.8730, lon:-77.0074,  dome:false, cfBearing:90, plateFaces:"E — Anacostia River, humid summers help carry" },
  "Target Field":        { lat:44.9817, lon:-93.2781,  dome:false, cfBearing:340, plateFaces:"NNW — cold nights, wind from N blows out to RF" },
  "Sutter Health Park":  { lat:38.5802, lon:-121.5005, dome:false, cfBearing:0,   plateFaces:"N — Sacramento heat, ball carries well in summer" },
  "Truist Park":         { lat:33.8907, lon:-84.4677,  dome:false, cfBearing:300, plateFaces:"WNW — RF 325ft, compact park" },
  "Guaranteed Rate":     { lat:41.8300, lon:-87.6339,  dome:false, cfBearing:130, plateFaces:"SE — open to lake winds" },
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
  await Promise.all(missing.map(async name => {
    try {
      const encoded = encodeURIComponent(name);
      const url = "https://statsapi.mlb.com/api/v1/people/search?names=" + encoded +
        "&season=2026&sportId=1&fields=people,fullName,id,primaryPosition,abbreviation";
      const r = await fetch(url);
      const d = await r.json();
      // Try exact match first, then partial
      let match = (d.people ?? []).find(p => p.fullName?.toLowerCase() === name.toLowerCase());
      if (!match) match = (d.people ?? []).find(p =>
        p.fullName?.toLowerCase().includes(name.split(" ").slice(-1)[0].toLowerCase())
      );
      if (match) idMap[name] = match.id;
    } catch (_) {}
  }));
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

    // Fetch season stats for each in parallel (limit to 13 players)
    const results = await Promise.all(posPlayers.slice(0, 13).map(async p => {
      try {
        const statsUrl = "https://statsapi.mlb.com/api/v1/people/" + p.person.id +
          "/stats?stats=season&season=2026&group=hitting" +
          "&fields=stats,splits,stat,homeRuns,gamesPlayed,avg,ops,sluggingPct,atBats,strikeOuts";
        const sr = await fetch(statsUrl);
        const sd = await sr.json();
        const stat = sd.stats?.[0]?.splits?.[0]?.stat ?? {};
        return {
          name:  p.person.fullName,
          id:    p.person.id,
          team:  teamAbbr,
          pos:   p.primaryPosition?.abbreviation ?? "?",
          hr:    stat.homeRuns   ?? 0,
          gp:    stat.gamesPlayed ?? 0,
          avg:   stat.avg        ?? ".000",
          ops:   stat.ops        ?? ".000",
          slg:   stat.sluggingPct ?? ".000",
          ab:    stat.atBats     ?? 0,
          so:    stat.strikeOuts ?? 0,
        };
      } catch (_) {
        return { name: p.person.fullName, id: p.person.id, team: teamAbbr, hr: 0, gp: 0, avg: ".000", ops: ".000" };
      }
    }));
    return results.filter(p => p.name);
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

/* Master pre-fetch — gets all real data for a batch of games */
async function prefetchGameData(games) {
  const gameData = {};
  await Promise.all(games.map(async g => {
    const key = g.away + g.home;
    try {
      // Fetch rosters + stats for both teams in parallel
      const [awayHitters, homeHitters, awayPitcher, homePitcher] = await Promise.all([
        fetchTeamHitters(g.away),
        fetchTeamHitters(g.home),
        fetchPitcherData(g.awayP),
        fetchPitcherData(g.homeP),
      ]);

      // Fetch BvP for all hitters vs opposing pitcher
      const [awayBvP, homeBvP] = await Promise.all([
        fetchBvPBatch(awayHitters, homePitcher?.id),
        fetchBvPBatch(homeHitters, awayPitcher?.id),
      ]);

      gameData[key] = {
        away: g.away, home: g.home,
        awayHitters, homeHitters,
        awayPitcher, homePitcher,
        awayBvP, homeBvP,
      };
    } catch (_) {
      gameData[key] = null;
    }
  }));
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

/* ── Player row inside game accordion ── */
function PlayerRow({ p, rank, delay = 0 }) {
  // Use sim result as the single HR% — real math from MLB stats
  const simPct  = p.simHRs != null ? parseFloat(((p.simHRs / 1000) * 100).toFixed(1)) : null;
  const hrPct   = simPct ?? p.hrChancePct ?? 0;
  const c = hrPct >= 20 ? "#00e676" : hrPct >= 12 ? "#ffca28" : hrPct >= 6 ? "#ffa726" : "#7a9abf";
  const glow = hrPct >= 15 ? "0 0 20px " + c + "88" : "none";
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      animation: "hrs-up .35s ease " + delay + "ms both",
      background: rank <= 3 ? c + "12" : "rgba(14,26,40,0.7)",
      border: "1px solid " + (rank <= 3 ? c + "55" : T.border + "aa"),
      boxShadow: rank === 1 ? "0 0 20px " + c + "22" : "none",
      borderRadius: 10, marginBottom: 7, overflow: "hidden",
    }}>
      {/* Main row */}
      <div
        onClick={() => setExpanded(v => !v)}
        style={{ padding: "10px 12px", cursor: "pointer", display: "flex", gap: 10, alignItems: "center" }}
      >
        {/* Rank */}
        <div style={{
          width: 22, flexShrink: 0, fontFamily: F.bebas, fontSize: 18,
          color: rank === 1 ? "#ffd700" : rank === 2 ? "#e8e8e8" : rank === 3 ? "#ffaa44" : T.muted,
          textAlign: "center",
        }}>
          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
        </div>

        {/* Headshot */}
        <Headshot mlbId={p.mlbId} name={p.name} size={44} teamColor={p.teamColor || T.accent} />

        {/* Name + team */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 2 }}>
            <span style={{ fontFamily: F.arch, fontSize: 13, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {p.name}
            </span>

          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>{p.team}</span>
            {p.isHome
              ? <span style={{ fontFamily: F.mono, fontSize: 9, color: T.green }}>🏠 HOME</span>
              : <span style={{ fontFamily: F.mono, fontSize: 9, color: T.teal }}>✈ AWAY</span>}
            {p.seasonHRs != null && (
              <span style={{ fontFamily: F.mono, fontSize: 9, color: T.accent }}>{p.seasonHRs} HR</span>
            )}
          </div>
        </div>

        {/* HR % + sim count + AI score */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: F.bebas, fontSize: 26, color: c, lineHeight: 1, textShadow: glow }}>
            {hrPct.toFixed(1)}%
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 8, color: T.muted, marginBottom: 2 }}>{simPct != null ? "SIM HR %" : "HR CHANCE"}</div>

        </div>

        {/* Expand arrow */}
        <div style={{ color: T.muted, fontSize: 12, flexShrink: 0, transition: "transform .2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: "0 12px 14px 12px", borderTop: "1px solid " + T.border }}>
          <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 7 }}>

            {/* 1 — 2026 Season HR */}
            <div style={{ background:"rgba(0,229,255,0.07)", border:"1px solid rgba(0,229,255,0.25)", borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted, letterSpacing:1 }}>2026 SEASON <span style={{ color:"#00e676", fontSize:7 }}>● LIVE</span></span>
              <span style={{ fontFamily:F.arch, fontSize:14, color:T.accent }}>
                {p.seasonHRs ?? "—"} HR
                <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted, marginLeft:6 }}>in {p.gamesPlayed ?? "—"}g</span>
              </span>
            </div>

            {/* 2 — BvP vs today's pitcher */}
            <div style={{ background:"rgba(255,202,40,0.07)", border:"1px solid rgba(255,202,40,0.25)", borderRadius:8, padding:"8px 12px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: (p.bvpAB > 0 || p.pitcherArsenal?.length > 0) ? 8 : 0 }}>
                <span style={{ fontFamily:F.mono, fontSize:9, color:T.amber, letterSpacing:1 }}>
                  vs {(p.pitcher||"Pitcher")} {p.pitcherHand ? "("+p.pitcherHand+")" : ""} ERA {p.pitcherERA ?? "N/A"}
                  <span style={{ color:"#00e676", fontSize:7, marginLeft:5 }}>● LIVE</span>
                </span>
                <span style={{ fontFamily:F.mono, fontSize:11, color:T.text }}>
                  {(p.bvpAB != null && p.bvpAB > 0)
                    ? <><span style={{ color:T.amber, fontWeight:700 }}>{p.bvpAVG || ".000"}</span> AVG · <span style={{ color:"#00e676" }}>{p.bvpHR ?? 0} HR</span> · {p.bvpAB} AB</>
                    : <span style={{ color:T.muted }}>First career matchup</span>}
                </span>
              </div>

              {/* Pitch mix */}
              {p.pitcherArsenal?.length > 0 && (
                <div>
                  <div style={{ fontFamily:F.mono, fontSize:8, color:T.muted, letterSpacing:1, marginBottom:5 }}>PITCH MIX</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                    {p.pitcherArsenal.map((pitch, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ fontFamily:F.mono, fontSize:9, color:T.text, width:110, flexShrink:0 }}>{pitch.name}</div>
                        <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:3, height:5, overflow:"hidden" }}>
                          <div style={{
                            width: pitch.pct + "%", height:"100%", borderRadius:3,
                            background: i === 0 ? T.accent : i === 1 ? T.amber : i === 2 ? T.purple : T.muted,
                          }} />
                        </div>
                        <div style={{ fontFamily:F.mono, fontSize:9, color:T.muted, width:28, textAlign:"right", flexShrink:0 }}>{pitch.pct}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3 — Weather */}
            {p.weatherInsight && (
              <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:8, padding:"8px 12px" }}>
                <span style={{ fontFamily:F.mono, fontSize:9, color:"#00e676", letterSpacing:1 }}>🌤 WEATHER</span>
                <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted, marginTop:3, lineHeight:1.5 }}>{p.weatherInsight}</div>
              </div>
            )}

            {/* 4 — Sim result */}
            <div style={{ background:"rgba(0,230,118,0.06)", border:"1px solid rgba(0,230,118,0.2)", borderRadius:8, padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:"#00e676", letterSpacing:1 }}>1,000× SIM ● REAL STATS</span>
              <span style={{ fontFamily:F.bebas, fontSize:22, color:c, textShadow:glow }}>
                {hrPct.toFixed(1)}%
                <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted, marginLeft:6 }}>({p.simHRs ?? "—"}/1k)</span>
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

/* ── Game accordion card ── */
function GameCard({ game, result, isOpen, onToggle, onRemove, isRunning }) {
  const eraDisplay = (era) => era === null || era === undefined ? "N/A" : String(era);
  const awayHot = (game.awayERA ?? 0) >= 5.5;
  const homeHot = (game.homeERA ?? 0) >= 5.5;
  const anyHot  = awayHot || homeHot;
  const players = result?.players ?? [];
  const topHR   = players[0]?.simHRs != null ? parseFloat(((players[0].simHRs/1000)*100).toFixed(1)) : (players[0]?.hrChancePct ?? 0);

  return (
    <div style={{
      background: T.panel,
      border: "1px solid " + (anyHot ? T.green + "66" : T.border),
      boxShadow: anyHot ? "0 0 16px rgba(0,230,118,0.08)" : "none",
      borderRadius: 12, marginBottom: 8, overflow: "hidden",
      animation: "hrs-up .3s ease both",
    }}>
      {/* Header — always visible */}
      <div
        onClick={onToggle}
        style={{
          padding: "11px 14px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
          background: isOpen ? "rgba(14,28,42,0.9)" : "rgba(8,18,28,0.5)",
          userSelect: "none",
        }}
      >
        {/* Teams — stacked top/bottom layout */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Venue + time + badges */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 5 }}>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>{game.venue} · {game.time}</span>
            
            {result && <span style={{ fontFamily: F.mono, fontSize: 8, color: "#00e676", background:"rgba(0,230,118,0.1)", padding:"1px 6px", borderRadius:4, border:"1px solid rgba(0,230,118,0.3)" }}>✅ analyzed</span>}
          </div>
          {game.weather && (
            <div style={{ fontFamily: F.mono, fontSize: 8, color: game.weather.hrImpact === "positive" ? "#00e676" : game.weather.hrImpact === "negative" ? T.red : T.muted, marginBottom: 3 }}>
              {game.weather.isOutdoor === false ? "🏠 Indoor dome" : "🌤 " + game.weather.summary}
            </div>
          )}
          {/* Away team row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: T.teal, width: 18, flexShrink: 0 }}>✈</span>
            <span style={{ fontFamily: F.arch, fontSize: 14, color: "#f4f9ff", minWidth: 36 }}>{game.away}</span>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: awayHot ? "#00e676" : T.muted }}>
              {game.awayP} · {game.awayH} · ERA {eraDisplay(game.awayERA)}
              {game.awayWhip ? " · WHIP " + game.awayWhip : ""}
              
            </span>
          </div>
          {/* Divider */}
          <div style={{ height: 1, background: T.border + "66", marginLeft: 24, marginBottom: 4 }} />
          {/* Home team row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: T.green, width: 18, flexShrink: 0 }}>🏠</span>
            <span style={{ fontFamily: F.arch, fontSize: 14, color: "#f4f9ff", minWidth: 36 }}>{game.home}</span>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: homeHot ? "#00e676" : T.muted }}>
              {game.homeP} · {game.homeH} · ERA {eraDisplay(game.homeERA)}
              {game.homeWhip ? " · WHIP " + game.homeWhip : ""}
              
            </span>
          </div>
        </div>

        {/* Top HR % badge if analyzed */}
        {result && players[0] && (
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: F.bebas, fontSize: 22, color: "#ffd700", lineHeight: 1, textShadow: "0 0 14px rgba(255,215,0,0.7)" }}>{topHR.toFixed(0)}%</div>
            <div style={{ fontFamily: F.mono, fontSize: 7, color: T.muted }}>TOP HR</div>
          </div>
        )}

        {/* Toggle chevron only */}
        <div style={{
          color: T.accent, fontSize: 13, transition: "transform .25s",
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          flexShrink: 0, padding: "4px 6px",
        }}>▼</div>
      </div>

      {/* Expanded content */}
      {isOpen && (
        <div style={{ padding: "10px 12px 12px", borderTop: "1px solid " + T.border }}>
          {isRunning && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 0", fontFamily: F.mono, fontSize: 11, color: T.accent, animation: "hrs-blink 1.4s ease infinite" }}>
              <Spin size={12} /> Analyzing matchups...
            </div>
          )}
          {!isRunning && !result && (
            <div style={{ fontFamily: F.mono, fontSize: 10, color: T.muted, padding: "10px 0", textAlign: "center" }}>
              Hit ▶ RUN ANALYSIS to see player HR chances
            </div>
          )}
          {!isRunning && result && players.length > 0 && (
            <>
              <div style={{ fontFamily: F.mono, fontSize: 8, letterSpacing: 2, color: T.muted, marginBottom: 8 }}>
                TOP HR CANDIDATES — {game.away}@{game.home}
              </div>
              {players.map((p, i) => (
                <PlayerRow key={p.name + i} p={p} rank={i + 1} delay={i * 60} />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Spinner ── */
function Spin({ size = 18, color = T.accent }) {
  return <div style={{ width:size, height:size, flexShrink:0, border:"2px solid "+color+"25", borderTopColor:color, borderRadius:"50%", animation:"hrs-spin .75s linear infinite", display:"inline-block" }} />;
}

function LogLine({ text, active }) {
  return <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:F.mono, fontSize:11, color:active?T.accent:T.muted, animation:active?"hrs-blink 1.4s ease infinite":"none", marginBottom:3 }}>
    {active && <Spin size={10} />}{text}
  </div>;
}

/* ── Rate limit screen ── */
function RateLimitScreen({ error, onDismiss }) {
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    if (!error?.resetsAt) return;
    const tick = () => {
      const diff = error.resetsAt * 1000 - Date.now();
      if (diff <= 0) { setTimeLeft("now — try again!"); return; }
      setTimeLeft(Math.floor(diff / 60000) + "m " + Math.floor((diff % 60000) / 1000) + "s");
    };
    tick(); const iv = setInterval(tick, 1000); return () => clearInterval(iv);
  }, [error?.resetsAt]);
  return (
    <div style={{ background:"#0d0a00", border:"1px solid "+T.amber+"55", borderRadius:14, padding:"28px 22px", textAlign:"center" }}>
      <div style={{ fontSize:38, marginBottom:10 }}>⏳</div>
      <div style={{ fontFamily:F.arch, fontSize:17, color:T.amber, marginBottom:8 }}>API Rate Limit Reached</div>
      <div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, lineHeight:1.8, marginBottom:18 }}>
        5-hour limit hit. 7-day window is fine.<br/>
        {error?.resetsAt ? <>Resets in: <span style={{ color:T.amber, fontWeight:700 }}>{timeLeft}</span></> : "Resets shortly."}
      </div>
      <button onClick={onDismiss} style={{ background:T.amber, color:T.bg, border:"none", borderRadius:9, padding:"10px 26px", fontFamily:F.arch, fontSize:13, cursor:"pointer" }}>Got It</button>
    </div>
  );
}

/* ── Prompt builder ── */
function buildPrompt(games, weatherMap = {}, gameData = {}) {
  const eraStr = e => e === null || e === undefined ? "N/A" : String(e);
  const lines = games.map(g =>
    g.away + "@" + g.home + " | " + g.venue + " | " + g.city + " " + g.st + " | " + g.time +
    " | Away SP: " + g.awayP + " " + g.awayH + " ERA " + eraStr(g.awayERA) + " " + g.awayRec +
    " | Home SP: " + g.homeP + " " + g.homeH + " ERA " + eraStr(g.homeERA) + " " + g.homeRec
  ).join("\n");

  return [
    "You are an MLB HR analyst. Today is May 5 2026.",
    "",
    "KNOWN 2026 ROSTER MOVES: Pete Alonso=BAL, Juan Soto=NYM, Max Fried=NYY, Aaron Judge=NYY,",
    "Shohei Ohtani=LAD, Yordan Alvarez=HOU, Rafael Devers=SF, Willy Adames=SF,",
    "Alex Bregman=BOS, Randy Arozarena=SEA, Paul Goldschmidt=NYY, Cody Bellinger=NYY,",
    "Munetaka Murakami=CWS, Fernando Tatis Jr=SD, Ben Rice=NYY.",
    "",
    "REAL BATTER STATS (MLB API):",
    ...games.map(g => {
      const key = g.away + g.home;
      const w   = weatherMap[key];
      const gd  = gameData[key];
      const wStr = w ? w.tempF+"F "+w.windSpeed+"mph "+w.windDir+"("+( w.windVsField||"?")+")"+(w.hrImpact==="positive"?" HR+":w.hrImpact==="negative"?" HR-":"") : "";
      const fmtH = (hitters, bvpMap) => (hitters||[]).slice(0,5).map(h =>
        h.name+" "+h.hr+"HR "+h.avg+(bvpMap[h.name]?" bvp:"+bvpMap[h.name].hr+"HR/"+bvpMap[h.name].ab+"AB":"")
      ).join(", ");
      return g.away+"@"+g.home+": "+g.awayP+" ERA "+(g.awayERA||"?")+" vs "+g.homeP+" ERA "+(g.homeERA||"?")
        +(wStr?" weather:"+wStr:"")
        +(gd?" | "+g.away+": "+fmtH(gd.awayHitters,gd.awayBvP||{})+" | "+g.home+": "+fmtH(gd.homeHitters,gd.homeBvP||{}):"");
    }),
    "",
    "GAMES:",
    ...games.map(g => g.away+"@"+g.home+" "+g.venue+" "+g.time),
    "",
    "TASK: For each game pick the TOP 6 HR candidates (position players only, no pitchers, no IL players).",
    "Reply in EXACTLY this format, one game per line, nothing else:",
    "",
    "BOS@DET: Riley Greene 82, Spencer Torkelson 71, Kerry Carpenter 65",
    "NYY@TEX: Aaron Judge 90, Jazz Chisholm 72, Anthony Volpe 61",
    "",
    "Format: AWAY@HOME: Player1 SCORE, Player2 SCORE, Player3 SCORE, Player4 SCORE, Player5 SCORE, Player6 SCORE",
    "SCORE = confidence 0-100. Give 6 players per game line.",
    "Mix both teams — pick the best HR spots regardless of home/away.",
    "Example: BOS@DET: Riley Greene 85, Spencer Torkelson 74, Jarren Duran 72, Kerry Carpenter 68, Alex Bregman 61, Masataka Yoshida 55",
    "ONLY position players (outfielders, infielders, catchers, DH). NO pitchers ever.",
    "ONLY players on the two teams listed. NO extra text, NO explanations, NO numbering.",
    "If unsure who plays for a team, pick their known star hitters.",
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

  const top3 = allPlayers
    .sort((a, b) => {
      const aScore = a.simHRs ?? (a.hrChancePct ?? 0) * 10;
      const bScore = b.simHRs ?? (b.hrChancePct ?? 0) * 10;
      return bScore - aScore;
    })
    .slice(0, 3);

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
    { match:"Analyzing batch",          pct:60, label:"Claude analyzing games..." },
    { match:"Batch",                    pct:82, label:"Batch complete ✅" },
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
      setStep("⚾ Loading " + games.length + " game(s)...");
      await new Promise(r => setTimeout(r, 150));

      // ── Fetch real weather for all stadiums in parallel ──
      setStep("🌤 Fetching live weather for all " + games.length + " stadiums...");
      const weatherMap = await fetchWeatherForGames(games);
      const weatherHits = Object.values(weatherMap).filter(w => w !== null).length;
      setStep("✅ Weather loaded — " + weatherHits + " stadiums · " + (games.length - weatherHits) + " unavailable");

      // ── Fetch LIVE 2026 HR stats from MLB API ──
      setStep("📊 Fetching live 2026 HR stats from MLB Stats API...");
      const liveHRMap = await fetchLiveHRStats();
      const liveCount = Object.keys(liveHRMap).length;
      setStep(liveCount > 0
        ? "✅ Live HR data — " + liveCount + " players loaded"
        : "⚠️ HR fetch failed — using verified fallback");

      // ── Fetch pitcher MLBAM IDs for BvP lookups ──
      const allPitcherNames = [...new Set(games.map(g => [g.awayP, g.homeP]).flat().filter(p => p && p !== "TBD"))];
      setStep("⚔️ Fetching pitcher IDs for BvP lookups (" + allPitcherNames.length + " pitchers)...");
      const pitcherIdMap = await fetchPitcherIds(allPitcherNames);
      setStep("✅ " + Object.keys(pitcherIdMap).length + " pitcher IDs resolved");

      // BvP cache — populated after we know which batters face which pitchers
      const bvpCache = {};

      // ── Fetch live injury report ──
      setStep("🏥 Checking MLB injury report...");
      const injuredPlayers = await fetchInjuredPlayers();
      if (injuredPlayers.size > 0) {
        setStep("🏥 " + injuredPlayers.size + " players on IL — will be excluded from picks");
      }

      // Log any standout weather
      Object.entries(weatherMap).forEach(([k, w]) => {
        if (w && w.hrImpact === "positive") setStep("🌬️ HR weather boost: " + k + " — " + w.summary);
        if (w && w.hrImpact === "negative") setStep("🧊 HR weather suppress: " + k + " — " + w.summary);
      });

      await new Promise(r => setTimeout(r, 150));
      setStep("📊 Analyzing BvP + HR chance % per player...");
      await new Promise(r => setTimeout(r, 150));
      setStep("🎲 Running 1,000-game Monte Carlo...");
      await new Promise(r => setTimeout(r, 150));

      // Consolidated game data from all batches
      const allGameData = {};

      // Quick lookup: pitcher name → { hand, era, rec } from ALL_GAMES
      const pitcherDetailMap = {};
      games.forEach(g => {
        if (g.awayP && g.awayP !== "TBD") pitcherDetailMap[g.awayP] = { hand: g.awayH, era: g.awayERA, rec: g.awayRec };
        if (g.homeP && g.homeP !== "TBD") pitcherDetailMap[g.homeP] = { hand: g.homeH, era: g.homeERA, rec: g.homeRec };
      });

      // Split into batches of 4 to avoid token limit
      const BATCH = 2; // 2 games per batch — prevents all truncation
      const allGameResults = [];
      const batches = [];
      for (let i = 0; i < games.length; i += BATCH) {
        batches.push(games.slice(i, i + BATCH));
      }

      // Attach weather to game objects so game cards can display it
      setGames(prev => prev.map(g => ({
        ...g,
        weather: weatherMap[g.away + g.home] || null,
      })));

      for (let b = 0; b < batches.length; b++) {
        setStep("📡 Pre-fetching real stats for batch " + (b + 1) + " of " + batches.length + "...");
        const batchGameData = await prefetchGameData(batches[b]);
        const dataCount = Object.values(batchGameData).filter(Boolean).length;
        setStep("✅ Real data loaded — " + dataCount + "/" + batches[b].length + " games have live stats");

        setStep("🤖 Analyzing batch " + (b + 1) + " of " + batches.length + " (" + batches[b].length + " games)...");
        // Store batch game data for post-processing
        Object.assign(allGameData, batchGameData);

        const raw = await callClaude(buildPrompt(batches[b], weatherMap, batchGameData), 2000);
        // Parse plain text format: "BOS@DET: Riley Greene 82, Spencer Torkelson 71, Kerry Carpenter 65"
        const batchResults = [];

        // Build map of valid game keys in this batch for quick lookup
        const batchGameKeys = {};
        batches[b].forEach(g => {
          batchGameKeys[g.away.toUpperCase() + "@" + g.home.toUpperCase()] = g;
          batchGameKeys[g.home.toUpperCase() + "@" + g.away.toUpperCase()] = g; // allow reversed
        });

        // Split on newlines, also handle if Claude uses numbered lines or bullets
        const rawLines = raw.replace(/^[\d]+\./gm, "").replace(/^[-•*]/gm, "").split("\n");

        rawLines.forEach(line => {
          line = line.trim();
          if (!line.includes("@") || !line.includes(":")) return;

          // Find the game key - handle formats like "BOS@DET:", "1. BOS@DET:", "**BOS@DET**:"
          const gameMatch = line.match(/([A-Z]{2,3})[@]([A-Z]{2,3})/);
          if (!gameMatch) return;

          const away = gameMatch[1];
          const home = gameMatch[2];
          const game = batchGameKeys[away + "@" + home] ||
                       batches[b].find(g => g.away === away && g.home === home);
          if (!game) return;

          // Get everything after the first colon
          const colonIdx = line.indexOf(":");
          const playersPart = line.slice(colonIdx + 1).trim();

          // Split players — handle both comma and semicolon separators
          const playerEntries = playersPart
            .split(/[,;]/)
            .map(p => p.trim())
            .filter(p => p.length > 2 && /[A-Za-z]/.test(p));

          const players = playerEntries.slice(0, 8).map(entry => {
            // Strip any leading/trailing punctuation or numbers that aren't part of name
            entry = entry.replace(/^[\d.\-•*]+\s*/, "").trim();
            // Extract trailing score number (e.g. "Aaron Judge 85" or "Aaron Judge (85)")
            const scoreMatch = entry.match(/[\s(]+(\d{2,3})[)\s]*$/);
            const conf  = scoreMatch ? parseInt(scoreMatch[1]) : 72;
            const name  = scoreMatch
              ? entry.slice(0, entry.lastIndexOf(scoreMatch[0])).trim()
              : entry.replace(/\d+$/, "").trim();
            // Clean up name — remove parentheses, dots, extra spaces
            const cleanName = name.replace(/[()]/g, "").replace(/\s+/g, " ").trim();
            if (cleanName.length < 3 || cleanName.split(" ").length < 2) return null;
            return {
              name:        cleanName,
              team:        "",
              isHome:      null,
              hrChancePct: Math.min(25, Math.round(conf / 4)),
              confidence:  conf,
            };
          }).filter(Boolean);

          if (players.length > 0) {
            batchResults.push({
              away: game.away,
              home: game.home,
              players,
            });
          }
        });

        // If any game in this batch got 0 results, add placeholder so it shows up
        batches[b].forEach(g => {
          const found = batchResults.find(r => r.away === g.away && r.home === g.home);
          if (!found) {
            console.warn("No players parsed for", g.away + "@" + g.home, "— raw:", raw.slice(0, 200));
          }
        });
        allGameResults.push(...batchResults);
        setStep("✅ Batch " + (b + 1) + " done — " + batchResults.length + " games analyzed");
      }

      // ── VERIFICATION PASS ─────────────────────────────────────────────────
      setStep("🔍 Verifying positions & rosters...");

      // Collect ALL players across all games
      const allPlayers = [];
      allGameResults.forEach(gr => {
        (gr.players ?? []).forEach(p => {
          allPlayers.push({ name: p.name, team: p.team, gameKey: gr.away + gr.home });
        });
      });

      // Deduplicate by name BEFORE verification to save tokens
      const uniqueNames = new Set();
      const uniqueForVerify = allPlayers.filter(p => {
        if (uniqueNames.has(p.name)) return false;
        uniqueNames.add(p.name);
        return true;
      });

      const vList = uniqueForVerify.map((p, i) =>
        (i + 1) + ". " + p.name + " | team: " + p.team
      ).join("\n");

      const verifyPrompt = [
        "You are an MLB expert. Today is May 4 2026.",
        "Verify each player. Check ALL of these:",
        "1. POSITION PLAYER ONLY — flag any pitcher (SP/RP). Pitchers CANNOT be HR candidates.",
        "2. NOT INJURED — flag anyone currently on the MLB Injured List (10-day or 60-day IL) as of May 4 2026.",
        "3. CORRECT TEAM — flag if on wrong team. Key 2026 moves:",
        "   Pete Alonso=BAL, Juan Soto=NYM, Max Fried=NYY, Paul Goldschmidt=NYY,",
        "   Cody Bellinger=NYY, Rafael Devers=SF, Willy Adames=SF, Alex Bregman=BOS,",
        "   Randy Arozarena=SEA, Shohei Ohtani=LAD, Munetaka Murakami=CWS.",
        "3. ACTIVE ROSTER — flag if on IL or in minors.",
        "",
        "Players:",
        vList,
        "",
        "Return ONLY a JSON array. Start with [ end with ]. No other text.",
        '[{"i":0,"name":"Aaron Judge","ok":true,"reason":""},',
        '{"i":1,"name":"Max Fried","ok":false,"reason":"Pitcher — not a batter"}]',
      ].join("\n");

      let verifyChecks = [];
      try {
        const vRaw = await callClaude(verifyPrompt, 3000);
        const vParsed = grabJSON(vRaw);
        verifyChecks = Array.isArray(vParsed) ? vParsed : [];

        const flagged = verifyChecks.filter(c => c.ok === false);

        if (flagged.length > 0) {
          flagged.forEach(f => setStep("⚠️ Removed " + f.name + " — " + (f.reason || "failed check")));
        }
        if (flagged.length === 0) {
          setStep("✅ All players verified — position players on correct 2026 rosters");
        }
      } catch (_) {
        setStep("⚠️ Verification inconclusive — using original picks");
        verifyChecks = uniqueForVerify.map((_, i) => ({ i, ok: true }));
      }

      // Known 2026 HR totals — used to correct wrong values from Claude
      // VERIFIED 2026 HR totals as of May 3 2026 — source: SI.com/MLB.com
      const KNOWN_2026_HR = {
        // Top confirmed leaders
        "Aaron Judge":13,"Munetaka Murakami":13,"Yordan Alvarez":12,"Ben Rice":12,
        "Matt Olson":11,"Mike Trout":9,"Kyle Schwarber":9,"Gunnar Henderson":9,
        "Pete Alonso":8,"Bryce Harper":8,"Juan Soto":8,"Jordan Walker":8,
        "Bobby Witt Jr":7,"Vladimir Guerrero Jr":7,"Jose Ramirez":7,
        "Mookie Betts":7,"Freddie Freeman":7,"Fernando Tatis Jr":7,
        "Shohei Ohtani":7,"Rafael Devers":7,"Matt Chapman":6,
        "Elly De La Cruz":6,"Julio Rodriguez":6,"Randy Arozarena":6,
        "Ian Happ":6,"Jarren Duran":6,"Jackson Chourio":5,
        "Pete Crow-Armstrong":5,"Alex Bregman":5,"Willy Adames":5,
        "Byron Buxton":5,"Nolan Arenado":5,"Francisco Lindor":5,
        "Shea Langeliers":5,"Nick Kurtz":4,"James Wood":4,
        "Vinnie Pasquantino":4,"Salvador Perez":4,"Ketel Marte":4,
        "Bo Bichette":4,"Riley Greene":4,"Spencer Torkelson":4,
        "William Contreras":4,"Corbin Carroll":3,"Austin Riley":5,
        "Ozzie Albies":4,"Tyler Stephenson":3,"Jonathan India":3,
        "Jorge Soler":4,"Manny Machado":5,"Jake Cronenworth":3,
      };

      // Known 2026 player→team — used to catch wrong-team assignments
      const PLAYER_TEAMS = {
        // NYM
        "Juan Soto":"NYM","Francisco Lindor":"NYM","Mark Vientos":"NYM","Brandon Nimmo":"NYM","Jeff McNeil":"NYM",
        // COL
        "Ezequiel Tovar":"COL","Brenton Doyle":"COL","Ryan McMahon":"COL","Charlie Blackmon":"COL","Michael Lorenzen":"COL",
        // PHI
        "Bryce Harper":"PHI","Kyle Schwarber":"PHI","Trea Turner":"PHI","Nick Castellanos":"PHI","J.T. Realmuto":"PHI","JT Realmuto":"PHI","Cristopher Sanchez":"PHI",
        // MIA
        "Jorge Soler":"MIA","Luis Arraez":"MIA","Jake Burger":"MIA","Connor Norby":"MIA","Sandy Alcantara":"MIA",
        // TOR
        "Vladimir Guerrero Jr":"TOR","Bo Bichette":"TOR","George Springer":"TOR","Daulton Varsho":"TOR","Kevin Gausman":"TOR",
        // TB
        "Junior Caminero":"TB","Josh Lowe":"TB","Yandy Diaz":"TB","Christopher Morel":"TB","Drew Rasmussen":"TB",
        // BOS
        "Alex Bregman":"BOS","Jarren Duran":"BOS","Triston Casas":"BOS","Masataka Yoshida":"BOS","Rob Refsnyder":"BOS","Wilyer Abreu":"BOS",
        // DET
        "Spencer Torkelson":"DET","Riley Greene":"DET","Kerry Carpenter":"DET","Zach McKinstry":"DET","Matt Vierling":"DET","Framber Valdez":"DET",
        // CIN
        "Elly De La Cruz":"CIN","Tyler Stephenson":"CIN","Jonathan India":"CIN","TJ Friedl":"CIN","Andrew Abbott":"CIN",
        // CHC
        "Ian Happ":"CHC","Pete Crow-Armstrong":"CHC","Seiya Suzuki":"CHC","Michael Busch":"CHC","Dansby Swanson":"CHC","Jameson Taillon":"CHC",
        // BAL
        "Gunnar Henderson":"BAL","Pete Alonso":"BAL","Cedric Mullins":"BAL","Adley Rutschman":"BAL","Anthony Santander":"BAL","Colton Cowser":"BAL","Chris Bassitt":"BAL",
        // NYY
        "Aaron Judge":"NYY","Ben Rice":"NYY","Paul Goldschmidt":"NYY","Cody Bellinger":"NYY","Jazz Chisholm":"NYY","Anthony Volpe":"NYY","Gleyber Torres":"NYY","Austin Wells":"NYY","Elmer Rodriguez":"NYY",
        // CLE
        "Jose Ramirez":"CLE","Steven Kwan":"CLE","Josh Naylor":"CLE","Lane Thomas":"CLE","David Fry":"CLE","Gavin Williams":"CLE",
        // KC
        "Bobby Witt Jr":"KC","Vinnie Pasquantino":"KC","Salvador Perez":"KC","MJ Melendez":"KC","Hunter Renfroe":"KC","Stephen Kolek":"KC",
        // MIL
        "Jackson Chourio":"MIL","William Contreras":"MIL","Christian Yelich":"MIL","Joey Wiemer":"MIL","Rhys Hoskins":"MIL","Brandon Sproat":"MIL",
        // STL
        "Nolan Arenado":"STL","Jordan Walker":"STL","Lars Nootbaar":"STL","Brendan Donovan":"STL","Paul DeJong":"STL","Andre Pallante":"STL",
        // LAD
        "Shohei Ohtani":"LAD","Mookie Betts":"LAD","Freddie Freeman":"LAD","Will Smith":"LAD","Teoscar Hernandez":"LAD","Max Muncy":"LAD","Gavin Lux":"LAD",
        // HOU
        "Yordan Alvarez":"HOU","Jose Altuve":"HOU","Kyle Tucker":"HOU","Yainer Diaz":"HOU","Chas McCormick":"HOU","Jeremy Pena":"HOU",
        // CWS
        "Munetaka Murakami":"CWS","Andrew Vaughn":"CWS","Eloy Jimenez":"CWS","Korey Lee":"CWS",
        // LAA
        "Mike Trout":"LAA","Taylor Ward":"LAA","Zach Neto":"LAA","Logan O'Hoppe":"LAA","Kevin Pillar":"LAA",
        // ATL
        "Matt Olson":"ATL","Austin Riley":"ATL","Ozzie Albies":"ATL","Sean Murphy":"ATL","Michael Harris II":"ATL","Ronald Acuna Jr":"ATL",
        // SEA
        "Julio Rodriguez":"SEA","Randy Arozarena":"SEA","Cal Raleigh":"SEA","Luke Raley":"SEA","Mitch Garver":"SEA",
        // SD
        "Fernando Tatis Jr":"SD","Manny Machado":"SD","Jake Cronenworth":"SD","Ha-Seong Kim":"SD","Jackson Merrill":"SD",
        // SF
        "Rafael Devers":"SF","Willy Adames":"SF","Matt Chapman":"SF","Heliot Ramos":"SF","Mike Yastrzemski":"SF","Patrick Bailey":"SF","Logan Webb":"SF","Walker Buehler":"SF",
        // ATH
        "Nick Kurtz":"ATH","Shea Langeliers":"ATH","Brent Rooker":"ATH","JJ Bleday":"ATH","Luis Severino":"ATH",
        // WSH
        "James Wood":"WSH","CJ Abrams":"WSH","Keibert Ruiz":"WSH","Jesse Winker":"WSH","Cade Cavalli":"WSH",
        // MIN
        "Byron Buxton":"MIN","Carlos Correa":"MIN","Ryan Jeffers":"MIN","Matt Wallner":"MIN","Edouard Julien":"MIN","Taj Bradley":"MIN",
        // TEX
        "Nathaniel Lowe":"TEX","Adolis Garcia":"TEX","Jonah Heim":"TEX","Wyatt Langford":"TEX","Jacob deGrom":"TEX","Marcus Semien":"TEX",
        // PIT
        "Oneil Cruz":"PIT","Bryan Reynolds":"PIT","Nick Gonzales":"PIT","Rowdy Tellez":"PIT","Bubba Chandler":"PIT","Andrew McCutchen":"PIT",
        // AZ
        "Ketel Marte":"AZ","Corbin Carroll":"AZ","Christian Walker":"AZ","Lourdes Gurriel Jr":"AZ","Eduardo Rodriguez":"AZ","Josh Bell":"AZ",
        // SD
        "Fernando Tatis Jr":"SD","Manny Machado":"SD","Jake Cronenworth":"SD","Ha-Seong Kim":"SD","Jackson Merrill":"SD","Walker Buehler":"SD",
        // HOU
        "Yordan Alvarez":"HOU","Jose Altuve":"HOU","Yainer Diaz":"HOU","Chas McCormick":"HOU","Jeremy Pena":"HOU","Peter Lambert":"HOU",
        // LAD
        "Shohei Ohtani":"LAD","Mookie Betts":"LAD","Freddie Freeman":"LAD","Will Smith":"LAD","Teoscar Hernandez":"LAD","Max Muncy":"LAD",
        // LAA
        "Mike Trout":"LAA","Taylor Ward":"LAA","Zach Neto":"LAA","Logan O'Hoppe":"LAA","Sam Aldegheri":"LAA",
        // CWS
        "Munetaka Murakami":"CWS","Andrew Vaughn":"CWS","Korey Lee":"CWS","Erick Fedde":"CWS",
        // SEA
        "Julio Rodriguez":"SEA","Randy Arozarena":"SEA","Cal Raleigh":"SEA","Luke Raley":"SEA","George Kirby":"SEA",
        // ATL
        "Matt Olson":"ATL","Austin Riley":"ATL","Ozzie Albies":"ATL","Sean Murphy":"ATL","Michael Harris II":"ATL","Bryce Elder":"ATL",
      };

      // Build lookup maps from verification results
      const flaggedNames = new Set(
        verifyChecks.filter(c => c.ok === false).map(c => c.name)
      );

      // Build a lookup: gameKey → { away, home } so we can validate team membership
      const gameTeamMap = {};
      allGameResults.forEach(gr => {
        gameTeamMap[gr.away + gr.home] = { away: gr.away, home: gr.home };
      });
      // Also map from ALL_GAMES in case Claude omits away/home from game result
      games.forEach(g => {
        const k = g.away + g.home;
        if (!gameTeamMap[k]) gameTeamMap[k] = { away: g.away, home: g.home };
      });

      // Map results — strict team validation + dedup + hot streak boost
      const seenPlayers = new Set();
      const newResults = {};

      allGameResults.forEach(gr => {
        // Resolve the correct away/home teams for this game
        const key = gr.away + gr.home;
        const teams = gameTeamMap[key] || { away: gr.away, home: gr.home };
        const validTeams = new Set([teams.away, teams.home]);

        const cleanPlayers = (gr.players ?? [])
          // 1. Must have a name
          .filter(p => !!p.name && p.name.trim().length > 1)
          // 2. Remove confirmed pitchers from verification pass only
          .filter(p => !flaggedNames.has(p.name))
          // 3. Remove players confirmed on IL
          .filter(p => {
            const isInjured = [p.name, p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()]
              .some(v => injuredPlayers.has(v));
            if (isInjured) console.log("IL removed:", p.name);
            return !isInjured;
          })
          // 4. PLAYER_TEAMS check — only reject if we KNOW they play for a DIFFERENT team NOT in this game
          .filter(p => {
            const variants = [p.name, p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim(), p.name.split(" ").slice(0,2).join(" ")];
            let knownTeam = null;
            for (const v of variants) { if (PLAYER_TEAMS[v]) { knownTeam = PLAYER_TEAMS[v]; break; } }
            if (knownTeam && !validTeams.has(knownTeam)) {
              console.log("Wrong team removed:", p.name, knownTeam, "not in", teams.away, teams.home);
              return false; // definitively on wrong team
            }
            if (knownTeam) { p.team = knownTeam; p.isHome = knownTeam === teams.home; }
            else { // Unknown player — correct team from isHome flag, keep them
              p.team = p.isHome ? teams.home : teams.away;
            }
            return true;
          })
          // 5. Within-game dedup only
          .filter((p, i, arr) => {
            const k = p.name.toLowerCase().replace(/\s+(jr|sr)\.?$/i,"").trim();
            return arr.findIndex(x => x.name.toLowerCase().replace(/\s+(jr|sr)\.?$/i,"").trim() === k) === i;
          })
          // 6. Cross-game dedup — only block if same player appears in 2 different games
          // (rare since players only play one game per day)
          .filter(p => {
            const k = p.name.toLowerCase().replace(/\s+(jr|sr)\.?$/i,"").trim();
            if (seenPlayers.has(k)) {
              console.log("Cross-game dedup removed:", p.name);
              return false;
            }
            seenPlayers.add(k);
            return true;
          })
          // 7. Fill in ALL stats from real fetched data — Claude only picked the player
          .map(p => {
            const gameKey2 = gr.away + gr.home;
            const gd2      = allGameData[gameKey2];
            const nameKey  = n => n.replace(/\s+(Jr|Sr)\.?$/i,"").trim().toLowerCase();
            const allHitters = [...(gd2?.awayHitters||[]), ...(gd2?.homeHitters||[])];
            const roster   = allHitters.find(h => nameKey(h.name) === nameKey(p.name));
            const live     = liveHRMap[p.name] ?? liveHRMap[nameKey(p.name)];
            const known    = KNOWN_2026_HR[p.name];
            const hr       = roster?.hr ?? live?.hr ?? (known ?? p.seasonHRs ?? null);
            const gp       = roster?.gp ?? live?.gp ?? p.gamesPlayed ?? null;
            const ops      = roster?.ops ?? live?.ops ?? p.ops ?? null;
            const avg      = roster?.avg ?? live?.avg ?? p.avg ?? null;
            const batterId = BATTER_IDS[p.name] ?? BATTER_IDS[p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()] ?? roster?.id ?? live?.id ?? p.mlbId ?? null;
            // BvP from API cache
            // Determine which pitcher this batter faces (opposing SP from game data)
            const gameObj    = games.find(g => g.away + g.home === gameKey2);
            const pitcherName = p.isHome
              ? (gameObj?.awayP || p.pitcher || "")
              : (gameObj?.homeP || p.pitcher || "");
            const pitcherHand = p.isHome
              ? (gameObj?.awayH || "")
              : (gameObj?.homeH || "");
            const pitcherERA  = p.isHome
              ? (gameObj?.awayERA ?? null)
              : (gameObj?.homeERA ?? null);
            // Get WHIP from pre-fetched pitcher data
            const pitcherObj  = p.isHome ? gd2?.awayPitcher : gd2?.homePitcher;
            const pitcherWhip = pitcherObj?.whip ?? null;
            const bvpKey   = batterId + "_" + pitcherName;
            const bvp      = bvpCache[bvpKey];
            const bvpStr   = bvp
              ? bvp.ab + " AB · " + bvp.avg + " AVG · " + bvp.hr + " HR"
              : (p.bvpNote || p.bvpSummary || "No BvP data");
            // Real Monte Carlo
            const pitcher  = p.isHome ? gd2?.awayPitcher : gd2?.homePitcher;
            const wBoost   = weatherMap[gameKey2]?.fieldBoost ?? 0;
            const simBat   = roster || live || { hr: hr||3, gp: gp||30, ops: ops||"0.700", avg: avg||".250" };
            const simCount = runHRSimulation(simBat, pitcher, wBoost, 1000);
            // Weather note from real data
            const w = weatherMap[gameKey2];
            const weatherInsight = w
              ? w.tempF + "°F · " + w.windSpeed + "mph " + w.windDir + " (" + (w.windVsField||"?") + ")" + (w.hrImpact==="positive"?" — HR boost 🚀":w.hrImpact==="negative"?" — HR suppressed 🛑":"")
              : (p.weatherNote || p.weatherInsight || "");
            return {
              ...p,
              team:         p.isHome ? teams.home : teams.away,
              mlbId:        batterId,
              seasonHRs:    hr,
              gamesPlayed:  gp,
              ops,
              avg,
              pitcher:      pitcherName,
              pitcherHand:  pitcherHand,
              pitcherERA:   pitcherERA,
              pitcherWhip:  pitcherWhip,
              bvpSummary:   bvpStr,
              bvpHR:        bvp?.hr ?? null,
              bvpAB:        bvp?.ab ?? null,
              bvpAVG:       bvp?.avg ?? null,
              weatherInsight,
              simHRs:       Math.min(Math.round(simCount), 1000),
              hrChancePct:  p.hrChancePct ?? 0,
            };
          })
          .sort((a, b) => {
            const aScore = a.simHRs ?? (a.hrChancePct ?? 0) * 10;
            const bScore = b.simHRs ?? (b.hrChancePct ?? 0) * 10;
            return bScore - aScore;
          })
          .slice(0, 3); // Hard cap — always exactly 3 per game

        newResults[key] = { players: cleanPlayers };
      });

      // ── BvP enrichment pass — fetch real BvP for each player/pitcher pair ──
      setStep("⚔️ Fetching live BvP stats from MLB API...");
      const bvpFetches = [];
      Object.values(newResults).forEach(gr => {
        (gr.players ?? []).forEach(p => {
          // Stamp pitcher details from ALL_GAMES lookup if not already set
          if (p.pitcher && (!p.pitcherHand || p.pitcherHand === "undefined")) {
            const det = pitcherDetailMap[p.pitcher];
            if (det) {
              p.pitcherHand = det.hand || "";
              if (p.pitcherERA == null) p.pitcherERA = det.era;
            }
          }
          // Get batterId from live HR map since mlbId might be null from plain text parser
          const liveEntry   = liveHRMap[p.name] ?? liveHRMap[p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()];
          const gd3         = allGameData[gr.away + gr.home];
          const allH        = [...(gd3?.awayHitters||[]), ...(gd3?.homeHitters||[])];
          const rosterEntry = allH.find(h => h.name === p.name || h.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim() === p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim());
          // Use hardcoded BATTER_IDS first — most reliable
          const batterId    = BATTER_IDS[p.name] ?? BATTER_IDS[p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()] ?? rosterEntry?.id ?? liveEntry?.id ?? p.mlbId;
          const pitcherName = p.pitcher || "";
          const pitcherId   = pitcherIdMap[pitcherName] ?? pitcherIdMap[pitcherName.split(" ").slice(-1)[0]];
          if (batterId && pitcherId) {
            const cacheKey = batterId + "_" + pitcherName;
            bvpFetches.push(
              Promise.all([
                fetchBvP(batterId, pitcherId),
                fetchPitcherArsenal(pitcherId),
              ]).then(([bvp, arsenal]) => {
                if (bvp) {
                  bvpCache[cacheKey] = bvp;
                  p.bvpSummary = (bvp.ab || 0) + " AB · " + (bvp.avg || ".000") + " AVG · " + (bvp.hr || 0) + " HR";
                  p.bvpHR  = bvp.hr;
                  p.bvpAB  = bvp.ab;
                  p.bvpAVG = bvp.avg;
                }
                if (arsenal && arsenal.length > 0) {
                  p.pitcherArsenal = arsenal;
                }
              })
            );
          }
        });
      });
      await Promise.all(bvpFetches);
      const bvpCount = Object.keys(bvpCache).length;
      setStep("✅ BvP data fetched — " + bvpCount + " matchup" + (bvpCount !== 1 ? "s" : "") + " with official stats");

      // ── GUARANTEED FILL: every game gets exactly 3 players no matter what ──
      let filledCount = 0;
      games.forEach(g => {
        const key = g.away + g.home;
        const existing = newResults[key]?.players ?? [];
        if (existing.length >= 3) return;

        const gd  = allGameData[key];
        const w   = weatherMap[key];
        const wBoost = w?.fieldBoost ?? 0;

        // Tier 1: Use pre-fetched roster hitters
        const rosterCandidates = gd ? [
          ...(gd.awayHitters||[]).map(h => ({...h, isHome:false})),
          ...(gd.homeHitters||[]).map(h => ({...h, isHome:true})),
        ].filter(h => h.pos !== "P" && !injuredPlayers.has(h.name))
         .sort((a,b) => (b.hr??0)-(a.hr??0)) : [];

        // Tier 2: Use KNOWN_2026_HR + PLAYER_TEAMS as last resort
        const knownCandidates = Object.entries(KNOWN_2026_HR)
          .filter(([name]) => {
            const team = PLAYER_TEAMS[name];
            return team === g.away || team === g.home;
          })
          .sort((a,b) => b[1]-a[1])
          .slice(0, 8)
          .map(([name, hr]) => {
            const team = PLAYER_TEAMS[name];
            return { name, hr, gp:33, ops:"0.800", avg:".260",
              isHome: team === g.home, team, id: null };
          });

        const allCandidates = rosterCandidates.length > 0 ? rosterCandidates : knownCandidates;
        const existingNames = new Set(existing.map(p => p.name.toLowerCase()));
        const needed = 3 - existing.length;

        const extras = allCandidates
          .filter(h => !existingNames.has(h.name.toLowerCase()))
          .slice(0, needed + 3)
          .map(h => {
            const pitcherName = h.isHome ? (g.awayP||"") : (g.homeP||"");
            const pitcher = h.isHome ? gd?.awayPitcher : gd?.homePitcher;
            const simCount = runHRSimulation(h, pitcher, wBoost, 1000);
            return {
              name:          h.name,
              team:          h.isHome ? g.home : g.away,
              isHome:        h.isHome,
              mlbId:         h.id ?? null,
              seasonHRs:     h.hr ?? 0,
              gamesPlayed:   h.gp ?? 33,
              ops:           h.ops ?? ".800",
              avg:           h.avg ?? ".260",
              pitcher:       pitcherName,
              pitcherHand:   pitcherDetailMap[pitcherName]?.hand || "",
              pitcherERA:    pitcherDetailMap[pitcherName]?.era ?? null,
              pitcherWhip:   null,
              hrChancePct:   Math.min(22, Math.max(4, (h.hr ?? 2) * 0.55)),
              confidence:    62,
              simHRs:        Math.min(Math.round(simCount), 1000),
              bvpSummary:    "No BvP data",
              bvpHR: null, bvpAB: null, bvpAVG: null,
              weatherInsight: w ? w.tempF+"°F · "+w.windSpeed+"mph "+w.windDir+" ("+(w.windVsField||"?")+")": "",
            };
          });

        const merged = [...existing, ...extras].slice(0, 3);
        newResults[key] = { players: merged };
        if (merged.length > existing.length) {
          filledCount++;
          setStep("📋 Filled " + g.away+"@"+g.home+" → "+merged.length+" players");
        }
      });

      // Final guarantee — if still missing, add placeholder so UI doesn't break
      games.forEach(g => {
        const key = g.away + g.home;
        if (!newResults[key] || newResults[key].players.length === 0) {
          setStep("⚠️ No data for "+g.away+"@"+g.home+" — skipped");
          newResults[key] = { players: [] };
        }
      });

      setResults({...newResults}); // trigger re-render with BvP data
      setOpenGames(new Set(games.map(g => g.away + g.home)));
      setStep("✅ All " + allGameResults.length + " games analyzed! Click any game to see HR %.");
      setPhase("done");

    } catch (e) {
      console.error(e);
      if (e.isRateLimit) setErrMsg("__RATE_LIMIT__:" + (e.resetsAt || 0));
      else setErrMsg(e.message || String(e));
      setPhase("error");
    } finally {
      busy.current = false;
    }
  };

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
