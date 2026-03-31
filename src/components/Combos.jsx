import { S, CAT, RL } from "../data/substances";
import { cr, getMech } from "../data/combinations";

export default function Combos({ selected }) {
  if (selected.length < 2) return null;
  const pairs = [];
  for (let i = 0; i < selected.length; i++)
    for (let j = i + 1; j < selected.length; j++) {
      const a = S.find(x => x.id === selected[i]), b = S.find(x => x.id === selected[j]);
      pairs.push({ a, b, risk: cr(selected[i], selected[j]), mech: getMech(selected[i], selected[j]) });
    }
  const ord = ["synergy", "low_risk", "decrease", "caution", "unsafe", "dangerous"];
  const worst = pairs.reduce((w, p) => p.risk && ord.indexOf(p.risk) > ord.indexOf(w) ? p.risk : w, "synergy");
  const wl = RL[worst];

  const subs = selected.map(id => S.find(x => x.id === id)).filter(Boolean);
  const depressants = subs.filter(s => ["depressant", "opioid", "benzodiazepine"].includes(s.cat) || s.id === "ghb" || s.id === "kratom");
  const stimulants = subs.filter(s => s.cat === "stimulant");
  const serotonergics = subs.filter(s => ["mdma", "dxm", "tramadol", "ssri", "maoi"].includes(s.id));
  const polyWarnings = [];
  if (depressants.length >= 2) polyWarnings.push({ color: "#ef4444", title: "⚠ Multiple depressants — EXTREME danger", text: `You're combining ${depressants.length} substances that all slow your breathing (${depressants.map(s => s.n).join(", ")}). Each additional depressant doesn't just add to the risk — it MULTIPLIES it. This is the #1 cause of overdose death. The risk is not 2× worse, it's exponentially worse.` });
  if (serotonergics.length >= 2) polyWarnings.push({ color: "#f97316", title: "⚠ Multiple serotonin-active substances — serotonin syndrome risk", text: `${serotonergics.map(s => s.n).join(", ")} all affect serotonin. Combining them risks serotonin syndrome: muscle rigidity, high fever, seizures, death. This is a medical emergency. Symptoms can appear hours after dosing.` });
  if (stimulants.length >= 2) polyWarnings.push({ color: "#f97316", title: "⚠ Stacking stimulants — heart strain compounds", text: `${stimulants.map(s => s.n).join(", ")} all stress your cardiovascular system. Combined stimulant load increases risk of heart attack, stroke, and dangerous arrhythmia beyond what any single stimulant would cause.` });
  if (stimulants.length >= 1 && depressants.length >= 1) polyWarnings.push({ color: "#f59e0b", title: "⚠ Mixing uppers and downers — masked warning signs", text: "Stimulants can mask the sedation that would normally warn you you're taking too much depressant. When the stimulant wears off first, the full depressant load hits at once. Many people have died this way — they felt fine until the stimulant wore off." });
  if (selected.length >= 3) polyWarnings.push({ color: "#f59e0b", title: `${selected.length} substances at once — polysubstance risk`, text: `Nearly 50% of overdose deaths involve multiple substances. With ${selected.length} substances, effects become extremely unpredictable. Each additional substance doesn't just add risk — it makes the interaction harder to predict. Naloxone (Narcan) only reverses opioids, not other drugs.` });

  return <div style={{ marginBottom: 18 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
      <h2 style={{ margin: 0, fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400 }}>Combination Check</h2>
      <div style={{ padding: "6px 12px", borderRadius: 8, fontSize: 12.5, background: wl.c + "18", border: `1.5px solid ${wl.c}40`, color: wl.c, fontFamily: "'DM Mono',monospace", display: "flex", alignItems: "center", gap: 5 }}><span style={{ fontSize: 15 }}>{wl.i}</span>{wl.l}</div>
    </div>
    {polyWarnings.map((w, i) => <div key={i} style={{ background: w.color + "0a", border: `1px solid ${w.color}30`, borderRadius: 8, padding: "10px 14px", marginBottom: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: w.color, fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>{w.title}</div>
      <p style={{ margin: 0, fontSize: 12.5, color: "#a09890", lineHeight: 1.5 }}>{w.text}</p>
    </div>)}
    {pairs.map(({ a, b, risk, mech }) => { const lv = risk ? RL[risk] : null; return <div key={`${a.id}-${b.id}`} style={{ padding: "10px 12px", borderRadius: 8, marginBottom: 5, background: "rgba(255,255,255,0.02)", borderLeft: `3px solid ${lv?.c || "#555"}` }}>
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4, fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 14 }}><span style={{ color: CAT[a.cat].c }}>{a.n}</span><span style={{ color: "#444" }}>+</span><span style={{ color: CAT[b.cat].c }}>{b.n}</span></div>
      <div style={{ display: "flex", gap: 6, alignItems: "flex-start" }}><span style={{ fontSize: 18, color: lv?.c || "#666" }}>{lv?.i || "?"}</span><div><div style={{ fontSize: 13, fontWeight: 600, color: lv?.c || "#888", fontFamily: "'DM Mono',monospace" }}>{lv?.l || "Unknown"}</div><p style={{ margin: "2px 0 0", fontSize: 13, color: "#7a7670", lineHeight: 1.5 }}>{lv?.d || "No data. Absence ≠ safety."}</p>
      {mech && <p style={{ margin: "6px 0 0", fontSize: 13, color: lv?.c === "#ef4444" ? "#e08080" : lv?.c === "#f97316" ? "#d09060" : "#a0a090", lineHeight: 1.5, background: "rgba(255,255,255,0.03)", padding: "8px 10px", borderRadius: 6, borderLeft: `2px solid ${lv?.c || "#555"}44` }}><strong style={{ fontFamily: "'DM Mono',monospace", fontSize: 12 }}>WHY:</strong> {mech}</p>}
      </div></div>
    </div>; })}
  </div>;
}
