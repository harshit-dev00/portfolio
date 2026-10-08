import React from "react";
import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";

// Place your photo at: public/about-photo.jpg
const PHOTO_PATH = "/about-photo.jpg";

const meta = [
  { label: "BASED IN", value: "Meerut, India" },
  { label: "CURRENTLY", value: "Fresher — open to LLMOps & Agentic AI roles" },
  { label: "STUDYING", value: "Diploma in Computer Science" },
  {
    label: "FOCUS",
    value: "Agentic AI, LLMOps, full-stack, first-principles debugging",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-bg text-cream font-mono relative overflow-hidden">
      <Background />
      <Navbar />

      <main className="px-8 md:px-12 pt-8 pb-24 relative z-10">
        <div className="flex items-center gap-3 text-sm text-white/50 mb-14">
          <span className="w-6 h-px bg-white/30" />
          ABOUT
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-14">
          {/* left column: photo + meta */}
          <div>
            <div className="border border-accent/30 rounded-lg overflow-hidden aspect-square bg-white/5 mb-8">
              <img
                src={PHOTO_PATH}
                alt="Portrait"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              {meta.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1 py-3 border-b border-white/10"
                >
                  <span className="text-xs text-white/40 tracking-wide">
                    {item.label}
                  </span>
                  <span className="text-cream font-semibold text-sm">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* right column: story */}
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-8 text-cream">
              I build the systems that make AI actually reliable, not just
              impressive in a demo.
            </h1>

            <div className="flex flex-col gap-6 text-white/70 leading-relaxed max-w-2xl">
              <p>
                I'm the developer you hand{" "}
                <span className="text-accent">the part that has to hold</span>.
                Most people can get an agent to work once, in a clean
                environment, with no real traffic hitting it. I care about
                what happens after that: what breaks when three requests
                come in at once, what happens when the model returns
                something unexpected, what happens when nobody's watching
                and it still has to keep running.
              </p>

              <p>
                That instinct didn't come from a classroom. It came from
                building things end to end, alone, and being the one who
                had to fix it when they broke. I learned LLMOps and
                agentic systems the way most people learn to drive, by
                actually being behind the wheel, not by reading about it.
                I design agents that plan and act, and then I build the
                observability and evaluation layer underneath them so I
                actually know when something's wrong before a user does.
              </p>

              {/* first-principles section */}
<div className="flex flex-col gap-4 pt-4">
  <div className="flex items-center gap-3 text-xs text-white/40 tracking-widest">
    <span className="w-6 h-px bg-accent" />
    HOW I THINK
  </div>

  <h2 className="text-2xl md:text-3xl font-bold leading-tight text-cream">
    I think from <span className="text-accent">first principles.</span>
  </h2>

  <p>
    <span className="text-accent">
      I start with the question, not the tool.
    </span>{" "}
    AI can write the code now, so the harder part is knowing what to ask:
    what is this system actually supposed to guarantee, and which one
    variable decides whether it holds? In my RAG projects, that meant
    tracing a bad answer back through retrieval, chunking and prompt
    instead of just swapping models. Execution is getting cheap. Finding
    the real problem isn't. That's also why I keep maintaining what I
    build:{" "}
    <span className="text-accent">
      it's from having broken it myself first
    </span>
    , in my own projects, that I know exactly where the weight falls.
  </p>
</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}