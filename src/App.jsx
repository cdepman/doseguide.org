import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { S, CAT, parseDur } from "./data/substances";
import SubstanceIndex from "./views/SubstanceIndex";
import CombinationChecker from "./views/CombinationChecker";
import Charts from "./components/Charts";
import Matrix from "./components/Matrix";
import InteractionsMobile from "./components/InteractionsMobile";
import Sources from "./views/Sources";
import { SearchInput, CategoryFilter, pillStyle } from "./components/SubstanceFilter";
import CrisisFooter from "./components/CrisisFooter";
import SubstancePanel from "./components/SubstancePanel";
import SwipePanel from "./components/SwipePanel";

const SORTS = [
  { id: "default", label: "Default", fn: null },
  { id: "physSafe", label: "Physically safest ↓", fn: (a, b) => b.dangerRank - a.dangerRank },
  { id: "physDanger", label: "Most physically dangerous ↓", fn: (a, b) => a.dangerRank - b.dangerRank },
  { id: "psychSafe", label: "Psychologically safest ↓", fn: (a, b) => a.overwhelm - b.overwhelm },
  { id: "psychRisk", label: "Most psychologically risky ↓", fn: (a, b) => b.overwhelm - a.overwhelm },
  { id: "dirtySupply", label: "Most contaminated ↓", fn: (a, b) => a.pctAsExpected - b.pctAsExpected },
  { id: "cleanSupply", label: "Cleanest supply ↓", fn: (a, b) => b.pctAsExpected - a.pctAsExpected },
  { id: "mostAddict", label: "Most addictive ↓", fn: (a, b) => b.addictPct - a.addictPct },
  { id: "leastAddict", label: "Least addictive ↓", fn: (a, b) => a.addictPct - b.addictPct },
  { id: "longest", label: "Longest lasting ↓", fn: (a, b) => parseDur(b) - parseDur(a) },
  { id: "shortest", label: "Shortest lasting ↓", fn: (a, b) => parseDur(a) - parseDur(b) },
];

function InteractionsView() {
  const [showMatrix, setShowMatrix] = useState(false);
  return <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
      {!showMatrix && <div />}
      {showMatrix && <h3 style={{ margin: 0, fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400 }}>Full Matrix</h3>}
      <button onClick={() => setShowMatrix(!showMatrix)} style={{ padding: "6px 12px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#8a8780", fontFamily: "'DM Mono',monospace", fontSize: 12, cursor: "pointer" }}>
        {showMatrix ? "← Substance lookup" : "View full matrix"}
      </button>
    </div>
    {showMatrix ? <Matrix /> : <InteractionsMobile />}
  </div>;
}

const CombosIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
  <circle cx="10" cy="5" r="3.5" /><rect x="2" y="12" width="6" height="6" rx="1" /><polygon points="16,11 20,19 12,19" />
</svg>;
const RankingsIcon = () => <svg width="20" height="14" viewBox="0 0 20 14" fill="currentColor">
  <rect x="0" y="0" width="6" height="3" rx="1.5" opacity="0.4" /><rect x="0" y="5.5" width="12" height="3" rx="1.5" opacity="0.6" /><rect x="0" y="11" width="19" height="3" rx="1.5" />
</svg>;
const InteractionsIcon = () => <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
  <defs>
    <clipPath id="il"><circle cx="8.5" cy="10" r="7" /></clipPath>
    <clipPath id="ir"><circle cx="15.5" cy="10" r="7" /></clipPath>
  </defs>
  <circle cx="8.5" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
  <circle cx="15.5" cy="10" r="7" stroke="currentColor" strokeWidth="1.6" />
  <circle cx="15.5" cy="10" r="7" fill="currentColor" opacity="0.45" clipPath="url(#il)" />
</svg>;

const SourcesIcon = () => <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
  <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M4 4.5A2.5 2.5 0 016.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15z" />
  <line x1="9" y1="7" x2="16" y2="7" /><line x1="9" y1="11" x2="14" y2="11" />
