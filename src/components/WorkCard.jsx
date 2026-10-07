import React from "react";
import { Link } from "react-router-dom";

export default function WorkCard({
  slug,
  url,
  title,
  year,
  description,
  status = "Actively maintained",
  preview,
}) {
  return (
    <Link to={`/projects/${slug}`} className="group block">
      <div className="border border-white/10 rounded-lg overflow-hidden hover:border-accent/40 transition-colors">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10 bg-white/[0.02]">
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="w-2 h-2 rounded-full bg-white/20" />
          <span className="ml-2 text-xs text-white/40 truncate">{url}</span>
        </div>

        <div className="h-56 relative overflow-hidden bg-[#0d0d10]">
          {preview}
        </div>
      </div>

      <div className="flex items-start justify-between mt-4">
        <h3 className="text-xl font-bold text-cream group-hover:text-accent transition-colors">
          {title}
        </h3>
        <span className="text-sm text-white/40">{year}</span>
      </div>
      <p className="text-white/60 text-sm mt-1">{description}</p>
      <div className="flex items-center gap-2 mt-3 text-xs text-accent">
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
        {status}
      </div>
    </Link>
  );
}