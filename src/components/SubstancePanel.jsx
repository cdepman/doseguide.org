import { useEffect } from "react";
import { createPortal } from "react-dom";
import Detail from "./Detail";
import { S, CAT } from "../data/substances";

export default function SubstancePanel({ substanceId, onClose }) {
  const s = S.find(x => x.id === substanceId);
  if (!s) return null;
  const c = CAT[s.cat];

  useEffect(() => {
    const main = document.querySelector(".scroll-main");
    if (main) main.style.overflow = "hidden";
    return () => { if (main) main.style.overflow = "auto"; };
  }, []);

  return createPortal(<>
    {/* Backdrop */}
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 60,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        animation: "fadeIn 0.2s ease",
      }}
    />

    {/* Panel */}
    <div style={{
      position: "fixed",
      top: 0, right: 0, bottom: 0,
      width: "min(440px, 92vw)",
      zIndex: 65,
      background: "#1a1a1e",
      borderLeft: "1px solid rgba(255,255,255,0.08)",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch",
      animation: "slideIn 0.25s ease-out",
      padding: "20px 16px calc(80px + env(safe-area-inset-bottom, 0))",
    }}>
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
              fontSize: 11, padding: "2px 7px", borderRadius: 5,
              background: c.b, color: c.c,
              fontFamily: "'DM Mono',monospace",
            }}>{c.l}</span>
            {s.aka.length > 0 && <span style={{ fontSize: 11, color: "#555", fontFamily: "'DM Mono',monospace" }}>{s.aka.slice(0, 3).join(" · ")}</span>}
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

      {/* Description */}
      <p style={{ margin: "0 0 14px", fontSize: 14, color: "#a09d97", lineHeight: 1.6 }}>{s.blurb || s.desc}</p>

      {/* Routes */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {s.routes.map(r => <span key={r.nm} style={{ fontSize: 12, padding: "5px 10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#8a8780", fontFamily: "'DM Mono',monospace" }}>{r.nm} · {r.onset} · {r.dur}</span>)}
      </div>

      {/* Full detail */}
      <Detail s={s} />
    </div>
  </>, document.body);
}
