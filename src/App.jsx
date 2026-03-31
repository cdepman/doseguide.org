import { useState, useCallback, useMemo } from "react";
import { S, CAT, parseDur } from "./data/substances";
import SubstanceIndex from "./views/SubstanceIndex";
import CombinationChecker from "./views/CombinationChecker";
import Charts from "./components/Charts";
import Matrix from "./components/Matrix";
import Sources from "./views/Sources";

const SORTS = [
  { id: "default", label: "Default", fn: null },
  { id: "safest", label: "Safest ↓", fn: (a, b) => a.atDose - b.atDose },
  { id: "dangerous", label: "Most dangerous ↓", fn: (a, b) => b.atDose - a.atDose },
  { id: "odEasy", label: "Easiest to OD ↓", fn: (a, b) => (a.marginWorst || 9999) - (b.marginWorst || 9999) },
  { id: "odHard", label: "Hardest to OD ↓", fn: (a, b) => (b.marginWorst || 9999) - (a.marginWorst || 9999) },
  { id: "dirtySupply", label: "Most contaminated ↓", fn: (a, b) => b.supplyRisk - a.supplyRisk },
  { id: "cleanSupply", label: "Cleanest supply ↓", fn: (a, b) => a.supplyRisk - b.supplyRisk },
  { id: "mostAddict", label: "Most addictive ↓", fn: (a, b) => b.addict - a.addict },
  { id: "leastAddict", label: "Least addictive ↓", fn: (a, b) => a.addict - b.addict },
  { id: "longest", label: "Longest lasting ↓", fn: (a, b) => parseDur(b) - parseDur(a) },
  { id: "shortest", label: "Shortest lasting ↓", fn: (a, b) => parseDur(a) - parseDur(b) },
];

export default function App() {
  const [sel, setSel] = useState([]);
  const [view, setView] = useState("index");
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState(null);
  const [sort, setSort] = useState("default");
  const [expanded, setExpanded] = useState(null);

  const toggle = useCallback(id => setSel(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]), []);

  const filtered = useMemo(() => {
    let list = S.filter(s => {
      const ms = !search || s.n.toLowerCase().includes(search.toLowerCase()) || s.aka.some(a => a.toLowerCase().includes(search.toLowerCase()));
      return ms && (!catF || s.cat === catF);
    });
    const sortObj = SORTS.find(x => x.id === sort);
    if (sortObj && sortObj.fn) list = [...list].sort(sortObj.fn);
    return list;
  }, [search, catF, sort]);

  const nb = (v, l) => <button onClick={() => setView(v)} style={{ padding: "6px 12px", borderRadius: 7, border: "none", cursor: "pointer", background: view === v ? "rgba(255,255,255,0.1)" : "transparent", color: view === v ? "#e8e6e3" : "#6b6860", fontFamily: "'DM Mono',monospace", fontSize: 12 }}>{l}</button>;

  const FilterBar = () => <div style={{ marginBottom: 14 }}>
    <input type="text" placeholder="Search name or street name..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#c7c4be", fontSize: 13, fontFamily: "'Source Serif 4',Georgia,serif", outline: "none", marginBottom: 8, boxSizing: "border-box" }} />
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
      <button onClick={() => setCatF(null)} style={{ padding: "4px 10px", borderRadius: 5, border: "1px solid", cursor: "pointer", fontSize: 10.5, fontFamily: "'DM Mono',monospace", background: !catF ? "rgba(255,255,255,0.1)" : "transparent", borderColor: !catF ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: !catF ? "#e8e6e3" : "#555" }}>All</button>
      {Object.entries(CAT).map(([k, v]) => <button key={k} onClick={() => setCatF(catF === k ? null : k)} style={{ padding: "4px 10px", borderRadius: 5, border: "1px solid", cursor: "pointer", fontSize: 10.5, fontFamily: "'DM Mono',monospace", background: catF === k ? v.b : "transparent", borderColor: catF === k ? v.c + "40" : "rgba(255,255,255,0.06)", color: catF === k ? v.c : "#555" }}>{v.l}</button>)}
    </div>
    <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      <span style={{ fontSize: 9.5, color: "#555", fontFamily: "'DM Mono',monospace", padding: "3px 0", marginRight: 4 }}>Sort:</span>
      {SORTS.map(s => <button key={s.id} onClick={() => setSort(s.id)} style={{ padding: "3px 8px", borderRadius: 4, border: "1px solid", cursor: "pointer", fontSize: 9.5, fontFamily: "'DM Mono',monospace", background: sort === s.id ? "rgba(255,255,255,0.1)" : "transparent", borderColor: sort === s.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: sort === s.id ? "#e8e6e3" : "#555" }}>{s.label}</button>)}
    </div>
  </div>;

  return <div style={{ minHeight: "100vh", background: "#111113", color: "#c7c4be", fontFamily: "'Source Serif 4',Georgia,serif" }}>
    <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 18px" }}><div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => setView("index")}>
        <svg width="24" height="24" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8" /><path d="M14 6v16M8 10l6-4 6 4M8 18l6 4 6-4" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" /></svg>
        <div><h1 style={{ margin: 0, fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400 }}>DoseGuide<span style={{ color: "#555", fontSize: 14 }}>.org</span></h1><p style={{ margin: 0, fontSize: 10, color: "#555", fontFamily: "'DM Mono',monospace" }}>Evidence-based harm reduction</p></div>
      </div>
      <nav style={{ display: "flex", gap: 2 }}>{nb("index", "Substances")}{nb("combos", "Combinations")}{nb("rankings", "Rankings")}{nb("matrix", "Matrix")}{nb("sources", "Sources")}</nav>
    </div></header>
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "6px 18px" }}><div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 7, padding: "7px 11px", fontSize: 11, color: "#a09070", lineHeight: 1.5 }}>
      <strong style={{ color: "#c4a050" }}>Harm reduction — not medical advice.</strong> Data: <a href="https://tripsit.me" style={{ color: "#c4a050" }} target="_blank" rel="noopener">TripSit</a>, Nutt et al., NHTSA, DrugsData, DanceSafe. <strong>Always test your substances.</strong>
    </div></div>
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 18px" }}>
      {view === "index" && <><FilterBar /><SubstanceIndex filtered={filtered} expanded={expanded} setExpanded={setExpanded} /></>}
      {view === "combos" && <CombinationChecker sel={sel} toggle={toggle} setSel={setSel} filtered={filtered} search={search} setSearch={setSearch} catF={catF} setCatF={setCatF} />}
      {view === "rankings" && <Charts />}
      {view === "matrix" && <Matrix />}
      {view === "sources" && <Sources />}
    </main>
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: 16, marginTop: 24, textAlign: "center" }}>
      <p style={{ fontSize: 11.5, color: "#666", maxWidth: 660, margin: "0 auto 5px", lineHeight: 1.5 }}>Overdose: <strong style={{ color: "#aaa" }}>Call 911 + Narcan</strong> · Struggling: <strong style={{ color: "#aaa" }}>SAMHSA 1-800-662-4357</strong></p>
      <p style={{ fontSize: 9.5, color: "#3a3a3a", fontFamily: "'DM Mono',monospace" }}>Data: TripSit · Nutt et al. 2010 · NHTSA · DrugsData · DanceSafe · PsychonautWiki</p>
    </footer>
  </div>;
}
