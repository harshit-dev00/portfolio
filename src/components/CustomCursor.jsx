import React, { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const lockedRef = useRef(false);
  const lockedRectRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let rafId;

    const DEFAULT_SIZE = 32;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // dot always tracks the real cursor position instantly
      if (dot) {
        dot.style.transform = `translate(${mouseRef.current.x}px, ${mouseRef.current.y}px) translate(-50%, -50%)`;
      }

      if (ring) {
        if (lockedRef.current && lockedRectRef.current) {
          // snap ring to the hovered element's bounding box
          const r = lockedRectRef.current;
          ring.style.width = `${r.width}px`;
          ring.style.height = `${r.height}px`;
          ring.style.borderRadius = `${r.radius}px`;
          ring.style.transform = `translate(${r.left + r.width / 2}px, ${
            r.top + r.height / 2
          }px) translate(-50%, -50%)`;
        } else {
          // ease the ring toward the real cursor position
          ringPosRef.current.x +=
            (mouseRef.current.x - ringPosRef.current.x) * 0.2;
          ringPosRef.current.y +=
            (mouseRef.current.y - ringPosRef.current.y) * 0.2;
          ring.style.width = `${DEFAULT_SIZE}px`;
          ring.style.height = `${DEFAULT_SIZE}px`;
          ring.style.borderRadius = "9999px";
          ring.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(HOVER_SELECTOR);
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const padX = 14;
      const padY = 10;

      lockedRectRef.current = {
        left: rect.left - padX,
        top: rect.top - padY,
        width: rect.width + padX * 2,
        height: rect.height + padY * 2,
        radius: Math.min(rect.height / 2 + padY, 14),
      };
      lockedRef.current = true;

      if (ring) ring.classList.add("cursor-ring-hover");
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest(HOVER_SELECTOR);
      if (!target) return;

      lockedRef.current = false;
      lockedRectRef.current = null;
      // resume easing from the ring's last locked screen position
      const rect = target.getBoundingClientRect();
      ringPosRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };

      if (ring) ring.classList.remove("cursor-ring-hover");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId = requestAnimationFrame(animate);

    document.body.classList.add("custom-cursor-active");

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[9999] hidden md:block"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 border border-accent/60 pointer-events-none z-[9999] hidden md:block transition-[border-color,background-color] duration-200 ease-out"
        style={{ willChange: "transform, width, height" }}
      />

      <style>{`
        .custom-cursor-active,
        .custom-cursor-active * {
          cursor: none !important;
        }
        .cursor-ring-hover {
          border-color: rgba(242,101,43,0.9) !important;
          background: rgba(242,101,43,0.06);
        }
      `}</style>
    </>
  );
}