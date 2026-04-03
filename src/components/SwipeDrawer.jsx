import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

const DEAD_ZONE = 10;

export default function SwipeDrawer({ open, onClose, children }) {
  const [dragY, setDragY] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [entered, setEntered] = useState(false);

  // Reset animation state when drawer reopens
  useEffect(() => {
    if (open) setEntered(false);
  }, [open]);
  const startY = useRef(0);
  const startX = useRef(0);
  const direction = useRef(null);
  const handleRef = useRef(null);

  const onTouchStart = useCallback(e => {
    startY.current = e.touches[0].clientY;
    startX.current = e.touches[0].clientX;
    direction.current = null;
  }, []);

  const onTouchMove = useCallback(e => {
    // Only allow swipe-down from the handle area (first 50px)
    const handle = handleRef.current;
    if (!handle) return;
    const handleRect = handle.getBoundingClientRect();
    if (startY.current < handleRect.top || startY.current > handleRect.bottom + 10) return;

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
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onAnimationEnd={onAnimationEnd}
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 210,
        background: "#1a1a1e",
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        maxHeight: "70vh",
        transform: `translateY(${dragY}px)`,
        transition: swiping ? "none" : "transform 0.3s ease",
        animation: entered ? "none" : "drawerUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        overflowY: swiping ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
      }}
    >
      {/* Drag handle */}
      <div ref={handleRef} style={{ padding: "10px 0 4px", display: "flex", justifyContent: "center", cursor: "grab", touchAction: "none" }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
      </div>
      {children}
    </div>
  </>, document.body);
}
