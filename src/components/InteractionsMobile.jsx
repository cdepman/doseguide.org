import { useState, useMemo } from "react";
import { S, CAT, RL } from "../data/substances";
import { cr, getMech } from "../data/combinations";

const GROUPS_ORDER = ["dangerous", "unsafe", "caution", "decrease", "low_risk", "synergy"];

export default function InteractionsMobile() {
  const [selected, setSelected] = useState("");

  const groups = useMemo(() => {
    if (!selected) return [];
    const interactions = S
      .filter(s => s.id !== selected)
      .map(s => ({ substance: s, risk: cr(selected, s.id), mech: getMech(selected, s.id) }))
      .filter(x => x.risk);

    return GROUPS_ORDER
      .map(level => ({
        level,
        ...RL[level],
        items: interactions.filter(x => x.risk === level).sort((a, b) => a.substance.n.localeCompare(b.substance.n)),
      }))
      .filter(g => g.items.length > 0);
  }, [selected]);

  const selSub = S.find(s => s.id === selected);

  return <div>
    <h3 style={{ margin: "0 0 14px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400 }}>Interactions</h3>

    {/* Dropdown */}
    <select
      value={selected}
      onChange={e => setSelected(e.target.value)}
      style={{
        width: "100%", padding: "12px 14px", borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
        color: selected ? "#e8e6e3" : "#6b6860",
        fontFamily: "'Source Serif 4',Georgia,serif", fontSize: 15,
        outline: "none", marginBottom: 16, boxSizing: "border-box",
        appearance: "none", WebkitAppearance: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23666' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")",
        backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
      }}
    >
      <option value="" style={{ background: "#1a1a1e" }}>Select a substance</option>
      {S.map(s => <option key={s.id} value={s.id} style={{ background: "#1a1a1e" }}>{s.n}</option>)}
    </select>

    {/* Empty state */}
    {!selected && <p style={{ color: "#555", fontSize: 14, textAlign: "center", padding: "40px 20px", fontFamily: "'DM Mono',monospace" }}>Select a substance to see how it interacts with everything else</p>}

    {/* No data state */}
    {selected && groups.length === 0 && <p style={{ color: "#555", fontSize: 14, textAlign: "center", padding: "40px 20px", fontFamily: "'DM Mono',monospace" }}>No interaction data available for {selSub?.n}. Treat all unknown combinations with caution.</p>}

    {/* Grouped results */}
    {groups.map(g => <div key={g.level} style={{ marginBottom: 18 }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, padding: "0 2px" }}>
        <span style={{ fontSize: 15, color: g.c }}>{g.i}</span>
        <span style={{ fontSize: 12, color: g.c, fontFamily: "'DM Mono',monospace", fontWeight: 600 }}>{g.l}</span>
        <div style={{ flex: 1, height: 1, background: g.c + "30" }} />
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {g.items.map(({ substance: sub, mech }) => <div key={sub.id} style={{
          background: "rgba(255,255,255,0.025)", borderRadius: 8,
          border: `1px solid ${g.c}18`, padding: "10px 12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13, color: g.c }}>{g.i}</span>
            <span style={{ fontSize: 15, fontFamily: "'Instrument Serif',Georgia,serif", color: CAT[sub.cat].c }}>{sub.n}</span>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 12.5, color: "#8a8780", lineHeight: 1.5 }}>
            {mech || g.d}
          </p>
        </div>)}
      </div>
    </div>)}
  </div>;
}
