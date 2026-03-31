import { useState, useCallback, useMemo, useRef, useEffect } from "react";
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
  { id: "odEasy", label: "Most dangerous ↓", fn: (a, b) => (b.dangerRank || 0) - (a.dangerRank || 0) },
  { id: "odHard", label: "Least dangerous ↓", fn: (a, b) => (a.dangerRank || 0) - (b.dangerRank || 0) },
  { id: "dirtySupply", label: "Most contaminated ↓", fn: (a, b) => b.supplyRisk - a.supplyRisk },
  { id: "cleanSupply", label: "Cleanest supply ↓", fn: (a, b) => a.supplyRisk - b.supplyRisk },
  { id: "mostAddict", label: "Most addictive ↓", fn: (a, b) => b.addict - a.addict },
  { id: "leastAddict", label: "Least addictive ↓", fn: (a, b) => a.addict - b.addict },
  { id: "longest", label: "Longest lasting ↓", fn: (a, b) => parseDur(b) - parseDur(a) },
  { id: "shortest", label: "Shortest lasting ↓", fn: (a, b) => parseDur(a) - parseDur(b) },
];

const TABS = [
  { id: "index", label: "Substances", icon: "◎" },
  { id: "combos", label: "Combos", icon: "⬡" },
  { id: "rankings", label: "Rankings", icon: "▥" },
  { id: "matrix", label: "Matrix", icon: "⊞" },
  { id: "sources", label: "Sources", icon: "◈" },
];

