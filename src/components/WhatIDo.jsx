import React from "react";

const items = [
  {
    number: "01",
    title: "Agentic AI systems",
    description:
      "Multi-agent workflows that plan, delegate, and execute autonomously, with tool-calling, memory, and human handoff for edge cases.",
  },
  {
    number: "02",
    title: "LLMOps & infrastructure",
    description:
      "Evals, observability, and cost tracking for production LLM pipelines, so agents stay reliable and debuggable at scale, not just in a demo.",
  },
  {
    number: "03",
    title: "Full-stack integration",
    description:
      "Connecting AI systems to real, usable products, from the interface down to the APIs and infrastructure that keep it running.",
  },
];

export default function WhatIDo() {
  return (
    <section className="px-8 md:px-12 py-24 relative z-10">
      <div className="flex items-center gap-3 text-sm text-white/50 mb-16">
        <span className="w-6 h-px bg-white/30" />
        WHAT I DO
      </div>

      <div className="border-t border-white/10">
        {items.map((item) => (
          <div
            key={item.number}
            className="group grid grid-cols-1 md:grid-cols-[auto_1fr_2fr] gap-3 md:gap-10 items-start md:items-center py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-2 -mx-2"
          >
            <span className="text-sm text-accent font-mono">{item.number}</span>
            <h3 className="text-xl md:text-2xl font-bold text-cream group-hover:text-accent transition-colors">
              {item.title}
            </h3>
            <p className="text-white/60 leading-relaxed max-w-xl">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}