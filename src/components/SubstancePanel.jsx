import { useRef, useCallback } from "react";
import Detail from "./Detail";
import SwipePanel from "./SwipePanel";
import { S, CAT, MED_WARNINGS } from "../data/substances";

export default function SubstancePanel({ substanceId, onClose, onNavigate }) {
  const s = S.find(x => x.id === substanceId);
  if (!s) return null;
  const c = CAT[s.cat];
  const hasContra = MED_WARNINGS.some(w => w.affectedCats.includes(s.cat) || w.affectedIds.includes(s.id));

  const sections = [
    { id: "sp-overview", label: "Overview" },
    { id: "sp-dosage", label: "Dosage" },
    s.chem && { id: "sp-chemistry", label: "Chemistry" },
    { id: "sp-lethality", label: "Lethality" },
    hasContra && { id: "sp-contraindications", label: "Contraindications" },
    { id: "sp-effects", label: "Effects" },
    { id: "sp-biggest-risks", label: "Risks" },
    { id: "sp-long-term-risks", label: "Long-term" },
  ].filter(Boolean);
  const scrollRef = useRef(null);

  const scrollTo = useCallback((id) => {
    const el = scrollRef.current?.querySelector(`[data-section="${id}"]`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return <SwipePanel open={true} onClose={onClose} width="100%" label={s.n} header={<>
    {/* Title */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
      <div>
        <span style={{ fontSize: 12, padding: "2px 7px", borderRadius: 5, background: c.b, color: c.c, fontFamily: "'DM Mono',monospace", display: "inline-block", marginBottom: 4 }}>{c.l}</span>
        <h2 style={{ margin: 0, fontSize: 24, fontFamily: "'Instrument Serif',Georgia,serif", color: "#e8e6e1", fontWeight: 400 }}>{s.n}</h2>
        {s.aka.length > 0 && <p style={{ margin: "4px 0 0", fontSize: 13, color: "#555", fontFamily: "'DM Mono',monospace" }}>{s.aka.slice(0, 5).join(" · ")}</p>}
      </div>
      <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 12px", color: "#888", fontSize: 13, cursor: "pointer", fontFamily: "'DM Mono',monospace", flexShrink: 0 }}>Close</button>
    </div>
    {/* Jump tabs */}
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", padding: "8px 0 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {sections.map(sec => <button key={sec.id} onClick={() => scrollTo(sec.id)} style={{ padding: "5px 10px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#8a8780", fontFamily: "'DM Mono',monospace", fontSize: 12, cursor: "pointer", minHeight: 30 }}>{sec.label}</button>)}
    </div>
  </>}>
    <div ref={scrollRef}>
      {/* Overview */}
      <div data-section="sp-overview" style={{ scrollMarginTop: 16, paddingTop: 14, marginBottom: 24 }}>
        <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#6b6860", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Overview</h4>
        <p style={{ margin: "0 0 16px", fontSize: 16, color: "#a09d97", lineHeight: 1.6 }}>{s.blurb || s.desc}</p>
      </div>

      {/* Onset & Duration */}
      <div data-section="sp-onset" style={{ marginBottom: 24 }}>
        <h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#6b6860", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Onset & Duration</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {s.routes.map(r => <div key={r.nm} style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", fontFamily: "'DM Mono',monospace" }}>
            <div style={{ fontSize: 15, color: "#c7c4be", marginBottom: 4 }}>{r.nm}</div>
            <div style={{ display: "flex", gap: 16, fontSize: 14, color: "#8a8780" }}>
              <span><span style={{ color: "#5a8a70" }}>🚀</span> {r.onset}</span>
              <span><span style={{ color: "#6878a0" }}>⏳</span> {r.dur}</span>
            </div>
          </div>)}
        </div>
      </div>

      {/* Full detail — sections have data-section attributes for scroll targeting */}
      <Detail s={s} onNavigate={onNavigate} sectionPrefix="sp-" />
    </div>
  </SwipePanel>;
}
