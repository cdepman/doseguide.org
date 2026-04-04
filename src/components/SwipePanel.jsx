import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

const DEAD_ZONE = 15;
const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function SwipePanel({ open, onClose, width = "min(520px, 94vw)", header, label, children }) {
  const [dragX, setDragX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [entered, setEntered] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const direction = useRef(null);
  const panelRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    // Remember what was focused before opening
    triggerRef.current = document.activeElement;
    // Focus panel
    setTimeout(() => panelRef.current?.focus(), 50);

    const onKeyDown = e => {
      if (e.key === "Escape") { onClose(); return; }
      // Focus trap
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(FOCUSABLE);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus on close
      triggerRef.current?.focus?.();
    };
  }, [open, onClose]);

  const onTouchStart = useCallback(e => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    direction.current = null;
  }, []);

  const onTouchMove = useCallback(e => {
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (direction.current === null) {
      if (Math.abs(dx) < DEAD_ZONE && Math.abs(dy) < DEAD_ZONE) return;
      direction.current = Math.abs(dx) > Math.abs(dy) && dx > 0 ? "horizontal" : "vertical";
    }
    if (direction.current === "vertical") return;
    setSwiping(true);
    setDragX(Math.max(0, dx));
  }, []);

  const onTouchEnd = useCallback(() => {
    if (swiping && dragX > 100) onClose();
    setSwiping(false);
    setDragX(0);
    direction.current = null;
  }, [swiping, dragX, onClose]);

  const onAnimationEnd = useCallback(() => setEntered(true), []);

  if (!open) return null;

  return createPortal(<>
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        animation: entered ? "none" : "fadeIn 0.2s ease",
      }}
    />
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={label || "Panel"}
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onAnimationEnd={onAnimationEnd}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width,
        outline: "none",
        zIndex: 210,
        background: "#1a1a1e",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column",
        animation: entered ? "none" : "slideIn 0.25s ease-out",
        transform: `translateX(${dragX}px)`,
        transition: swiping ? "none" : "transform 0.3s ease",
      }}
    >
      {header && <div style={{ flexShrink: 0, padding: "20px 20px 0" }}>{header}</div>}
      <div style={{
        flex: 1, overflowY: swiping ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        padding: header ? "0 20px calc(80px + env(safe-area-inset-bottom, 0))" : "20px 20px calc(80px + env(safe-area-inset-bottom, 0))",
      }}>
        {children}
      </div>
    </div>
  </>, document.body);
}
