import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export default function SwipeDrawer({ open, onClose, children }) {
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startY = useRef(0);
  const panelRef = useRef(null);

  const onTouchStart = useCallback(e => {
    // Only start drag from the top 60px (handle area)
    const panel = panelRef.current;
    if (!panel) return;
    const rect = panel.getBoundingClientRect();
    const touchY = e.touches[0].clientY - rect.top;
    if (touchY > 60) return;
    startY.current = e.touches[0].clientY;
    setDragging(true);
  }, []);

  const onTouchMove = useCallback(e => {
    if (!dragging) return;
    const dy = Math.max(0, e.touches[0].clientY - startY.current);
    setDragY(dy);
  }, [dragging]);

  const onTouchEnd = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    if (dragY > 80) {
      onClose();
    }
    setDragY(0);
  }, [dragging, dragY, onClose]);

  if (!open) return null;

  return createPortal(<>
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        animation: "fadeIn 0.2s ease",
      }}
    />
    <div
      ref={panelRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 210,
        background: "#1a1a1e",
        borderTopLeftRadius: 16, borderTopRightRadius: 16,
        maxHeight: "70vh",
        transform: `translateY(${dragY}px)`,
        transition: dragging ? "none" : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
        animation: dragging ? "none" : "drawerUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        overflowY: "auto", WebkitOverflowScrolling: "touch",
        paddingBottom: "env(safe-area-inset-bottom, 0)",
      }}
    >
      {/* Drag handle */}
      <div style={{ padding: "10px 0 4px", display: "flex", justifyContent: "center", cursor: "grab" }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
      </div>
      {children}
    </div>
  </>, document.body);
}
