import React from "react";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ number, title, description, tags, year }) {
  return (
    <div className="group border border-white/10 rounded-lg p-6 hover:border-accent/50 transition-colors relative overflow-hidden">
      <div className="flex items-start justify-between mb-4">
        <span className="text-xs text-white/40">{number}</span>
        <span className="text-xs text-white/40">{year}</span>
      </div>

      <h3 className="text-xl font-bold text-cream mb-2 flex items-center gap-2">
        {title}
        <ArrowUpRight
          size={16}
          className="text-accent opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </h3>

      <p className="text-sm text-white/60 leading-relaxed mb-5">
        {description}
      </p>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs text-white/50 border border-white/10 rounded px-2 py-1"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
