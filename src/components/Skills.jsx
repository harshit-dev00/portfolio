import React, { useEffect, useState } from "react";
import {
  Code2,
  Database,
  Cpu,
  Bot,
  Server,
  Rocket,
  Network,
} from "lucide-react";

/*
  skill = "Python"                       -> normal
  skill = { name: "Kimi Code CLI", tag: "architecture" }  
*/
const stages = [
  {
    icon: Code2,
    title: "Code",
    sub: "languages",
    skills: ["Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    icon: Database,
    title: "Data",
    sub: "store & retrieve",
    skills: ["PostgreSQL", "Redis", "Vector DBs", "RAG Pipelines"],
  },
  {
    icon: Cpu,
    title: "Models",
    sub: "llm layer",
    skills: ["OpenAI SDK", "Hugging Face", "Model Serving"],
  },
  {
    icon: Bot,
    title: "Agents",
    sub: "plan · act · reason",
    skills: [
      "LangChain",
      "LangGraph",
      "LlamaIndex",
      { name: "Kimi CLI", tag: "architecture" },
      { name: "OpenCode", tag: "architecture" },
    ],
  },
  {
    icon: Server,
    title: "Serve",
    sub: "apis & quality",
    skills: ["FastAPI", "Node.js", "Evals", "Observability"],
  },
  {
    icon: Rocket,
    title: "Ship",
    sub: "deploy & ops",
    skills: ["Docker", "Git", "CI/CD", "Linux", "AWS", "Vercel"],
  },
];

export default function Skills() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const last = stages.length - 1;

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((p) => (p + 1) % stages.length), 2000);
    return () => clearInterval(id);
  }, [paused]);

  const pct = (active / last) * 100;

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

      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Mobile vertical rail */}
        <div className="lg:hidden absolute left-[19px] top-5 bottom-5 w-px bg-white/10">
          <div
            className="absolute top-0 left-0 w-px bg-accent transition-all duration-700"
            style={{ height: `${pct}%` }}
          />
        </div>

        {/* Desktop horizontal rail */}
        <div className="hidden lg:block absolute top-5 left-[8.333%] right-[8.333%] h-px bg-white/10">
          <div
            className="absolute left-0 top-0 h-px bg-accent transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute -top-[3px] w-[7px] h-[7px] rounded-full bg-accent shadow-[0_0_12px_rgba(249,115,22,0.9)] transition-all duration-700"
            style={{ left: `calc(${pct}% - 3px)` }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-4">
          {stages.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === active;
            const isDone = i < active;
            return (
              <div
                key={s.title}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-5 cursor-default"
              >
                {/* Node */}
                <div
                  className={`relative z-10 shrink-0 w-10 h-10 rounded-full grid place-items-center border bg-[#0a0a0a] transition-all duration-500 ${
                    isActive
                      ? "border-accent text-accent scale-110 shadow-[0_0_20px_rgba(249,115,22,0.45)]"
                      : isDone
                      ? "border-accent/50 text-accent/70"
                      : "border-white/15 text-white/40"
                  }`}
                >
                  <Icon size={16} />
                </div>

                {/* Content */}
                <div className="lg:text-center">
                  <div className="text-[10px] font-mono text-white/30 mb-1">
                    0{i + 1}
                  </div>
                  <h3
                    className={`text-sm tracking-wide uppercase transition-colors duration-500 ${
                      isActive ? "text-cream" : "text-white/60"
                    }`}
                  >
                    {s.title}
                  </h3>
                  <div className="text-[11px] font-mono text-white/35 mb-3">
                    {s.sub}
                  </div>

                  <ul className="space-y-1.5">
                    {s.skills.map((skill, k) => {
                      const name = typeof skill === "string" ? skill : skill.name;
                      const tag = typeof skill === "string" ? null : skill.tag;

                      return (
                        <li
                          key={name}
                          className={`text-xs font-mono flex items-center lg:justify-center gap-2 transition-all duration-500 ${
                            isActive
                              ? "text-white/90 opacity-100"
                              : "text-white/40 opacity-70"
                          }`}
                          style={{
                            transitionDelay: isActive ? `${k * 60}ms` : "0ms",
                          }}
                        >
                          <span
                            className={`w-1 h-1 rounded-full transition-colors duration-500 ${
                              isActive ? "bg-accent" : "bg-white/20"
                            }`}
                          />
                          {name}

                          {tag && (
                            <span className="flex items-center gap-1 text-[9px] uppercase tracking-wider text-accent border border-accent/40 rounded px-1.5 py-0.5">
                              <Network size={9} />
                              {tag}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-14 text-xs font-mono text-white/35">
        <span className="text-accent">→</span> code → data → models → agents → serve → ship
      </p>
    </section>
  );
}