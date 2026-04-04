import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { S, CAT, CITE } from "../data/substances";
import SwipeDrawer from "./SwipeDrawer";

const CONF_COLORS = { measured: "#4ade80", derived: "#60a5fa", estimated: "#f59e0b", editorial: "#f97316" };
const CONF_LABELS = { measured: "Measured", derived: "Derived", estimated: "Estimated", editorial: "Editorial" };

function SrcBadge({ src }) {
  if (!src) return null;
  const col = CONF_COLORS[src.conf] || "#555";
  const refs = src.ref ? (Array.isArray(src.ref) ? src.ref : [src.ref]).filter(r => r && CITE[r]) : [];
  return <div style={{ marginTop: 10, padding: "8px 10px", background: "rgba(255,255,255,0.02)", borderRadius: 6, border: "1px solid rgba(255,255,255,0.04)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, flexWrap: "wrap" }}>
      <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: col + "18", color: col, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>{CONF_LABELS[src.conf] || src.conf}</span>
      {refs.map(r => <span key={r} style={{ fontSize: 10, color: "#555", fontFamily: "'DM Mono',monospace" }}>{r}</span>)}
    </div>
    <p style={{ margin: 0, fontSize: 11, color: "#6b6860", lineHeight: 1.5, fontFamily: "'DM Mono',monospace" }}>{src.note}</p>
  </div>;
}

// Map chart field names to _src keys
const SRC_KEYS = { margin: "margin", lethal: "margin", harm: "harm", addict: "addictPct", supply: "pctAsExpected" };

// Fixed info panel — uses portal-style fixed positioning
function InfoPanel({ substance, field, open, onClose }) {
  if (!substance) return null;
  const c = CAT[substance.cat];
  const notes = {
    margin: { title: "Risk Margin", text: substance.marginExplain },
    lethal: { title: "Lethal Dose", text: substance.lethal?.note || substance.marginExplain },
    harm: { title: "Total Damage", text: substance.desc },
    addict: { title: "Addiction Risk", text: substance.addictNote },
    supply: { title: "Supply Purity", text: substance.supplyExplain },
  };
  const info = notes[field];
  if (!info) return null;
  const srcKey = SRC_KEYS[field];
  const src = srcKey && substance._src?.[srcKey];

  return <SwipeDrawer open={open} onClose={onClose}>
    <div style={{ padding: "4px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div>
        <span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: c.c }}>{substance.n}</span>
        <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace", marginLeft: 8 }}>{info.title}</span>
      </div>
      <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 18, border: "none", background: "rgba(255,255,255,0.06)", color: "#888", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
    </div>
    <div style={{ padding: "14px 20px 24px" }}>
      {(field === "margin" || field === "lethal") && substance.lethal?.gable && <div style={{ marginBottom: 12, padding: "10px 12px", background: "rgba(255,255,255,0.03)", borderRadius: 8, border: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", gap: 16, fontSize: 13, fontFamily: "'DM Mono',monospace", color: "#6b6860", flexWrap: "wrap" }}>
          <span>effective <span style={{ color: "#4ade80" }}>{substance.lethal.gable.ed}</span></span>
          <span>lethal <span style={{ color: "#ef4444" }}>{substance.lethal.gable.ld}</span></span>
          <span>ratio <span style={{ color: "#c7c4be" }}>{substance.lethal.gable.ratio}</span></span>
        </div>
        <p style={{ margin: "4px 0 0", fontSize: 10, color: "#555", fontFamily: "'DM Mono',monospace" }}>Gable 2004 · healthy, non-tolerant, 70 kg adult{substance.lethal.gable.note ? ` · ${substance.lethal.gable.note}` : ""}</p>
      </div>}
      <p style={{ margin: 0, fontSize: 14, color: "#a09d97", lineHeight: 1.6 }}>{info.text}</p>
      <SrcBadge src={src} />
    </div>
  </SwipeDrawer>;
}

// Tiny info dot at end of row
function Dot({ onClick }) {
  return <span onClick={e => { e.stopPropagation(); onClick(); }} style={{ width: 28, height: 28, borderRadius: 14, background: "rgba(255,255,255,0.04)", color: "#555", fontSize: 12, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "'DM Mono',monospace" }}>?</span>;
}

function marginColor(v) {
  if (v >= 8) return "#22c55e";
  if (v >= 4) return "#60a5fa";
  if (v >= 2) return "#f59e0b";
  return "#ef4444";
}

function RiskMarginChart({ onInfo }) {
  const toP = v => Math.max(Math.min((Math.log10(Math.max(v, 1)) / Math.log10(50)) * 100, 100), 3);

  const main = S.filter(s => !s.isMedication && s.dangerRank != null && s.dangerRank < 99 && s.marginWorst != null).sort((a, b) => a.marginWorst - b.marginWorst);
  const contextual = S.filter(s => !s.isMedication && s.dangerRank != null && s.dangerRank < 99 && s.marginWorst == null).sort((a, b) => a.dangerRank - b.dangerRank);
  const safe = S.filter(s => !s.isMedication && s.dangerRank >= 99);

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>Risk Margin <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(worst-case doses before physical danger)</span></h3>
    <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b6860" }}>Worst case: mixing, unknown supply, preexisting conditions.</p>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10, fontSize: 12, fontFamily: "'DM Mono',monospace", color: "#555" }}>
      <span><span style={{ color: "#ef4444" }}>●</span> &lt;2x</span>
      <span><span style={{ color: "#f59e0b" }}>●</span> 2–4x</span>
      <span><span style={{ color: "#60a5fa" }}>●</span> 4–8x</span>
      <span><span style={{ color: "#22c55e" }}>●</span> 8x+</span>
    </div>

    {main.map(s => {
      const col = marginColor(s.marginWorst);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
          <div style={{ width: `${toP(s.marginWorst)}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}44, ${col})` }} />
        </div>
        <span style={{ fontSize: 12, color: col, fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{s.marginWorst}x</span>
        <Dot onClick={() => onInfo(s, "margin")} />
      </div>;
    })}

    {contextual.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
      {contextual.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 16, borderRadius: 5, overflow: "hidden" }}><div style={{ width: "100%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #60a5fa22, #60a5fa55)" }} /></div>
        <span style={{ fontSize: 12, color: "#60a5fa", fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right", whiteSpace: "nowrap" }}>note</span>
        <Dot onClick={() => onInfo(s, "margin")} />
      </div>)}
    </>}

    {safe.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
      {safe.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 16, borderRadius: 5, overflow: "hidden" }}><div style={{ width: "100%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #22c55e55, #22c55e)" }} /></div>
        <span style={{ fontSize: 12, color: "#4ade80", fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right", whiteSpace: "nowrap" }}>safe</span>
        <Dot onClick={() => onInfo(s, "margin")} />
      </div>)}
    </>}
  </div>;
}

function addictColor(pct) {
  if (pct >= 40) return "#ef4444";
  if (pct >= 20) return "#f97316";
  if (pct >= 10) return "#f59e0b";
  if (pct >= 3) return "#60a5fa";
  return "#22c55e";
}

function AddictionChart({ onInfo }) {
  const items = S.filter(s => s.addictPct > 0 && !s.isMedication).sort((a, b) => b.addictPct - a.addictPct);
  const max = 75;

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>How Addictive? <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(estimated likelihood of dependence)</span></h3>
    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b6860" }}>Solid bars: measured (Lopez-Quintero 2011, Anthony 1994). Dashed bars: clinical estimates. Timeframes vary: tobacco/alcohol/cocaine from survival analysis (lifetime); hallucinogens from Stone 2007 (24 months).</p>
    {items.map(s => {
      const w10 = Math.min((s.addictPct / max) * 100, 100);
      const wLife = Math.min((s.addictLife / max) * 100, 100);
      const col = addictColor(s.addictPct);
      const est = s._src?.addictPct?.conf === "estimated" || s._src?.addictPct?.conf === "editorial";
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.03)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, width: `${wLife}%`, height: "100%", borderRadius: 5, background: `${col}25` }} />
          {est
            ? <div style={{ position: "absolute", left: 0, width: `${w10}%`, height: "100%", borderRadius: 5, background: `repeating-linear-gradient(90deg, ${col}88 0px, ${col} 4px, transparent 4px, transparent 7px)` }} />
            : <div style={{ position: "absolute", left: 0, width: `${w10}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}88, ${col})` }} />
          }
        </div>
        <span style={{ fontSize: 12, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 36, textAlign: "right" }}>{s.addictPrefix || ""}{s.addictPct}%{est ? "*" : ""}</span>
        <Dot onClick={() => onInfo(s, "addict")} />
      </div>;
    })}
    <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12, fontFamily: "'DM Mono',monospace", color: "#555" }}>
      <span>█ measured</span>
      <span>┆ estimated*</span>
      <span style={{ opacity: 0.5 }}>░ lifetime</span>
    </div>
  </div>;
}

