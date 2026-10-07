import React from "react";

export default function Background() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 900px 700px at 85% 90%, rgba(120,55,30,0.35), transparent 60%), radial-gradient(ellipse 1200px 800px at 50% -10%, rgba(255,255,255,0.04), transparent 60%), #0a0a0a",
      }}
    />
  );
}
