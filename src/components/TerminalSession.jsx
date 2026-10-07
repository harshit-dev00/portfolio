import React, { useEffect, useState } from "react";

const bootLines = [
  { label: "model layer", dots: 10 },
  { label: "agent runtime", dots: 9 },
  { label: "llmops pipeline", dots: 6 },
  { label: "infrastructure", dots: 6 },
];

const commandText = "boot --profile Harshit";
const finalLine = "all layers online";

// Pauses (ms) between animation phases
const TYPE_SPEED_CMD = 45;
const TYPE_SPEED_LINE = 12;
const LINE_PAUSE = 200;
const FINAL_PAUSE = 400;
const HOLD_AFTER_DONE = 1800;
const RESTART_PAUSE = 500;

export default function TerminalSession() {
  const [commandTyped, setCommandTyped] = useState("");
  const [lineIndex, setLineIndex] = useState(0);
  const [lineTyped, setLineTyped] = useState("");
  const [finalTyped, setFinalTyped] = useState("");
  const [phase, setPhase] = useState("command"); // command | lines | final | hold | reset

  // Phase: typing the command
  useEffect(() => {
    if (phase !== "command") return;
    if (commandTyped.length < commandText.length) {
      const t = setTimeout(() => {
        setCommandTyped(commandText.slice(0, commandTyped.length + 1));
      }, TYPE_SPEED_CMD);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("lines"), LINE_PAUSE);
      return () => clearTimeout(t);
    }
  }, [phase, commandTyped]);

  // Phase: typing each boot line
  useEffect(() => {
    if (phase !== "lines") return;
    if (lineIndex >= bootLines.length) {
      setPhase("final");
      return;
    }

    const full = `${bootLines[lineIndex].label} ${".".repeat(
      bootLines[lineIndex].dots
    )} ok`;

    if (lineTyped.length < full.length) {
      const t = setTimeout(() => {
        setLineTyped(full.slice(0, lineTyped.length + 1));
      }, TYPE_SPEED_LINE);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setLineTyped("");
      }, LINE_PAUSE);
      return () => clearTimeout(t);
    }
  }, [phase, lineTyped, lineIndex]);

  // Phase: typing the final "all layers online" line
  useEffect(() => {
    if (phase !== "final") return;
    if (finalTyped.length < finalLine.length) {
      const t = setTimeout(() => {
        setFinalTyped(finalLine.slice(0, finalTyped.length + 1));
      }, TYPE_SPEED_LINE);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setPhase("hold"), FINAL_PAUSE);
      return () => clearTimeout(t);
    }
  }, [phase, finalTyped]);

  // Phase: hold completed state, then reset and loop
  useEffect(() => {
    if (phase !== "hold") return;
    const t = setTimeout(() => setPhase("reset"), HOLD_AFTER_DONE);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "reset") return;
    const t = setTimeout(() => {
      setCommandTyped("");
      setLineIndex(0);
      setLineTyped("");
      setFinalTyped("");
      setPhase("command");
    }, RESTART_PAUSE);
    return () => clearTimeout(t);
  }, [phase]);

  const completedLines = bootLines.slice(0, lineIndex);
  const isDone = phase === "hold" || phase === "reset";

  return (
    <div className="px-8 md:px-12 relative z-10">
      <div className="max-w-md border border-white/10 bg-black/40 rounded-lg overflow-hidden">
        {/* title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="ml-2 text-xs tracking-widest text-white/40">
            SESSION
          </span>
        </div>

        {/* body */}
        <div className="px-4 py-4 text-sm leading-relaxed font-mono min-h-[160px]">
          <p className="text-cream mb-1">
            <span className="text-accent">$</span> {commandTyped}
            {phase === "command" && (
              <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle animate-pulse" />
            )}
          </p>

          {/* fully completed boot lines */}
          {completedLines.map((line) => (
            <p key={line.label} className="text-white/50">
              <span className="pl-2">{line.label}</span>{" "}
              <span className="text-white/20">{".".repeat(line.dots)}</span>{" "}
              <span className="text-white/60">ok</span>
            </p>
          ))}

          {/* currently typing boot line */}
          {phase === "lines" && lineIndex < bootLines.length && (
            <p className="text-white/50">
              <span className="pl-2">{lineTyped}</span>
              <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle animate-pulse" />
            </p>
          )}

          {/* final "all layers online" line */}
          {(phase === "final" || isDone) && (
            <p className="text-accent mt-1">
              <span className="mr-1">→</span>
              {phase === "final" ? finalTyped : finalLine}
              {phase === "final" && (
                <span className="inline-block w-[2px] h-4 bg-accent ml-0.5 align-middle animate-pulse" />
              )}
            </p>
          )}

          {isDone && (
            <span className="inline-block w-[2px] h-4 bg-accent mt-2 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}