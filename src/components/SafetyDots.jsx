function marginDotColor(s) {
  if (s.marginWorst == null) return "#22c55e";
  const w = s.marginWorst;
  if (w >= 10) return "#22c55e";
  if (w >= 5) return "#60a5fa";
  if (w >= 3) return "#f59e0b";
  return "#ef4444";
}

export default function SafetyDots({ s }) {
  const mc = marginDotColor(s);
  const dc = s.atDose <= 1 ? "#22c55e" : s.atDose <= 2 ? "#60a5fa" : s.atDose <= 3 ? "#f59e0b" : s.atDose <= 4 ? "#f97316" : "#ef4444";
  const sc = s.supplyRisk <= 1 ? "#22c55e" : s.supplyRisk <= 2 ? "#60a5fa" : s.supplyRisk <= 3 ? "#f59e0b" : s.supplyRisk <= 4 ? "#f97316" : "#ef4444";
  const oc = s.overwhelm <= 1 ? "#22c55e" : s.overwhelm <= 2 ? "#60a5fa" : s.overwhelm <= 3 ? "#f59e0b" : s.overwhelm <= 4 ? "#f97316" : "#ef4444";
  const D = ({ c, t }) => <div style={{ display: "flex", alignItems: "center", gap: 6, minHeight: 24 }}><div style={{ width: 8, height: 8, borderRadius: "50%", background: c, boxShadow: `0 0 4px ${c}55`, flexShrink: 0 }} /><span style={{ fontSize: 12, color: c, fontFamily: "'DM Mono',monospace", lineHeight: 1.3 }}>{t}</span></div>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
    <D c={dc} t={`At a normal dose: ${s.atDoseLabel.toLowerCase()}`} />
    {s.overwhelm != null && <D c={oc} t={`Psychological risk: ${s.overwhelmLabel.toLowerCase()}`} />}
    <D c={mc} t={`Safety margin: ${s.marginLabel.toLowerCase()}`} />
    <D c={sc} t={`Purity: ${s.supplyLabel.toLowerCase()}`} />
  </div>;
}
