import { useState } from "react";
import SwipeDrawer from "./SwipeDrawer";

export default function CrisisFooter() {
  const [open, setOpen] = useState(false);

  return <>
    <SwipeDrawer open={open} onClose={() => setOpen(false)}>
      <div style={{ padding: "0 20px 20px" }}>
        {/* OVERDOSE */}
        <div style={{
          background: "rgba(239,68,68,0.1)", border: "1.5px solid rgba(239,68,68,0.3)",
          borderRadius: 12, padding: "16px", marginBottom: 12,
        }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#ef4444",
            fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400 }}>
            Someone is overdosing
          </h3>
          <div style={{ fontSize: 14, color: "#e0a0a0", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: "#ef4444" }}>1.</strong> Call <strong>911</strong> immediately.</p>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: "#ef4444" }}>2.</strong> Give <strong>Narcan/naloxone</strong> if available. Spray in one nostril or inject in outer thigh.</p>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: "#ef4444" }}>3.</strong> Turn them on their <strong>side</strong> (recovery position) so they don't choke on vomit.</p>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: "#ef4444" }}>4.</strong> Start <strong>rescue breathing</strong> if they stop — one breath every 5 seconds.</p>
            <p style={{ margin: 0 }}><strong style={{ color: "#ef4444" }}>5.</strong> Give a <strong>second Narcan dose</strong> after 2-3 minutes if no response. Stay until help arrives.</p>
          </div>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: "#888", fontFamily: "'DM Mono',monospace" }}>
            Narcan only reverses opioids. Street fentanyl now commonly contains xylazine or medetomidine (veterinary sedatives) that Narcan does NOT reverse. Give Narcan anyway — it reverses the opioid component. But the person may not wake up fully. Keep breathing for them until paramedics arrive.
          </p>
        </div>

        {/* PANIC / BAD TRIP */}
        <div style={{
          background: "rgba(245,158,11,0.08)", border: "1.5px solid rgba(245,158,11,0.25)",
          borderRadius: 12, padding: "16px", marginBottom: 12,
        }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#f59e0b",
            fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400 }}>
            Panic attack / bad trip
          </h3>
          <div style={{ fontSize: 14, color: "#c0a870", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 8px" }}>You are <strong>safe</strong>. This feeling is temporary. It will end.</p>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: "#f59e0b" }}>Breathe:</strong> In for 4 counts. Hold for 4. Out for 6. Repeat.</p>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: "#f59e0b" }}>Move:</strong> Go somewhere quieter, cooler, with less stimulation.</p>
            <p style={{ margin: "0 0 8px" }}><strong style={{ color: "#f59e0b" }}>Ground:</strong> Touch something cold. Name 5 things you can see. Feel your feet on the floor.</p>
            <p style={{ margin: 0 }}><strong style={{ color: "#f59e0b" }}>Tell someone:</strong> You don't have to do this alone. Ask a friend to sit with you.</p>
          </div>
        </div>

        {/* SEROTONIN SYNDROME */}
        <div style={{
          background: "rgba(249,115,22,0.08)", border: "1.5px solid rgba(249,115,22,0.25)",
          borderRadius: 12, padding: "16px", marginBottom: 12,
        }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#f97316",
            fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400 }}>
            Signs of serotonin syndrome
          </h3>
          <div style={{ fontSize: 14, color: "#c09060", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 6px" }}>If someone has taken MDMA, tramadol, DXM, or SSRIs together and shows these signs — <strong>call 911</strong>:</p>
            <p style={{ margin: "0 0 4px" }}>Muscle rigidity or twitching (especially legs)</p>
            <p style={{ margin: "0 0 4px" }}>High fever / overheating that won't stop</p>
            <p style={{ margin: "0 0 4px" }}>Rapid heartbeat + agitation + confusion</p>
            <p style={{ margin: "0 0 4px" }}>Clonus (rhythmic jerking of ankles or eyes)</p>
            <p style={{ margin: 0 }}>This is a <strong>medical emergency</strong>. Cool them down while waiting for help.</p>
          </div>
        </div>

        {/* OVERHEATING */}
        <div style={{
          background: "rgba(239,68,68,0.06)", border: "1.5px solid rgba(239,68,68,0.2)",
          borderRadius: 12, padding: "16px", marginBottom: 12,
        }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 18, color: "#ef4444",
            fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400 }}>
            Overheating (MDMA / stimulants)
          </h3>
          <div style={{ fontSize: 14, color: "#c08080", lineHeight: 1.7 }}>
            <p style={{ margin: "0 0 8px" }}>Stop dancing. Move somewhere cool. Remove extra layers.</p>
            <p style={{ margin: "0 0 8px" }}><strong>Sip</strong> water slowly — do not chug. About 1 cup per hour.</p>
            <p style={{ margin: "0 0 8px" }}>If they can't cool down, are confused, or stop sweating — <strong>call 911</strong>. Hyperthermia kills.</p>
            <p style={{ margin: 0 }}>Pour cool (not ice) water on neck, wrists, and armpits.</p>
          </div>
        </div>

        {/* HELPLINES */}
        <div style={{
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 12, padding: "16px",
        }}>
          <h3 style={{ margin: "0 0 10px", fontSize: 16, color: "#a09d97",
            fontFamily: "'Instrument Serif',Georgia,serif", fontWeight: 400 }}>
            Helplines
          </h3>
          <div style={{ fontSize: 13, color: "#8a8780", lineHeight: 1.8, fontFamily: "'DM Mono',monospace" }}>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#ef4444" }}>Emergency:</strong> <a href="tel:911" style={{ color: "#ef4444", textDecoration: "none" }}>911</a></p>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#c7c4be" }}>Never Use Alone:</strong> <a href="tel:18004843731" style={{ color: "#60a5fa", textDecoration: "none" }}>1-800-484-3731</a> <span style={{ color: "#555", fontSize: 11 }}>— stays on the line while you use</span></p>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#c7c4be" }}>Fireside Project:</strong> <a href="tel:6234737433" style={{ color: "#60a5fa", textDecoration: "none" }}>62-FIRESIDE (623-473-7433)</a> <span style={{ color: "#555", fontSize: 11 }}>— psychedelic peer support, 11am-11pm PT</span></p>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#c7c4be" }}>SAMHSA:</strong> <a href="tel:18006624357" style={{ color: "#60a5fa", textDecoration: "none" }}>1-800-662-4357</a> <span style={{ color: "#555", fontSize: 11 }}>— free, confidential, 24/7</span></p>
            <p style={{ margin: "0 0 4px" }}><strong style={{ color: "#c7c4be" }}>Crisis Text:</strong> Text <strong>HOME</strong> to <strong>741741</strong></p>
            <p style={{ margin: 0 }}><strong style={{ color: "#c7c4be" }}>Poison Control:</strong> <a href="tel:18002221222" style={{ color: "#60a5fa", textDecoration: "none" }}>1-800-222-1222</a></p>
          </div>
        </div>
      </div>
    </SwipeDrawer>

    {/* ── PERSISTENT CRISIS BAR ── */}
    <div
      onClick={() => setOpen(!open)}
      className="crisis-bar"
      style={{
        position: "fixed",
        bottom: "calc(64px + env(safe-area-inset-bottom, 0px))",
        left: 0, right: 0, zIndex: 45,
        background: open ? "#2a1a1a" : "#1e1e22",
        borderTop: "1px solid rgba(239,68,68,0.2)",
        padding: "10px 16px",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
        transition: "background 0.2s",
      }}
    >
      <span style={{ fontSize: 13, fontFamily: "'DM Mono',monospace", color: open ? "#ef4444" : "#888", transition: "color 0.2s" }}>
        {open ? "Close" : "Someone needs help"}
      </span>
    </div>
  </>;
}
