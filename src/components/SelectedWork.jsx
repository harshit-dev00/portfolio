import React from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import WorkCard from "./WorkCard.jsx";
import ATSScreenerPreview from "./previews/ATSScreenerPreview.jsx";
import SunnifyPreview from "./previews/SunnifyPreview.jsx";
import NetdashPreview from "./previews/NetdashPreview.jsx";

const works = [
  {
    slug: "ats-screener",
    url: "ats-screener.vercel.app",
    title: "ATS Screener",
    year: "2026",
    description: "Your resume vs. 6 real enterprise ATS engines",
    preview: <ATSScreenerPreview />,
  },
  {
    slug: "sunnify",
    url: "sunnify.vercel.app",
    title: "Sunnify",
    year: "2024",
    description: "Spotify playlists to tagged local audio",
    preview: <SunnifyPreview />,
  },
  {
    slug: "netdash",
    url: "netdash-toolkit.vercel.app/",
    title: "Netdash",
    year: "2025",
    description: "40+ network tools in one app",
    preview: <NetdashPreview />,
  },
];

export default function SelectedWork() {
  return (
    <section className="px-8 md:px-12 py-24 relative z-10">
      <div className="flex items-center gap-3 text-sm text-white/50 mb-6">
        <span className="w-6 h-px bg-white/30" />
        SELECTED WORK
      </div>

      <div className="flex items-end justify-between mb-14">
        <h2 className="text-4xl md:text-5xl font-extrabold text-cream leading-tight max-w-2xl">
          Things people actually use.
        </h2>
        <Link
          to="/projects"
          className="hidden md:flex items-center gap-1 text-sm text-white/60 hover:text-cream transition-colors whitespace-nowrap"
        >
          All projects
          <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {works.map((work) => (
          <WorkCard key={work.slug} {...work} />
        ))}
      </div>
    </section>
  );
}