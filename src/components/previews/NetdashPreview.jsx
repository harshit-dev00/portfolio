import React from "react";

export default function NetdashPreview() {
  const tools = [
    { name: "Subnet Calculator", tag: "Live" },
    { name: "VLSM Planner", tag: "Popular" },
    { name: "Bandwidth Calculator", tag: "New" },
    { name: "Cable Calculator", tag: "" },
    { name: "Routing Tools", tag: "Popular" },
    { name: "Wireless Tools", tag: "" },
  ];

  return (
    <div className="h-full w-full flex bg-[#0f1115] text-left">
      <div className="w-1/4 bg-[#141720] border-r border-white/5 p-3 text-[9px] text-white/40 space-y-2">
        <p className="text-emerald-400 font-semibold">NetDash</p>
        <p className="bg-emerald-500/10 text-emerald-400 rounded px-1.5 py-1">Dashboard</p>
        <p>Calculators</p>
        <p>VLAN Planner</p>
        <p>Subnet Calculator</p>
        <p>Bandwidth Calculator</p>
        <p>IP Tools</p>
      </div>
      <div className="flex-1 p-3">
        <p className="text-white/90 text-xs font-bold">Network &amp; Developer Toolbox</p>
        <p className="text-white/30 text-[9px] mb-3">
          Professional tools for network engineers, developers, and IT professionals
        </p>
        <div className="flex gap-2 mb-3 text-[9px]">
          <div className="bg-[#191c26] rounded px-2 py-1.5 flex-1">
            <p className="text-white/80 font-bold">48</p>
            <p className="text-white/30">Total Tools</p>
          </div>
          <div className="bg-[#191c26] rounded px-2 py-1.5 flex-1">
            <p className="text-white/80 font-bold">7</p>
            <p className="text-white/30">Categories</p>
          </div>
          <div className="bg-[#191c26] rounded px-2 py-1.5 flex-1">
            <p className="text-white/80 font-bold">14</p>
            <p className="text-white/30">Favorite Tools</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {tools.map((t) => (
            <div key={t.name} className="bg-[#191c26] rounded px-2 py-1.5 text-[8px]">
              <div className="flex justify-between">
                <span className="text-white/70">{t.name}</span>
                {t.tag && (
                  <span className="text-emerald-400 text-[7px]">{t.tag}</span>
                )}
              </div>
              <span className="text-white/20">Launch Tool →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}