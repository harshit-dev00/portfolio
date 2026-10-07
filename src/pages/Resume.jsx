import React from "react";
import { Download, ArrowUpRight } from "lucide-react";
import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";

// Place your resume PDF file at: public/resume.pdf
// (create a "public" folder in your project root if it doesn't exist yet)
const RESUME_PATH = "/resume.pdf";

export default function Resume() {
  return (
    <div className="min-h-screen bg-bg text-cream font-mono relative overflow-hidden">
      <Background />
      <Navbar />

      <main className="px-8 md:px-12 pt-8 pb-24 relative z-10">
        <div className="flex items-center gap-3 text-sm text-white/50 mb-6">
          <span className="w-6 h-px bg-white/30" />
          RÉSUMÉ
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-cream mb-4">
              Sunny Patel
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              Software developer across the full stack. The full document is
              below, and the PDF is one tap away.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <a
              href={RESUME_PATH}
              download
              className="flex items-center gap-2 border border-accent/70 text-cream text-sm font-semibold px-5 py-3 rounded-md hover:bg-accent/10 transition-colors whitespace-nowrap"
            >
              <Download size={16} />
              Download PDF
            </a>
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-white/50 hover:text-cream transition-colors whitespace-nowrap"
            >
              Open in new tab
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>

        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white">
          <iframe
            src={RESUME_PATH}
            title="Resume"
            className="w-full"
            style={{ height: "1100px" }}
          />
        </div>
      </main>
    </div>
  );
}
