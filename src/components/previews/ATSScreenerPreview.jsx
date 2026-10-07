import React from "react";

export default function ATSScreenerPreview() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#0f1115] to-[#171a21] flex flex-col items-center justify-center text-center px-6 relative">
      <span className="absolute top-3 left-3 text-[10px] text-white/30">
        ATS Screener
      </span>
      <span className="absolute top-3 right-3 text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded">
        Scan Now
      </span>
      <h4 className="text-lg font-bold text-white/90 leading-snug">
        Your Resume vs.
        <br />
        <span className="text-sky-400">Real ATS Systems</span>
      </h4>
      <div className="flex gap-2 mt-4">
        <span className="text-[10px] bg-sky-500/80 text-white px-3 py-1.5 rounded">
          Start Your Scan
        </span>
        <span className="text-[10px] border border-white/20 text-white/60 px-3 py-1.5 rounded">
          Learn How It Works
        </span>
      </div>
      <div className="flex gap-4 mt-4 text-[10px] text-white/40">
        <span>6 ATS engines</span>
        <span>100% free</span>
        <span>0 signup</span>
      </div>
    </div>
  );
}