import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

const DEAD_ZONE = 10;
const FOCUSABLE = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function SwipeDrawer({ open, onClose, label, children }) {
  const [dragY, setDragY] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [entered, setEntered] = useState(false);
  const startY = useRef(0);
  const startX = useRef(0);
  const direction = useRef(null);
  const startedInHandle = useRef(false);
  const handleRef = useRef(null);
  const drawerRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (open) setEntered(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    triggerRef.current = document.activeElement;
    setTimeout(() => drawerRef.current?.focus(), 50);

    const onKeyDown = e => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(FOCUSABLE);
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
      triggerRef.current?.focus?.();
    };
  }, [open, onClose]);

  const onTouchStart = useCallback(e => {
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    direction.current = null;
    const handle = handleRef.current;
    if (handle) {
      const rect = handle.getBoundingClientRect();
      startedInHandle.current = e.touches[0].clientY >= rect.top && e.touches[0].clientY <= rect.bottom + 20;
    } else {
      startedInHandle.current = false;
    }
  }, []);

  const onTouchMove = useCallback(e => {
    if (!startedInHandle.current) return;
    const dy = e.touches[0].clientY - startY.current;
    const dx = e.touches[0].clientX - startX.current;
    if (direction.current === null) {
      if (Math.abs(dy) < DEAD_ZONE && Math.abs(dx) < DEAD_ZONE) return;
      direction.current = Math.abs(dy) > Math.abs(dx) && dy > 0 ? "down" : "other";
    }
    if (direction.current !== "down") return;
    e.preventDefault();
    setSwiping(true);
    setDragY(Math.max(0, dy));
  }, []);

  const onTouchEnd = useCallback(() => {
    if (swiping && dragY > 80) onClose();
    setSwiping(false);
    setDragY(0);
    direction.current = null;
    startedInHandle.current = false;
  }, [swiping, dragY, onClose]);

  const onAnimationEnd = useCallback(() => setEntered(true), []);

  if (!open) return null;

  return createPortal(<>
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        animation: entered ? "none" : "fadeIn 0.2s ease",
      }}
    />
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-label={label || "Info"}
      tabIndex={-1}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onAnimationEnd={onAnimationEnd}
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 210,
        background: "#1a1a1e",
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        maxHeight: "70vh",
        outline: "none",
        transform: `translateY(${dragY}px)`,
        transition: swiping ? "none" : "transform 0.3s ease",
        animation: entered ? "none" : "drawerUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        overflowY: swiping ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
      }}
    >
      <div ref={handleRef} style={{ padding: "12px 0 6px", display: "flex", justifyContent: "center", cursor: "grab", touchAction: "none" }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
      </div>
      {children}
    </div>
  </>, document.body);
}
