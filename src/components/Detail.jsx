import { CAT } from "../data/substances";

function LethalViz({ s }) {
  if (!s.lethal.cmp) return null;
  const bad = s.margin && s.margin <= 10; const med = s.margin && s.margin <= 20;
  const col = bad ? "#ef4444" : med ? "#f97316" : "#f59e0b";
  const safe = s.margin && s.margin >= 100;
  const sz = typeof s.lethal.sz === "number" ? { w: s.lethal.sz, h: s.lethal.sz } : { w: s.lethal.sz[0], h: s.lethal.sz[1] };
  return <div style={{ background: bad ? "rgba(239,68,68,0.07)" : safe ? "rgba(34,197,94,0.05)" : "rgba(0,0,0,0.2)", borderRadius: 10, padding: 14, border: `1px solid ${bad ? "rgba(239,68,68,0.25)" : safe ? "rgba(34,197,94,0.15)" : "rgba(255,255,255,0.06)"}`, marginBottom: 12 }}>
    <p style={{ margin: "0 0 10px", fontSize: 16, fontFamily: "'Instrument Serif',Georgia,serif", color: bad ? "#ef4444" : safe ? "#4ade80" : "#e8e6e3", fontWeight: 400, lineHeight: 1.4 }}>{s.lethal.headline}</p>
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10 }}>
      <div style={{ width: 64, height: 64, borderRadius: 6, background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(255,255,255,0.08)", flexShrink: 0, position: "relative" }}>
        <div style={{ width: sz.w, height: sz.h, borderRadius: s.lethal.cmp === "grain" ? "50%" : 3, background: safe ? "#22c55e" : col, opacity: 0.85, boxShadow: bad ? `0 0 12px ${col}88` : "none" }} />
        {s.lethal.cmp === "grain" && <div style={{ position: "absolute", bottom: 1, fontSize: 7, color: "#888", fontFamily: "'DM Mono',monospace" }}>← actual size</div>}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#a09d97", lineHeight: 1.5, fontFamily: "'Source Serif 4',Georgia,serif" }}>{s.lethal.realworld}</p>
    </div>
    <p style={{ margin: 0, fontSize: 11.5, color: "#6b6860", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 8 }}>{s.lethal.note}</p>
  </div>;
}

export default function Detail({ s }) {
  const c = CAT[s.cat];
  const lvls = [{ l: "Threshold", v: s.dose.threshold, c: "#4ade80" }, { l: "Light", v: s.dose.light, c: "#86efac" }, { l: "Common", v: s.dose.common, c: "#fbbf24" }, { l: "Strong", v: s.dose.strong, c: "#f97316" }, { l: "Heavy", v: s.dose.heavy, c: "#ef4444" }];
  const Sec = ({ title, children }) => <div style={{ marginBottom: 14 }}><h4 style={{ margin: "0 0 6px", fontSize: 10.5, color: "#6b6860", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{title}</h4>{children}</div>;
  return <div>
    {(s.marginExplain || s.supplyRisk >= 3) && <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: 12, marginBottom: 14, border: "1px solid rgba(255,255,255,0.05)" }}>
      {s.marginExplain && <p style={{ margin: "0 0 4px", fontSize: 12.5, color: "#7a7670", lineHeight: 1.5 }}>{s.marginExplain}</p>}
      {s.supplyRisk >= 3 && <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#d4a040", background: "rgba(245,158,11,0.06)", padding: "6px 8px", borderRadius: 4 }}>⚠ {s.supplyExplain}</p>}
    </div>}
    <Sec title="How much">{lvls.map((l, i) => <div key={l.l} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
      <span style={{ width: 55, fontSize: 10.5, color: l.c, fontFamily: "'DM Mono',monospace", textAlign: "right" }}>{l.l}</span>
      <div style={{ flex: 1, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}><div style={{ width: `${20 + i * 20}%`, height: "100%", borderRadius: 3, background: `linear-gradient(90deg,${l.c}44,${l.c})` }} /></div>
      <span style={{ fontSize: 11.5, color: "#c7c4be", fontFamily: "'DM Mono',monospace", minWidth: 75 }}>{l.v}</span>
    </div>)}</Sec>
    <LethalViz s={s} />
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      <Sec title="What it feels like"><div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{s.feels.map(f => <span key={f} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 4, background: "rgba(34,197,94,0.08)", color: "#5ab87a" }}>{f}</span>)}</div></Sec>
      <Sec title="What happens if you take too much"><div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{s.odRisk.map(r => <span key={r} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 4, background: "rgba(239,68,68,0.1)", color: "#e07070" }}>{r}</span>)}</div></Sec>
    </div>
    <Sec title="What happens if you keep using it"><div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{s.longTerm.map(l => <span key={l} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 4, background: "rgba(99,102,241,0.08)", color: "#8b8fd0" }}>{l}</span>)}</div></Sec>
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <Sec title="Routes">{s.routes.map(r => <div key={r.nm} style={{ fontSize: 11, color: "#8a8780", fontFamily: "'DM Mono',monospace", marginBottom: 2 }}>{r.nm} · <span style={{ color: "#5a8a70" }}>🚀{r.onset}</span> · <span style={{ color: "#6878a0" }}>⏳{r.dur}</span></div>)}</Sec>
      <Sec title="Also called"><div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{s.aka.map(a => <span key={a} style={{ fontSize: 10.5, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", color: "#8a8780" }}>{a}</span>)}</div></Sec>
    </div>
  </div>;
}
