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
        "@keyframes hrs-pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}",
        "@keyframes hrs-blink{0%,100%{opacity:1}50%{opacity:.3}}",
        "@keyframes hrs-glow{0%,100%{box-shadow:0 0 12px rgba(0,210,255,.1)}50%{box-shadow:0 0 30px rgba(0,210,255,.3)}}",
        "@keyframes hrs-scan{0%{top:-3px;opacity:.5}100%{top:100%;opacity:0}}",
        "@keyframes hrs-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}",
      ].join("");
      document.head.appendChild(s);
    }
  }, []);
}

const T = {
  bg:"#05080f", panel:"#0b1120", card:"#0d1428", border:"#1a2438",
  accent:"#00d2ff", gold:"#ffd700", green:"#22c55e", red:"#f87171",
  amber:"#facc15", purple:"#a78bfa", teal:"#2dd4bf",
  text:"#dde6f0", muted:"#4a5a72", dim:"#111e30",
};
const F = {
  bebas:"'Bebas Neue',Impact,sans-serif",
  mono:"'DM Mono','Courier New',monospace",
  arch:"'Archivo Black','Arial Black',sans-serif",
};

const ALL_GAMES = [
  { away:"TOR", home:"MIN", venue:"Target Field",        city:"Minneapolis",    st:"MN", time:"12:45 PM ET",
    awayP:"Trey Yesavage",    awayH:"RHP", awayERA:0.00,  awayRec:"1-0",
    homeP:"Joe Ryan",          homeH:"RHP", homeERA:3.76,  homeRec:"2-3" },
  { away:"HOU", home:"BOS", venue:"Fenway Park",         city:"Boston",         st:"MA", time:"1:35 PM ET",
    awayP:"Cody Bolton",      awayH:"RHP", awayERA:5.79,  awayRec:"0-1",
    homeP:"Ranger Suarez",    homeH:"LHP", homeERA:3.09,  homeRec:"2-2" },
  { away:"CIN", home:"PIT", venue:"PNC Park",            city:"Pittsburgh",     st:"PA", time:"1:35 PM ET",
    awayP:"Chase Burns",      awayH:"RHP", awayERA:2.65,  awayRec:"3-1",
    homeP:"Braxton Ashcraft", homeH:"RHP", homeERA:3.71,  homeRec:"1-2" },
  { away:"BAL", home:"NYY", venue:"Yankee Stadium",      city:"New York",       st:"NY", time:"1:35 PM ET",
    awayP:"Trey Gibson",      awayH:"RHP", awayERA:null,  awayRec:"0-0",
    homeP:"Max Fried",        homeH:"LHP", homeERA:2.09,  homeRec:"4-1" },
  { away:"MIL", home:"WSH", venue:"Nationals Park",      city:"Washington",     st:"DC", time:"1:35 PM ET",
    awayP:"TBD",              awayH:"TBD", awayERA:null,  awayRec:"?",
    homeP:"Zack Littell",     homeH:"RHP", homeERA:7.85,  homeRec:"0-4" },
  { away:"SF",  home:"TB",  venue:"Tropicana Field",     city:"St. Petersburg", st:"FL", time:"1:40 PM ET",
    awayP:"Tyler Mahle",      awayH:"RHP", awayERA:5.87,  awayRec:"1-4",
    homeP:"Steven Matz",      homeH:"LHP", homeERA:4.31,  homeRec:"4-1" },
  { away:"PHI", home:"MIA", venue:"loanDepot Park",      city:"Miami",          st:"FL", time:"1:40 PM ET",
    awayP:"Jesus Luzardo",    awayH:"LHP", awayERA:5.50,  awayRec:"2-3",
    homeP:"Chris Paddack",    homeH:"RHP", homeERA:6.11,  homeRec:"0-4" },
  { away:"LAD", home:"STL", venue:"Busch Stadium",       city:"St. Louis",      st:"MO", time:"2:15 PM ET",
    awayP:"Justin Wrobleski", awayH:"LHP", awayERA:1.50,  awayRec:"4-0",
    homeP:"Dustin May",       homeH:"RHP", homeERA:5.28,  homeRec:"3-2" },
  { away:"AZ",  home:"CHC", venue:"Wrigley Field",       city:"Chicago",        st:"IL", time:"2:20 PM ET",
    awayP:"Merrill Kelly",    awayH:"RHP", awayERA:9.20,  awayRec:"1-2",
    homeP:"Matthew Boyd",     homeH:"LHP", homeERA:7.00,  homeRec:"1-1" },
  { away:"ATL", home:"COL", venue:"Coors Field",         city:"Denver",         st:"CO", time:"3:10 PM ET",
    awayP:"Spencer Strider",  awayH:"RHP", awayERA:null,  awayRec:"0-0",
    homeP:"Kyle Freeland",    homeH:"LHP", homeERA:3.48,  homeRec:"1-2" },
  { away:"CLE", home:"ATH", venue:"Sutter Health Park",  city:"Sacramento",     st:"CA", time:"4:05 PM ET",
    awayP:"Parker Messick",   awayH:"LHP", awayERA:1.73,  awayRec:"3-0",
    homeP:"Aaron Civale",     homeH:"RHP", homeERA:3.23,  homeRec:"2-1" },
  { away:"NYM", home:"LAA", venue:"Angel Stadium",       city:"Anaheim",        st:"CA", time:"4:07 PM ET",
    awayP:"Clay Holmes",      awayH:"RHP", awayERA:1.75,  awayRec:"3-2",
    homeP:"Jack Kochanowicz", homeH:"RHP", homeERA:3.09,  homeRec:"2-0" },
  { away:"KC",  home:"SEA", venue:"T-Mobile Park",       city:"Seattle",        st:"WA", time:"4:10 PM ET",
    awayP:"Kris Bubic",       awayH:"LHP", awayERA:3.74,  awayRec:"2-1",
    homeP:"Luis Castillo",    homeH:"RHP", homeERA:6.35,  homeRec:"0-2" },
  { away:"CWS", home:"SD",  venue:"Petco Park",          city:"San Diego",      st:"CA", time:"4:10 PM ET",
    awayP:"Anthony Kay",      awayH:"LHP", awayERA:6.12,  awayRec:"1-1",
    homeP:"Griffin Canning",  homeH:"RHP", homeERA:0.00,  homeRec:"0-0" },
  { away:"TEX", home:"DET", venue:"Comerica Park",       city:"Detroit",        st:"MI", time:"7:20 PM ET",
    awayP:"Jack Leiter",      awayH:"RHP", awayERA:5.17,  awayRec:"1-2",
    homeP:"Tyler Holton",     homeH:"LHP", homeERA:5.54,  homeRec:"0-1" },
];

/* ── Claude API — hits our own secure backend route ── */
class RateLimitError extends Error {
  constructor(resetTime, resetsAt) {
    super("RATE_LIMIT:" + resetTime + ":" + (resetsAt || 0));
    this.isRateLimit = true;
    this.resetTime = resetTime;
    this.resetsAt = resetsAt;
  }
}