</svg>;

const HomeIcon = () => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
  <circle cx="10" cy="10" r="7.5" /><circle cx="10" cy="10" r="3" /><circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
</svg>;

const TABS = [
  { id: "index", label: "Home", iconSvg: HomeIcon },
  { id: "rankings", label: "Rankings", iconSvg: RankingsIcon },
  { id: "interactions", label: "Interactions", iconSvg: InteractionsIcon },
  { id: "combos", label: "Combos", iconSvg: CombosIcon },
  { id: "sources", label: "Sources", iconSvg: SourcesIcon },
];

export default function App() {
  const [sel, setSel] = useState([]);
  const validViews = ["index", "interactions", "combos", "rankings", "sources"];
  const hashView = window.location.hash.slice(1);
  const [view, setView] = useState(validViews.includes(hashView) ? hashView : "index");
  const [search, setSearch] = useState("");
  const [catF, setCatF] = useState(null);
  const [sort, setSort] = useState("default");
  const [expanded, setExpanded] = useState(null);
  const [panelId, setPanelId] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pageKey, setPageKey] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const toggle = useCallback(id => setSel(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]), []);

  const switchView = useCallback(v => {
    if (v === view) return;
    setView(v);
    window.location.hash = v === "index" ? "" : v;
    setPageKey(k => k + 1);
    scrollRef.current?.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      if (validViews.includes(h)) switchView(h);
      else if (!h) switchView("index");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [switchView]);

  const filtered = useMemo(() => {
    let list = S.filter(s => {
      if (s.isMedication && view === "index") return false;
      const ms = !search || s.n.toLowerCase().includes(search.toLowerCase()) || s.aka.some(a => a.toLowerCase().includes(search.toLowerCase()));
      return ms && (!catF || s.cat === catF);
    });
    const sortObj = SORTS.find(x => x.id === sort);
    if (sortObj && sortObj.fn) list = [...list].sort(sortObj.fn);
    return list;
  }, [search, catF, sort, view]);

  const activeFilters = (catF ? 1 : 0) + (sort !== "default" ? 1 : 0);
  const activeCatLabel = catF ? CAT[catF].l : null;
  const activeSortLabel = sort !== "default" ? SORTS.find(x => x.id === sort)?.label : null;

  return <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#111113", color: "#c7c4be", fontFamily: "'Source Serif 4',Georgia,serif" }}>

    {/* ── TOP BAR ── */}
    <header style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "10px 16px", paddingTop: "max(10px, env(safe-area-inset-top))", flexShrink: 0, background: "#111113", zIndex: 10, position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
        <div role="button" tabIndex={0} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", minHeight: 44 }} onClick={() => switchView("index")} onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); switchView("index"); }}}>
          <img src="/logo.svg" alt="OpenSubstance" style={{ width: 46, height: 46, borderRadius: 10 }} />
          <div><h1 style={{ margin: 0, fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400 }}>OpenSubstance<span style={{ color: "#555", fontSize: 14 }}>.org</span></h1></div>
        </div>
        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {TABS.map(t => <button key={t.id} onClick={() => switchView(t.id)} style={{ padding: "8px 14px", borderRadius: 7, border: "none", cursor: "pointer", background: view === t.id ? "rgba(255,255,255,0.1)" : "transparent", color: view === t.id ? "#e8e6e3" : "#6b6860", fontFamily: "'DM Mono',monospace", fontSize: 13, minHeight: 36, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, width: 18, height: 18, lineHeight: 1 }}>{t.iconSvg ? <t.iconSvg /> : t.icon}</span>
            {t.label}
          </button>)}
          <button onClick={() => setAboutOpen(true)} style={{ padding: "8px 12px", borderRadius: 7, border: "none", cursor: "pointer", background: "transparent", color: "#6b6860", fontFamily: "'DM Mono',monospace", fontSize: 13, minHeight: 36, display: "flex", alignItems: "center", gap: 4 }}><span style={{ fontSize: 12 }}>♥</span> About</button>
        </div>

        {/* Mobile hamburger */}
        <button className="mobile-hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", width: 44, height: 44, borderRadius: 10, border: "none", cursor: "pointer", background: menuOpen ? "rgba(255,255,255,0.1)" : "transparent", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: menuOpen ? 0 : 5, padding: 0, position: "relative" }}>
          <div style={{ width: 22, height: 2, borderRadius: 1, background: menuOpen ? "#e8e6e3" : "#888", transition: "all 0.25s", position: menuOpen ? "absolute" : "relative", transform: menuOpen ? "rotate(45deg)" : "none" }} />
          <div style={{ width: 22, height: 2, borderRadius: 1, background: menuOpen ? "#e8e6e3" : "#888", transition: "all 0.25s", position: menuOpen ? "absolute" : "relative", transform: menuOpen ? "rotate(-45deg)" : "none" }} />
        </button>
        {/* ── MOBILE DROPDOWN MENU ── */}
        {menuOpen && <>
          <div onClick={() => setMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 8 }} />
          <div style={{ position: "absolute", top: "100%", right: 0, zIndex: 9, width: 240, background: "#1e1e22", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "8px 0", boxShadow: "0 8px 24px rgba(0,0,0,0.5)", animation: "fadeIn 0.15s ease" }}>
            <button onClick={() => { setAboutOpen(true); setMenuOpen(false); }} style={{ width: "100%", padding: "12px 16px", border: "none", background: "transparent", color: "#c7c4be", fontSize: 16, fontFamily: "'DM Mono',monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
              <span style={{ display: "flex", width: 20, justifyContent: "center", fontSize: 20 }}>♥</span> About
            </button>
            <button onClick={() => { switchView("sources"); setMenuOpen(false); }} style={{ width: "100%", padding: "12px 16px", border: "none", background: view === "sources" ? "rgba(255,255,255,0.06)" : "transparent", color: view === "sources" ? "#e8e6e3" : "#c7c4be", fontSize: 16, fontFamily: "'DM Mono',monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
              <span style={{ display: "flex", width: 20, justifyContent: "center" }}><SourcesIcon /></span> Sources
            </button>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
            {TABS.filter(t => t.id !== "sources").map(t => <button key={t.id} onClick={() => { switchView(t.id); setMenuOpen(false); }} style={{ width: "100%", padding: "12px 16px", border: "none", background: view === t.id ? "rgba(255,255,255,0.06)" : "transparent", color: view === t.id ? "#e8e6e3" : "#8a8780", fontSize: 16, fontFamily: "'DM Mono',monospace", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
              <span style={{ display: "flex", width: 20, justifyContent: "center", fontSize: 18 }}>{t.iconSvg ? <t.iconSvg /> : t.icon}</span> {t.label}
            </button>)}
          </div>
        </>}
      </div>
    </header>

    {/* ── DISCLAIMER ── */}
    <div style={{ flexShrink: 0, maxWidth: 1200, margin: "0 auto", width: "100%", padding: "6px 16px" }}>
      <div style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.15)", borderRadius: 7, padding: "7px 12px", fontSize: 12, color: "#a09070", lineHeight: 1.5 }}>
        <strong style={{ color: "#c4a050" }}>Harm reduction, not medical advice.</strong> <span className="desktop-only"></span><strong>Substance testing saves lives.</strong>
      </div>
    </div>

    {/* ── SCROLLABLE MAIN ── */}
    <main ref={scrollRef} className="scroll-main" style={{ flex: 1, overflow: "auto", paddingBottom: "calc(70px + env(safe-area-inset-bottom, 0px))" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 16px" }}>
        <div key={pageKey} className="page-enter">

          {view === "index" && <>
            {/* Search */}
            <SearchInput value={search} onChange={setSearch} placeholder="Search name or street name..." />

            {/* Filter & Sort toggle button */}
            <button onClick={() => setFilterOpen(!filterOpen)} style={{
              width: "100%", padding: "10px 14px", borderRadius: 10, cursor: "pointer", marginBottom: 12,
              border: `1px solid ${filterOpen ? "rgba(255,255,255,0.12)" : activeFilters ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.06)"}`,
              background: filterOpen ? "rgba(255,255,255,0.05)" : activeFilters ? "rgba(168,85,247,0.06)" : "rgba(255,255,255,0.02)",
              display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 44,
              transition: "all 0.2s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, color: activeFilters ? "#a855f7" : "#666" }}>⚙</span>
                <span style={{ fontSize: 13, fontFamily: "'DM Mono',monospace", color: activeFilters ? "#c7c4be" : "#666" }}>
                  {activeFilters ? <>
                    {activeCatLabel && <span style={{ color: CAT[catF].c }}>{activeCatLabel}</span>}
                    {activeCatLabel && activeSortLabel && <span style={{ color: "#444" }}> · </span>}
                    {activeSortLabel && <span style={{ color: "#a09d97" }}>{activeSortLabel}</span>}
                  </> : "Filter & Sort"}
                </span>
              </div>
              <span style={{ fontSize: 11, color: "#555", transition: "transform 0.3s ease", transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block" }}>▼</span>
            </button>

            {/* Collapsible filter panel */}
            <div style={{ display: "grid", gridTemplateRows: filterOpen ? "1fr" : "0fr", transition: "grid-template-rows 0.35s cubic-bezier(0.32, 0.72, 0, 1)" }}>
              <div style={{ overflow: "hidden" }}>
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: 16, marginBottom: 12 }}>
                  {/* Category */}
                  <div style={{ marginBottom: 14 }}>
                    <h4 style={{ fontSize: 11, color: "#6b6860", fontFamily: "'DM Mono',monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Filter</h4>
                    <CategoryFilter catF={catF} setCatF={setCatF} />
                  </div>
                  {/* Sort */}
                  <div>
                    <h4 style={{ fontSize: 11, color: "#6b6860", fontFamily: "'DM Mono',monospace", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Sort by</h4>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {SORTS.map(s => <button key={s.id} onClick={() => setSort(s.id)} style={pillStyle(sort === s.id, null)}>{s.label}</button>)}
                    </div>
                  </div>
                  {/* Clear / Done */}
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    {activeFilters > 0 && <button onClick={() => { setCatF(null); setSort("default"); }} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", background: "transparent", color: "#888", fontSize: 13, fontFamily: "'DM Mono',monospace", cursor: "pointer", minHeight: 44 }}>Clear all</button>}
                    <button onClick={() => setFilterOpen(false)} style={{ flex: 1, padding: "12px", borderRadius: 10, border: "none", background: "rgba(255,255,255,0.08)", color: "#e8e6e3", fontSize: 13, fontFamily: "'DM Mono',monospace", cursor: "pointer", minHeight: 44 }}>Done</button>
                  </div>
                </div>
              </div>
            </div>

            <SubstanceIndex filtered={filtered} openPanel={setPanelId} />
          </>}

          {view === "combos" && <CombinationChecker sel={sel} toggle={toggle} setSel={setSel} filtered={filtered} search={search} setSearch={setSearch} catF={catF} setCatF={setCatF} />}
          {view === "rankings" && <Charts />}
          {view === "interactions" && <InteractionsView />}
          {view === "sources" && <Sources />}
        </div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.04)", padding: "16px", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "#3a3a3a", fontFamily: "'DM Mono',monospace", marginBottom: 4 }}>Data: TripSit · Nutt et al. 2010 · Broman et al. 2025 · Gable 2004 · DrugsData · DanceSafe · PsychonautWiki</p>
        <p style={{ fontSize: 12, color: "#3a3a3a", fontFamily: "'DM Mono',monospace" }}>Open source — <a href="https://github.com/cdepman/opensubstance.org" target="_blank" rel="noopener noreferrer" style={{ color: "#555", textDecoration: "none", borderBottom: "1px solid #333" }}>contribute on GitHub</a></p>
      </footer>
    </main>

    {/* ── ABOUT PANEL ── */}
    <SwipePanel open={aboutOpen} onClose={() => setAboutOpen(false)}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 24, color: "#e8e6e3" }}>About OpenSubstance</span>
          <button onClick={() => setAboutOpen(false)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 12px", color: "#888", fontSize: 13, cursor: "pointer", fontFamily: "'DM Mono',monospace" }}>Close</button>
        </div>

        {/* About */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ margin: "0 0 14px", fontSize: 15, color: "#a09d97", lineHeight: 1.7, fontFamily: "'Source Serif 4',Georgia,serif" }}>OpenSubstance is an open-source harm reduction resource. It does not encourage drug use. It exists because people use drugs whether or not they have good information, and the evidence is clear that informed users have better outcomes.</p>
          <p style={{ margin: "0 0 14px", fontSize: 15, color: "#a09d97", lineHeight: 1.7, fontFamily: "'Source Serif 4',Georgia,serif" }}>All data is sourced from peer-reviewed research, government agencies, and established harm reduction organizations including the Global Drug Survey, The Lancet, DanceSafe, and SAMHSA.</p>
          <p style={{ margin: "0 0 14px", fontSize: 15, color: "#a09d97", lineHeight: 1.7, fontFamily: "'Source Serif 4',Georgia,serif" }}>This project is personal. My father, Dr. Mark Depman, spent a good part of his career as an emergency physician in Vermont working at the intersection of substance use and harm reduction. In 2025, the Vermont Association for Mental Health and Addiction Recovery established the <a href="https://vermontbiz.com/news/2025/february/18/vamhar-presents-inaugural-dr-mark-depman-trailblazer-award-recovery-day-2025" target="_blank" rel="noopener noreferrer" style={{ color: "#c7c4be", textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.25)" }}>Dr. Mark Depman Trailblazer Award</a> in his honor. I grew up watching him advocate for his patients and insist that compassion and evidence, not stigma and punishment, save lives and heal communities.</p>
          <p style={{ margin: "0 0 14px", fontSize: 15, color: "#c7c4be", lineHeight: 1.7, fontFamily: "'Source Serif 4',Georgia,serif" }}>OpenSubstance is built in that spirit.</p>
          <p style={{ margin: 0, fontSize: 14, color: "#8a8780", fontFamily: "'Instrument Serif',Georgia,serif" }}>— Charlie Depman</p>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 24 }} />

        {/* Contributing */}
        <h3 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400, margin: "0 0 12px" }}>Contribute</h3>

        <p style={{ margin: "0 0 14px", fontSize: 14, color: "#a09d97", lineHeight: 1.6 }}>The most valuable contributions are data corrections. If you see something wrong — a safety rating, an addiction percentage, a combination rating — we want to know. You don't need to write code.</p>

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: 14, marginBottom: 14 }}>
          <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#c7c4be", fontFamily: "'DM Mono',monospace" }}>Report a data issue</h4>
          <div style={{ fontSize: 13, color: "#8a8780", lineHeight: 1.6 }}>
            <p style={{ margin: "0 0 4px" }}>1. Go to <a href="https://github.com/cdepman/opensubstance.org/issues" target="_blank" rel="noopener noreferrer" style={{ color: "#60a5fa", textDecoration: "none", borderBottom: "1px solid rgba(96,165,250,0.3)" }}>GitHub Issues</a></p>
            <p style={{ margin: "0 0 4px" }}>2. Tell us which substance and what's wrong</p>
            <p style={{ margin: "0 0 4px" }}>3. Include a source (study, dataset, or article)</p>
            <p style={{ margin: 0 }}>We don't change data based on opinions — we need evidence.</p>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: 14, marginBottom: 14 }}>
          <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#c7c4be", fontFamily: "'DM Mono',monospace" }}>What we need help with</h4>
          <div style={{ fontSize: 13, color: "#8a8780", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 3px" }}>Data verification and corrections</p>
            <p style={{ margin: "0 0 3px" }}>New substance profiles with sourced data</p>
            <p style={{ margin: "0 0 3px" }}>Combination mechanism explanations</p>
            <p style={{ margin: "0 0 3px" }}>Mobile testing and accessibility</p>
            <p style={{ margin: 0 }}>Translations into other languages</p>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)", padding: 14, marginBottom: 14 }}>
          <h4 style={{ margin: "0 0 8px", fontSize: 13, color: "#c7c4be", fontFamily: "'DM Mono',monospace" }}>Data standards</h4>
          <div style={{ fontSize: 13, color: "#8a8780", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 3px" }}><strong style={{ color: "#a09d97" }}>Sourced</strong> — every number traces to a published study or established organization</p>
            <p style={{ margin: "0 0 3px" }}><strong style={{ color: "#a09d97" }}>Conservative</strong> — when sources disagree, we use the safer estimate</p>
            <p style={{ margin: "0 0 3px" }}><strong style={{ color: "#a09d97" }}>Honest</strong> — we say "unknown" rather than guess</p>
            <p style={{ margin: 0 }}><strong style={{ color: "#a09d97" }}>Plain language</strong> — no jargon</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
          <a href="https://github.com/cdepman/opensubstance.org/issues" target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: 140, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#c7c4be", fontSize: 13, fontFamily: "'DM Mono',monospace", textDecoration: "none", textAlign: "center" }}>Report an issue</a>
          <a href="https://github.com/cdepman/opensubstance.org" target="_blank" rel="noopener noreferrer" style={{ flex: 1, minWidth: 140, padding: "12px 16px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#c7c4be", fontSize: 13, fontFamily: "'DM Mono',monospace", textDecoration: "none", textAlign: "center" }}>View source code</a>
        </div>

    </SwipePanel>

    {panelId && <SubstancePanel substanceId={panelId} onClose={() => setPanelId(null)} onNavigate={setPanelId} />}

    <CrisisFooter />

    {/* ── BOTTOM TAB BAR (mobile) ── */}
    <nav className="mobile-tab-bar" style={{ display: "none", position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50, background: "#1e1e22", borderTop: "1px solid rgba(255,255,255,0.12)", paddingBottom: "env(safe-area-inset-bottom, 0)", justifyContent: "space-around" }}>
      {TABS.filter(t => t.id !== "sources").map(t => <button key={t.id} onClick={() => switchView(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, padding: "12px 4px 10px", border: "none", background: "transparent", cursor: "pointer", color: view === t.id ? "#e8e6e3" : "#666", minHeight: 64, justifyContent: "center", WebkitTapHighlightColor: "transparent" }}>
        <span style={{ fontSize: 22, lineHeight: 1, transition: "transform 0.15s", transform: view === t.id ? "scale(1.15)" : "scale(1)", display: "flex", alignItems: "center", justifyContent: "center", height: 24 }}>{t.iconSvg ? <t.iconSvg /> : t.icon}</span>
        <span style={{ fontSize: 14, fontFamily: "'DM Mono',monospace", transition: "color 0.15s" }}>{t.label}</span>
      </button>)}
    </nav>

    {/* ── RESPONSIVE STYLES ── */}
    <style>{`
      @media (max-width: 768px) {
        .desktop-nav { display: none !important; }
        .desktop-only { display: none !important; }
        .mobile-tab-bar { display: flex !important; }
        .mobile-hamburger { display: flex !important; }
      }
      @media (min-width: 769px) {
        .mobile-tab-bar { display: none !important; }
        .mobile-hamburger { display: none !important; }
        .crisis-fab { bottom: 24px !important; }
      }
    `}</style>
  </div>;
}
