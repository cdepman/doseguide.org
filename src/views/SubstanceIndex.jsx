import { CAT } from "../data/substances";

function Pill({ color, text }) {
  return <span style={{
    fontSize: 14, padding: "2px 8px", borderRadius: 20,
    background: `${color}12`, color: color,
    fontFamily: "'DM Mono',monospace",
    border: `1px solid ${color}25`,
  }}>{text}</span>;
}

function harmColor(v) {
  if (v > 50) return "#ef4444";
  if (v > 25) return "#f97316";
  if (v > 10) return "#f59e0b";
  return "#22c55e";
}

function addictColor(v) {
  if (v >= 40) return "#ef4444";
  if (v >= 20) return "#f97316";
  if (v >= 10) return "#f59e0b";
  if (v >= 3) return "#60a5fa";
  return "#22c55e";
}

export default function SubstanceIndex({ filtered, openPanel }) {
  return <div>
    <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: 22, color: "#e8e6e3", fontWeight: 400, margin: "0 0 12px" }}>Substance Directory</h2>
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {filtered.map(s => { const c = CAT[s.cat];
        return <div
          key={s.id}
          onClick={() => openPanel(s.id)}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 12, padding: "14px 16px",
            cursor: "pointer", transition: "border-color 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
        >
          {/* Name + category + arrow */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <h3 style={{ margin: 0, fontSize: 20, fontFamily: "'Instrument Serif',Georgia,serif", color: "#e8e6e1", fontWeight: 400 }}>{s.n}</h3>
                <span style={{ fontSize: 12, padding: "2px 7px", borderRadius: 5, background: c.b, color: c.c, fontFamily: "'DM Mono',monospace", whiteSpace: "nowrap" }}>{c.l}</span>
              </div>
              {s.aka.length > 0 && <p style={{ margin: "2px 0 0", fontSize: 14, color: "#555", fontFamily: "'DM Mono',monospace" }}>{s.aka.slice(0, 4).join(" · ")}</p>}
            </div>
            <span style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, color: "#555", fontSize: 28, lineHeight: 1, fontWeight: 300, paddingBottom: 3 }}>›</span>
          </div>

          {/* Blurb */}
          <p style={{ margin: "8px 0 10px", fontSize: 16, color: "#8a8780", lineHeight: 1.5 }}>{s.blurb || s.desc}</p>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {s.harm != null && <Pill color={harmColor(s.harm)} text={s.harm >= 50 ? "Very high harm" : s.harm >= 25 ? "High harm" : s.harm >= 10 ? "Moderate harm" : "Low harm"} />}
            {s.addictPct > 0 && <Pill color={addictColor(s.addictPct)} text={s.addictLabel} />}
            {s.dangerRank != null && <Pill
              color={s.dangerRank >= 99 ? "#22c55e" : s.marginWorst != null && s.marginWorst <= 2 ? "#ef4444" : s.marginWorst != null && s.marginWorst <= 5 ? "#f59e0b" : "#60a5fa"}
              text={s.dangerRank >= 99 ? "No known lethal dose" : s.marginWorst != null && s.marginWorst <= 2 ? "Very narrow safety margin" : s.marginWorst != null && s.marginWorst <= 5 ? "Moderate safety margin" : "Wide safety margin"}
            />}
          </div>
        </div>;
      })}
    </div>
  </div>;
}
