import { S, CAT, ADDICT_COLORS } from "../data/substances";

function Bar({ items, max, getVal, getCol, title, sub, desc, log }) {
  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>{title}<span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}> {sub}</span></h3>
    <p style={{ margin: "0 0 12px", fontSize: 12, color: "#6b6860" }}>{desc}</p>
    {items.map(s => { const v = getVal(s); const w = log ? Math.min((Math.log10(Math.max(v, 1)) / Math.log10(max)) * 100, 100) : Math.min((v / max) * 100, 100); return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
      <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
      <div style={{ flex: 1, height: 8, borderRadius: 4, background: "rgba(255,255,255,0.04)", overflow: "hidden" }}><div style={{ width: `${w}%`, height: "100%", borderRadius: 4, background: `linear-gradient(90deg,${getCol(s)}44,${getCol(s)})` }} /></div>
      <span style={{ fontSize: 10.5, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 40, textAlign: "right" }}>{v >= 1000 ? ">1k" : v}</span>
    </div>; })}
  </div>;
}

function marginColor(v) {
  if (v >= 10) return "#22c55e";
  if (v >= 5) return "#60a5fa";
  if (v >= 3) return "#f59e0b";
  return "#ef4444";
}

function RangeChart() {
  const max = 50;
  const toP = v => Math.min((Math.log10(Math.max(v, 1)) / Math.log10(max)) * 100, 100);

  // Sort by dangerRank ascending (lower = more dangerous = top)
  const ranged = S.filter(s => s.dangerRank < 99).sort((a, b) => a.dangerRank - b.dangerRank);
  const safe = S.filter(s => s.dangerRank >= 99);

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>Room For Error <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(how many normal doses before danger)</span></h3>
    <p style={{ margin: "0 0 6px", fontSize: 12, color: "#6b6860" }}>Longer bar = more room for error. The solid color shows worst case; the faded extension shows best case. Most dangerous substances are at the top.</p>
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 12, fontSize: 9.5, fontFamily: "'DM Mono',monospace", color: "#555" }}>
      <span><span style={{ color: "#ef4444" }}>●</span> &lt;3x</span>
      <span><span style={{ color: "#f59e0b" }}>●</span> 3-5x</span>
      <span><span style={{ color: "#60a5fa" }}>●</span> 5-10x</span>
      <span><span style={{ color: "#22c55e" }}>●</span> 10x+</span>
      <span style={{ color: "#444" }}>█ worst case</span>
      <span style={{ color: "#444" }}>░ best case</span>
    </div>

    {/* Ranged substances — most dangerous first */}
    {ranged.map(s => {
      const wWorst = toP(s.marginWorst);
      const wBest = toP(s.marginBest);
      const colWorst = marginColor(s.marginWorst);
      const colBest = marginColor(s.marginBest);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.03)", position: "relative", overflow: "hidden" }}>
          {/* Best-case bar (faded, full width to best) */}
          <div style={{
            position: "absolute", left: 0, width: `${wBest}%`, height: "100%",
            borderRadius: 5, background: `linear-gradient(90deg, ${colWorst}30, ${colBest}40)`,
          }} />
          {/* Worst-case bar (solid, from 0 to worst) */}
          <div style={{
            position: "absolute", left: 0, width: `${Math.max(wWorst, 2)}%`, height: "100%",
            borderRadius: 5, background: `linear-gradient(90deg, ${colWorst}aa, ${colWorst})`,
          }} />
        </div>
        <span style={{ fontSize: 9.5, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 60, textAlign: "right", whiteSpace: "nowrap" }}>{s.marginWorst}x – {s.marginBest}x</span>
      </div>;
    })}

    {/* Safe substances at the bottom */}
    {safe.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0" }} />
      {safe.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #22c55e55, #22c55e)" }} />
        </div>
        <span style={{ fontSize: 9.5, color: "#4ade80", fontFamily: "'DM Mono',monospace", minWidth: 60, textAlign: "right", whiteSpace: "nowrap" }}>no lethal dose</span>
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

function AddictionChart() {
  const items = S.filter(s => s.addictPct > 0).sort((a, b) => b.addictPct - a.addictPct);
  const max = 25;

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>How Addictive? <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(chance of dependence within 10 years)</span></h3>
    <p style={{ margin: "0 0 12px", fontSize: 12, color: "#6b6860" }}>If you try this substance, what are your odds of developing dependence within a decade? Based on Lopez-Quintero 2011 (NESARC) and clinical estimates.</p>
    {items.map(s => {
      const w10 = Math.min((s.addictPct / max) * 100, 100);
      const wLife = Math.min((s.addictLife / max) * 100, 100);
      const col = addictColor(s.addictPct);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.03)", position: "relative", overflow: "hidden" }}>
          {/* Lifetime bar (faded) */}
          <div style={{ position: "absolute", left: 0, width: `${wLife}%`, height: "100%", borderRadius: 5, background: `${col}25` }} />
          {/* 10-year bar (solid) */}
          <div style={{ position: "absolute", left: 0, width: `${w10}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}88, ${col})` }} />
        </div>
        <span style={{ fontSize: 9.5, color: "#a09d97", fontFamily: "'DM Mono',monospace", minWidth: 32, textAlign: "right" }}>{s.addictPct}%</span>
      </div>;
    })}
    <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 9.5, fontFamily: "'DM Mono',monospace", color: "#555" }}>
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