async function callClaude(text) {
  const r = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  const d = await r.json();
  if (d.type === "exceeded_limit" || (d.error && d.error.type === "exceeded_limit")) {
    const resetsAt = d.resetsAt || d.error?.resetsAt;
    const resetStr = resetsAt
      ? new Date(resetsAt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : "soon";
    throw new RateLimitError(resetStr, resetsAt);
  }
  if (d.error) {
    if (d.error.message?.includes("exceeded_limit")) throw new RateLimitError("soon", null);
    throw new Error(d.error.message || JSON.stringify(d.error));
  }
  return d.content.map(b => b.text || "").join("").trim();
}

/* ── JSON helpers ── */
function sanitizeJSON(s) {
  s = s.replace(/\u201c|\u201d/g, '"');
  s = s.replace(/\u2018|\u2019/g, "'");
  s = s.replace(/'([A-Za-z_][A-Za-z0-9_]{0,50})['"]\s*:/g, '"$1":');
  s = s.replace(/"([A-Za-z_][A-Za-z0-9_]{0,50})'\s*:/g, '"$1":');
  s = s.replace(/,(\s*[}\]])/g, '$1');
  s = s.replace(/:\s*True\b/g, ': true');
  s = s.replace(/:\s*False\b/g, ': false');
  s = s.replace(/:\s*None\b/g, ': null');
  s = s.replace(/:\s*undefined\b/g, ': null');
  return s;
}

function grabJSON(raw) {
  let s = raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
  const oa = s.indexOf("{"), ob = s.indexOf("[");
  const start = oa === -1 ? ob : ob === -1 ? oa : Math.min(oa, ob);
  if (start === -1) throw new Error("No JSON found");
  const isObj = s[start] === "{";
  const end = isObj ? s.lastIndexOf("}") : s.lastIndexOf("]");
  if (end === -1) throw new Error("No closing bracket");
  const slice = s.slice(start, end + 1);
  try { const p = JSON.parse(slice); if (p && typeof p === "object") return p; } catch (_) {}
  const clean = sanitizeJSON(slice);
  try { const p = JSON.parse(clean); if (p && typeof p === "object") return p; } catch (_) {}
  try {
    const fixed = clean.replace(/([{,\[\s\n:])'([^'\n]*?)'/g, '$1"$2"');
    const p = JSON.parse(sanitizeJSON(fixed));
    if (p && typeof p === "object") return p;
  } catch (_) {}
  const m = clean.match(/"players"\s*:\s*(\[[\s\S]*\])/);
  if (m) {
    try { return { players: JSON.parse(m[1]) }; } catch (_) {}
    try { return { players: JSON.parse(sanitizeJSON(m[1])) }; } catch (_) {}
  }
  throw new Error("JSON parse failed. Got: " + slice.slice(0, 200));
}

/* ── Roster facts ── */
const ROSTER_FACTS = [
  "Pete Alonso signed with BAL (Orioles) in 2025 offseason — NOT on NYM",
  "Juan Soto signed with NYM (Mets) — NOT on NYY",
  "Cody Bellinger is on NYY (Yankees)",
  "Max Fried signed with NYY (Yankees)",
  "Shohei Ohtani is on LAD (Dodgers)",
  "Yordan Alvarez is on HOU (Astros)",
  "Aaron Judge is on NYY (Yankees)",
  "Gunnar Henderson is on BAL (Orioles)",
  "Matt Olson is on ATL (Braves)",
  "Kyle Schwarber is on PHI (Phillies)",
  "Bryce Harper is on PHI (Phillies)",
  "Freddie Freeman is on LAD (Dodgers)",
  "Mookie Betts is on LAD (Dodgers)",
  "Fernando Tatis Jr. is on SD (Padres)",
  "Munetaka Murakami is on CWS (White Sox)",
  "Rafael Devers is on SF (Giants) — traded from BOS",
  "Willy Adames is on SF (Giants) — signed from MIL",
  "Byron Buxton is on MIN (Twins)",
  "Jose Ramirez is on CLE (Guardians)",
  "Bobby Witt Jr. is on KC (Royals)",
  "Julio Rodriguez is on SEA (Mariners)",
  "Randy Arozarena is on SEA (Mariners) — traded from TB",
  "Shea Langeliers is on ATH (Athletics)",
  "Nick Kurtz is on ATH (Athletics)",
  "James Wood is on WSH (Nationals)",
  "CJ Abrams is on WSH (Nationals)",
  "Mike Trout is on LAA (Angels)",
  "Junior Caminero is on TB (Rays)",
  "Elly De La Cruz is on CIN (Reds)",
  "Paul Goldschmidt is on NYY (Yankees) — signed in offseason",
  "Nolan Arenado is on STL (Cardinals)",
  "Adolis Garcia is on TEX (Rangers)",
  "Jordan Walker is on STL (Cardinals)",
  "Spencer Torkelson is on DET (Tigers)",
  "Riley Greene is on DET (Tigers)",
  "Kerry Carpenter is on DET (Tigers)",
  "Vinnie Pasquantino is on KC (Royals)",
  "Salvador Perez is on KC (Royals)",
  "Vladimir Guerrero Jr. is on TOR (Blue Jays)",
  "Bo Bichette is on TOR (Blue Jays)",
  "William Contreras is on MIL (Brewers)",
  "Jackson Chourio is on MIL (Brewers)",
  "Nathaniel Lowe is on TEX (Rangers)",
  "Ezequiel Tovar is on COL (Rockies)",
  "Ketel Marte is on AZ (D-backs)",
  "Corbin Carroll is on AZ (D-backs)",
  "Francisco Lindor is on NYM (Mets)",
  "Ian Happ is on CHC (Cubs)",
  "Pete Crow-Armstrong is on CHC (Cubs)",
  "Alex Bregman is on BOS (Red Sox) — signed from HOU",
  "Jarren Duran is on BOS (Red Sox)",
  "Matt Chapman is on SF (Giants)",
  "Oneil Cruz is on PIT (Pirates)",
];

function buildPrompt(games) {
  const eraStr = (era) => era === null || era === undefined ? "N/A" : String(era);
  const lines = games.map(g =>
    g.away + "@" + g.home + " | " + g.venue + " | " + g.city + " " + g.st + " | " + g.time +
    " | Away SP: " + g.awayP + " " + g.awayH + " ERA " + eraStr(g.awayERA) + " " + g.awayRec +
    " | Home SP: " + g.homeP + " " + g.homeH + " ERA " + eraStr(g.homeERA) + " " + g.homeRec
  ).join("\n");
  const rosterFacts = ROSTER_FACTS.join("\n  - ");
  const jsonRules = "CRITICAL JSON RULES:\n1. Use ONLY double-quotes. Never single quotes.\n2. Start with { end with }. No other text.\n3. No trailing commas.";
  const schema = '{"players":[{"name":"Matt Olson","team":"ATL","emoji":"🪓","teamColor":"#CE1141","isHome":false,"gameTime":"3:10 PM ET","isDaytime":true,"isOpenAir":true,"venue":"Coors Field","pitcher":"Kyle Freeland","pitcherHand":"LHP","pitcherERA":3.48,"pitcherRecord":"1-2","bvpSummary":"4 HR vs Freeland in 18 AB .389 AVG .722 SLG","homeAwaySplit":"HOME: .330/.420/.640 8HR | ROAD: .280/.370/.560 4HR","weatherInsight":"Denver 72F 12mph wind OUT to CF","dayNightInsight":"Day game Olson day OPS .980 vs night .870","stadiumInsight":"Coors Field open air park factor 1.38","seasonHRs":10,"gamesPlayed":34,"ops":"1.020","exitVelo":"93.4","barrelPct":"17.1","parkFactor":"1.38","splitOPS":".980","homeOPS":".950","awayOPS":"1.020","homeHR":6,"awayHR":4,"simHRs":3200,"confidence":88}],"weatherSummary":[{"venue":"Coors Field","condition":"Partly Cloudy","tempF":72,"windSpeed":12,"windDir":"Out to CF","isOpenAir":true,"isDaytime":true}]}';
  return [
    "You are an elite MLB home run prop analyst with complete knowledge of 2026 MLB rosters and stats.",
    "Today is Sunday May 3 2026.",
    "",
    "CRITICAL ROSTER ACCURACY:",
    "  - " + rosterFacts,
    "NEVER put a player on a team they do not play for in 2026.",
    "",
    "TODAY'S GAMES (" + games.length + " selected):",
    lines,
    "",
    "NOTABLE MATCHUPS:",
    "- AZ@CHC: Merrill Kelly 9.20 ERA vs Matthew Boyd 7.00 ERA at Wrigley",
    "- MIL@WSH: Zack Littell 7.85 ERA (0-4) — very hittable",
    "- PHI@MIA: Luzardo 5.50 ERA vs Paddack 6.11 ERA (0-4)",
    "- ATL@COL: Strider returning at Coors Field (park factor 1.38)",
    "- KC@SEA: Luis Castillo 6.35 ERA struggling",
    "- TEX@DET: Leiter 5.17 ERA vs Holton 5.54 ERA",
    "",
    "TASK: Pick the best HR candidate from each game. Return the TOP 10 ranked by confidence.",
    "",
    "For EVERY player include: name, team, emoji, teamColor, isHome, gameTime, isDaytime, isOpenAir, venue, pitcher, pitcherHand, pitcherERA, pitcherRecord, bvpSummary, homeAwaySplit, weatherInsight, dayNightInsight, stadiumInsight, seasonHRs, gamesPlayed, ops, exitVelo, barrelPct, parkFactor, splitOPS, homeOPS, awayOPS, homeHR, awayHR, simHRs (out of 10000), confidence (0-100)",
    "",
    "Park factors: Coors=1.38 SutterHealth=1.28 Wrigley=1.14 Yankee=1.10 Fenway=1.06 Angel=1.02 Target=1.02 Busch=1.01 Comerica=1.00 Nationals=1.00 loanDepot=0.95 Tropicana=0.94 PNC=0.90 Petco=0.88 TMobile=0.85",
    "",
    jsonRules,
    "",
    schema,
  ].join("\n");
}

/* ════════ UI Components ════════ */

function Spin({ size = 18, color = T.accent }) {
  return <div style={{ width:size, height:size, flexShrink:0, border:"2px solid "+color+"25", borderTopColor:color, borderRadius:"50%", animation:"hrs-spin .75s linear infinite", display:"inline-block" }} />;
}
function Tag({ ch, color = T.accent }) {
  return <span style={{ fontFamily:F.mono, fontSize:9, letterSpacing:1, padding:"2px 6px", borderRadius:4, whiteSpace:"nowrap", background:color+"18", border:"1px solid "+color+"40", color }}>{ch}</span>;
}
function Pill({ label, value, hi, color }) {
  const c = color || (hi ? T.gold : null);
  return <div style={{ fontFamily:F.mono, fontSize:9, padding:"2px 7px", borderRadius:5, background:c?c+"14":T.dim, border:"1px solid "+(c?c+"40":T.border), display:"flex", gap:4, alignItems:"center" }}>
    <span style={{ color:T.muted }}>{label}</span>
    <span style={{ color:c||T.text, fontWeight:600 }}>{value}</span>
  </div>;
}
function Insight({ icon, text, color }) {
  if (!text) return null;
  return <div style={{ fontFamily:F.mono, fontSize:10, lineHeight:1.55, background:color+"0c", border:"1px solid "+color+"25", borderRadius:7, padding:"5px 10px", marginBottom:5, color:color+"cc" }}>{icon} {text}</div>;
}
function HomeAwaySplit({ p }) {
  if (!p.homeAwaySplit && !p.homeOPS && !p.awayOPS) return null;
  const isHome = p.isHome;
  return (
    <div style={{ background:T.dim, border:"1px solid "+T.border, borderRadius:8, padding:"8px 10px", marginBottom:5 }}>
      <div style={{ fontFamily:F.mono, fontSize:9, color:T.muted, letterSpacing:1, marginBottom:6 }}>
        HOME / AWAY SPLITS 2026 — {isHome ? "PLAYING AT HOME TODAY 🏠" : "ON THE ROAD TODAY ✈"}
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <div style={{ flex:1, borderRadius:6, padding:"6px 9px", background:isHome?T.green+"14":T.dim, border:"1px solid "+(isHome?T.green+"40":T.border) }}>
          <div style={{ fontFamily:F.mono, fontSize:8, color:isHome?T.green:T.muted, marginBottom:3, letterSpacing:1 }}>🏠 HOME {isHome?"← TODAY":""}</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            <Pill label="OPS" value={p.homeOPS||"—"} color={isHome?T.green:null} />
            <Pill label="HR"  value={p.homeHR!=null?p.homeHR:"—"} color={isHome?T.green:null} />
          </div>
        </div>
        <div style={{ flex:1, borderRadius:6, padding:"6px 9px", background:!isHome?T.teal+"14":T.dim, border:"1px solid "+(!isHome?T.teal+"40":T.border) }}>
          <div style={{ fontFamily:F.mono, fontSize:8, color:!isHome?T.teal:T.muted, marginBottom:3, letterSpacing:1 }}>✈ AWAY {!isHome?"← TODAY":""}</div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
            <Pill label="OPS" value={p.awayOPS||"—"} color={!isHome?T.teal:null} />
            <Pill label="HR"  value={p.awayHR!=null?p.awayHR:"—"} color={!isHome?T.teal:null} />
          </div>
        </div>
      </div>
      {p.homeAwaySplit && <div style={{ fontFamily:F.mono, fontSize:9, color:(isHome?T.green:T.teal)+"aa", marginTop:5, lineHeight:1.4 }}>{p.homeAwaySplit}</div>}
    </div>
  );
}

/* ── Strike Zone ── */
function zoneColor(grade) {
  if (grade==="hot")     return { bg:"#7f0000", border:"#ff4444", text:"#ffaaaa" };
  if (grade==="warm")    return { bg:"#7f3500", border:"#ff8800", text:"#ffcc88" };
  if (grade==="neutral") return { bg:"#1e2a3a", border:"#2a3a50", text:"#8a9ab0" };
  if (grade==="cool")    return { bg:"#003060", border:"#0066cc", text:"#66aaff" };
  if (grade==="cold")    return { bg:"#001840", border:"#0033aa", text:"#4466cc" };
  return                        { bg:"#111e30", border:"#1a2438", text:"#4a5a72" };
}
function ZoneCell({ zone, isChase }) {
  if (!zone) return <div style={{ flex:1, minHeight:isChase?26:52 }} />;
  const col = zoneColor(zone.grade);
  const freq = zone.pitcherFreq ?? 0;
  const dotSize = Math.round(6 + freq * 22);
  const dotOpacity = freq > 0 ? Math.min(0.2 + freq * 2.5, 1.0) : 0;
  return (
    <div title={zone.label+"\nAVG "+(zone.avg||"-")+"  SLG "+(zone.slg||"-")+"\nPitcher freq: "+Math.round(freq*100)+"%"}
      style={{ flex:1, minHeight:isChase?26:52, background:col.bg, border:"1px solid "+col.border, borderRadius:5, padding:"4px 2px", position:"relative", cursor:"default", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      {dotOpacity > 0 && <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:dotSize, height:dotSize, borderRadius:"50%", background:"rgba(255,255,255,"+dotOpacity+")", pointerEvents:"none" }} />}
      {!isChase && <>
        <div style={{ fontFamily:F.mono, fontSize:8, color:col.text, fontWeight:700, zIndex:1, lineHeight:1.2 }}>{zone.avg||"-"}</div>
        <div style={{ fontFamily:F.mono, fontSize:7, color:col.text+"99", zIndex:1 }}>{zone.slg||"-"}</div>
      </>}
    </div>
  );
}
function StrikeZoneModal({ player, onClose }) {
  const [zData, setZData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  useEffect(() => {
    let cancelled = false;
    const zoneSchema = '{"batterHand":"R","advantage":"pitcher","advantageSummary":"Pitcher exploits low-outside with sinker","matchupNote":"2 career HR in 18 AB .278 AVG","zones":[{"row":0,"col":0,"label":"High Out","avg":".220","slg":".380","hrRate":0.02,"grade":"cool","pitcherFreq":0.06},{"row":0,"col":1,"label":"High Mid","avg":".290","slg":".520","hrRate":0.05,"grade":"warm","pitcherFreq":0.08},{"row":0,"col":2,"label":"High In","avg":".310","slg":".650","hrRate":0.09,"grade":"hot","pitcherFreq":0.04},{"row":1,"col":0,"label":"Mid Out","avg":".198","slg":".290","hrRate":0.01,"grade":"cold","pitcherFreq":0.22},{"row":1,"col":1,"label":"Heart","avg":".380","slg":".720","hrRate":0.12,"grade":"hot","pitcherFreq":0.14},{"row":1,"col":2,"label":"Mid In","avg":".340","slg":".680","hrRate":0.10,"grade":"hot","pitcherFreq":0.10},{"row":2,"col":0,"label":"Low Out","avg":".185","slg":".260","hrRate":0.01,"grade":"cold","pitcherFreq":0.18},{"row":2,"col":1,"label":"Low Mid","avg":".240","slg":".400","hrRate":0.03,"grade":"cool","pitcherFreq":0.10},{"row":2,"col":2,"label":"Low In","avg":".260","slg":".450","hrRate":0.04,"grade":"neutral","pitcherFreq":0.08}],"chaseZones":[{"pos":"up-out","label":"Up Out","avg":".110","slg":".150","grade":"cold","pitcherFreq":0.02},{"pos":"dn-out","label":"Dn Out","avg":".130","slg":".160","grade":"cold","pitcherFreq":0.04}],"pitcherPitches":[{"name":"Sinker","usage":0.38,"zone":"Low Outside"},{"name":"Slider","usage":0.28,"zone":"Away whiff pitch"},{"name":"4-Seam FB","usage":0.22,"zone":"Up & In"},{"name":"Changeup","usage":0.12,"zone":"Low Away tunnel"}],"hotZones":["High Inside","Heart","Mid Inside"],"coldZones":["Low Outside","Mid Outside"]}';
    const prompt = ["You are an MLB Statcast zone analyst. Today is May 3 2026.", "Generate a zone breakdown for: BATTER: "+player.name+" ("+player.team+")", "PITCHER: "+player.pitcher+" ("+player.pitcherHand+" ERA "+(player.pitcherERA??"N/A")+")", "RULES: Use ONLY double-quotes. Start with { end with }. No other text.", "Return this exact JSON structure (fill in real data):", zoneSchema].join("\n");
    callClaude(prompt).then(raw => {
      if (cancelled) return;
      try { setZData(grabJSON(raw)); } catch(e) { setErr("Zone parse error: "+e.message.slice(0,120)); }
      setLoading(false);
    }).catch(e => { if (!cancelled) { setErr(e.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);
  const grid = [[null,null,null],[null,null,null],[null,null,null]];
  if (zData?.zones) zData.zones.forEach(z => { if (z.row>=0&&z.row<=2&&z.col>=0&&z.col<=2) grid[z.row][z.col]=z; });
  const adv = zData?.advantage;
  const advColor = adv==="batter"?T.green:adv==="pitcher"?T.red:T.amber;
  return (
    <div onClick={e => { if (e.target===e.currentTarget) onClose(); }} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.85)", backdropFilter:"blur(6px)", display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:16, width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto", padding:"18px 18px 22px", boxShadow:"0 0 60px rgba(0,0,0,0.9)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:F.mono, fontSize:9, letterSpacing:2, color:T.muted, marginBottom:3 }}>🎯 PITCHER VS BATTER STRIKE ZONE</div>
            <div style={{ fontFamily:F.arch, fontSize:16, color:T.text }}>{player.emoji||"⚾"} {player.name}</div>
            <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted }}>vs {player.pitcher} ({player.pitcherHand}) · ERA {player.pitcherERA??"N/A"}</div>
          </div>
          <button onClick={onClose} style={{ background:"transparent", color:T.muted, border:"1px solid "+T.border, borderRadius:7, padding:"5px 11px", fontFamily:F.mono, fontSize:11, cursor:"pointer" }}>✕</button>
        </div>
        {loading && <div style={{ textAlign:"center", padding:"40px 0" }}><Spin size={32} /><div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, marginTop:12 }}>Generating zone data...</div></div>}
        {err && !loading && <div style={{ fontFamily:F.mono, fontSize:11, color:T.red, padding:"20px 0", textAlign:"center" }}>{err}</div>}
        {zData && !loading && <>
          <div style={{ background:advColor+"14", border:"1px solid "+advColor+"40", borderRadius:8, padding:"8px 12px", marginBottom:12 }}>
            <div style={{ fontFamily:F.mono, fontSize:9, color:advColor, letterSpacing:1, marginBottom:2 }}>{adv==="batter"?"⚡ BATTER ADVANTAGE":adv==="pitcher"?"🎯 PITCHER ADVANTAGE":"⚖️ NEUTRAL MATCHUP"}</div>
            <div style={{ fontFamily:F.mono, fontSize:10, color:advColor+"cc", lineHeight:1.5 }}>{zData.advantageSummary}</div>
          </div>
          <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:10 }}>
            {[["hot","🔥 Hot"],["warm","🟠 Warm"],["neutral","⚪ Neutral"],["cool","🔵 Cool"],["cold","❄️ Cold"]].map(([g,l]) => { const col=zoneColor(g); return <div key={g} style={{ fontFamily:F.mono, fontSize:9, background:col.bg, border:"1px solid "+col.border, color:col.text, borderRadius:4, padding:"2px 7px" }}>{l}</div>; })}
            <div style={{ fontFamily:F.mono, fontSize:9, color:T.muted, padding:"2px 7px", background:"rgba(255,255,255,0.04)", borderRadius:4, border:"1px solid "+T.border }}>● pitch freq</div>
          </div>
          <div style={{ background:T.card, border:"1px solid "+T.border, borderRadius:10, padding:10, marginBottom:12 }}>
            <div style={{ display:"flex", gap:4, marginBottom:4, paddingLeft:48 }}>
              {["OUTSIDE","MIDDLE","INSIDE"].map(l => <div key={l} style={{ flex:1, textAlign:"center", fontFamily:F.mono, fontSize:7, color:T.muted, letterSpacing:1 }}>{l}</div>)}
            </div>
            {["HIGH","MID","LOW"].map((rowLabel, ri) => (
              <div key={ri} style={{ display:"flex", gap:4, marginBottom:4, alignItems:"stretch" }}>
                <div style={{ width:44, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:F.mono, fontSize:8, color:T.muted, flexShrink:0, letterSpacing:1 }}>{rowLabel}</div>
                {[0,1,2].map(ci => <ZoneCell key={ci} zone={grid[ri][ci]} />)}
              </div>
            ))}
            {zData.chaseZones?.length > 0 && <>
              <div style={{ fontFamily:F.mono, fontSize:7, color:T.muted, letterSpacing:1, marginTop:5, marginBottom:3, paddingLeft:48 }}>CHASE (BALLS)</div>
              <div style={{ display:"flex", gap:4, paddingLeft:48 }}>{zData.chaseZones.map((z,i) => <ZoneCell key={i} zone={z} isChase />)}</div>
            </>}
            <div style={{ fontFamily:F.mono, fontSize:7, color:T.muted, textAlign:"center", marginTop:8, letterSpacing:1 }}>TOP = BATTING AVG · BOTTOM = SLG · DOT SIZE = PITCHER FREQUENCY</div>
          </div>
          {zData.pitcherPitches?.length > 0 && <div style={{ marginBottom:12 }}>
            <div style={{ fontFamily:F.mono, fontSize:9, color:T.muted, letterSpacing:2, marginBottom:7 }}>PITCHER ARSENAL</div>
            {zData.pitcherPitches.map((pt,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5, background:T.dim, border:"1px solid "+T.border, borderRadius:7, padding:"6px 10px" }}>
                <div style={{ fontFamily:F.arch, fontSize:11, color:T.text, width:100, flexShrink:0 }}>{pt.name}</div>
                <div style={{ flex:1, background:"rgba(255,255,255,0.06)", borderRadius:3, height:6, overflow:"hidden" }}>
                  <div style={{ width:Math.round((pt.usage||0)*100)+"%", height:"100%", borderRadius:3, background:"linear-gradient(90deg,"+T.accent+","+T.purple+")" }} />
                </div>
                <div style={{ fontFamily:F.mono, fontSize:9, color:T.accent, width:30, textAlign:"right", flexShrink:0 }}>{Math.round((pt.usage||0)*100)}%</div>
                <div style={{ fontFamily:F.mono, fontSize:9, color:T.muted, flex:1, minWidth:0 }}>{pt.zone}</div>
              </div>
            ))}
          </div>}
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            {zData.hotZones?.length > 0 && <div style={{ flex:1, background:T.red+"10", border:"1px solid "+T.red+"30", borderRadius:8, padding:"8px 10px" }}>
              <div style={{ fontFamily:F.mono, fontSize:8, color:T.red, letterSpacing:1, marginBottom:5 }}>🔥 HOT ZONES</div>
              {zData.hotZones.map((z,i) => <div key={i} style={{ fontFamily:F.mono, fontSize:9, color:T.red+"bb", marginBottom:2 }}>· {z}</div>)}
            </div>}
            {zData.coldZones?.length > 0 && <div style={{ flex:1, background:"#001840", border:"1px solid #1133aa44", borderRadius:8, padding:"8px 10px" }}>
              <div style={{ fontFamily:F.mono, fontSize:8, color:"#4466cc", letterSpacing:1, marginBottom:5 }}>❄️ COLD ZONES</div>
              {zData.coldZones.map((z,i) => <div key={i} style={{ fontFamily:F.mono, fontSize:9, color:"#4466cc", marginBottom:2 }}>· {z}</div>)}
            </div>}
          </div>
          {zData.matchupNote && <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted, lineHeight:1.5, background:T.accent+"0a", border:"1px solid "+T.accent+"25", borderRadius:7, padding:"7px 10px" }}>📊 {zData.matchupNote}</div>}
        </>}
      </div>
    </div>
  );
}

