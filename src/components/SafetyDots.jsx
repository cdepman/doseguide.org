export default function SafetyDots({ s, compact }) {
  const mc = s.margin >= 100 ? "#22c55e" : s.margin >= 20 ? "#f59e0b" : s.margin && s.margin <= 10 ? "#ef4444" : "#f97316";
  const dc = s.atDose <= 1 ? "#22c55e" : s.atDose <= 2 ? "#60a5fa" : s.atDose <= 3 ? "#f59e0b" : s.atDose <= 4 ? "#f97316" : "#ef4444";
  const sc = s.supplyRisk <= 1 ? "#22c55e" : s.supplyRisk <= 2 ? "#60a5fa" : s.supplyRisk <= 3 ? "#f59e0b" : s.supplyRisk <= 4 ? "#f97316" : "#ef4444";
  const oc = s.overwhelm <= 1 ? "#22c55e" : s.overwhelm <= 2 ? "#60a5fa" : s.overwhelm <= 3 ? "#f59e0b" : s.overwhelm <= 4 ? "#f97316" : "#ef4444";
  const D = ({ c, t }) => <div style={{ display: "flex", alignItems: "center", gap: 4 }}><div style={{ width: 7, height: 7, borderRadius: "50%", background: c, boxShadow: `0 0 4px ${c}55`, flexShrink: 0 }} /><span style={{ fontSize: compact ? 9.5 : 11, color: c, fontFamily: "'DM Mono',monospace" }}>{t}</span></div>;
  return <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
    <D c={dc} t={`At a normal dose: ${s.atDoseLabel.toLowerCase()}`} />
    {s.overwhelm != null && <D c={oc} t={compact
      ? `Accidental overwhelm: ${s.overwhelm <= 1 ? "unlikely" : s.overwhelm <= 2 ? "moderate" : s.overwhelm <= 3 ? "easy" : "very easy"}`
      : `Accidentally taking too much: ${s.overwhelmLabel.toLowerCase()}`} />}
    {s.margin && <D c={mc} t={compact
      ? `Physical OD risk: ${s.marginLabel.toLowerCase()}`
      : `Physical overdose danger: ${s.marginLabel.toLowerCase()}`} />}
    <D c={sc} t={compact
      ? `Purity: ${s.supplyLabel.toLowerCase()}`
      : `What you're getting: ${s.supplyLabel.toLowerCase()}`} />
  </div>;
}
