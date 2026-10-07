import React from "react";

export default function StatusBadge({ text = "Open to software roles" }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/60 mb-8">
      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      {text}
    </div>
  );
}
