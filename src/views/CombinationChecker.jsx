import { S, CAT, SRC_ICONS } from "../data/substances";
import Combos from "../components/Combos";
import Detail from "../components/Detail";
import { SearchInput, CategoryFilter, pillStyle } from "../components/SubstanceFilter";

export default function CombinationChecker({ sel, toggle, setSel, filtered, search, setSearch, catF, setCatF }) {
  const selSubs = sel.map(id => S.find(x => x.id === id)).filter(Boolean);

  return <div>
    <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 22, color: "#e8e6e3", fontWeight: 400, margin: "0 0 6px" }}>Combination Checker</h2>
    <p style={{ fontSize: 14, color: "#6b6860", margin: "0 0 12px" }}>Select two or more substances or medications to check interactions.</p>
    <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: 14, marginBottom: 16 }}>
      <SearchInput value={search} onChange={setSearch} placeholder="Search to filter..." />
      <div style={{ marginBottom: 8 }}>
        <CategoryFilter catF={catF} setCatF={setCatF} />
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {filtered.map(s => { const c = CAT[s.cat]; const on = sel.includes(s.id);
          return <button key={s.id} onClick={() => toggle(s.id)} style={{ ...pillStyle(on, c.c), border: `1px solid ${on ? c.c : sel.length >= 2 ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.08)"}`, color: on ? c.c : sel.length >= 2 ? "#444" : "#888", transition: "all 0.15s" }}>{on ? "✓ " : ""}{s.n}</button>;
        })}
      </div>
      {sel.length >= 1 && <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 10, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)", flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, color: "#555", fontFamily: "'DM Mono',monospace" }}>Selected:</span>
        {selSubs.map(s => <span key={s.id} role="button" tabIndex={0} onClick={() => toggle(s.id)} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(s.id); }}} style={{ padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, background: CAT[s.cat].b, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", minHeight: 36, display: "inline-flex", alignItems: "center" }}>{s.n} ×</span>)}
        <button onClick={() => setSel([])} style={{ padding: "8px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#666", fontFamily: "'DM Mono',monospace", marginLeft: "auto", minHeight: 36 }}>Clear all</button>
      </div>}
    </div>
    {sel.length < 2 && <div style={{ textAlign: "center", padding: "40px 0", color: "#444" }}>
      <p style={{ fontSize: 15, fontFamily: "'Instrument Serif',Georgia,serif", color: "#555" }}>{sel.length === 0 ? "Select two or more substances or medications above" : "Select at least one more"}</p>
    </div>}
    <Combos selected={sel} />
    {selSubs.length > 0 && <div style={{ marginTop: 8 }}>{selSubs.map(s => { const c = CAT[s.cat]; return <div key={s.id} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: "16px", marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: c.c }}>{s.n}</span></div>
        <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 16, background: c.b, color: c.c, fontFamily: "'DM Mono',monospace" }}>{c.l}</span>
      </div>
      <Detail s={s} />
    </div>; })}</div>}
  </div>;
}