function Drawer({ open, onClose, title, children }) {
  return <>
    <div className={`drawer-overlay${open ? " open" : ""}`} onClick={onClose} />
    <div className={`drawer-panel${open ? " open" : ""}`}>
      <div style={{ padding: "12px 20px 8px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 17, color: "#e8e6e3" }}>{title}</span>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 18, border: "none", background: "rgba(255,255,255,0.06)", color: "#888", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>
      <div style={{ padding: "12px 20px 20px" }}>{children}</div>
    </div>
  </>;
}

export default function App() {
  const [sel, setSel] = useState([]);
  const [view, setView] = useState("index");
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState(null);
  const [sort, setSort] = useState("default");
  const [expanded, setExpanded] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageKey, setPageKey] = useState(0);
  const scrollRef = useRef(null);

  const toggle = useCallback(id => setSel(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]), []);

  const switchView = useCallback(v => {
    if (v === view) return;
    setView(v);
    setPageKey(k => k + 1);
    scrollRef.current?.scrollTo(0, 0);
  }, [view]);

  const filtered = useMemo(() => {
    let list = S.filter(s => {
      const ms = !search || s.n.toLowerCase().includes(search.toLowerCase()) || s.aka.some(a => a.toLowerCase().includes(search.toLowerCase()));
      return ms && (!catF || s.cat === catF);
    });
    const sortObj = SORTS.find(x => x.id === sort);
    if (sortObj && sortObj.fn) list = [...list].sort(sortObj.fn);
    return list;
  }, [search, catF, sort]);

  const activeFilters = (catF ? 1 : 0) + (sort !== "default" ? 1 : 0);

  // Filter drawer content (shared between index and combos)
  const FilterDrawerContent = () => <div>
    <div style={{ marginBottom: 16 }}>
      <h4 style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Category</h4>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button onClick={() => setCatF(null)} style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 13, fontFamily: "'DM Mono',monospace", background: !catF ? "rgba(255,255,255,0.1)" : "transparent", borderColor: !catF ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: !catF ? "#e8e6e3" : "#555" }}>All</button>
        {Object.entries(CAT).map(([k, v]) => <button key={k} onClick={() => setCatF(catF === k ? null : k)} style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 13, fontFamily: "'DM Mono',monospace", background: catF === k ? v.b : "transparent", borderColor: catF === k ? v.c + "40" : "rgba(255,255,255,0.06)", color: catF === k ? v.c : "#555" }}>{v.l}</button>)}
      </div>
    </div>
    <div>
      <h4 style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sort by</h4>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {SORTS.map(s => <button key={s.id} onClick={() => setSort(s.id)} style={{ padding: "10px 16px", borderRadius: 8, border: "1px solid", cursor: "pointer", fontSize: 13, fontFamily: "'DM Mono',monospace", background: sort === s.id ? "rgba(255,255,255,0.1)" : "transparent", borderColor: sort === s.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: sort === s.id ? "#e8e6e3" : "#555" }}>{s.label}</button>)}
      </div>
    </div>
    <button onClick={() => setFilterOpen(false)} style={{ width: "100%", marginTop: 20, padding: "14px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.08)", color: "#e8e6e3", fontSize: 15, fontFamily: "'DM Mono',monospace", cursor: "pointer" }}>Done</button>
  </div>;

  return <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#111113", color: "#c7c4be", fontFamily: "'Source Serif 4',Georgia,serif" }}>

    {/* ── TOP BAR ── */}
    <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 16px", paddingTop: "max(10px, env(safe-area-inset-top))", flexShrink: 0, background: "#111113", zIndex: 10 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", minHeight: 44 }} onClick={() => switchView("index")}>
          <svg width="24" height="24" viewBox="0 0 28 28"><circle cx="14" cy="14" r="12" fill="none" stroke="#22c55e" strokeWidth="2" opacity="0.8" /><path d="M14 6v16M8 10l6-4 6 4M8 18l6 4 6-4" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" /></svg>
          <div><h1 style={{ margin: 0, fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400 }}>DoseGuide<span style={{ color: "#555", fontSize: 14 }}>.org</span></h1></div>
        </div>

        {/* Desktop nav — hidden on mobile */}
        <nav className="desktop-nav" style={{ display: "flex", gap: 2 }}>
          {TABS.map(t => <button key={t.id} onClick={() => switchView(t.id)} style={{ padding: "8px 14px", borderRadius: 7, border: "none", cursor: "pointer", background: view === t.id ? "rgba(255,255,255,0.1)" : "transparent", color: view === t.id ? "#e8e6e3" : "#6b6860", fontFamily: "'DM Mono',monospace", fontSize: 12, minHeight: 36 }}>{t.label}</button>)}
        </nav>

        {/* Mobile filter button — only on index/combos */}
        {(view === "index" || view === "combos") && <button className="mobile-filter-btn" onClick={() => setFilterOpen(true)} style={{ display: "none", minWidth: 44, minHeight: 44, borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: activeFilters ? "rgba(168,85,247,0.12)" : "transparent", color: activeFilters ? "#a855f7" : "#666", fontSize: 13, fontFamily: "'DM Mono',monospace", cursor: "pointer", alignItems: "center", justifyContent: "center", gap: 4, position: "relative" }}>
          ⚙{activeFilters > 0 && <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: 4, background: "#a855f7" }} />}
        </button>}
      </div>
    </header>

    {/* ── DISCLAIMER ── */}
    <div style={{ flexShrink: 0, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "6px 16px" }}>
      <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 7, padding: "7px 12px", fontSize: 12, color: "#a09070", lineHeight: 1.5 }}>
        <strong style={{ color: "#c4a050" }}>Harm reduction — not medical advice.</strong> <span className="desktop-only">Data: <a href="https://tripsit.me" style={{ color: "#c4a050" }} target="_blank" rel="noopener">TripSit</a>, Nutt et al., NHTSA, DrugsData, DanceSafe. </span><strong>Always test your substances.</strong>
      </div>
    </div>

    {/* ── SCROLLABLE MAIN ── */}
    <main ref={scrollRef} className="scroll-main" style={{ flex: 1, overflow: "auto", paddingBottom: "calc(70px + env(safe-area-inset-bottom, 0px))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 16px" }}>
        <div key={pageKey} className="page-enter">

          {view === "index" && <>
            {/* Mobile: search bar inline, filters in drawer */}
            <input type="text" placeholder="Search name or street name..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#c7c4be", fontFamily: "'Source Serif 4',Georgia,serif", outline: "none", marginBottom: 10, boxSizing: "border-box" }} />
            {/* Desktop: inline filter bar */}
            <div className="desktop-only" style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 8 }}>
                <button onClick={() => setCatF(null)} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid", cursor: "pointer", fontSize: 12, fontFamily: "'DM Mono',monospace", background: !catF ? "rgba(255,255,255,0.1)" : "transparent", borderColor: !catF ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: !catF ? "#e8e6e3" : "#555" }}>All</button>
                {Object.entries(CAT).map(([k, v]) => <button key={k} onClick={() => setCatF(catF === k ? null : k)} style={{ padding: "6px 12px", borderRadius: 6, border: "1px solid", cursor: "pointer", fontSize: 12, fontFamily: "'DM Mono',monospace", background: catF === k ? v.b : "transparent", borderColor: catF === k ? v.c + "40" : "rgba(255,255,255,0.06)", color: catF === k ? v.c : "#555" }}>{v.l}</button>)}
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, color: "#555", fontFamily: "'DM Mono',monospace", padding: "4px 0", marginRight: 4 }}>Sort:</span>
                {SORTS.map(s => <button key={s.id} onClick={() => setSort(s.id)} style={{ padding: "5px 10px", borderRadius: 5, border: "1px solid", cursor: "pointer", fontSize: 11, fontFamily: "'DM Mono',monospace", background: sort === s.id ? "rgba(255,255,255,0.1)" : "transparent", borderColor: sort === s.id ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)", color: sort === s.id ? "#e8e6e3" : "#555" }}>{s.label}</button>)}
              </div>
            </div>
            <SubstanceIndex filtered={filtered} expanded={expanded} setExpanded={setExpanded} />
          </>}

          {view === "combos" && <CombinationChecker sel={sel} toggle={toggle} setSel={setSel} filtered={filtered} search={search} setSearch={setSearch} catF={catF} setCatF={setCatF} />}
          {view === "rankings" && <Charts />}
          {view === "matrix" && <Matrix />}
          {view === "sources" && <Sources />}
        </div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "16px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#666", maxWidth: 660, margin: "0 auto 5px", lineHeight: 1.5 }}>Overdose: <strong style={{ color: "#aaa" }}>Call 911 + Narcan</strong> · Struggling: <strong style={{ color: "#aaa" }}>SAMHSA 1-800-662-4357</strong></p>
        <p style={{ fontSize: 10, color: "#3a3a3a", fontFamily: "'DM Mono',monospace" }}>Data: TripSit · Nutt et al. 2010 · NHTSA · DrugsData · DanceSafe · PsychonautWiki</p>
      </footer>
    </main>

    {/* ── BOTTOM TAB BAR (mobile) ── */}
    <nav className="mobile-tab-bar" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, background: "rgba(17,17,19,0.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderTop: "1px solid rgba(255,255,255,0.06)", paddingBottom: "env(safe-area-inset-bottom, 0)", justifyContent: "space-around" }}>
      {TABS.map(t => <button key={t.id} onClick={() => switchView(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "8px 4px 6px", border: "none", background: "transparent", cursor: "pointer", color: view === t.id ? "#e8e6e3" : "#555", minHeight: 50, justifyContent: "center", WebkitTapHighlightColor: "transparent" }}>
        <span style={{ fontSize: 18, lineHeight: 1, transition: "transform 0.15s", transform: view === t.id ? "scale(1.15)" : "scale(1)" }}>{t.icon}</span>
        <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", transition: "color 0.15s" }}>{t.label}</span>
      </button>)}
    </nav>

    {/* ── FILTER DRAWER (mobile) ── */}
    <Drawer open={filterOpen} onClose={() => setFilterOpen(false)} title="Filter & Sort">
      <FilterDrawerContent />
    </Drawer>

    {/* ── RESPONSIVE STYLES ── */}
    <style>{`
      @media (max-width: 768px) {
        .desktop-nav { display: none !important; }
        .desktop-only { display: none !important; }
        .mobile-tab-bar { display: flex !important; }
        .mobile-filter-btn { display: flex !important; }
      }
      @media (min-width: 769px) {
        .mobile-tab-bar { display: none !important; }
        .mobile-filter-btn { display: none !important; }
      }
    `}</style>
  </div>;
}
