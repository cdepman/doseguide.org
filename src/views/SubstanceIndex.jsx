import { CAT, SRC_ICONS } from "../data/substances";
import SafetyDots from "../components/SafetyDots";
import Detail from "../components/Detail";

export default function SubstanceIndex({ filtered, expanded, setExpanded }) {
  return <div>
    <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 22, color: "#e8e6e3", fontWeight: 400, margin: "0 0 12px" }}>Substance Directory</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {filtered.map(s => { const c = CAT[s.cat]; const isExp = expanded === s.id;
        const addCol = s.addictPct >= 15 ? "#ef4444" : s.addictPct >= 10 ? "#f97316" : s.addictPct >= 5 ? "#f59e0b" : s.addictPct >= 2 ? "#60a5fa" : "#22c55e";
        return <div key={s.id} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 12, border: `1px solid ${isExp ? c.c + "40" : "rgba(255,255,255,0.06)"}`, overflow: "hidden", transition: "border-color 0.3s" }}>
          <div onClick={() => setExpanded(isExp ? null : s.id)} style={{ padding: "14px 16px", cursor: "pointer", minHeight: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>{SRC_ICONS[s.src]}</span>
                <span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 19, color: "#e8e6e3" }}>{s.n}</span>
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 16, background: c.b, color: c.c, fontFamily: "'DM Mono',monospace" }}>{c.l}</span>
                <span style={{ color: "#555", fontSize: 13, transition: "transform 0.3s", transform: isExp ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▼</span>
              </div>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 14, color: "#8a8780", lineHeight: 1.55 }}>{s.desc}</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {s.routes.map(r => <span key={r.nm} style={{ fontSize: 13, padding: "6px 10px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#8a8780", fontFamily: "'DM Mono',monospace" }}>{r.nm} · <span style={{ color: "#5a8a70" }}>🚀 {r.onset}</span> · <span style={{ color: "#6878a0" }}>⏳ {r.dur}</span></span>)}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
              {s.feels.slice(0, 4).map(f => <span key={f} style={{ fontSize: 13, padding: "5px 10px", borderRadius: 6, background: "rgba(34,197,94,0.08)", color: "#5ab87a" }}>{f}</span>)}
              {s.odRisk.slice(0, 1).map(r => <span key={r} style={{ fontSize: 13, padding: "5px 10px", borderRadius: 6, background: "rgba(239,68,68,0.08)", color: "#e07070" }}>{r.length > 35 ? r.substring(0, 35) + "…" : r}</span>)}
            </div>
            <div style={{ marginBottom: 10 }}>
              <SafetyDots s={s} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }} title={s.addictNote}>
              <div style={{ width: 60, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden", flexShrink: 0 }}>
                <div style={{ width: `${Math.min((s.addictPct / 20) * 100, 100)}%`, height: "100%", borderRadius: 3, background: addCol }} />
              </div>
              <span style={{ fontSize: 12, color: addCol, fontFamily: "'DM Mono',monospace" }}>{s.addictPct}%</span>
              <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>addiction risk · {s.addictLabel.toLowerCase()}</span>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateRows: isExp ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px" }}><Detail s={s} /></div>
            </div>
          </div>
        </div>;
      })}
    </div>
  </div>;
}
