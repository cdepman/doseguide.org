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

  // Sort most dangerous first (smallest worst-case margin)
  const ranged = S.filter(s => s.marginBest != null).sort((a, b) => a.marginWorst - b.marginWorst);
  const safe = S.filter(s => s.marginBest == null && s.marginWorst == null);

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
        <span style={{ fontSize: 9.5, color: "#4ade80", fontFamily: "'DM Mono',monospace", minWidth: 60, textAlign: "right", whiteSpace: "nowrap" }}>no limit</span>
      </div>)}
    </>}
  </div>;
}

export default function Charts() {
  return <div>
    <RangeChart />
    <Bar items={S.filter(x => x.harm).sort((a, b) => b.harm - a.harm)} max={80} getVal={s => s.harm} getCol={s => s.harm > 50 ? "#ef4444" : s.harm > 30 ? "#f97316" : s.harm > 15 ? "#f59e0b" : "#22c55e"} title="Total Damage" sub="(to you + to society)" desc="Nutt et al. (Lancet 2010). Alcohol scores highest of any drug. Being legal doesn't make something safe." />
    <Bar items={S.filter(x => x.addict >= 2).sort((a, b) => b.addict - a.addict)} max={5} getVal={s => s.addict} getCol={s => ADDICT_COLORS[s.addict - 1]} title="How Addictive?" sub="" desc="How likely you are to get hooked. Nicotine and meth are at the top. Psychedelics barely register." />
    <Bar items={S.filter(x => x.supplyRisk > 1).sort((a, b) => b.supplyRisk - a.supplyRisk)} max={5} getVal={s => s.supplyRisk} getCol={s => s.supplyRisk >= 4 ? "#ef4444" : s.supplyRisk >= 3 ? "#f97316" : "#f59e0b"} title="Is It What You Think?" sub="(contamination risk)" desc="How likely what you bought contains something else. Cocaine, street pills, and 'heroin' are very often not what they claim to be." />
  </div>;
}
