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
  { away:"NYM", home:"COL", venue:"Coors Field",       city:"Denver",         st:"CO", time:"5:40 PM ET",
    awayP:"Huascar Brazoban",   awayH:"RHP", awayERA:1.15, awayRec:"2-0",
    homeP:"Tomoyuki Sugano",    homeH:"RHP", homeERA:2.84, homeRec:"3-1" },
  { away:"PHI", home:"MIA", venue:"loanDepot Park",    city:"Miami",          st:"FL", time:"6:40 PM ET",
    awayP:"Aaron Nola",         awayH:"RHP", awayERA:6.03, awayRec:"1-3",
    homeP:"Janson Junk",        homeH:"RHP", homeERA:3.00, homeRec:"2-2" },
  { away:"TOR", home:"TB",  venue:"Tropicana Field",   city:"St. Petersburg", st:"FL", time:"6:40 PM ET",
    awayP:"Eric Lauer",         awayH:"LHP", awayERA:6.00, awayRec:"1-3",
    homeP:"Nick Martinez",      homeH:"RHP", homeERA:1.70, homeRec:"2-1" },
  { away:"BOS", home:"DET", venue:"Comerica Park",     city:"Detroit",        st:"MI", time:"6:10 PM ET",
    awayP:"Payton Tolle",       awayH:"LHP", awayERA:3.38, awayRec:"0-1",
    homeP:"Tyler Holton",       homeH:"LHP", homeERA:5.27, homeRec:"0-1" },
  { away:"CIN", home:"CHC", venue:"Wrigley Field",     city:"Chicago",        st:"IL", time:"7:10 PM ET",
    awayP:"Chase Petty",        awayH:"RHP", awayERA:null, awayRec:"0-0",
    homeP:"Edward Cabrera",     homeH:"RHP", homeERA:3.06, homeRec:"3-0" },
  { away:"BAL", home:"NYY", venue:"Yankee Stadium",    city:"New York",       st:"NY", time:"7:05 PM ET",
    awayP:"Shane Baz",          awayH:"RHP", awayERA:4.50, awayRec:"1-2",
    homeP:"Cam Schlittler",     homeH:"RHP", homeERA:1.51, homeRec:"4-1" },
  { away:"CLE", home:"KC",  venue:"Kauffman Stadium",  city:"Kansas City",    st:"MO", time:"7:40 PM ET",
    awayP:"Tanner Bibee",       awayH:"RHP", awayERA:4.08, awayRec:"0-4",
    homeP:"Michael Wacha",      homeH:"RHP", homeERA:3.13, homeRec:"2-2" },
  { away:"MIL", home:"STL", venue:"Busch Stadium",     city:"St. Louis",      st:"MO", time:"7:45 PM ET",
    awayP:"Chad Patrick",       awayH:"RHP", awayERA:2.57, awayRec:"2-1",
    homeP:"Kyle Leahy",         homeH:"RHP", homeERA:5.52, homeRec:"3-3" },
  { away:"LAD", home:"HOU", venue:"Daikin Park",       city:"Houston",        st:"TX", time:"8:10 PM ET",
    awayP:"Yoshinobu Yamamoto", awayH:"RHP", awayERA:2.87, awayRec:"2-2",
    homeP:"Steven Okert",       homeH:"LHP", homeERA:4.20, homeRec:"0-0" },
  { away:"CWS", home:"LAA", venue:"Angel Stadium",     city:"Anaheim",        st:"CA", time:"9:38 PM ET",
    awayP:"Davis Martin",       awayH:"RHP", awayERA:1.95, awayRec:"4-1",
    homeP:"Jose Soriano",       homeH:"RHP", homeERA:0.84, homeRec:"5-1" },
  { away:"ATL", home:"SEA", venue:"T-Mobile Park",     city:"Seattle",        st:"WA", time:"9:40 PM ET",
    awayP:"JR Ritchie",         awayH:"RHP", awayERA:2.92, awayRec:"1-0",
    homeP:"Logan Gilbert",      homeH:"RHP", homeERA:4.03, homeRec:"1-3" },
  { away:"SD",  home:"SF",  venue:"Oracle Park",       city:"San Francisco",  st:"CA", time:"9:45 PM ET",
    awayP:"Randy Vasquez",      awayH:"RHP", awayERA:2.94, awayRec:"3-0",
    homeP:"Trevor McDonald",    homeH:"RHP", homeERA:null, homeRec:"0-0" },
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
            {/* 2026 HR count — prominent banner */}
            <div style={{ width: "100%", background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.3)", borderRadius: 7, padding: "5px 10px", marginBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted }}>2026 SEASON</span>
              <span style={{ fontFamily: F.arch, fontSize: 13, color: T.accent }}>
                {p.seasonHRs ?? "—"} HR
                <span style={{ fontFamily: F.mono, fontSize: 9, color: T.muted, marginLeft: 6 }}>in {p.gamesPlayed ?? "—"} games</span>
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
    "TASK: For EACH game return the top 3 HR candidates only from the TWO TEAMS in THAT specific game.",
    "CRITICAL: ONLY include POSITION PLAYERS (batters). NEVER include pitchers as HR candidates.",
    "CRITICAL: Every player MUST play for either the away team OR the home team of their specific game. No cross-game players.",
    "Do NOT list any starting pitcher, relief pitcher, or anyone listed as SP/RP/LHP/RHP as a batter.",
    "Players must be: outfielders, infielders, catchers, or designated hitters ONLY.",
    "Include each player's MLB MLBAM ID for headshots.",
    "",
    "For each player provide (be concise):",
    "- name, team, mlbId, emoji, teamColor, isHome",
    "- hrChancePct (0-35), pitcher, pitcherHand, pitcherERA, pitcherWhip, hrAllowedVsTeam",
    "- bvpSummary (1 sentence), homeAwaySplit (1 line), weatherInsight (1 sentence)",
    "- seasonHRs: player actual 2026 home run total as of today (integer, e.g. 8 not null), gamesPlayed, ops, exitVelo, parkFactor",
    "- simHRs: how many times out of 10000 simulated games this batter hits a HR off this specific pitcher today (integer 0-10000)",
    "- hotStreak: how many HR in the player's last 7 days/10 games (integer, 0 if none, e.g. 3 means 3 HR in last 10 games)",
    "- hotStreakNote: 1 short sentence describing their recent HR form (e.g. '3 HR in last 7 days, heating up fast')",
    "- confidence: overall confidence 0-100. BOOST confidence by up to 10 points if player is on a hot streak (2+ HR in last 10 games).",
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
    '"isHome":true,"hrChancePct":18.5,"pitcher":"Kyle Bradish","pitcherHand":"RHP","pitcherERA":4.20,"pitcherWhip":1.28,"hrAllowedVsTeam":3,',
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
      pushLog("🌤 Estimating weather + park factors...");
      await new Promise(r => setTimeout(r, 150));
      pushLog("🎲 Running 10,000-game Monte Carlo...");
      await new Promise(r => setTimeout(r, 150));

      // Split into batches of 6 to avoid token limit
      const BATCH = 6;
      const allGameResults = [];
      const batches = [];
      for (let i = 0; i < games.length; i += BATCH) {
        batches.push(games.slice(i, i + BATCH));
      }

      for (let b = 0; b < batches.length; b++) {
        pushLog("🤖 Analyzing batch " + (b + 1) + " of " + batches.length + " (" + batches[b].length + " games)...");
        const raw    = await callClaude(buildPrompt(batches[b]), 8192);
        const parsed = grabJSON(raw);
        const batchResults = parsed.games ?? [];
        allGameResults.push(...batchResults);
        pushLog("✅ Batch " + (b + 1) + " done — " + batchResults.length + " games analyzed");
      }

      // ── VERIFICATION PASS ─────────────────────────────────────────────────
      pushLog("🔍 Verifying positions, rosters & hot streaks...");

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
        "2. CORRECT TEAM — flag if on wrong team. Key 2026 moves:",
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
          flagged.forEach(f => pushLog("⚠️ Removed " + f.name + " — " + (f.reason || "failed check")));
        }
        if (hotPlayers.length > 0) {
          pushLog("🔥 Hot streaks: " + hotPlayers.map(h => h.name).join(", "));
        }
        if (flagged.length === 0) {
          pushLog("✅ All players verified — position players on correct 2026 rosters");
        }
      } catch (_) {
        pushLog("⚠️ Verification inconclusive — using original picks");
        verifyChecks = uniqueForVerify.map((_, i) => ({ i, ok: true, hotStreak: false, hotNote: "" }));
      }

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
          // 1. HARD: player's team must be one of the two teams in this exact game
          .filter(p => {
            if (!p.team) return false;
            if (validTeams.has(p.team)) return true;
            pushLog("⚠️ " + p.name + " (" + p.team + ") not in " + teams.away + "@" + teams.home + " — removed");
            return false;
          })
          // 2. Remove flagged (pitchers / wrong roster)
          .filter(p => !flaggedNames.has(p.name))
          // 3. Global dedup — same player can't appear in two different games
          .filter(p => {
            const key2 = p.name.toLowerCase().trim();
            if (seenPlayers.has(key2)) return false;
            seenPlayers.add(key2);
            return true;
          })
          // 4. Attach hot streak data + boost score
          .map(p => {
            const isHot = !!hotStreakMap[p.name];
            return {
              ...p,
              // Lock team to match isHome flag vs game teams
              team: p.isHome ? teams.home : teams.away,
              hotStreak: isHot,
              hotNote: hotStreakMap[p.name] || "",
              hrChancePct: isHot
                ? Math.min(35, (p.hrChancePct ?? 0) + 2.5)
                : (p.hrChancePct ?? 0),
            };
          })
          .sort((a, b) => (b.hrChancePct ?? 0) - (a.hrChancePct ?? 0));

        newResults[key] = { players: cleanPlayers };
      });

      setResults(newResults);
      setOpenGames(new Set(games.map(g => g.away + g.home)));
      pushLog("✅ All " + allGameResults.length + " games analyzed! Click any game to see HR %.");
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

        <div style={{ textAlign:"center", fontFamily:F.mono, fontSize:9, color:"#2a4060", marginTop:8 }}>
          Claude AI · HR Chance % · Player Headshots · BvP · Weather · Park Factor · 10,000× Monte Carlo
        </div>
      </div>
    </div>
  );
}
