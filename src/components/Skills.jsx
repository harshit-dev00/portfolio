import React from "react";
import {
  Code2,
  Bot,
  Server,
  Database,
  Wrench,
} from "lucide-react";

const categories = [
  {
    icon: Code2,
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    icon: Bot,
    title: "AI & Agent Frameworks",
    skills: ["LangChain", "LangGraph", "LlamaIndex", "OpenAI SDK", "Hugging Face"],
  },
  {
    icon: Server,
    title: "LLMOps & Infra",
    skills: ["Vector DBs", "Evals", "Observability", "Model Serving", "RAG Pipelines"],
  },
  {
    icon: Database,
    title: "Backend & Systems",
    skills: ["FastAPI", "Node.js", "Docker", "PostgreSQL", "Redis"],
  },
  {
    icon: Wrench,
    title: "Tools",
    skills: ["Git", "CI/CD", "Linux", "AWS", "Vercel"],
  },
];

export default function Skills() {
  return (
    <section className="px-8 md:px-12 py-24 relative z-10 overflow-hidden">
      <div className="flex items-center gap-3 text-sm text-white/50 mb-6">
        <span className="w-6 h-px bg-white/30" />
        SKILLS
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-cream leading-tight mb-4 max-w-2xl">
        What I actually work with.
      </h2>
      <p className="text-white/50 text-sm mb-16 font-mono">
        <span className="text-accent">$</span> skills --scan --verbose
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, catIndex) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="group border border-white/10 rounded-lg p-6 hover:border-accent/40 transition-colors relative overflow-hidden animate-rise"
              style={{ animationDelay: `${catIndex * 90}ms` }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-y-full left-0 w-px bg-gradient-to-b from-transparent via-accent/60 to-transparent animate-scan" />
              </div>

              <div className="flex items-center gap-2 mb-5">
                <Icon size={16} className="text-accent" />
                <h3 className="text-sm tracking-wide text-white/70 uppercase">
                  {cat.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, i) => (
                  <span
                    key={skill}
                    className="text-xs text-white/70 border border-white/10 rounded px-3 py-1.5 hover:border-accent/60 hover:text-accent hover:-translate-y-0.5 transition-all duration-200 cursor-default animate-fade-in"
                    style={{
                      animationDelay: `${catIndex * 90 + i * 60 + 200}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-rise {
          opacity: 0;
          animation: rise 0.6s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 0.4s ease-out forwards;
        }

        @keyframes scan {
          0% { top: -100%; }
          100% { top: 100%; }
        }
        .animate-scan {
          animation: scan 1.8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}