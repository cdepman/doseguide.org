import { CAT, SRC_ICONS, ADDICT_COLORS } from "../data/substances";
import SafetyDots from "../components/SafetyDots";
import Detail from "../components/Detail";

export default function SubstanceIndex({ filtered, expanded, setExpanded }) {
  return <div>
    <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 22, color: "#e8e6e3", fontWeight: 400, margin: "0 0 12px" }}>Substance Directory</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {filtered.map(s => { const c = CAT[s.cat]; const ac = ADDICT_COLORS[s.addict - 1]; const isExp = expanded === s.id;
        return <div key={s.id} style={{ background: "rgba(255,255,255,0.025)", borderRadius: 12, border: `1px solid ${isExp ? c.c + "40" : "rgba(255,255,255,0.06)"}`, overflow: "hidden", transition: "border-color 0.3s" }}>
          <div onClick={() => setExpanded(isExp ? null : s.id)} style={{ padding: "16px 20px", cursor: "pointer" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11 }}>{SRC_ICONS[s.src]}</span>
                <span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 19, color: "#e8e6e3" }}>{s.n}</span>
              </div>
              <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                <span style={{ fontSize: 10.5, padding: "2px 9px", borderRadius: 16, background: c.b, color: c.c, fontFamily: "'DM Mono',monospace" }}>{c.l}</span>
                <span style={{ color: "#555", fontSize: 12, transition: "transform 0.3s", transform: isExp ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▼</span>
              </div>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 13.5, color: "#8a8780", lineHeight: 1.55 }}>{s.desc}</p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
              {s.routes.map(r => <span key={r.nm} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 6, background: "rgba(255,255,255,0.04)", color: "#8a8780", fontFamily: "'DM Mono',monospace" }}>{r.nm} · <span style={{ color: "#5a8a70" }}>🚀 {r.onset}</span> · <span style={{ color: "#6878a0" }}>⏳ {r.dur}</span></span>)}
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
              {s.feels.slice(0, 5).map(f => <span key={f} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 5, background: "rgba(34,197,94,0.08)", color: "#5ab87a" }}>{f}</span>)}
              {s.odRisk.slice(0, 1).map(r => <span key={r} style={{ fontSize: 11, padding: "3px 8px", borderRadius: 5, background: "rgba(239,68,68,0.08)", color: "#e07070" }}>{r.length > 40 ? r.substring(0, 40) + "…" : r}</span>)}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 12 }}>
              <SafetyDots s={s} compact={false} />
              <div style={{ display: "flex", alignItems: "center", gap: 3, flexShrink: 0 }} title={s.addictLabel}>
                {[1, 2, 3, 4, 5].map(i => <div key={i} style={{ width: 5, height: 14, borderRadius: 2, background: i <= s.addict ? ac : "rgba(255,255,255,0.06)" }} />)}
                <span style={{ fontSize: 9.5, color: "#6b6860", fontFamily: "'DM Mono',monospace", marginLeft: 3 }}>addiction</span>
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateRows: isExp ? "1fr" : "0fr", transition: "grid-template-rows 0.35s ease" }}>
            <div style={{ overflow: "hidden" }}>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "16px 20px" }}><Detail s={s} /></div>
            </div>
          </div>
        </div>;
      })}
    </div>
  </div>;
}
