import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";
import ArchitectureDiagram from "../components/ArchitectureDiagram.jsx";
import { getProjectBySlug } from "../data/projects.js";

function Section({ title, children }) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 text-sm text-white/50 mb-6">
        <span className="w-6 h-px bg-white/30" />
        {title.toUpperCase()}
      </div>
      {children}
    </section>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-bg text-cream font-mono relative overflow-hidden">
        <Background />
        <Navbar />
        <main className="px-8 md:px-12 py-24 relative z-10">
          <p className="text-white/60">Project not found.</p>
          <Link to="/projects" className="text-accent hover:underline text-sm mt-4 inline-block">
            Back to projects
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-cream font-mono relative overflow-hidden">
      <Background />
      <Navbar />

      <main className="px-8 md:px-12 py-16 relative z-10 max-w-4xl mx-auto">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-accent transition-colors mb-12"
        >
          <ArrowLeft size={14} />
          Back to projects
        </Link>

        <div className="flex items-center gap-3 text-sm mb-4">
          <span className="text-accent">{project.number}</span>
          <span className="text-white/40">{project.year}</span>
          <span className="w-6 h-px bg-white/20" />
          <span className="flex items-center gap-1.5 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {project.status}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold text-cream mb-3">
          {project.title}
        </h1>
        <p className="text-white/50 text-lg mb-4">{project.subtitle}</p>

        <a
          href={"https://" + project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-16"
        >
          {project.url}
          <ArrowUpRight size={12} />
        </a>

        <Section title="The problem">
          <p className="text-white/70 leading-relaxed">{project.problem}</p>
        </Section>

        <Section title="Approach">
          <div className="flex flex-col gap-6">
            {project.approach.map((step, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-accent text-sm font-semibold shrink-0 pt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-white/70 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="System architecture">
          <ArchitectureDiagram
            title={project.title}
            subtitle={project.subtitle}
            diagram={project.diagram}
          />
        </Section>

        <Section title="Why this stack">
          <div className="flex flex-col gap-6">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="border border-white/10 rounded-lg p-5 hover:border-accent/30 transition-colors"
              >
                <p className="text-cream font-semibold mb-2">{tech.name}</p>
                <p className="text-white/60 text-sm leading-relaxed">
                  {tech.reason}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-white/60 border border-white/15 rounded px-3 py-1.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </main>
    </div>
  );
}
