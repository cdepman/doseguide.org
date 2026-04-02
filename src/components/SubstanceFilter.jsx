import { CAT } from "../data/substances";

// ── SHARED STYLES ────────────────────────────────────────────────────────────

export const inputStyle = {
  width: "100%", padding: "12px 14px", borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)",
  color: "#c7c4be", fontFamily: "'Source Serif 4',Georgia,serif",
  outline: "none", marginBottom: 8, boxSizing: "border-box",
};

export const pillStyle = (active, color) => ({
  padding: "10px 14px", borderRadius: 8, border: "1px solid", cursor: "pointer",
  fontSize: 13, fontFamily: "'DM Mono',monospace", minHeight: 44,
  background: active ? (color ? `${color}18` : "rgba(255,255,255,0.1)") : "transparent",
  borderColor: active ? (color ? color + "40" : "rgba(255,255,255,0.2)") : "rgba(255,255,255,0.06)",
  color: active ? (color || "#e8e6e3") : "#555",
});

// ── SEARCH INPUT ─────────────────────────────────────────────────────────────

export function SearchInput({ value, onChange, placeholder = "Search..." }) {
  return <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={e => onChange(e.target.value)}
    style={inputStyle}
  />;
}

// ── CATEGORY FILTER ──────────────────────────────────────────────────────────

export function CategoryFilter({ catF, setCatF }) {
  return <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
    <button onClick={() => setCatF(null)} style={pillStyle(!catF, null)}>All</button>
    {Object.entries(CAT).map(([k, v]) =>
      <button key={k} onClick={() => setCatF(catF === k ? null : k)} style={pillStyle(catF === k, v.c)}>{v.l}</button>
    )}
  </div>;
}
