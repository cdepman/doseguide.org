import { useEffect, useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Detail from "./Detail";
import { S, CAT } from "../data/substances";

export default function SubstancePanel({ substanceId, onClose }) {
  const s = S.find(x => x.id === substanceId);
  if (!s) return null;
  const c = CAT[s.cat];

  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef(null);

  useEffect(() => {
    const main = document.querySelector(".scroll-main");
    if (main) main.style.overflow = "hidden";
    return () => { if (main) main.style.overflow = "auto"; };
  }, []);

  const onTouchStart = useCallback(e => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontal.current = null;
    setDragging(true);
  }, []);

  const onTouchMove = useCallback(e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    // Determine swipe direction on first move
    if (isHorizontal.current === null) {
      isHorizontal.current = Math.abs(dx) > Math.abs(dy);
    }
    if (!isHorizontal.current) return; // vertical scroll, don't interfere
    const clampedDx = Math.max(0, dx); // only allow rightward
    setDragX(clampedDx);
  }, [dragging]);

  const onTouchEnd = useCallback(() => {
    setDragging(false);
    if (dragX > 100) {
      onClose();
    }
    setDragX(0);
    isHorizontal.current = null;
  }, [dragX, onClose]);

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
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: "fixed",
        top: 0, right: 0, bottom: 0,
        width: "min(440px, 92vw)",
        zIndex: 65,
        background: "#1a1a1e",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        overflowY: dragging && isHorizontal.current ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        animation: dragging ? "none" : "slideIn 0.25s ease-out",
        transform: `translateX(${dragX}px)`,
        transition: dragging ? "none" : "transform 0.3s ease",
        padding: "20px 16px calc(80px + env(safe-area-inset-bottom, 0))",
      }}
    >
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

      {/* Description */}
      <p style={{ margin: "0 0 14px", fontSize: 16, color: "#a09d97", lineHeight: 1.6 }}>{s.blurb || s.desc}</p>

      {/* Routes */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
        {s.routes.map(r => <span key={r.nm} style={{ fontSize: 15, padding: "5px 10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#8a8780", fontFamily: "'DM Mono',monospace" }}>{r.nm} · <span style={{ color: "#5a8a70" }}>🚀 {r.onset}</span> · <span style={{ color: "#6878a0" }}>⏳ {r.dur}</span></span>)}
      </div>

      {/* Full detail */}
      <Detail s={s} />
    </div>
  </>, document.body);
}
