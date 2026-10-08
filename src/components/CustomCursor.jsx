import React, { useEffect, useRef } from "react";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const hoverRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let rafId;

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const { x, y } = mouseRef.current;

      // dot: real cursor position par instantly
      if (dot) {
        dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }

      // ring: dheere se cursor ke peeche aati hai (kabhi element ko nahi pakadti)
      if (ring) {
        ringPosRef.current.x += (x - ringPosRef.current.x) * 0.2;
        ringPosRef.current.y += (y - ringPosRef.current.y) * 0.2;
        const scale = hoverRef.current ? 1.35 : 1;
        ring.style.transform = `translate(${ringPosRef.current.x}px, ${ringPosRef.current.y}px) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        hoverRef.current = true;
        ring?.classList.add("cursor-ring-hover");
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest(HOVER_SELECTOR)) {
        hoverRef.current = false;
        ring?.classList.remove("cursor-ring-hover");
      }
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
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/30 pointer-events-none z-[9999] hidden md:block transition-[border-color,background-color] duration-200 ease-out"
        style={{ willChange: "transform" }}
      />

      <style>{`
        .custom-cursor-active,
        .custom-cursor-active * {
          cursor: none !important;
        }
        .cursor-ring-hover {
          border-color: rgba(242,101,43,0.35) !important;
          background: rgba(242,101,43,0.05);
        }
      `}</style>
    </>
  );
}