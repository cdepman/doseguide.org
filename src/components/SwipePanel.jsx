import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

const DEAD_ZONE = 15;

export default function SwipePanel({ open, onClose, width = "min(520px, 94vw)", header, children }) {
  const [dragX, setDragX] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [entered, setEntered] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const direction = useRef(null);

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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onAnimationEnd={onAnimationEnd}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width,
        zIndex: 210,
        background: "#1a1a1e",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column",
        animation: entered ? "none" : "slideIn 0.25s ease-out",
        transform: `translateX(${dragX}px)`,
        transition: swiping ? "none" : "transform 0.3s ease",
      }}
    >
      {/* Fixed header area */}
      {header && <div style={{ flexShrink: 0, padding: "20px 20px 0" }}>{header}</div>}

      {/* Scrollable content */}
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