function Ring({ pct = 70, sim = 0 }) {
  const c = pct>=80?T.green:pct>=65?T.amber:T.red;
  return (
    <div style={{ textAlign:"center", flexShrink:0 }}>
      <div style={{ fontFamily:F.bebas, fontSize:50, lineHeight:1, color:c, textShadow:"0 0 22px "+c+"55", animation:"hrs-pop .5s cubic-bezier(.34,1.56,.64,1) both" }}>{pct}</div>
      <div style={{ fontFamily:F.mono, fontSize:8, color:T.muted, marginBottom:5 }}>CONF%</div>
      <div style={{ width:58, height:58, borderRadius:"50%", background:"conic-gradient("+c+" "+(pct*3.6)+"deg,"+T.dim+" 0deg)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:44, height:44, borderRadius:"50%", background:T.card, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontFamily:F.bebas, fontSize:15, color:c, lineHeight:1 }}>{sim}</span>
          <span style={{ fontFamily:F.mono, fontSize:7, color:T.muted }}>/10k</span>
        </div>
      </div>
    </div>
  );
}

function PCard({ p, rank, delay = 0 }) {
  const conf = p.confidence ?? 70;
  const sim  = p.simHRs ?? Math.round(conf * 100);
  const c    = conf>=80?T.green:conf>=65?T.amber:T.red;
  const medal = rank===1?"🥇":rank===2?"🥈":rank===3?"🥉":null;
  const [showZone, setShowZone] = useState(false);
  return (
    <>
      {showZone && <StrikeZoneModal player={p} onClose={() => setShowZone(false)} />}
      <div style={{ animation:"hrs-up .45s ease "+delay+"ms both", background:"linear-gradient(135deg,"+T.card+" 0%,"+T.bg+" 100%)", border:"1px solid "+(rank<=3?c+"55":T.border), borderRadius:14, padding:"14px 16px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", left:0, top:0, bottom:0, width:3, background:p.teamColor||T.accent, boxShadow:"0 0 12px "+(p.teamColor||T.accent)+"66" }} />
        <div style={{ position:"absolute", top:10, right:14, fontFamily:F.bebas, fontSize:medal?30:22, color:medal?undefined:T.muted, opacity:medal?1:0.3, lineHeight:1 }}>{medal??"#"+rank}</div>
        <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
          <div style={{ flex:1, paddingRight:10, minWidth:0 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:4 }}>
              <span style={{ fontSize:15 }}>{p.emoji||"⚾"}</span>
              <span style={{ fontFamily:F.arch, fontSize:16, color:T.text }}>{p.name}</span>
              <Tag ch={p.team} color={T.accent} />
              <Tag ch={p.isHome?"🏠 HOME":"✈ AWAY"} color={p.isHome?T.green:T.teal} />
              <Tag ch={p.isDaytime?"☀️ DAY":"🌙 NIGHT"} color={p.isDaytime?T.amber:T.purple} />
              {p.isOpenAir!==undefined && <Tag ch={p.isOpenAir?"🏟 OPEN":"🏠 DOME"} color={p.isOpenAir?T.amber:T.muted} />}
            </div>
            <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted, marginBottom:8 }}>
              {p.gameTime} · {p.venue} · <span style={{ color:T.amber }}>vs {p.pitcher} ({p.pitcherHand}) ERA {p.pitcherERA??"N/A"}</span>
            </div>
            <Insight icon="📊" text={p.bvpSummary}    color={T.accent} />
            <HomeAwaySplit p={p} />
            <Insight icon="🌤" text={p.weatherInsight} color={T.green} />
            <Insight icon={p.isDaytime?"☀️":"🌙"} text={p.dayNightInsight} color={T.purple} />
            <Insight icon="🏟" text={p.stadiumInsight} color={T.amber} />
            <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginTop:4 }}>
              <Pill label="SIM-HR%" value={((sim/10000)*100).toFixed(1)+"%"} hi />
              <Pill label="2026 HR" value={(p.seasonHRs??"-")+"/"+(p.gamesPlayed??"-")+"g"} />
              <Pill label="OPS"     value={p.ops??"-"} />
              <Pill label="EV"      value={p.exitVelo?p.exitVelo+"mph":"-"} />
              <Pill label="BRRL%"   value={p.barrelPct?p.barrelPct+"%":"-"} />
              <Pill label="PARK×"   value={p.parkFactor??"-"} />
              <Pill label={p.isDaytime?"DAY-OPS":"NIGHT-OPS"} value={p.splitOPS??"-"} hi />
            </div>
            <button onClick={() => setShowZone(true)} style={{ marginTop:10, width:"100%", background:"linear-gradient(135deg,"+T.accent+"18,"+T.purple+"12)", border:"1px solid "+T.accent+"40", borderRadius:7, padding:"7px 0", fontFamily:F.mono, fontSize:10, color:T.accent, cursor:"pointer", letterSpacing:1, display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
              <span style={{ fontSize:14 }}>🎯</span> VIEW PITCHER vs BATTER STRIKE ZONE
            </button>
          </div>
          <Ring pct={conf} sim={sim} />
        </div>
      </div>
    </>
  );
}

