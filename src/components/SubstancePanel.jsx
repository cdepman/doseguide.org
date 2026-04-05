import Detail from "./Detail";
import SwipePanel from "./SwipePanel";
import { S, CAT } from "../data/substances";

export default function SubstancePanel({ substanceId, onClose, onNavigate }) {
  const s = S.find(x => x.id === substanceId);
  if (!s) return null;
  const c = CAT[s.cat];

  return <SwipePanel open={true} onClose={onClose} width="min(440px, 92vw)" label={s.n}>
    {/* Header */}
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "flex-start", marginBottom: 16,
    }}>
      <div>
        <h2 style={{
          margin: 0, fontSize: 24,
          fontFamily: "'Instrument Serif',Georgia,serif",
          color: "#e8e6e1", fontWeight: 400,
        }}>{s.n}</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <span style={{
            fontSize: 12, padding: "2px 7px", borderRadius: 5,
            background: c.b, color: c.c,
            fontFamily: "'DM Mono',monospace",
          }}>{c.l}</span>
          {s.aka.length > 0 && <span style={{ fontSize: 13, color: "#555", fontFamily: "'DM Mono',monospace" }}>{s.aka.slice(0, 3).join(" · ")}</span>}
        </div>
      </div>
      <button
        onClick={onClose}
        style={{
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 8, padding: "6px 12px",
          color: "#888", fontSize: 13, cursor: "pointer",
          fontFamily: "'DM Mono',monospace",
          flexShrink: 0,
        }}
      >Close</button>
    </div>

    {/* Overview */}
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#6b6860", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Overview</h4>
      <p style={{ margin: 0, fontSize: 16, color: "#a09d97", lineHeight: 1.6 }}>{s.blurb || s.desc}</p>
    </div>

    {/* Onset & Duration */}
    <div style={{ marginBottom: 24 }}>
      <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#6b6860", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Onset & Duration</h4>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {s.routes.map(r => <span key={r.nm} style={{ fontSize: 15, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#8a8780", fontFamily: "'DM Mono',monospace" }}>{r.nm} · <span style={{ color: "#5a8a70" }}>🚀 {r.onset}</span> · <span style={{ color: "#6878a0" }}>⏳ {r.dur}</span></span>)}
      </div>
    </div>

    {/* Full detail */}
    <Detail s={s} onNavigate={onNavigate} />
  </SwipePanel>;
}
