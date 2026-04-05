import { S, CAT, SRC_LABELS, MED_WARNINGS } from "../data/substances";
import { cr, getMech } from "../data/combinations";

function LethalViz({ s }) {
  if (!s.lethal.cmp) return null;
  const w = s.marginWorst;
  const safe = w == null;
  const bad = !safe && w <= 2;
  const med = !safe && w <= 3;
  const col = bad ? "#ef4444" : med ? "#f97316" : "#f59e0b";
  const sz = typeof s.lethal.sz === "number" ? { w: s.lethal.sz, h: s.lethal.sz } : { w: s.lethal.sz[0], h: s.lethal.sz[1] };
  return <div style={{ background: bad ? "rgba(239,68,68,0.07)" : safe ? "rgba(34,197,94,0.05)" : "rgba(0,0,0,0.2)", borderRadius: 10, padding: 14, border: `1px solid ${bad ? "rgba(239,68,68,0.25)" : safe ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)"}`, marginBottom: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 56, height: 56, borderRadius: 6, background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(255,255,255,0.08)", flexShrink: 0, position: "relative" }}>
        <div style={{ width: sz.w, height: sz.h, borderRadius: s.lethal.cmp === "grain" ? "50%" : 3, background: safe ? "#22c55e" : col, opacity: 0.85, boxShadow: bad ? `0 0 12px ${col}88` : "none" }} />
        {s.lethal.cmp === "grain" && <div style={{ position: "absolute", bottom: 1, fontSize: 9, color: "#888", fontFamily: "'DM Mono',monospace" }}>← actual size</div>}
      </div>
      <p style={{ margin: 0, fontSize: 16, fontFamily: "'Instrument Serif',Georgia,serif", color: bad ? "#ef4444" : safe ? "#4ade80" : "#e8e6e3", fontWeight: 400, lineHeight: 1.4 }}>{s.lethal.headline}</p>
    </div>
    {s.lethal.gable && <div style={{ marginTop: 10, padding: "8px 10px", background: "rgba(255,255,255,0.02)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 16, fontFamily: "'DM Mono',monospace", color: "#6b6860" }}>
        <span>effective <span style={{ color: "#4ade80" }}>{s.lethal.gable.ed}</span></span>
        <span>lethal <span style={{ color: "#ef4444" }}>{s.lethal.gable.ld}</span></span>
        <span>ratio <span style={{ color: "#c7c4be" }}>{s.lethal.gable.ratio}</span></span>
      </div>
      <p style={{ margin: "4px 0 0", fontSize: 12, color: "#555", fontFamily: "'DM Mono',monospace" }}>Gable 2004{s.lethal.gable.note ? ` · ${s.lethal.gable.note}` : ""}</p>
    </div>}
  </div>;
}

export default function Detail({ s, onNavigate, sectionPrefix = "" }) {
  const c = CAT[s.cat];

  // Simplified view for medications
  if (s.isMedication) {
    return <div>
      {s.marginExplain && <div style={{ background: "rgba(148,163,184,0.08)", borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: "1px solid rgba(148,163,184,0.2)" }}>
        <h4 style={{ margin: "0 0 6px", fontSize: 13, color: "#94a3b8", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Why this matters</h4>
        <p style={{ margin: 0, fontSize: 16, color: "#a09d97", lineHeight: 1.6 }}>{s.marginExplain}</p>
      </div>}
      {s.lethal.headline && <div style={{ background: "rgba(239,68,68,0.07)", borderRadius: 10, padding: "12px 14px", marginBottom: 14, border: "1px solid rgba(239,68,68,0.2)" }}>
        <p style={{ margin: 0, fontSize: 15, color: "#ef4444", fontFamily: "'Instrument Serif',Georgia,serif", lineHeight: 1.5 }}>{s.lethal.headline}</p>
        {s.lethal.note && <p style={{ margin: "8px 0 0", fontSize: 16, color: "#a09080", lineHeight: 1.5 }}>{s.lethal.note}</p>}
      </div>}
      {s.odRisk.length > 0 && <div style={{ marginBottom: 14 }}>
        <h4 style={{ margin: "0 0 6px", fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>Key dangers</h4>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{s.odRisk.map(r => <span key={r} style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, background: "rgba(239,68,68,0.1)", color: "#e07070" }}>{r}</span>)}</div>
      </div>}
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.06)" }}>
        <p style={{ margin: 0, fontSize: 16, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>This is a prescribed medication, not a recreational substance. It's included because it has dangerous interactions with recreational drugs. Use the Interactions page to see specific risks.</p>
      </div>
    </div>;
  }

  const lvls = [{ l: "Threshold", v: s.dose.threshold, c: "#4ade80" }, { l: "Light", v: s.dose.light, c: "#86efac" }, { l: "Common", v: s.dose.common, c: "#fbbf24" }, { l: "Strong", v: s.dose.strong, c: "#f97316" }, { l: "Heavy", v: s.dose.heavy, c: "#ef4444" }];
  const sectionId = (title) => sectionPrefix + title.toLowerCase().replace(/[^a-z]+/g, "-");
  const Sec = ({ title, children }) => <div data-section={sectionId(title)} style={{ marginBottom: 24, scrollMarginTop: 16 }}><h4 style={{ margin: "0 0 10px", fontSize: 13, color: "#6b6860", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</h4>{children}</div>;
  const medWarnings = MED_WARNINGS.filter(w => w.affectedCats.includes(s.cat) || w.affectedIds.includes(s.id));
  return <div>
    {s.supplyRisk >= 3 && <Sec title="Supply & purity"><p style={{ margin: 0, fontSize: 16, color: "#d4a040", background: "rgba(245,158,11,0.06)", padding: "8px 10px", borderRadius: 6, lineHeight: 1.5 }}>{s.supplyExplain}</p></Sec>}
    <Sec title="Dosage"><>
      {lvls.map((l, i) => <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8 }}>
        <span style={{ width: 65, fontSize: 13, color: l.c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{l.l}</span>
        <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}><div style={{ width: `${20 + i * 20}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg,${l.c}44,${l.c})` }} /></div>
        <span style={{ fontSize: 16, color: "#c7c4be", fontFamily: "'DM Mono',monospace", minWidth: 70 }}>{l.v}</span>
      </div>)}
      {s.dose.note && <p style={{ margin: "6px 0 0", fontSize: 16, color: "#6b6860", lineHeight: 1.5, fontFamily: "'DM Mono',monospace" }}>{s.dose.note}</p>}
    </></Sec>
    {s.chem && <Sec title="Chemistry"><div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, flexWrap: "wrap", gap: 4 }}>
        <span style={{ fontSize: 13, color: c.c, fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{s.chem.family}</span>
        <span style={{ fontSize: 13, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>{s.chem.scaffold}</span>
      </div>
      <p style={{ margin: "0 0 12px", fontSize: 16, color: "#8a8780", lineHeight: 1.6 }}>{s.chem.note}</p>
      {s.chem.bridge && <div style={{ background: "rgba(239,159,39,0.06)", border: "1px solid rgba(239,159,39,0.15)", borderRadius: 8, padding: "8px 10px", marginBottom: 8 }}>
        <p style={{ margin: 0, fontSize: 16, color: "#c0a060", lineHeight: 1.5 }}><span style={{ fontWeight: 600, color: "#EF9F27" }}>Cross-family bridge:</span> {s.chem.bridge.reason}</p>
      </div>}
      {s.chem.relatives.length > 0 && <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
        <span style={{ fontSize: 13, color: "#555", fontFamily: "'DM Mono',monospace" }}>Related:</span>
        {s.chem.relatives.map(rid => { const rel = S.find(x => x.id === rid); if (!rel) return null; const rc = CAT[rel.cat]; return <span key={rid} onClick={e => { e.stopPropagation(); onNavigate?.(rid); }} style={{ fontSize: 14, padding: "3px 8px", borderRadius: 6, cursor: onNavigate ? "pointer" : "default", background: rc.b, color: rc.c, fontFamily: "'DM Mono',monospace", border: `1px solid ${rc.c}25` }}>{rel.sn || rel.n}</span>; })}
      </div>}
    </div></Sec>}
    {(s.lethal.cmp || s.marginExplain) && <Sec title="Lethality">{s.marginExplain && <p style={{ margin: "0 0 16px", fontSize: 16, color: "#8a8780", lineHeight: 1.6 }}>{s.marginExplain}</p>}<LethalViz s={s} /></Sec>}
    {(() => {
      const medCombos = S.filter(m => m.isMedication).map(m => {
        const risk = cr(s.id, m.id);
        if (!risk || (risk !== "dangerous" && risk !== "unsafe")) return null;
        const mech = getMech(s.id, m.id);
        return { med: m, risk, mech };
      }).filter(Boolean);
      const hasContra = medWarnings.length > 0 || medCombos.length > 0;
      if (!hasContra) return null;
      return <Sec title="Contraindications">
        {medWarnings.map(w => <div key={w.id} style={{ background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.35)", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: w.color, fontFamily: "'DM Mono',monospace", marginBottom: 6 }}>{w.title}</div>
          <p style={{ margin: 0, fontSize: 16, color: "#c08080", lineHeight: 1.6 }}>{w.text}</p>
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#555", fontFamily: "'DM Mono',monospace" }}>Source: {w.source}</p>
        </div>)}
        {medCombos.map(({ med, risk, mech }) => {
          const col = risk === "dangerous" ? "#ef4444" : "#f97316";
          const rc = CAT[med.cat];
          return <div key={med.id} style={{ background: col + "0a", border: `1px solid ${col}30`, borderRadius: 10, padding: "12px 14px", marginBottom: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{ fontSize: 14, color: col, fontWeight: 700, fontFamily: "'DM Mono',monospace" }}>{risk === "dangerous" ? "✕" : "⛔"}</span>
              <span style={{ fontSize: 16, fontFamily: "'Instrument Serif',Georgia,serif", color: rc.c }}>{med.sn || med.n}</span>
              <span style={{ fontSize: 12, color: col, fontFamily: "'DM Mono',monospace" }}>{risk === "dangerous" ? "Dangerous" : "Unsafe"}</span>
            </div>
            {mech && <p style={{ margin: 0, fontSize: 16, color: "#8a8780", lineHeight: 1.5 }}>{mech}</p>}
          </div>;
        })}
      </Sec>;
    })()}
    <Sec title="Effects"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{s.feels.map(f => <span key={f} style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, background: "rgba(34,197,94,0.08)", color: "#5ab87a" }}>{f}</span>)}</div></Sec>
    <Sec title="Biggest risks"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{s.odRisk.map(r => <span key={r} style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, background: "rgba(239,68,68,0.1)", color: "#e07070" }}>{r}</span>)}</div></Sec>
    <Sec title="Long-term risks"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{s.longTerm.map(l => <span key={l} style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, background: "rgba(99,102,241,0.08)", color: "#8b8fd0" }}>{l}</span>)}</div></Sec>
    <Sec title="Also called"><div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>{s.aka.map(a => <span key={a} style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#8a8780" }}>{a}</span>)}</div></Sec>
    <Sec title="Source"><span style={{ fontSize: 16, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.04)", color: "#8a8780" }}>{SRC_LABELS[s.src]}</span></Sec>
  </div>;
}