function supplyColor(pct) {
  if (pct >= 90) return "#22c55e";
  if (pct >= 75) return "#f59e0b";
  if (pct >= 50) return "#f97316";
  return "#ef4444";
}

function SupplyChart({ onInfo }) {
  const risky = S.filter(s => s.pctAsExpected != null && s.pctAsExpected < 96).sort((a, b) => a.pctAsExpected - b.pctAsExpected);
  const safe = S.filter(s => s.pctAsExpected != null && s.pctAsExpected >= 96).sort((a, b) => a.pctAsExpected - b.pctAsExpected);

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>How Pure Is It? <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(% tests as expected)</span></h3>
    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b6860" }}>Data from drug checking services in US, Canada, NZ, and Europe.</p>

    {risky.map(s => {
      const col = supplyColor(s.pctAsExpected);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
          <div style={{ width: `${s.pctAsExpected}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}88, ${col})` }} />
        </div>
        <span style={{ fontSize: 12, color: col, fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{s.pctAsExpected}%</span>
        <Dot onClick={() => onInfo(s, "supply")} />
      </div>;
    })}

    {safe.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
      {safe.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 16, borderRadius: 5, overflow: "hidden" }}>
          <div style={{ width: `${s.pctAsExpected}%`, height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #22c55e55, #22c55e)" }} />
        </div>
        <span style={{ fontSize: 12, color: "#4ade80", fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{s.pctAsExpected}%</span>
        <Dot onClick={() => onInfo(s, "supply")} />
      </div>)}
    </>}
  </div>;
}

function HarmChart({ onInfo }) {
  const items = S.filter(x => x.harm).sort((a, b) => b.harm - a.harm);
  const max = 80;

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>Total Damage <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(to you + to society)</span></h3>
    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b6860" }}>Solid bars: Nutt et al. (Lancet 2010) — 20 substances scored by expert panel. Dashed bars: estimated by DoseGuide based on clinical literature.</p>
    {items.map(s => {
      const v = s.harm;
      const w = Math.min((v / max) * 100, 100);
      const col = v > 50 ? "#ef4444" : v > 30 ? "#f97316" : v > 15 ? "#f59e0b" : "#22c55e";
      const est = s.harmEstimated || s._src?.harm?.conf === "estimated";
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 16, borderRadius: 5, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
          {est
            ? <div style={{ width: `${w}%`, height: "100%", borderRadius: 4, background: `repeating-linear-gradient(90deg, ${col}66 0px, ${col}66 4px, transparent 4px, transparent 7px)` }} />
            : <div style={{ width: `${w}%`, height: "100%", borderRadius: 4, background: `linear-gradient(90deg,${col}44,${col})` }} />
          }
        </div>
        <span style={{ fontSize: 10.5, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{v}{est ? "*" : ""}</span>
        <Dot onClick={() => onInfo(s, "harm")} />
      </div>;
    })}
    <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#555" }}>
      <span>█ Nutt 2010</span>
      <span>┆ Estimated*</span>
    </div>
  </div>;
}

function ratioNum(r) {
  if (!r) return 0;
  const s = r.replace(/[>~,]/g, "").split(":")[0];
  return parseFloat(s) || 0;
}

function ratioColor(v) {
  if (v >= 100) return "#22c55e";
  if (v >= 30) return "#60a5fa";
  if (v >= 15) return "#f59e0b";
  return "#ef4444";
}

function LethalChart({ onInfo }) {
  const items = S.filter(s => s.lethal?.gable).sort((a, b) => ratioNum(a.lethal.gable.ratio) - ratioNum(b.lethal.gable.ratio));
  const maxLog = Math.log10(1200);

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>Lethal Dose Ratio <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(how many effective doses to kill)</span></h3>
    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b6860" }}>Gable 2004 (Addiction). Ratio of lethal dose to effective dose in a healthy, non-tolerant adult. Log scale. † = animal extrapolation.</p>
    {items.map(s => {
      const g = s.lethal.gable;
      const v = ratioNum(g.ratio);
      const w = Math.max(Math.min((Math.log10(Math.max(v, 1.1)) / maxLog) * 100, 100), 3);
      const col = ratioColor(v);
      const hasNote = g.note;
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 70, fontSize: 12, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{(s.sn || s.n)}</span>
        <div style={{ flex: 1, height: 20, borderRadius: 6, background: "rgba(255,255,255,0.03)", overflow: "hidden", position: "relative" }}>
          <div style={{ width: `${w}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}44, ${col})` }} />
        </div>
        <span style={{ fontSize: 11, color: col, fontFamily: "'DM Mono',monospace", minWidth: 52, textAlign: "right", whiteSpace: "nowrap" }}>{g.ratio}{hasNote ? "†" : ""}</span>
        <Dot onClick={() => onInfo(s, "lethal")} />
      </div>;
    })}
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8, fontSize: 11, fontFamily: "'DM Mono',monospace", color: "#555" }}>
      <span><span style={{ color: "#ef4444" }}>●</span> &lt;15x</span>
      <span><span style={{ color: "#f59e0b" }}>●</span> 15-30x</span>
      <span><span style={{ color: "#60a5fa" }}>●</span> 30-100x</span>
      <span><span style={{ color: "#22c55e" }}>●</span> 100x+</span>
      <span style={{ color: "#6b6860" }}>† animal data</span>
    </div>
  </div>;
}

const SECTIONS = [
  { id: "lethal", label: "Lethal Dose" },
  { id: "addiction", label: "Addiction" },
  { id: "supply", label: "Purity" },
  { id: "harm", label: "Total Harm" },
  { id: "safety", label: "Risk Margin" },
];

export default function Charts() {
  const [panel, setPanel] = useState({ substance: null, field: null });
  const openInfo = (substance, field) => setPanel({ substance, field });
  const closeInfo = () => setPanel({ substance: null, field: null });
  const refs = useRef({});
  const setRef = useCallback((id) => (el) => { refs.current[id] = el; }, []);

  const scrollTo = (id) => {
    const el = refs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <div style={{ maxWidth: 720 }}>
    {/* ── JUMP TABS ── */}
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14, position: "sticky", top: 0, zIndex: 5, background: "#111113", padding: "8px 0 10px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {SECTIONS.map(s => <button key={s.id} onClick={() => scrollTo(s.id)} style={{ padding: "7px 12px", borderRadius: 7, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)", color: "#8a8780", fontFamily: "'DM Mono',monospace", fontSize: 12, cursor: "pointer", minHeight: 34 }}>{s.label}</button>)}
    </div>

    <div ref={setRef("lethal")} style={{ scrollMarginTop: 80 }}><LethalChart onInfo={openInfo} /></div>
    <div ref={setRef("addiction")} style={{ scrollMarginTop: 80 }}><AddictionChart onInfo={openInfo} /></div>
    <div ref={setRef("supply")} style={{ scrollMarginTop: 80 }}><SupplyChart onInfo={openInfo} /></div>
    <div ref={setRef("harm")} style={{ scrollMarginTop: 80 }}><HarmChart onInfo={openInfo} /></div>
    <div ref={setRef("safety")} style={{ scrollMarginTop: 80 }}><RiskMarginChart onInfo={openInfo} /></div>
    <InfoPanel substance={panel.substance} field={panel.field} open={!!panel.substance} onClose={closeInfo} />
  </div>;
}
