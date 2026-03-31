import { useState, useMemo } from "react";
import { S, CAT, RL } from "../data/substances";
import { cr, getMech } from "../data/combinations";

function groupedSubstances() {
  const order = Object.keys(CAT);
  const groups = [];
  for (const catKey of order) {
    const subs = S.filter(s => s.cat === catKey);
    if (subs.length) groups.push({ catKey, cat: CAT[catKey], subs });
  }
  return groups;
}

export default function Matrix() {
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const cs = 28;

  const groups = useMemo(groupedSubstances, []);
  const flat = useMemo(() => groups.flatMap(g => g.subs), [groups]);

  // Build column group spans for the top category bar
  const colGroups = useMemo(() => {
    const result = [];
    for (const g of groups) {
      result.push({ catKey: g.catKey, cat: g.cat, count: g.subs.length });
    }
    return result;
  }, [groups]);

  const pick = (row, col) => {
    if (sel && sel.a.id === row.id && sel.b.id === col.id) { setSel(null); return; }
    const risk = cr(row.id, col.id); const lv = risk ? RL[risk] : null; const mech = getMech(row.id, col.id);
    setSel({ a: row, b: col, lv, mech });
  };

  return <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", padding: "18px 14px" }} onClick={e => { if (e.target.tagName !== "TD" && e.target.tagName !== "TH") setSel(null); }}>
    <h3 style={{ margin: "0 0 4px", fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 20, color: "#e8e6e3", fontWeight: 400 }}>Full Combination Matrix</h3>
    <div style={{ height: 88, marginBottom: 12, background: "#151517", borderRadius: 8, padding: "10px 14px", border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", boxSizing: "border-box" }}>
      {sel ? <div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 18, color: sel.lv?.c || "#666" }}>{sel.lv?.i || "?"}</span>
          <span style={{ fontSize: 14, fontFamily: "'Instrument Serif',Georgia,serif" }}><span style={{ color: CAT[sel.a.cat].c }}>{sel.a.n}</span> <span style={{ color: "#555" }}>+</span> <span style={{ color: CAT[sel.b.cat].c }}>{sel.b.n}</span></span>
          <span style={{ fontSize: 11, color: sel.lv?.c || "#888", fontFamily: "'DM Mono',monospace" }}>{sel.lv?.l || "Unknown"}</span>
        </div>
        <p style={{ margin: 0, fontSize: 11.5, color: "#8a8780", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: sel.mech ? 1 : 2, WebkitBoxOrient: "vertical" }}>{sel.lv?.d}</p>
        {sel.mech && <p style={{ margin: "4px 0 0", fontSize: 11, color: "#a09888", lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}><strong style={{ color: sel.lv?.c || "#888", fontFamily: "'DM Mono',monospace", fontSize: 9.5 }}>WHY: </strong>{sel.mech}</p>}
      </div>
      : <div style={{ display: "flex", alignItems: "center", height: "100%", color: "#333", fontSize: 12, fontFamily: "'DM Mono',monospace" }}>Tap any cell to see why that combination is rated the way it is.</div>}
    </div>
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", paddingBottom: 8 }}>
      <table style={{ borderCollapse: "separate", borderSpacing: 2, fontFamily: "'DM Mono',monospace" }}>
        <thead>
          {/* Category labels across columns */}
          <tr>
            <th style={{ width: 80, minWidth: 80 }} />
            {colGroups.map(g => <th key={g.catKey} colSpan={g.count} style={{ padding: "2px 0 4px", textAlign: "center" }}>
              <div style={{ fontSize: 8.5, color: g.cat.c, fontFamily: "'DM Mono',monospace", letterSpacing: "0.05em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{g.cat.l}</div>
              <div style={{ height: 2, borderRadius: 1, background: g.cat.c, opacity: 0.4, marginTop: 2 }} />
            </th>)}
          </tr>
          {/* Substance names */}
          <tr>
            <th style={{ width: 80, minWidth: 80 }} />
            {flat.map(s => <th key={s.id} style={{ color: CAT[s.cat].c, padding: "3px 1px", writingMode: "vertical-rl", textOrientation: "mixed", height: 80, fontSize: 10, fontWeight: 500, whiteSpace: "nowrap" }}>{s.n.split("(")[0].trim().substring(0, 12)}</th>)}
          </tr>
        </thead>
        <tbody>{flat.map(row => <tr key={row.id}>
          <td style={{ color: CAT[row.cat].c, textAlign: "right", paddingRight: 6, fontSize: 10, fontWeight: 500, whiteSpace: "nowrap" }}>{row.n.split("(")[0].trim().substring(0, 12)}</td>
          {flat.map(col => {
            if (row.id === col.id) return <td key={col.id} style={{ width: cs, height: cs, textAlign: "center", background: "rgba(255,255,255,0.015)", borderRadius: 3, color: "#2a2a2e", fontSize: 10 }}>·</td>;
            const risk = cr(row.id, col.id); const lv = risk ? RL[risk] : null;
            const isSel = sel && ((sel.a.id === row.id && sel.b.id === col.id) || (sel.a.id === col.id && sel.b.id === row.id));
            const isHov = hov === `${row.id}-${col.id}` || hov === `${col.id}-${row.id}`;
            const bg = lv ? (lv.c + (isSel ? "70" : isHov ? "48" : "28")) : (isSel ? "#333" : isHov ? "#262628" : "#1a1a1e");
            return <td key={col.id}
              onClick={e => { e.stopPropagation(); pick(row, col); }}
              onMouseEnter={() => setHov(`${row.id}-${col.id}`)}
              onMouseLeave={() => setHov(null)}
              style={{ width: cs, height: cs, textAlign: "center", borderRadius: 3, cursor: "pointer",
                background: bg, color: lv?.c || "#333", fontSize: 12,
                outline: isSel ? `2px solid ${lv?.c || "#888"}` : "none", outlineOffset: -1,
              }}>{lv?.i || "?"}</td>;
          })}
        </tr>)}</tbody>
      </table>
    </div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12, marginBottom: 12 }}>
      {Object.entries(RL).map(([k, v]) => <span key={k} style={{ fontSize: 10.5, color: v.c, fontFamily: "'DM Mono',monospace", display: "flex", alignItems: "center", gap: 3 }}><span style={{ fontSize: 13 }}>{v.i}</span> {v.l}</span>)}
      <span style={{ fontSize: 10.5, color: "#555", fontFamily: "'DM Mono',monospace" }}>? Unknown</span>
    </div>
  </div>;
}