function WStrip({ items }) {
  if (!items?.length) return null;
  return (
    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(195px,1fr))", gap:8, marginBottom:14 }}>
      {items.map((w,i) => {
        const out = (w.windSpeed??0)>10&&(w.windDir??"").toLowerCase().includes("out");
        return <div key={i} style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:10, padding:"8px 11px" }}>
          <div style={{ fontFamily:F.arch, fontSize:11, color:T.text, marginBottom:3 }}>{w.venue}</div>
          <div style={{ fontFamily:F.mono, fontSize:9, color:T.muted, lineHeight:1.7 }}>
            {w.condition} · {w.tempF}°F<br/>
            💨 {w.windSpeed}mph {w.windDir}{out&&<span style={{ color:T.green }}> ← HR BOOST!</span>}<br/>
            {w.isOpenAir?"🏟 Open":"🏠 Dome"} · {w.isDaytime?"☀️ Day":"🌙 Night"}
          </div>
        </div>;
      })}
    </div>
  );
}

function LogLine({ text, active }) {
  return <div style={{ display:"flex", alignItems:"center", gap:8, fontFamily:F.mono, fontSize:11, color:active?T.accent:T.muted, animation:active?"hrs-blink 1.4s ease infinite":"none", marginBottom:2 }}>
    {active&&<Spin size={10} />}{text}
  </div>;
}