function SupplyChart() {
  // Exclude near-100% substances (pharmaceuticals, regulated products) — show those at bottom for context
  const risky = S.filter(s => s.pctAsExpected != null && s.pctAsExpected < 96).sort((a, b) => a.pctAsExpected - b.pctAsExpected);
  const safe = S.filter(s => s.pctAsExpected != null && s.pctAsExpected >= 96).sort((a, b) => a.pctAsExpected - b.pctAsExpected);

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: 20, marginBottom: 18 }}>
    <h3 style={{ margin: "0 0 2px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 18, color: "#e8e6e3", fontWeight: 400 }}>Is It What You Think? <span style={{ fontSize: 12, color: "#6b6860", fontFamily: "'DM Mono',monospace" }}>(% that tests as expected)</span></h3>
    <p style={{ margin: "0 0 12px", fontSize: 12, color: "#6b6860" }}>When people test their drugs, what percentage actually contains what they expected? Data from drug checking services in US, Canada, NZ, and Europe.</p>

    {risky.map(s => {
      const col = supplyColor(s.pctAsExpected);
      return <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 10, borderRadius: 5, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
          <div style={{ width: `${s.pctAsExpected}%`, height: "100%", borderRadius: 5, background: `linear-gradient(90deg, ${col}88, ${col})` }} />
        </div>
        <span style={{ fontSize: 9.5, color: col, fontFamily: "'DM Mono',monospace", minWidth: 32, textAlign: "right" }}>{s.pctAsExpected}%</span>
      </div>;
    })}

    {safe.length > 0 && <>
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "8px 0" }} />
      {safe.map(s => <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
        <span style={{ width: 90, fontSize: 10.5, color: CAT[s.cat].c, fontFamily: "'DM Mono',monospace", textAlign: "right", flexShrink: 0 }}>{s.n.split("(")[0].trim().substring(0, 11)}</span>
        <div style={{ flex: 1, height: 8, borderRadius: 4, overflow: "hidden" }}>
          <div style={{ width: `${s.pctAsExpected}%`, height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #22c55e55, #22c55e)" }} />
        </div>
        <span style={{ fontSize: 9.5, color: "#4ade80", fontFamily: "'DM Mono',monospace", minWidth: 32, textAlign: "right" }}>{s.pctAsExpected}%</span>
      </div>)}
    </>}
  </div>;
}

export default function Charts() {
  return <div>
    <RangeChart />
    <Bar items={S.filter(x => x.harm).sort((a, b) => b.harm - a.harm)} max={80} getVal={s => s.harm} getCol={s => s.harm > 50 ? "#ef4444" : s.harm > 30 ? "#f97316" : s.harm > 15 ? "#f59e0b" : "#22c55e"} title="Total Damage" sub="(to you + to society)" desc="Nutt et al. (Lancet 2010). Alcohol scores highest of any drug. Being legal doesn't make something safe." />
    <AddictionChart />
    <SupplyChart />
  </div>;
}
