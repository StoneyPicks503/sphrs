"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const router       = useRouter();
  const searchParams = useSearchParams();
  const from         = searchParams.get("from") || "/";

  const handleLogin = async () => {
    if (!password.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res  = await fetch("/api/login", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        router.push(from);
        router.refresh();
      } else {
        setError("Wrong password. Try again.");
        setLoading(false);
      }
    } catch(_) {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: "100%", maxWidth: 380,
      background: "#0b1120",
      border: "1px solid #1a2438",
      borderRadius: 18,
      padding: "36px 28px",
      animation: "fadeUp .4s ease, glow 3s ease infinite",
    }}>
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 44, marginBottom: 8 }}>⚾</div>
        <div style={{
          fontFamily: "'Bebas Neue',Impact,sans-serif",
          fontSize: 38, letterSpacing: 4,
          color: "#dde6f0", lineHeight: 1,
          textShadow: "0 0 28px rgba(0,210,255,0.4)",
        }}>SPHRS</div>
        <div style={{ fontSize: 10, color: "#4a5a72", letterSpacing: 3, marginTop: 4 }}>
          AI · MLB · HOME RUN INTELLIGENCE
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 9, color: "#4a5a72", letterSpacing: 2, marginBottom: 8 }}>PASSWORD</div>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="Enter password"
          autoFocus
          style={{
            width: "100%", background: "#111e30",
            border: "1px solid " + (error ? "#f87171" : "#1a2438"),
            borderRadius: 9, padding: "13px 16px",
            fontFamily: "'DM Mono','Courier New',monospace",
            fontSize: 14, color: "#dde6f0", letterSpacing: 3,
            boxSizing: "border-box", transition: "border-color .2s",
          }}
        />
        {error && <div style={{ fontSize: 10, color: "#f87171", marginTop: 6, letterSpacing: 1 }}>⚠️ {error}</div>}
      </div>

      <button
        onClick={handleLogin}
        disabled={loading || !password.trim()}
        style={{
          width: "100%",
          background: loading || !password.trim() ? "#1a2438" : "linear-gradient(135deg,#00d2ff,#0099cc)",
          color: loading || !password.trim() ? "#4a5a72" : "#05080f",
          border: "none", borderRadius: 9, padding: "13px 0",
          fontFamily: "'Archivo Black','Arial Black',sans-serif",
          fontSize: 15, cursor: loading || !password.trim() ? "default" : "pointer",
          letterSpacing: 1, transition: "all .2s",
        }}
      >
        {loading ? "Checking..." : "ENTER"}
      </button>

      <div style={{ textAlign: "center", marginTop: 20, fontSize: 9, color: "#2a3a52", letterSpacing: 1 }}>
        PRIVATE ACCESS ONLY
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div style={{
      minHeight: "100vh", background: "#05080f",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20, fontFamily: "'DM Mono','Courier New',monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@400;500&family=Archivo+Black&display=swap');
        @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(0,210,255,0.15)} 50%{box-shadow:0 0 40px rgba(0,210,255,0.35)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        input:focus { outline: none; }
        input::placeholder { color: #2a3a52; }
      `}</style>
      <Suspense fallback={<div style={{color:"#4a5a72",fontFamily:"monospace"}}>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
