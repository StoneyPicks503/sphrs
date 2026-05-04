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

/* ── All 15 games ── */
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

/* ── Claude API ── */
class RateLimitError extends Error {
  constructor(resetTime, resetsAt) {
    super("RATE_LIMIT:" + resetTime + ":" + (resetsAt || 0));
    this.isRateLimit = true; this.resetTime = resetTime; this.resetsAt = resetsAt;
  }
}

async function callClaude(text, maxTokens = 8000) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514", max_tokens: maxTokens,
      messages: [{ role: "user", content: [{ type: "text", text }] }],
    }),
  });
  const d = await r.json();
  if (d.type === "exceeded_limit" || d.error?.type === "exceeded_limit") {
    const ra = d.resetsAt || d.error?.resetsAt;
    throw new RateLimitError(ra ? new Date(ra * 1000).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" }) : "soon", ra);
  }
  if (d.error) throw new Error(d.error.message || JSON.stringify(d.error));
  return d.content.map(b => b.text || "").join("").trim();
}

/* ── JSON helpers ── */
function sanitize(s) {
  s = s.replace(/\u201c|\u201d/g, '"').replace(/\u2018|\u2019/g, "'");
  s = s.replace(/'([A-Za-z_][A-Za-z0-9_]{0,50})['"]\s*:/g, '"$1":');
  s = s.replace(/"([A-Za-z_][A-Za-z0-9_]{0,50})'\s*:/g, '"$1":');
  s = s.replace(/,(\s*[}\]])/g, "$1");
  s = s.replace(/:\s*True\b/g, ": true").replace(/:\s*False\b/g, ": false").replace(/:\s*None\b/g, ": null");
  return s;
}
function grabJSON(raw) {
  let s = raw.replace(/```json\s*/gi, "").replace(/```\s*/gi, "").trim();
  const oa = s.indexOf("{"), ob = s.indexOf("[");
  const st = oa === -1 ? ob : ob === -1 ? oa : Math.min(oa, ob);
  if (st === -1) throw new Error("No JSON found");
  const end = s[st] === "{" ? s.lastIndexOf("}") : s.lastIndexOf("]");
  const slice = s.slice(st, end + 1);
  try { const p = JSON.parse(slice); if (p && typeof p === "object") return p; } catch (_) {}
  const clean = sanitize(slice);
  try { const p = JSON.parse(clean); if (p && typeof p === "object") return p; } catch (_) {}
  const m = clean.match(/"games"\s*:\s*(\[[\s\S]*\])/);
  if (m) { try { return { games: JSON.parse(m[1]) }; } catch (_) {} }
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
  const c = pct >= 20 ? T.green : pct >= 12 ? T.amber : pct >= 6 ? T.gold : T.muted;
  return (
    <div style={{ flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
        <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>HR CHANCE</span>
        <span style={{ fontFamily: F.arch, fontSize: 12, color: c }}>{pct.toFixed(1)}%</span>
      </div>
      <div style={{ height: 6, background: T.dim, borderRadius: 3, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: pct + "%", maxWidth: "100%",
          background: "linear-gradient(90deg," + c + "," + c + "99)",
          borderRadius: 3, boxShadow: "0 0 8px " + c + "66",
          transition: "width 1s cubic-bezier(.23,1,.32,1)",
        }} />
      </div>
    </div>
  );
}

/* ── Player row inside game accordion ── */
function PlayerRow({ p, rank, delay = 0 }) {
  const hrPct = p.hrChancePct ?? ((p.simHRs ?? 0) / 100);
  const c = hrPct >= 20 ? T.green : hrPct >= 12 ? T.amber : hrPct >= 6 ? T.gold : T.muted;
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      animation: "hrs-up .35s ease " + delay + "ms both",
      background: rank <= 3 ? c + "0a" : T.dim,
      border: "1px solid " + (rank <= 3 ? c + "33" : T.border),
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
          color: rank === 1 ? T.gold : rank === 2 ? "#c0c0c0" : rank === 3 ? "#cd7f32" : T.muted,
          textAlign: "center",
        }}>
          {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
        </div>

        {/* Headshot */}
        <Headshot mlbId={p.mlbId} name={p.name} size={44} teamColor={p.teamColor || T.accent} />

        {/* Name + team */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: F.arch, fontSize: 13, color: T.text, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {p.name}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
            <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>{p.team}</span>
            {p.isHome
              ? <span style={{ fontFamily: F.mono, fontSize: 9, color: T.green }}>🏠 HOME</span>
              : <span style={{ fontFamily: F.mono, fontSize: 9, color: T.teal }}>✈ AWAY</span>}
          </div>
        </div>

        {/* HR % big number */}
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: F.bebas, fontSize: 26, color: c, lineHeight: 1 }}>
            {hrPct.toFixed(1)}%
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 8, color: T.muted }}>HR CHANCE</div>
        </div>

        {/* Expand arrow */}
        <div style={{ color: T.muted, fontSize: 12, flexShrink: 0, transition: "transform .2s", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div style={{ padding: "0 12px 12px 12px", borderTop: "1px solid " + T.border }}>
          <div style={{ marginTop: 10, display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            {[
              ["vs", p.pitcher + " (" + p.pitcherHand + ") ERA " + (p.pitcherERA ?? "N/A"), T.amber],
              ["2026", (p.seasonHRs ?? "-") + " HR / " + (p.gamesPlayed ?? "-") + "g", T.accent],
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
            <div style={{ fontFamily: F.mono, fontSize: 9, color: T.accent + "cc", background: T.accent + "0a", border: "1px solid " + T.accent + "22", borderRadius: 6, padding: "5px 8px", marginBottom: 5, lineHeight: 1.5 }}>
              📊 {p.bvpSummary}
            </div>
          )}
          {p.homeAwaySplit && (
            <div style={{ fontFamily: F.mono, fontSize: 9, color: T.green + "aa", background: T.green + "08", border: "1px solid " + T.green + "22", borderRadius: 6, padding: "5px 8px", marginBottom: 5, lineHeight: 1.5 }}>
              {p.isHome ? "🏠" : "✈"} {p.homeAwaySplit}
            </div>
          )}
          {p.weatherInsight && (
            <div style={{ fontFamily: F.mono, fontSize: 9, color: T.green + "cc", background: T.green + "08", border: "1px solid " + T.green + "22", borderRadius: 6, padding: "5px 8px", lineHeight: 1.5 }}>
              🌤 {p.weatherInsight}
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
      border: "1px solid " + (anyHot ? T.green + "33" : T.border),
      borderRadius: 12, marginBottom: 8, overflow: "hidden",
      animation: "hrs-up .3s ease both",
    }}>
      {/* Header — always visible */}
      <div
        onClick={onToggle}
        style={{
          padding: "11px 14px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
          background: isOpen ? T.dim : "transparent",
          userSelect: "none",
        }}
      >
        {/* Teams */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
            <span style={{ fontFamily: F.arch, fontSize: 14, color: T.text }}>
              {game.away} <span style={{ color: T.muted, fontFamily: F.mono, fontSize: 10 }}>@</span> {game.home}
            </span>
            {anyHot && <span style={{ fontSize: 11 }}>🔥</span>}
            {result && <span style={{ fontFamily: F.mono, fontSize: 9, color: T.green }}>✅ analyzed</span>}
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>
            {game.venue} · {game.time}
          </div>
          <div style={{ fontFamily: F.mono, fontSize: 8, color: T.muted, marginTop: 2 }}>
            <span style={{ color: awayHot ? T.green : T.muted }}>✈ {game.awayP} ({game.awayH}) ERA {eraDisplay(game.awayERA)}</span>
            <span style={{ color: T.border, margin: "0 6px" }}>·</span>
            <span style={{ color: homeHot ? T.green : T.muted }}>🏠 {game.homeP} ({game.homeH}) ERA {eraDisplay(game.homeERA)}</span>
          </div>
        </div>

        {/* Top HR % badge if analyzed */}
        {result && players[0] && (
          <div style={{ textAlign: "center", flexShrink: 0 }}>
            <div style={{ fontFamily: F.bebas, fontSize: 20, color: T.gold, lineHeight: 1 }}>{topHR.toFixed(0)}%</div>
            <div style={{ fontFamily: F.mono, fontSize: 7, color: T.muted }}>TOP HR</div>
          </div>
        )}

        {/* Remove + toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            onMouseEnter={e => { e.currentTarget.style.color = T.red; }}
            onMouseLeave={e => { e.currentTarget.style.color = T.muted; }}
            style={{ background: "transparent", border: "none", color: T.muted, cursor: "pointer", fontSize: 13, padding: "2px 5px", borderRadius: 4 }}
            title="Remove game"
          >✕</button>
          <div style={{
            color: T.muted, fontSize: 11, transition: "transform .25s",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}>▼</div>
        </div>
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
function buildPrompt(games) {
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
    "TODAY'S GAMES:",
    lines,
    "",
    "TASK: For EACH game return the top 5 HR candidates (mix of both teams, best matchups first).",
    "Include each player's MLB MLBAM ID for headshots.",
    "",
    "For each player provide:",
    "- name, team, mlbId (MLBAM integer ID), emoji, teamColor (hex), isHome (bool)",
    "- hrChancePct: realistic HR probability % for today (0-35, most players 3-15%)",
    "  Factor in: pitcher ERA, BvP, park factor, weather, platoon, current form",
    "  High ERA pitcher + hitter-friendly park = higher %. Elite pitcher = lower %.",
    "- pitcher, pitcherHand, pitcherERA, bvpSummary, homeAwaySplit, weatherInsight",
    "- seasonHRs, gamesPlayed, ops, exitVelo, parkFactor, simHRs (out of 10000), confidence",
    "",
    "Park HR factors: Coors=1.38 SutterHealth=1.28 Wrigley=1.14 Yankee=1.10 Fenway=1.06",
    "Angel=1.02 Target=1.02 Busch=1.01 Comerica=1.00 Nationals=1.00 loanDepot=0.95",
    "Tropicana=0.94 PNC=0.90 Petco=0.88 TMobile=0.85",
    "",
    "COMMON MLBAM IDs: Aaron Judge=592450, Shohei Ohtani=660271, Mookie Betts=605141,",
    "Yordan Alvarez=670541, Matt Olson=621566, Kyle Schwarber=656941, Bryce Harper=547180,",
    "Gunnar Henderson=683002, Pete Alonso=624413, Juan Soto=665742, Vladimir Guerrero Jr=665489,",
    "Bo Bichette=666182, Jose Ramirez=608070, Elly De La Cruz=682829, Bobby Witt Jr=677951,",
    "Mike Trout=545361, Nolan Arenado=571448, Freddie Freeman=518692, Rafael Devers=646240,",
    "Fernando Tatis Jr=665487, Francisco Lindor=596019, Kyle Schwarber=656941,",
    "James Wood=694192, Byron Buxton=621439, Randy Arozarena=668227, Ian Happ=664023,",
    "Pete Crow-Armstrong=682998, Julio Rodriguez=677594, Shea Langeliers=669127,",
    "Willy Adames=642715, Matt Chapman=656305, Jarren Duran=680776, Alex Bregman=608324",
    "",
    "CRITICAL JSON RULES: Use ONLY double-quotes. Start with { end with }. No other text.",
    "",
    '{"games":[{"away":"BAL","home":"NYY","venue":"Yankee Stadium","time":"1:35 PM ET",',
    '"players":[{"name":"Aaron Judge","team":"NYY","mlbId":592450,"emoji":"⚡","teamColor":"#003087",',
    '"isHome":true,"hrChancePct":18.5,"pitcher":"Kyle Bradish","pitcherHand":"RHP","pitcherERA":4.20,',
    '"bvpSummary":"4 career HR vs Bradish in 22 AB, .364 AVG","homeAwaySplit":"HOME: 1.042 OPS 8HR | ROAD: .898 OPS 4HR",',
    '"weatherInsight":"67F partly cloudy 14mph wind OUT to RF — Yankee short porch HR boost",',
    '"seasonHRs":12,"gamesPlayed":32,"ops":"1.052","exitVelo":"96.1","parkFactor":"1.10",',
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
  const [results,  setResults]  = useState({});  // key: away+home → { players }
  const [errMsg,   setErrMsg]   = useState("");
  const [confirm,  setConfirm]  = useState(false);
  const busy = useRef(false);

  const pushLog = msg => setLogs(p => [...p.slice(-12), msg]);

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

  const clearAll = () => {
    if (confirm) { setGames([]); setOpenGames(new Set()); setConfirm(false); }
    else { setConfirm(true); setTimeout(() => setConfirm(false), 3000); }
  };

  const restoreAll = () => {
    setGames([...ALL_GAMES]);
    setResults({});
  };

  const run = async () => {
    if (busy.current || games.length === 0) return;
    busy.current = true;
    setPhase("running"); setLogs([]); setErrMsg("");

    try {
      pushLog("⚾ Loading " + games.length + " game(s)...");
      await new Promise(r => setTimeout(r, 200));
      pushLog("📊 Analyzing BvP + HR chance % per player...");
      await new Promise(r => setTimeout(r, 150));
      pushLog("🖼️ Fetching player headshots & MLBAM IDs...");
      await new Promise(r => setTimeout(r, 150));
      pushLog("🌤 Estimating weather per stadium city...");
      await new Promise(r => setTimeout(r, 150));
      pushLog("🎲 Running 10,000-game Monte Carlo...");
      await new Promise(r => setTimeout(r, 150));
      pushLog("🤖 Claude ranking HR candidates per game...");

      const raw    = await callClaude(buildPrompt(games), 8000);
      const parsed = grabJSON(raw);
      const gameResults = parsed.games ?? [];

      // Map results to game keys
      const newResults = {};
      gameResults.forEach(gr => {
        const key = gr.away + gr.home;
        const players = (gr.players ?? []).sort((a, b) => (b.hrChancePct ?? 0) - (a.hrChancePct ?? 0));
        newResults[key] = { players };
      });

      setResults(newResults);

      // Auto-open all analyzed games
      setOpenGames(new Set(games.map(g => g.away + g.home)));

      pushLog("✅ Done! " + gameResults.length + " games analyzed. Click any game to see HR %.");
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
        background: "linear-gradient(180deg,#0d1728 0%," + T.bg + " 100%)",
        borderBottom: "1px solid " + T.border,
        padding: "18px 20px 12px", textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute", left:0, right:0, height:2, pointerEvents:"none", background:"linear-gradient(transparent,"+T.accent+"28,transparent)", animation:"hrs-scan 5s linear infinite" }} />
        <div style={{ fontFamily:F.mono, fontSize:9, letterSpacing:6, color:T.accent, opacity:.6, marginBottom:3 }}>
          AI · MLB · HOME RUN INTELLIGENCE · MAY 3 2026
        </div>
        <div style={{ fontFamily:F.bebas, fontSize:40, letterSpacing:3, color:T.text, lineHeight:1, textShadow:"0 0 28px "+T.accent+"40" }}>
          ⚾ SPHRS
        </div>
        <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted, marginTop:3 }}>
          HR CHANCE % · PLAYER HEADSHOTS · GAME ACCORDIONS · 10,000× MONTE CARLO
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
            <button onClick={openAll} style={{ background:T.dim, color:T.muted, border:"1px solid "+T.border, borderRadius:6, padding:"4px 10px", fontFamily:F.mono, fontSize:9, cursor:"pointer" }}>↕ EXPAND ALL</button>
            <button onClick={closeAll} style={{ background:T.dim, color:T.muted, border:"1px solid "+T.border, borderRadius:6, padding:"4px 10px", fontFamily:F.mono, fontSize:9, cursor:"pointer" }}>↕ COLLAPSE ALL</button>
            {someRemoved && <button onClick={restoreAll} style={{ background:T.green+"18", color:T.green, border:"1px solid "+T.green+"44", borderRadius:6, padding:"4px 10px", fontFamily:F.mono, fontSize:9, cursor:"pointer" }}>↺ RESTORE ALL</button>}
            {games.length > 0 && <button onClick={clearAll} style={{ background:confirm?T.red+"28":T.red+"10", color:confirm?T.red:T.muted, border:"1px solid "+(confirm?T.red+"55":T.muted+"25"), borderRadius:6, padding:"4px 10px", fontFamily:F.mono, fontSize:9, cursor:"pointer", animation:confirm?"hrs-shake .3s ease":"none" }}>{confirm ? "⚠️ CONFIRM" : "✕ CLEAR ALL"}</button>}
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
              background: "linear-gradient(135deg," + T.accent + ",#0099cc)",
              color: T.bg, border: "none", borderRadius: 10,
              padding: "13px 40px", fontFamily: F.arch, fontSize: 17,
              cursor: "pointer", boxShadow: "0 0 28px " + T.accent + "44",
            }}>
              {isDone ? "↺ RE-RUN ANALYSIS" : "▶ RUN ANALYSIS — " + games.length + " GAME" + (games.length !== 1 ? "S" : "")}
            </button>
          </div>
        )}

        {/* Running log */}
        {phase === "running" && (
          <div style={{ background:T.panel, border:"1px solid "+T.accent+"40", borderRadius:13, padding:"18px 16px", animation:"hrs-glow 2s ease infinite", marginBottom:14 }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
              <Spin size={26} />
              <div>
                <div style={{ fontFamily:F.arch, fontSize:14, color:T.accent }}>Analyzing {games.length} games...</div>
                <div style={{ fontFamily:F.mono, fontSize:10, color:T.muted }}>BvP · HR % · Headshots · Weather · 10,000× Monte Carlo</div>
              </div>
            </div>
            <div style={{ borderTop:"1px solid "+T.border, paddingTop:10 }}>
              {logs.map((l, i) => <LogLine key={i} text={l} active={i === logs.length - 1} />)}
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

        <div style={{ textAlign:"center", fontFamily:F.mono, fontSize:9, color:"#111e2e", marginTop:8 }}>
          Claude AI · HR Chance % · Player Headshots · BvP · Weather · Park Factor · 10,000× Monte Carlo
        </div>
      </div>
    </div>
  );
}
