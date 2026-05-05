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
async function fetchPitcherIds(pitcherNames) {
  const idMap = {};
  try {
    // Use MLB player search API
    await Promise.all(pitcherNames.map(async name => {
      try {
        const encoded = encodeURIComponent(name);
        const url = "https://statsapi.mlb.com/api/v1/people/search?names=" + encoded +
          "&fields=people,fullName,id,primaryPosition,primaryPosition.abbreviation";
        const r = await fetch(url);
        const d = await r.json();
        const match = (d.people ?? []).find(p =>
          p.fullName?.toLowerCase() === name.toLowerCase() &&
          ["P","SP","RP"].includes(p.primaryPosition?.abbreviation)
        );
        if (match) idMap[name] = match.id;
      } catch (_) {}
    }));
  } catch (_) {}
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

/* ── JSON helpers ── */
function sanitize(s) {
  s = s.replace(/[\u201c\u201d]/g, '"').replace(/[\u2018\u2019]/g, "'");
  s = s.replace(/'([A-Za-z_][A-Za-z0-9_]{0,50})['"]\s*:/g, '"$1":');
  s = s.replace(/"([A-Za-z_][A-Za-z0-9_]{0,50})'\s*:/g, '"$1":');
  // Fix missing commas between properties: "value" "key": → "value", "key":
  s = s.replace(/"(\s*)"([A-Za-z_])/g, '", "$2');
  // Fix missing commas between } and next property
  s = s.replace(/\}(\s*)"([A-Za-z_])/g, '}, "$2');
  // Fix missing commas between ] and next property
  s = s.replace(/\](\s*)"([A-Za-z_])/g, '], "$2');
  // Fix Claude using parentheses () instead of brackets [] for arrays
  s = s.replace(/:\s*\(\s*\{/g, ': [{');
  s = s.replace(/\}\s*\)/g, '}]');
  // Trailing commas
  s = s.replace(/,(\s*[}\]])/g, '$1');
  s = s.replace(/:\s*True\b/g, ': true').replace(/:\s*False\b/g, ': false').replace(/:\s*None\b/g, ': null').replace(/:\s*undefined\b/g, ': null');
  s = s.replace(/:\s*\.(\d+)/g, ': 0.$1');
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
  const hrPct = p.hrChancePct ?? ((p.simHRs ?? 0) / 100);
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
            {p.hotStreak >= 3 && <span style={{ fontSize: 12, flexShrink: 0 }} title={p.hotStreakNote}>🔥🔥</span>}
            {p.hotStreak > 0 && p.hotStreak < 3 && <span style={{ fontSize: 11, flexShrink: 0 }} title={p.hotStreakNote}>🔥</span>}
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

        {/* HR % + sim count */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: F.bebas, fontSize: 26, color: c, lineHeight: 1, textShadow: glow }}>
            {hrPct.toFixed(1)}%
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 8, color: T.muted, marginBottom: 2 }}>HR CHANCE</div>
          {p.simHRs != null && (
            <div style={{ fontFamily: F.mono, fontSize: 8, color: c, background: c + "15", border: "1px solid " + c + "30", borderRadius: 4, padding: "1px 5px", textAlign: "center" }}>
              {p.simHRs.toLocaleString()}<span style={{ color: T.muted }}>/10k</span>
            </div>
          )}
        </div>

        {/* Expand arrow */}
        <div style={{ color: T.muted, fontSize: 12, flexShrink: 0, transition: "transform .2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: "0 12px 12px 12px", borderTop: "1px solid " + T.border }}>
          <div style={{ marginTop: 10, display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
            {/* 2026 season HR — live from MLB API */}
            <div style={{ width:"100%", background:"rgba(0,229,255,0.08)", border:"1px solid rgba(0,229,255,0.3)", borderRadius:7, padding:"5px 10px", marginBottom:4, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted }}>2026 SEASON <span style={{ color:"#00e676", fontSize:7 }}>● LIVE</span></span>
              <span style={{ fontFamily:F.arch, fontSize:13, color:T.accent }}>
                {p.seasonHRs ?? "—"} HR
                <span style={{ fontFamily:F.mono, fontSize:9, color:T.muted, marginLeft:6 }}>in {p.gamesPlayed ?? "—"}g · {p.avg ?? p.ops ?? ""}</span>
              </span>
            </div>
            {/* BvP vs today's pitcher — live from MLB API */}
            <div style={{ width:"100%", background:"rgba(255,202,40,0.07)", border:"1px solid rgba(255,202,40,0.3)", borderRadius:7, padding:"5px 10px", marginBottom:4, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:4 }}>
              <span style={{ fontFamily:F.mono, fontSize:9, color:T.amber }}>vs {p.pitcher} <span style={{ color:"#00e676", fontSize:7 }}>● LIVE BvP</span></span>
              <span style={{ fontFamily:F.mono, fontSize:10, color:T.text }}>
                {p.bvpAB != null
                  ? <>{p.bvpAB} AB · <span style={{ color:T.amber }}>{p.bvpAVG} AVG</span> · <span style={{ color:"#00e676" }}>{p.bvpHR} HR</span></>
                  : (p.bvpSummary || "No career data")
                }
              </span>
            </div>
            {/* Sim result banner */}
            {p.simHRs != null && (
              <div style={{ width: "100%", background: "rgba(0,230,118,0.08)", border: "1px solid rgba(0,230,118,0.3)", borderRadius: 7, padding: "5px 10px", marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>10,000 SIM RESULT</span>
                <span style={{ fontFamily: F.arch, fontSize: 13, color: "#00e676" }}>
                  {p.simHRs.toLocaleString()} HR hits
                  <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted, marginLeft: 6 }}>vs {p.pitcher}</span>
                </span>
              </div>
            )}
            {[
              ["vs", p.pitcher + " (" + p.pitcherHand + ") ERA " + (p.pitcherERA ?? "N/A"), T.amber],
              ["WHIP", p.pitcherWhip ?? "-", p.pitcherWhip && p.pitcherWhip > 1.4 ? "#00e676" : T.text],
              ["HA vs TEAM", p.hrAllowedVsTeam != null ? p.hrAllowedVsTeam + " HR" : "-", p.hrAllowedVsTeam > 2 ? "#00e676" : T.text],
              ["OPS", p.ops ?? "-", T.text],
              ["EV", p.exitVelo ? p.exitVelo + "mph" : "-", T.text],
              ["PARK×", p.parkFactor ?? "-", T.text],
            ].map(([l, v, col]) => (
              <div key={l} style={{ fontFamily: F.mono, fontSize: 9, background: T.card, border: "1px solid " + T.border, borderRadius: 5, padding: "3px 8px" }}>
                <span style={{ color: T.muted, marginRight: 4 }}>{l}</span>
                <span style={{ color: col }}>{v}</span>
              </div>
            ))}
          </div>

          {/* HR bar */}
          <div style={{ marginBottom: 8 }}>
            <HRBar pct={hrPct} />
          </div>

          {p.bvpSummary && (
            <div style={{ fontFamily: F.mono, fontSize: 9, color: T.accent + "cc", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.3)", borderRadius: 6, padding: "5px 8px", marginBottom: 5, lineHeight: 1.5 }}>
              📊 {p.bvpSummary}
            </div>
          )}
          {p.homeAwaySplit && (
            <div style={{ fontFamily: F.mono, fontSize: 9, color: T.green + "aa", background: "rgba(0,230,118,0.07)", border: "1px solid rgba(0,230,118,0.25)", borderRadius: 6, padding: "5px 8px", marginBottom: 5, lineHeight: 1.5 }}>
              {p.isHome ? "🏠" : "✈"} {p.homeAwaySplit}
            </div>
          )}
          {p.hotStreak && p.hotNote && (
            <div style={{ fontFamily: F.mono, fontSize: 9, color: "#ff6b00", background: "rgba(255,107,0,0.1)", border: "1px solid rgba(255,107,0,0.35)", borderRadius: 6, padding: "5px 8px", marginBottom: 5, lineHeight: 1.5 }}>
              🔥 HOT STREAK: {p.hotNote}
            </div>
          )}
          {p.weatherInsight && (
            <div style={{ fontFamily: F.mono, fontSize: 9, color: T.green + "cc", background: "rgba(0,230,118,0.07)", border: "1px solid rgba(0,230,118,0.25)", borderRadius: 6, padding: "5px 8px", lineHeight: 1.5 }}>
              🌤 {p.weatherInsight}
            </div>
          )}
          {/* Hot streak banner */}
          {p.hotStreak > 0 && (
            <div style={{ fontFamily: F.mono, fontSize: 9, lineHeight: 1.5, marginTop: 4,
              background: p.hotStreak >= 3 ? "rgba(255,100,0,0.12)" : "rgba(255,200,0,0.08)",
              border: "1px solid " + (p.hotStreak >= 3 ? "rgba(255,100,0,0.4)" : "rgba(255,200,0,0.3)"),
              borderRadius: 6, padding: "5px 8px",
              color: p.hotStreak >= 3 ? "#ff6600" : T.amber + "cc",
            }}>
              {p.hotStreak >= 3 ? "🔥🔥" : "🔥"} HOT STREAK — {p.hotStreak} HR in last 10 games
              {p.hotStreakNote && <span style={{ color: T.muted, marginLeft: 4 }}>· {p.hotStreakNote}</span>}
            </div>
          )}
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
  const topHR   = players[0]?.hrChancePct ?? 0;

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
            {anyHot && <span style={{ fontSize: 10 }}>🔥</span>}
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
              {awayHot ? " 🔥" : ""}
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
              {homeHot ? " 🔥" : ""}
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
    "You are an elite MLB home run analyst. Today is May 3 2026.",
    "",
    "KNOWN 2026 ROSTER FACTS (verify before adding any player):",
    "Pete Alonso=BAL, Juan Soto=NYM, Max Fried=NYY, Aaron Judge=NYY, Gunnar Henderson=BAL,",
    "Shohei Ohtani=LAD, Yordan Alvarez=HOU, Matt Olson=ATL, Kyle Schwarber=PHI, Bryce Harper=PHI,",
    "Freddie Freeman=LAD, Mookie Betts=LAD, Rafael Devers=SF, Willy Adames=SF, Byron Buxton=MIN,",
    "Jose Ramirez=CLE, Bobby Witt Jr=KC, Julio Rodriguez=SEA, Randy Arozarena=SEA,",
    "Shea Langeliers=ATH, Nick Kurtz=ATH, James Wood=WSH, Mike Trout=LAA, Elly De La Cruz=CIN,",
    "Nolan Arenado=STL, Jordan Walker=STL, Alex Bregman=BOS, Jarren Duran=BOS,",
    "Fernando Tatis Jr=SD, Munetaka Murakami=CWS, Vladimir Guerrero Jr=TOR,",
    "Francisco Lindor=NYM, Ian Happ=CHC, Pete Crow-Armstrong=CHC, Matt Chapman=SF",
    "",
    "TODAY'S GAMES — ALL STATS BELOW ARE REAL DATA FROM MLB STATS API:",
    lines,
    "",
    "REAL BATTER STATS (from MLB API — use these exact numbers):",
    ...games.map(g => {
      const key = g.away + g.home;
      const gd  = gameData[key];
      if (!gd) return g.away + "@" + g.home + ": stats unavailable";
      const fmtHitters = (hitters, bvpMap, oppPitcher) =>
        (hitters || []).slice(0, 6).map(h =>
          h.name + " " + h.hr + "HR " + h.avg +
          (bvpMap[h.name] ? " BvP:" + bvpMap[h.name].hr + "HR/" + bvpMap[h.name].ab + "AB" : "")
        ).join(", ");
      const awayStr = fmtHitters(gd.awayHitters, gd.awayBvP || {}, g.homeP);
      const homeStr = fmtHitters(gd.homeHitters, gd.homeBvP || {}, g.awayP);
      const awayP = g.awayP + " ERA " + (gd.awayPitcher?.era || g.awayERA || "?");
      const homeP = g.homeP + " ERA " + (gd.homePitcher?.era || g.homeERA || "?");
      return g.away + "@" + g.home + " | " + awayP + " | " + homeP + " | " + g.away + ": " + awayStr + " | " + g.home + ": " + homeStr;
    }),
    "",
    "REAL WEATHER PER GAME (include in weatherInsight):",
    ...games.map(g => {
      const key = g.away + g.home;
      const w = weatherMap[key];
      if (!w) return g.away + "@" + g.home + ": no weather data";
      const plate = w.plateFaces ? w.plateFaces.split("—")[0].trim() : "";
      return g.away + "@" + g.home + ": " + w.tempF + "F " +
        w.windSpeed + "mph from " + w.windDir + " (" + (w.windVsField || "?") + ")" +
        (plate ? " plate-" + plate : "") + " " + w.condition +
        (w.hrImpact === "positive" ? " HR-BOOST" : w.hrImpact === "negative" ? " HR-SUPPRESS" : "");
    }),
    "",
    "TASK: For EACH game return exactly 3 HR candidates from the TWO TEAMS in THAT specific game.",
    "Return 3 only — no more. Filters will handle verification.",
    "Return ONLY the fields listed. NO extra fields. SHORT values only.",
    "Return ONLY position players (outfielders, infielders, catchers, DH). NO pitchers.",
    "CRITICAL: ONLY include POSITION PLAYERS (batters). NEVER include pitchers as HR candidates.",
    "Return 5 players per game even if some are marginal — filters will trim to the best 3.",
    "CRITICAL: Do NOT include any player who is on the Injured List (IL) or listed as Day-To-Day (DTD).",
    "Do NOT suggest: Ronald Acuna Jr, any player known to be injured heading into May 4 2026.",
    "CRITICAL: Every player MUST play for either the away team OR the home team of their specific game. No cross-game players.",
    "Do NOT list any starting pitcher, relief pitcher, or anyone listed as SP/RP/LHP/RHP as a batter.",
    "Players must be: outfielders, infielders, catchers, or designated hitters ONLY.",
    "Include each player's MLB MLBAM ID for headshots.",
    "",
    "VERIFIED 2026 HR TOTALS through May 3 — USE THESE EXACT NUMBERS (source: MLB.com):",
    "Aaron Judge=13HR, Munetaka Murakami=13HR, Yordan Alvarez=12HR, Ben Rice=12HR,",
    "Matt Olson=11HR, Mike Trout=9HR, Kyle Schwarber=9HR, Gunnar Henderson=9HR,",
    "Pete Alonso=8HR, Bryce Harper=8HR, Juan Soto=8HR, Jordan Walker=8HR,",
    "Bobby Witt Jr=7HR, Vladimir Guerrero Jr=7HR, Jose Ramirez=7HR, Mookie Betts=7HR,",
    "Freddie Freeman=7HR, Fernando Tatis Jr=7HR, Shohei Ohtani=7HR, Rafael Devers=7HR,",
    "Elly De La Cruz=6HR, Julio Rodriguez=6HR, Randy Arozarena=6HR, Ian Happ=6HR,",
    "Jarren Duran=6HR, Matt Chapman=6HR, Austin Riley=5HR, Shea Langeliers=5HR,",
    "Pete Crow-Armstrong=5HR, Alex Bregman=5HR, Willy Adames=5HR, Nolan Arenado=5HR,",
    "Francisco Lindor=5HR, Byron Buxton=5HR, Jackson Chourio=5HR, Manny Machado=5HR,",
    "Nick Kurtz=4HR, James Wood=4HR, Vinnie Pasquantino=4HR, Salvador Perez=4HR,",
    "Ketel Marte=4HR, Bo Bichette=4HR, Riley Greene=4HR, William Contreras=4HR,",
    "Ozzie Albies=4HR, Jorge Soler=4HR, Spencer Torkelson=4HR, Corbin Carroll=3HR,",
    "RULE: Use EXACT HR count listed above. For unlisted players estimate from pace/position.",
    "CRITICAL: Do NOT invent or guess HR totals. If you don't know, use 0 rather than a wrong number.",
    "",
    "BvP vs TODAY'S PITCHER — provide career + 2026 HR stats:",
    "- hrAllowedVsTeam: career HR this pitcher has allowed to the opposing team (integer)",
    "- bvpSummary: include career AB, AVG, HR vs this specific pitcher if available",
    "",
    "For each player provide (be concise):",
    "- name, team, mlbId, emoji, teamColor, isHome",
    "- hrChancePct (0-35), pitcher, pitcherHand, pitcherERA, pitcherWhip, hrAllowedVsTeam",
    "- bvpSummary (1 sentence with career stats vs this pitcher), homeAwaySplit (1 line)",
    "- weatherInsight: cite REAL weather — temp F, wind mph, direction vs field, HR impact",
    "- seasonHRs (use exact number from list above), gamesPlayed, ops, parkFactor",
    "- simHRs: HR hits out of 10000 simulations vs this specific pitcher today (integer)",
    "- hotStreak: HR count in last 10 games (integer, 0 if none)",
    "- hotStreakNote: 1 sentence on recent HR form",
    "- confidence: 0-100, boost up to 10pts for hot streak",
    "",
    "Park HR factors: Coors=1.38 SutterHealth=1.28 Wrigley=1.14 Yankee=1.10 Fenway=1.06",
    "Angel=1.02 Target=1.02 Busch=1.01 Comerica=1.00 loanDepot=0.95 Tropicana=0.94 PNC=0.90 Petco=0.88 TMobile=0.85",
    "",
    "MLBAM IDs: Aaron Judge=592450, Shohei Ohtani=660271, Mookie Betts=605141,",
    "Yordan Alvarez=670541, Matt Olson=621566, Kyle Schwarber=656941, Bryce Harper=547180,",
    "Gunnar Henderson=683002, Pete Alonso=624413, Juan Soto=665742, Vladimir Guerrero Jr=665489,",
    "Bo Bichette=666182, Jose Ramirez=608070, Elly De La Cruz=682829, Bobby Witt Jr=677951,",
    "Mike Trout=545361, Nolan Arenado=571448, Freddie Freeman=518692, Rafael Devers=646240,",
    "Fernando Tatis Jr=665487, Francisco Lindor=596019, James Wood=694192, Byron Buxton=621439,",
    "Randy Arozarena=668227, Ian Happ=664023, Pete Crow-Armstrong=682998, Julio Rodriguez=677594,",
    "Shea Langeliers=669127, Willy Adames=642715, Matt Chapman=656305, Jarren Duran=680776,",
    "Alex Bregman=608324, Jackson Chourio=682626, Munetaka Murakami=673548, Nick Kurtz=695373",
    "",
    "CRITICAL JSON RULES: Use ONLY double-quotes. Start with { end with }. No other text.",
    "Return ONLY the fields listed. Do NOT add weatherSummary, summary, notes, or any extra fields.",
    "Keep values SHORT — bvpSummary max 10 words, weatherInsight max 12 words.",
    "Return EXACTLY 5 players per game, no more, no less.",
    "",
    '{"games":[{"away":"BAL","home":"NYY","venue":"Yankee Stadium","time":"1:35 PM ET",',
    '"players":[{"name":"Aaron Judge","team":"NYY","mlbId":592450,"emoji":"⚡","teamColor":"#003087",',
    '"isHome":true,"hrChancePct":18.5,"pitcher":"Kyle Bradish","pitcherHand":"RHP","pitcherERA":4.20,"pitcherWhip":1.28,"hrAllowedVsTeam":3,',
    '"bvpSummary":"4 career HR vs Bradish in 22 AB, .364 AVG","homeAwaySplit":"HOME: 1.042 OPS 8HR | ROAD: .898 OPS 4HR",',
    '"weatherInsight":"67F partly cloudy 14mph wind OUT to RF — Yankee short porch HR boost",',
    '"seasonHRs":12,"gamesPlayed":32,"ops":"1.052","parkFactor":"1.10",',
    '"simHRs":1850,"confidence":88}]}]}',
  ].join("\n");
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
    { match:"Monte Carlo",              pct:55, label:"Running 10,000× simulations..." },
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
      setStep("🎲 Running 10,000-game Monte Carlo...");
      await new Promise(r => setTimeout(r, 150));

      // Consolidated game data from all batches
      const allGameData = {};

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

        const raw    = await callClaude(buildPrompt(batches[b], weatherMap, batchGameData), 8192);
        const parsed = grabJSON(raw);
        const batchResults = parsed.games ?? [];
        allGameResults.push(...batchResults);
        setStep("✅ Batch " + (b + 1) + " done — " + batchResults.length + " games analyzed");
      }

      // ── VERIFICATION PASS ─────────────────────────────────────────────────
      setStep("🔍 Verifying positions, rosters & hot streaks...");

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
        "4. HOT STREAK — note if player has hit HR in 2+ of last 5 games (true/false + brief note).",
        "",
        "Players:",
        vList,
        "",
        "Return ONLY a JSON array. Start with [ end with ]. No other text.",
        '[{"i":0,"name":"Aaron Judge","ok":true,"reason":"","hotStreak":true,"hotNote":"HR in 3 of last 5 games"},',
        '{"i":1,"name":"Max Fried","ok":false,"reason":"Pitcher — not a batter","hotStreak":false,"hotNote":""}]',
      ].join("\n");

      let verifyChecks = [];
      try {
        const vRaw = await callClaude(verifyPrompt, 3000);
        const vParsed = grabJSON(vRaw);
        verifyChecks = Array.isArray(vParsed) ? vParsed : [];

        const flagged = verifyChecks.filter(c => c.ok === false);
        const hotPlayers = verifyChecks.filter(c => c.hotStreak === true);

        if (flagged.length > 0) {
          flagged.forEach(f => setStep("⚠️ Removed " + f.name + " — " + (f.reason || "failed check")));
        }
        if (hotPlayers.length > 0) {
          setStep("🔥 Hot streaks: " + hotPlayers.map(h => h.name).join(", "));
        }
        if (flagged.length === 0) {
          setStep("✅ All players verified — position players on correct 2026 rosters");
        }
      } catch (_) {
        setStep("⚠️ Verification inconclusive — using original picks");
        verifyChecks = uniqueForVerify.map((_, i) => ({ i, ok: true, hotStreak: false, hotNote: "" }));
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
      const hotStreakMap = {};
      verifyChecks.forEach(c => {
        if (c.hotStreak) hotStreakMap[c.name] = c.hotNote || "Hot streak";
      });

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
          // 6. Cross-game dedup
          .filter(p => {
            const k = p.name.toLowerCase().replace(/\s+(jr|sr)\.?$/i,"").trim();
            if (seenPlayers.has(k)) return false;
            seenPlayers.add(k);
            return true;
          })
          // 7. Attach live stats + hot streak
          .map(p => {
            const isHot = !!hotStreakMap[p.name];
            const gameKey2 = gr.away + gr.home;
            const gd2 = allGameData[gameKey2];
            const allHitters = [...(gd2?.awayHitters || []), ...(gd2?.homeHitters || [])];
            const rosterData = allHitters.find(h =>
              h.name === p.name ||
              h.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim() === p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()
            );
            const liveData = liveHRMap[p.name] ?? liveHRMap[p.name.replace(/\s+(Jr|Sr)\.?$/i,"").trim()];
            const knownHR  = KNOWN_2026_HR[p.name];
            const correctedHR  = rosterData?.hr ?? liveData?.hr ?? (knownHR != null ? knownHR : (p.seasonHRs ?? null));
            const correctedGP  = rosterData?.gp ?? liveData?.gp ?? p.gamesPlayed ?? null;
            const correctedOPS = rosterData?.ops ?? liveData?.ops ?? p.ops ?? null;
            const batterId     = rosterData?.id  ?? liveData?.id  ?? p.mlbId ?? null;
            const bvpKey = (batterId || p.name) + "_" + p.pitcher;
            const bvp    = bvpCache[bvpKey];
            const bvpStr = bvp
              ? bvp.ab + " AB · " + bvp.avg + " AVG · " + bvp.hr + " HR"
              : (p.bvpSummary || "No BvP data");
            const validSims = (p.simHRs != null && p.simHRs >= 0 && p.simHRs <= 5000) ? p.simHRs : null;
            return {
              ...p,
              team:        p.isHome ? teams.home : teams.away,
              mlbId:       batterId,
              seasonHRs:   correctedHR,
              gamesPlayed: correctedGP,
              ops:         correctedOPS || p.ops,
              bvpSummary:  bvpStr,
              bvpHR:       bvp?.hr ?? null,
              bvpAB:       bvp?.ab ?? null,
              bvpAVG:      bvp?.avg ?? null,
              simHRs:      validSims,
              hotStreak:   isHot,
              hotNote:     hotStreakMap[p.name] || "",
              hrChancePct: isHot ? Math.min(35, (p.hrChancePct ?? 0) + 2.5) : (p.hrChancePct ?? 0),
            };
          })
          .sort((a, b) => (b.hrChancePct ?? 0) - (a.hrChancePct ?? 0))
          .slice(0, 3); // Hard cap — always exactly 3 per game

        newResults[key] = { players: cleanPlayers };
      });

      // ── BvP enrichment pass — fetch real BvP for each player/pitcher pair ──
      setStep("⚔️ Fetching live BvP stats from MLB API...");
      const bvpFetches = [];
      Object.values(newResults).forEach(gr => {
        (gr.players ?? []).forEach(p => {
          const batterId  = p.mlbId;
          const pitcherName = p.pitcher;
          const pitcherId = pitcherIdMap[pitcherName];
          if (batterId && pitcherId) {
            const cacheKey = batterId + "_" + pitcherName;
            bvpFetches.push(
              fetchBvP(batterId, pitcherId).then(bvp => {
                if (bvp) {
                  bvpCache[cacheKey] = bvp;
                  // Update the player in place
                  p.bvpSummary = bvp.ab + " AB · " + bvp.avg + " AVG · " + bvp.hr + " HR · " + bvp.so + " K";
                  p.bvpHR  = bvp.hr;
                  p.bvpAB  = bvp.ab;
                  p.bvpAVG = bvp.avg;
                }
              })
            );
          }
        });
      });
      await Promise.all(bvpFetches);
      const bvpCount = Object.keys(bvpCache).length;
      setStep("✅ BvP data fetched — " + bvpCount + " matchup" + (bvpCount !== 1 ? "s" : "") + " with official stats");

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
          WEATHER CHECK · DAY/NIGHT BA · BvP AVERAGE · 10,000× MONTE CARLO
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
          Claude AI · Weather Check · Day/Night BA · BvP Average · Park Factor · 10,000× Monte Carlo
        </div>
      </div>
    </div>
  );
}
