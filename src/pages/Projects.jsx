import React from "react";
import { Link } from "react-router-dom";
import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";
import ProjectRow from "../components/ProjectRow.jsx";
import ATSScreenerPreview from "../components/previews/ATSScreenerPreview.jsx";
import SunnifyPreview from "../components/previews/SunnifyPreview.jsx";
import NetdashPreview from "../components/previews/NetdashPreview.jsx";
import { projects } from "../data/projects.js";

const previewMap = {
  "ats-screener": <ATSScreenerPreview />,
  sunnify: <SunnifyPreview />,
  netdash: <NetdashPreview />,
};

export default function Projects() {
  return (
    <div className="min-h-screen bg-bg text-cream font-mono relative overflow-hidden">
      <Background />
      <Navbar />

      <main className="px-8 md:px-12 pt-8 pb-24 relative z-10">
        <div className="flex items-center gap-3 text-sm text-white/50 mb-6">
          <span className="w-6 h-px bg-white/30" />
          PROJECTS
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-cream mb-6">
          Things I've built, end to end.
        </h1>

        <p className="text-lg text-white/60 leading-relaxed max-w-2xl mb-20">
          Apps real people use, systems and security tooling, and an
          independent research paper, each one shipped and documented. Open
          any project for the full story.
        </p>

        <div className="flex flex-col gap-24">
          {projects.map((project) => (
            <Link key={project.slug} to={`/projects/${project.slug}`} className="block group">
              <ProjectRow
                {...project}
                description={project.problem}
                preview={previewMap[project.slug]}
              />
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}