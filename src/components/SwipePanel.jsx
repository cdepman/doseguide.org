import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

export default function SwipePanel({ open, onClose, width = "min(520px, 94vw)", children }) {
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const isHorizontal = useRef(null);

  const onTouchStart = useCallback(e => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    isHorizontal.current = null;
    setDragging(true);
  }, []);

  const onTouchMove = useCallback(e => {
    if (!dragging) return;
    const dx = e.touches[0].clientX - startX.current;
    const dy = e.touches[0].clientY - startY.current;
    if (isHorizontal.current === null) {
      isHorizontal.current = Math.abs(dx) > Math.abs(dy);
    }
    if (!isHorizontal.current) return;
    setDragX(Math.max(0, dx));
  }, [dragging]);

  const onTouchEnd = useCallback(() => {
    setDragging(false);
    if (dragX > 100) onClose();
    setDragX(0);
    isHorizontal.current = null;
  }, [dragX, onClose]);

  if (!open) return null;

  return createPortal(<>
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)",
        animation: "fadeIn 0.2s ease",
      }}
    />
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{
        position: "fixed", top: 0, right: 0, bottom: 0,
        width,
        zIndex: 210,
        background: "#1a1a1e",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        overflowY: dragging && isHorizontal.current ? "hidden" : "auto",
        WebkitOverflowScrolling: "touch",
        animation: dragging ? "none" : "slideIn 0.25s ease-out",
        transform: `translateX(${dragX}px)`,
        transition: dragging ? "none" : "transform 0.3s ease",
        padding: "20px 20px calc(80px + env(safe-area-inset-bottom, 0))",
      }}
    >
      {children}
    </div>
  </>, document.body);
}
