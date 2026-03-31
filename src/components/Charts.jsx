import { useState } from "react";
import { createPortal } from "react-dom";
import { S, CAT } from "../data/substances";

// Fixed info panel — uses portal-style fixed positioning
function InfoPanel({ substance, field, open, onClose }) {
  if (!substance) return null;
  const c = CAT[substance.cat];
  const notes = {
    margin: { title: "Room for Error", text: substance.marginExplain },
    harm: { title: "Total Damage", text: substance.desc },
    addict: { title: "Addiction Risk", text: substance.addictNote },
    supply: { title: "Supply Purity", text: substance.supplyExplain },
  };
  const info = notes[field];
  if (!info) return null;

  return createPortal(<>
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "opacity 0.3s ease" }} />
    <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 210, background: "#1a1a1e", borderTopLeftRadius: 16, borderTopRightRadius: 16, maxHeight: "60vh", transform: open ? "translateY(0)" : "translateY(100%)", transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)", overflowY: "auto", WebkitOverflowScrolling: "touch", paddingBottom: "env(safe-area-inset-bottom, 0)" }}>
      <div style={{ padding: "14px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <span style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: c.c }}>{substance.n}</span>
          <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace", marginLeft: 8 }}>{info.title}</span>
        </div>
        <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 18, border: "none", background: "rgba(255,255,255,0.06)", color: "#888", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
      </div>
      <div style={{ padding: "14px 20px 24px" }}>
        <p style={{ margin: 0, fontSize: 14, color: "#a09d97", lineHeight: 1.6 }}>{info.text}</p>
        {field === "addict" && substance.addictSource && <p style={{ margin: "10px 0 0", fontSize: 11, color: "#555", fontFamily: "'DM Mono',monospace" }}>Source: {substance.addictSource}</p>}
      </div>
    </div>
  </>, document.body);
}

// Tiny info dot at end of row
function Dot({ onClick }) {
  return <span onClick={e => { e.stopPropagation(); onClick(); }} style={{ width: 14, height: 14, borderRadius: 7, background: "rgba(255,255,255,0.04)", color: "#444", fontSize: 8, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>i</span>;
}

function marginColor(v) {
  if (v >= 10) return "#22c55e";
  if (v >= 5) return "#60a5fa";
  if (v >= 3) return "#f59e0b";
  return "#ef4444";
}

function RangeChart({ onInfo }) {
  const max = 50;
  const toP = v => Math.min((Math.log10(Math.max(v, 1)) / Math.log10(max)) * 100, 100);

  const ranged = S.filter(s => s.dangerRank < 99 && s.marginBest != null).sort((a, b) => a.dangerRank - b.dangerRank);
  const contextual = S.filter(s => s.dangerRank < 99 && s.marginBest == null).sort((a, b) => a.dangerRank - b.dangerRank);
  const safe = S.filter(s => s.dangerRank >= 99);

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>Room For Error <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(normal doses before danger)</span></h3>
    <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b6860" }}>Solid = worst case, faded = best case.</p>
    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 10, fontSize: 9.5, fontFamily: "'DM Mono',monospace", color: "#555" }}>
      <span><span style={{ color: "#ef4444" }}>●</span> &lt;3x</span>
      <span><span style={{ color: "#f59e0b" }}>●</span> 3-5x</span>
      <span><span style={{ color: "#60a5fa" }}>●</span> 5-10x</span>
      <span><span style={{ color: "#22c55e" }}>●</span> 10x+</span>
    </div>

    {ranged.map(s => {
      const wWorst = toP(s.marginWorst); const wBest = toP(s.marginBest);
      const colWorst = marginColor(s.marginWorst); const colBest = marginColor(s.marginBest);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.03)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, width: `${wBest}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${colWorst}30, ${colBest}40)` }} />
          <div style={{ position: "absolute", left: 0, width: `${Math.max(wWorst, 2)}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${colWorst}aa, ${colWorst})` }} />
        </div>
        <span style={{ fontSize: 9.5, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 50, textAlign: "right", whiteSpace: "nowrap" }}>{s.marginWorst}x–{s.marginBest}x</span>
        <Dot onClick={() => onInfo(s, "margin")} />
      </div>;
    })}

    {contextual.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
      {contextual.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden" }}><div style={{ width: "100%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #60a5fa22, #60a5fa55)" }} /></div>
        <span style={{ fontSize: 9.5, color: "#60a5fa", fontFamily: "'DM Mono',monospace", minWidth: 50, textAlign: "right", whiteSpace: "nowrap" }}>context</span>
        <Dot onClick={() => onInfo(s, "margin")} />
      </div>)}
    </>}

    {safe.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
      {safe.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden" }}><div style={{ width: "100%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #22c55e55, #22c55e)" }} /></div>
        <span style={{ fontSize: 9.5, color: "#4ade80", fontFamily: "'DM Mono',monospace", minWidth: 50, textAlign: "right", whiteSpace: "nowrap" }}>no lethal dose</span>
        <Dot onClick={() => onInfo(s, "margin")} />
      </div>)}
    </>}
  </div>;
}

