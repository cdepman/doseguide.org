import { S, CAT, SRC_ICONS } from "../data/substances";
import Combos from "../components/Combos";
import Detail from "../components/Detail";

export default function CombinationChecker({ sel, toggle, setSel, filtered, search, setSearch, catF, setCatF }) {
  const selSubs = sel.map(id => S.find(x => x.id === id)).filter(Boolean);

  return <div>
    <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 22, color: "#e8e6e3", fontWeight: 400, margin: "0 0 6px" }}>Combination Checker</h2>
    <p style={{ fontSize: 13, color: "#6b6860", margin: "0 0 12px" }}>Select two or more substances to check if the combination is safe.</p>
    <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: 14, marginBottom: 16 }}>
      <input type="text" placeholder="Search to filter..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "8px 11px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#c7c4be", fontSize: 12, fontFamily: "'Source Serif 4',Georgia,serif", outline: "none", marginBottom: 8, boxSizing: "border-box" }} />
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
        <button onClick={() => setCatF(null)} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid", cursor: "pointer", fontSize: 10, fontFamily: "'DM Mono',monospace", background: !catF ? "rgba(255,255,255,0.1)" : "transparent", borderColor: !catF ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: !catF ? "#e8e6e3" : "#555" }}>All</button>
        {Object.entries(CAT).map(([k, v]) => <button key={k} onClick={() => setCatF(catF === k ? null : k)} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid", cursor: "pointer", fontSize: 10, fontFamily: "'DM Mono',monospace", background: catF === k ? v.b : "transparent", borderColor: catF === k ? v.c + "40" : "rgba(255,255,255,0.06)", color: catF === k ? v.c : "#555" }}>{v.l}</button>)}
      </div>
      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
        {filtered.map(s => { const c = CAT[s.cat]; const on = sel.includes(s.id);
          return <button key={s.id} onClick={() => toggle(s.id)} style={{ padding: "5px 10px", borderRadius: 6, cursor: "pointer", fontSize: 11.5, fontFamily: "'DM Mono',monospace", background: on ? c.b : "transparent", border: `1px solid ${on ? c.c : sel.length >= 2 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)"}`, color: on ? c.c : sel.length >= 2 ? "#444" : "#888", transition: "all 0.15s" }}>{on ? "✓ " : ""}{s.n}</button>;
        })}
      </div>
      {sel.length >= 1 && <div style={{ display: "flex", gap: 4, alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <span style={{ fontSize: 10.5, color: "#555", fontFamily: "'DM Mono',monospace" }}>Selected:</span>
        {selSubs.map(s => <span key={s.id} onClick={() => toggle(s.id)} style={{ padding: "3px 8px", borderRadius: 5, cursor: "pointer", fontSize: 11, background: CAT[s.cat].b, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace" }}>{s.n} ×</span>)}
        <button onClick={() => setSel([])} style={{ padding: "3px 8px", borderRadius: 5, cursor: "pointer", fontSize: 10, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#666", fontFamily: "'DM Mono',monospace", marginLeft: "auto" }}>Clear all</button>
      </div>}
    </div>
    {sel.length < 2 && <div style={{ textAlign: "center", padding: "40px 0", color: "#444" }}>
      <p style={{ fontSize: 14, fontFamily: "'Instrument Serif',Georgia,serif", color: "#555" }}>{sel.length === 0 ? "Select two or more substances above" : "Select at least one more substance"}</p>
    </div>}
    <Combos selected={sel} />
    {selSubs.length > 0 && <div style={{ marginTop: 8 }}>{selSubs.map(s => { const c = CAT[s.cat]; return <div key={s.id} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: "16px 20px", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontSize: 11 }}>{SRC_ICONS[s.src]}</span><span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: c.c }}>{s.n}</span></div>
        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 16, background: c.b, color: c.c, fontFamily: "'DM Mono',monospace" }}>{c.l}</span>
      </div>
      <Detail s={s} />
    </div>; })}</div>}
  </div>;
}
