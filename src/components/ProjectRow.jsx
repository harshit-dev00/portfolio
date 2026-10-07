import React from "react";

export default function ProjectRow({
  number,
  year,
  status,
  url,
  title,
  subtitle,
  description,
  tags,
  preview,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
      {/* left: browser mockup */}
      <div className="border border-white/10 rounded-lg overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10 bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="ml-2 text-xs text-white/40 truncate">{url}</span>
        </div>
        <div className="h-72 relative overflow-hidden bg-[#0d0d10]">
          {preview}
        </div>
      </div>

      {/* right: details */}
      <div>
        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="text-accent">{number}</span>
          <span className="text-white/40">{year}</span>
          <span className="w-6 h-px bg-white/20" />
          <span className="flex items-center gap-1.5 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {status}
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-extrabold text-cream mb-2">
          {title}
        </h2>
        <p className="text-white/50 mb-5">{subtitle}</p>

        <p className="text-white/70 leading-relaxed mb-6">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-white/60 border border-white/15 rounded px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}