function addictColor(pct) {
  if (pct >= 15) return "#ef4444";
  if (pct >= 10) return "#f97316";
  if (pct >= 5) return "#f59e0b";
  if (pct >= 2) return "#60a5fa";
  return "#22c55e";
}

function AddictionChart({ onInfo }) {
  const items = S.filter(s => s.addictPct > 0).sort((a, b) => b.addictPct - a.addictPct);
  const max = 25;

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>How Addictive? <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(dependence within 10 years)</span></h3>
    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b6860" }}>Based on Lopez-Quintero 2011 (NESARC) and clinical estimates.</p>
    {items.map(s => {
      const w10 = Math.min((s.addictPct / max) * 100, 100);
      const wLife = Math.min((s.addictLife / max) * 100, 100);
      const col = addictColor(s.addictPct);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.03)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, width: `${wLife}%`, height: "100%", borderRadius: 5, background: `${col}25` }} />
          <div style={{ position: "absolute", left: 0, width: `${w10}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}88, ${col})` }} />
        </div>
        <span style={{ fontSize: 9.5, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{s.addictPct}%</span>
        <Dot onClick={() => onInfo(s, "addict")} />
      </div>;
    })}
    <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 9.5, fontFamily: "'DM Mono',monospace", color: "#555" }}>
      <span>█ within 10 years</span>
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
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>Is It What You Think? <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(% tests as expected)</span></h3>
    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b6860" }}>Data from drug checking services in US, Canada, NZ, and Europe.</p>

    {risky.map(s => {
      const col = supplyColor(s.pctAsExpected);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
          <div style={{ width: `${s.pctAsExpected}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}88, ${col})` }} />
        </div>
        <span style={{ fontSize: 9.5, color: col, fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{s.pctAsExpected}%</span>
        <Dot onClick={() => onInfo(s, "supply")} />
      </div>;
    })}

    {safe.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "6px 0" }} />
      {safe.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${s.pctAsExpected}%`, height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #22c55e55, #22c55e)" }} />
        </div>
        <span style={{ fontSize: 9.5, color: "#4ade80", fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{s.pctAsExpected}%</span>
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
    <p style={{ margin: "0 0 10px", fontSize: 12, color: "#6b6860" }}>Nutt et al. (Lancet 2010). Alcohol scores highest of any drug.</p>
    {items.map(s => {
      const v = s.harm;
      const w = Math.min((v / max) * 100, 100);
      const col = v > 50 ? "#ef4444" : v > 30 ? "#f97316" : v > 15 ? "#f59e0b" : "#22c55e";
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}>
          <div style={{ width: `${w}%`, height: "100%", borderRadius: 4, background: `linear-gradient(90deg,${col}44,${col})` }} />
        </div>
        <span style={{ fontSize: 10.5, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 28, textAlign: "right" }}>{v}</span>
        <Dot onClick={() => onInfo(s, "harm")} />
      </div>;
    })}
  </div>;
}

export default function Charts() {
  const [panel, setPanel] = useState({ substance: null, field: null });
  const openInfo = (substance, field) => setPanel({ substance, field });
  const closeInfo = () => setPanel({ substance: null, field: null });

  return <div>
    <RangeChart onInfo={openInfo} />
    <HarmChart onInfo={openInfo} />
    <AddictionChart onInfo={openInfo} />
    <SupplyChart onInfo={openInfo} />
    <InfoPanel substance={panel.substance} field={panel.field} open={!!panel.substance} onClose={closeInfo} />
  </div>;
}