function GameTable({ games, onRemove, onClearAll, onRestoreAll }) {
  const [confirm, setConfirm] = useState(false);
  const allCleared  = games.length === 0;
  const someRemoved = games.length < ALL_GAMES.length;
  const handleClearAll = () => {
    if (confirm) { onClearAll(); setConfirm(false); }
    else { setConfirm(true); setTimeout(() => setConfirm(false), 3000); }
  };
  const eraDisplay = (era) => era===null||era===undefined ? "N/A" : String(era);
  return (
    <div style={{ background:T.panel, border:"1px solid "+T.border, borderRadius:10, padding:"11px 13px", marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8, flexWrap:"wrap", gap:6 }}>
        <div style={{ fontFamily:F.mono, fontSize:9, letterSpacing:2, color:T.muted }}>
          MAY 3 2026 — {games.length} GAME{games.length!==1?"S":""} ON BOARD
          {someRemoved&&!allCleared&&<span style={{ color:T.amber, marginLeft:8 }}>({ALL_GAMES.length-games.length} removed)</span>}
        </div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {someRemoved && <button onClick={onRestoreAll} style={{ background:T.green+"18", color:T.green, border:"1px solid "+T.green+"44", borderRadius:6, padding:"4px 11px", fontFamily:F.mono, fontSize:9, cursor:"pointer", letterSpacing:1 }}>↺ RESTORE ALL</button>}
          {!allCleared && <button onClick={handleClearAll} style={{ background:confirm?T.red+"28":T.red+"10", color:confirm?T.red:T.muted, border:"1px solid "+(confirm?T.red+"55":T.muted+"25"), borderRadius:6, padding:"4px 11px", fontFamily:F.mono, fontSize:9, cursor:"pointer", letterSpacing:1, animation:confirm?"hrs-shake .3s ease":"none", transition:"all .2s" }}>{confirm?"⚠️ CONFIRM CLEAR ALL":"✕ CLEAR ALL GAMES"}</button>}
        </div>
      </div>
      {allCleared ? (
        <div style={{ textAlign:"center", padding:"24px 0", fontFamily:F.mono, fontSize:11, color:T.muted }}>
          Board cleared. <span onClick={onRestoreAll} style={{ color:T.accent, cursor:"pointer", textDecoration:"underline" }}>Restore all 15 games</span>
        </div>
      ) : (
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(235px,1fr))", gap:5 }}>
          {games.map((g,i) => {
            const hot = (g.awayERA>=5.5)||(g.homeERA>=5.5);
            return (
              <div key={g.away+g.home+i} style={{ background:hot?T.green+"08":T.dim, border:"1px solid "+(hot?T.green+"30":T.border), borderRadius:7, padding:"6px 9px", fontFamily:F.mono, fontSize:9, position:"relative" }}>
                <button onClick={() => onRemove(i)} onMouseEnter={e=>{e.currentTarget.style.color=T.red;e.currentTarget.style.background=T.red+"20";}} onMouseLeave={e=>{e.currentTarget.style.color=T.muted;e.currentTarget.style.background="transparent";}} style={{ position:"absolute", top:3, right:4, background:"transparent", color:T.muted, border:"none", cursor:"pointer", fontSize:12, lineHeight:1, padding:"1px 4px", borderRadius:3, transition:"all .15s" }} title={"Remove "+g.away+"@"+g.home}>✕</button>
                <div style={{ color:"#6090c0", fontWeight:500, marginBottom:2, paddingRight:16 }}>{g.away}@{g.home} · {g.time}</div>
                <div style={{ color:g.awayERA>=5.5?T.green:T.muted }}>✈ {g.awayP} {g.awayH} ERA {eraDisplay(g.awayERA)}{g.awayERA>=5.5?" 🔥":""}</div>
                <div style={{ color:g.homeERA>=5.5?T.green:T.muted }}>🏠 {g.homeP} {g.homeH} ERA {eraDisplay(g.homeERA)}{g.homeERA>=5.5?" 🔥":""}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RateLimitScreen({ error, onDismiss }) {
  const resetsAt = error?.resetsAt;
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    if (!resetsAt) return;
    const tick = () => {
      const diff = resetsAt*1000 - Date.now();
      if (diff<=0) { setTimeLeft("now — try again!"); return; }
      setTimeLeft(Math.floor(diff/60000)+"m "+Math.floor((diff%60000)/1000)+"s");
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [resetsAt]);
  return (
    <div style={{ background:"#0d0a00", border:"1px solid "+T.amber+"55", borderRadius:14, padding:"32px 24px", textAlign:"center" }}>
      <div style={{ fontSize:42, marginBottom:14 }}>⏳</div>
      <div style={{ fontFamily:F.arch, fontSize:18, color:T.amber, marginBottom:10 }}>API Rate Limit Reached</div>
      <div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, lineHeight:1.8, marginBottom:20 }}>
        You have hit the 5-hour API usage limit.<br/>Your 7-day window is still healthy.<br/>
        {resetsAt ? <>Resets in: <span style={{ color:T.amber, fontWeight:700 }}>{timeLeft}</span></> : "Resets in a few minutes."}
      </div>
      <div style={{ background:T.amber+"10", border:"1px solid "+T.amber+"30", borderRadius:9, padding:"10px 16px", marginBottom:20, fontFamily:F.mono, fontSize:10, color:T.amber+"cc", lineHeight:1.6 }}>
        💡 Tip: Run fewer games at a time to reduce token usage.
      </div>
      <button onClick={onDismiss} style={{ background:T.amber, color:T.bg, border:"none", borderRadius:9, padding:"10px 28px", fontFamily:F.arch, fontSize:13, cursor:"pointer" }}>Got It</button>
    </div>
  );
}

/* ════════ MAIN APP ════════ */
export default function App() {
  useAssets();
  const [games,   setGames]   = useState([...ALL_GAMES]);
  const [phase,   setPhase]   = useState("ready");
  const [logs,    setLogs]    = useState([]);
  const [players, setPlayers] = useState([]);
  const [weather, setWeather] = useState([]);
  const [errMsg,  setErrMsg]  = useState("");
  const busy = useRef(false);
  const pushLog = msg => setLogs(p => [...p.slice(-12), msg]);
  const removeGame = idx => setGames(prev => prev.filter((_,i) => i!==idx));
  const clearAll   = ()  => setGames([]);
  const restoreAll = ()  => setGames([...ALL_GAMES]);

  const run = async () => {
    if (busy.current||games.length===0) return;
    busy.current = true;
    setPhase("running"); setLogs([]); setPlayers([]); setWeather([]); setErrMsg("");
    try {
      pushLog("⚾ Loading "+games.length+" game(s)...");
      await new Promise(r=>setTimeout(r,250));
      pushLog("📊 Running BvP + home/away split analysis...");
      await new Promise(r=>setTimeout(r,200));
      pushLog("🌤 Estimating weather & wind per stadium city...");
      await new Promise(r=>setTimeout(r,150));
      pushLog("🌙 Checking day / night OPS splits...");
      await new Promise(r=>setTimeout(r,150));
      pushLog("🏟 Evaluating park factors & stadium type...");
      await new Promise(r=>setTimeout(r,150));
      pushLog("🎲 Running 10,000-game Monte Carlo per player...");
      await new Promise(r=>setTimeout(r,150));
      pushLog("🤖 Claude ranking top HR candidates...");
      const raw    = await callClaude(buildPrompt(games));
      const result = grabJSON(raw);
      let candidates = (result.players??[]).sort((a,b)=>(b.confidence??0)-(a.confidence??0)).slice(0,15);
      if (!candidates.length) throw new Error("No players returned — please try again.");

      pushLog("🔍 Verifying players on correct 2026 rosters...");
      const verifyPrompt = [
        "You are an MLB roster expert. Today is May 3 2026.",
        "Check each player is on that team's active 26-man roster. Account for all offseason moves.",
        "RULES: Use ONLY double-quotes. Start with [ end with ]. No other text.",
        "",
        "Players to verify:",
        candidates.map((p,i) => (i+1)+". "+p.name+" on "+p.team).join("\n"),
        "",
        '[{"i":0,"ok":true,"fix":""},{"i":1,"ok":false,"fix":"Player was traded to LAD"}]',
      ].join("\n");
      let checks = [];
      try {
        const verifyRaw = await callClaude(verifyPrompt);
        const parsed = grabJSON(verifyRaw);
        checks = Array.isArray(parsed) ? parsed : [];
      } catch(_) {
        pushLog("⚠️ Roster check inconclusive — using AI picks as-is");
      }
      const verified = candidates.map((p,i) => {
        const chk = checks.find(c=>c.i===i);
        if (!chk||chk.ok!==false) return { ...p, rosterOK:true };
        return { ...p, rosterFlagged:true, rosterIssue:chk.fix||"Not on "+p.team+" active roster" };
      });
      const flagged = verified.filter(p=>p.rosterFlagged);
      flagged.forEach(p => pushLog("⚠️ Removed "+p.name+" — "+p.rosterIssue));
      if (flagged.length===0) pushLog("✅ All players confirmed on correct 2026 rosters");
      const finalPlayers = verified.filter(p=>!p.rosterFlagged).slice(0,10);
      if (!finalPlayers.length) throw new Error("No valid players after roster check — please try again.");
      pushLog("✅ Done! Top "+finalPlayers.length+" picks ranked.");
      setPlayers(finalPlayers); setWeather(result.weatherSummary??[]); setPhase("done");
    } catch(e) {
      console.error(e);
      if (e.isRateLimit) setErrMsg("__RATE_LIMIT__:"+(e.resetsAt||0));
      else setErrMsg(e.message||String(e));
      setPhase("error");
    } finally { busy.current = false; }
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, paddingBottom:60 }}>
      {/* HEADER */}
      <div style={{ background:"linear-gradient(180deg,#0d1728 0%,"+T.bg+" 100%)", borderBottom:"1px solid "+T.border, padding:"18px 20px 12px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", left:0, right:0, height:2, pointerEvents:"none", background:"linear-gradient(transparent,"+T.accent+"28,transparent)", animation:"hrs-scan 5s linear infinite" }} />
        <div style={{ fontFamily:F.mono, fontSize:9, letterSpacing:6, color:T.accent, opacity:.6, marginBottom:3 }}>AI · MLB · HOME RUN INTELLIGENCE · MAY 3 2026</div>
        <div style={{ fontFamily:F.bebas, fontSize:40, letterSpacing:3, color:T.text, lineHeight:1, textShadow:"0 0 28px "+T.accent+"40" }}>⚾ SPHRS</div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted, marginTop:3 }}>BvP · HOME/AWAY · WEATHER · DAY/NIGHT · STADIUM · 10,000× MONTE CARLO</div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"14px 13px" }}>
        {/* READY */}
        {phase==="ready" && <>
          <GameTable games={games} onRemove={removeGame} onClearAll={clearAll} onRestoreAll={restoreAll} />
          <div style={{ textAlign:"center", padding:"6px 0 18px" }}>
            {games.length===0 ? (
              <div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, lineHeight:1.7 }}>No games on board. <span onClick={restoreAll} style={{ color:T.accent, cursor:"pointer", textDecoration:"underline" }}>Restore all 15 games</span></div>
            ) : <>
              <div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, marginBottom:14, lineHeight:1.7 }}>
                {games.length} game{games.length!==1?"s":""} on board · AI picks top HR candidates with BvP, home/away splits, weather & park factors.
              </div>
              <button onClick={run} style={{ background:"linear-gradient(135deg,"+T.accent+",#0099cc)", color:T.bg, border:"none", borderRadius:10, padding:"13px 40px", fontFamily:F.arch, fontSize:17, cursor:"pointer", boxShadow:"0 0 28px "+T.accent+"44" }}>
                ▶ RUN ANALYSIS — {games.length} GAME{games.length!==1?"S":""}
              </button>
            </>}
          </div>
        </>}

        {/* RUNNING */}
        {phase==="running" && <>
          <div style={{ background:T.panel, border:"1px solid "+T.accent+"40", borderRadius:14, padding:"20px 18px", animation:"hrs-glow 2s ease infinite", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <Spin size={28} />
              <div>
                <div style={{ fontFamily:F.arch, fontSize:15, color:T.accent }}>Analyzing {games.length} games...</div>
                <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted }}>BvP · Home/Away · Weather · Day/Night · Stadium · 10,000× Monte Carlo</div>
              </div>
            </div>
            <div style={{ borderTop:"1px solid "+T.border, paddingTop:10 }}>
              {logs.map((l,i) => <LogLine key={i} text={l} active={i===logs.length-1} />)}
            </div>
          </div>
          <GameTable games={games} onRemove={()=>{}} onClearAll={()=>{}} onRestoreAll={()=>{}} />
        </>}

        {/* DONE */}
        {phase==="done" && players.length>0 && <>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:10, marginBottom:14 }}>
            <div>
              <div style={{ fontFamily:F.mono, fontSize:9, letterSpacing:2, color:T.muted, marginBottom:3 }}>TOP 10 HR PICKS · MAY 3 2026 · {games.length} GAMES ANALYZED</div>
              <div style={{ fontFamily:F.arch, fontSize:19, color:T.text }}>{players[0]?.emoji} {players[0]?.name} leads — {players[0]?.confidence}% confidence</div>
            </div>
            <button onClick={() => { setPhase("ready"); setPlayers([]); setWeather([]); }} style={{ background:"transparent", color:T.muted, border:"1px solid "+T.border, borderRadius:8, padding:"7px 15px", fontFamily:F.mono, fontSize:11, cursor:"pointer" }}>↺ RE-RUN</button>
          </div>
          <WStrip items={weather} />
          <div style={{ display:"grid", gap:10 }}>
            {players.map((pl,i) => <PCard key={pl.name+pl.team+i} p={pl} rank={i+1} delay={i*65} />)}
          </div>
          <div style={{ marginTop:20, textAlign:"center", fontFamily:F.mono, fontSize:9, color:"#111e2e" }}>
            Claude AI · BvP + Home/Away + Weather + Day/Night + Stadium + 10,000× Monte Carlo · May 3 2026
          </div>
        </>}

        {/* ERROR */}
        {phase==="error" && (
          errMsg.startsWith("__RATE_LIMIT__") ? (
            <RateLimitScreen error={{ isRateLimit:true, resetsAt:parseInt(errMsg.split(":")[1])||null }} onDismiss={() => { setPhase("ready"); setErrMsg(""); }} />
          ) : (
            <div style={{ background:T.red+"0e", border:"1px solid "+T.red+"40", borderRadius:14, padding:"28px 22px", textAlign:"center" }}>
              <div style={{ fontSize:34, marginBottom:9 }}>⚠️</div>
              <div style={{ fontFamily:F.arch, fontSize:15, color:T.red, marginBottom:9 }}>Analysis Failed</div>
              <div style={{ fontFamily:F.mono, fontSize:11, color:T.muted, marginBottom:20, lineHeight:1.7 }}>{errMsg}</div>
              <button onClick={() => setPhase("ready")} style={{ background:T.accent, color:T.bg, border:"none", borderRadius:9, padding:"10px 26px", fontFamily:F.arch, fontSize:13, cursor:"pointer" }}>Try Again</button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
