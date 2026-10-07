import React from "react";
import { GraduationCap, Sparkles } from "lucide-react";

const timeline = [
  {
    year: "2022 — 2023",
    tag: "Completed",
    icon: GraduationCap,
    title: "Diploma in Software Development",
    place: "1-Year Diploma Program",
    detail:
      "Hands-on training in software development fundamentals, alongside a Certified Ethical Hacker (CEH) course covering network security, penetration testing, and vulnerability assessment.",
    upcoming: false,
  },
  {
    year: "2023 — 2026",
    tag: "Completed",
    icon: GraduationCap,
    title: "Polytechnic, Computer Science",
    place: "3-Year Diploma in Computer Science Engineering",
    detail:
      "Core coursework in data structures, operating systems, databases, and software engineering, alongside self-driven work in machine learning and applied AI.",
    upcoming: false,
  },
  {
    year: "Coming soon",
    tag: "Planned",
    icon: Sparkles,
    title: "B.Tech, Computer Science",
    place: "Next step",
    detail:
      "Continuing on to a Bachelor's degree to deepen the systems and AI foundation built so far.",
    upcoming: true,
  },
];

export default function Education() {
  return (
    <section className="px-8 md:px-12 py-24 relative z-10">
      <div className="flex items-center gap-3 text-sm text-white/50 mb-6">
        <span className="w-6 h-px bg-white/30" />
        EDUCATION
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-cream leading-tight mb-16 max-w-2xl">
        The path here.
      </h2>

      <div className="relative max-w-2xl">
        {/* vertical connector line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-accent/20 to-transparent" />

        <div className="flex flex-col gap-14">
          {timeline.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`relative pl-10 ${item.upcoming ? "opacity-70" : ""}`}
              >
                {/* node */}
                <span
                  className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 bg-bg flex items-center justify-center ${
                    item.upcoming ? "border-white/30 border-dashed" : "border-accent"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.upcoming ? "bg-white/30" : "bg-accent"
                    }`}
                  />
                </span>

                <div className="flex items-center gap-3 text-xs text-white/40 mb-2">
                  <span>{item.year}</span>
                  <span className="w-4 h-px bg-white/20" />
                  <span className={item.upcoming ? "text-white/40" : "text-accent"}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-cream mb-1 flex items-center gap-2">
                  <Icon
                    size={18}
                    className={item.upcoming ? "text-white/40" : "text-accent"}
                  />
                  {item.title}
                </h3>
                <p className="text-sm text-white/50 mb-3">{item.place}</p>
                <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}