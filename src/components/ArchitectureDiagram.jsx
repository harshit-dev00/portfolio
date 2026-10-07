import React, { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  ZoomIn,
  ZoomOut,
  Maximize,
} from "lucide-react";

const CATEGORY_COLORS = {
  frontend: "#22d3ee",
  backend: "#34d399",
  engine: "#f2652b",
  ai: "#a78bfa",
  output: "#f472b6",
};

const STEP_DURATION = 3200;
const NODE_H = 54;

function nodeWidth(label) {
  return Math.max(120, label.length * 9 + 44);
}

function edgePath(from, to) {
  const dx = to.x - from.x;
  const c = Math.max(40, Math.abs(dx) * 0.5);
  return `M ${from.x} ${from.y} C ${from.x + c} ${from.y}, ${to.x - c} ${to.y}, ${to.x} ${to.y}`;
}

export default function ArchitectureDiagram({ title, subtitle, diagram }) {
  const { width, height, nodes, edges } = diagram;
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);
  const total = nodes.length;

  const indexOf = (id) => nodes.findIndex((n) => n.id === id);

  useEffect(() => {
    if (!playing) return;
    if (step >= total - 1) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), STEP_DURATION);
    return () => clearTimeout(t);
  }, [playing, step, total]);

  const goPrev = () => {
    setPlaying(false);
    setStep((s) => Math.max(0, s - 1));
  };
  const goNext = () => {
    setPlaying(false);
    setStep((s) => Math.min(total - 1, s + 1));
  };
  const restart = () => {
    setPlaying(false);
    setStep(0);
  };
  const skipEnd = () => {
    setPlaying(false);
    setStep(total - 1);
  };
  const togglePlay = () => {
    if (step >= total - 1) setStep(0);
    setPlaying((p) => !p);
  };
  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const current = nodes[step];
  const progressPct = ((step + 1) / total) * 100;

  return (
    <div
      ref={containerRef}
      className="border border-white/10 rounded-2xl bg-black/30 overflow-hidden relative"
    >
      {/* header */}
      <div className="flex items-start justify-between px-6 md:px-8 pt-6 pb-4 border-b border-white/10 flex-wrap gap-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-cream mb-1">
            {title} <span className="text-white/30">—</span> Architecture
          </h3>
          <p className="text-sm text-white/50">{subtitle}</p>
        </div>

        <div className="flex flex-col gap-1.5 text-xs text-white/50 shrink-0">
          {nodes.map((n) => (
            <div key={n.id} className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-sm shrink-0"
                style={{ backgroundColor: CATEGORY_COLORS[n.category] }}
              />
              {n.label}
            </div>
          ))}
        </div>
      </div>

      {/* diagram canvas */}
      <div className="relative h-[320px] md:h-[400px] overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-300 origin-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full h-full"
          >
            <defs>
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#5b8a99" />
              </marker>
            </defs>

            {/* edges */}
            {edges.map((edge, i) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              const fromRevealed = indexOf(edge.from) <= step;
              const toRevealed = indexOf(edge.to) <= step;
              const revealed = fromRevealed && toRevealed;
              const fromEdge = { x: fromNode.x + nodeWidth(fromNode.label), y: fromNode.y };
              const toEdge = { x: toNode.x, y: toNode.y };
              const midX = (fromEdge.x + toEdge.x) / 2;
              const midY = (fromEdge.y + toEdge.y) / 2 - 10;

              return (
                <g key={i} style={{ opacity: revealed ? 1 : 0, transition: "opacity 0.5s" }}>
                  <path
                    d={edgePath(fromEdge, toEdge)}
                    fill="none"
                    stroke="#5b8a99"
                    strokeWidth="1.5"
                    strokeDasharray={edge.dashed ? "6 6" : "none"}
                    markerEnd="url(#arrow)"
                  />
                  {edge.label && (
                    <g>
                      <rect
                        x={midX - edge.label.length * 3.2 - 6}
                        y={midY - 12}
                        width={edge.label.length * 6.4 + 12}
                        height={18}
                        rx={4}
                        fill="#0a0a0a"
                        stroke="rgba(255,255,255,0.1)"
                      />
                      <text
                        x={midX}
                        y={midY + 1}
                        textAnchor="middle"
                        fontSize="10"
                        fontFamily="monospace"
                        fill="rgba(255,255,255,0.5)"
                      >
                        {edge.label}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* nodes */}
            {nodes.map((n, i) => {
              const revealed = i <= step;
              const isCurrent = i === step;
              const w = nodeWidth(n.label);
              const color = CATEGORY_COLORS[n.category];
              return (
                <g
                  key={n.id}
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? "translateY(0)" : "translateY(8px)",
                    transition: "opacity 0.5s, transform 0.5s",
                  }}
                >
                  <rect
                    x={n.x}
                    y={n.y - NODE_H / 2}
                    width={w}
                    height={NODE_H}
                    rx={10}
                    fill="rgba(10,10,10,0.7)"
                    stroke={isCurrent ? color : "rgba(255,255,255,0.15)"}
                    strokeWidth={isCurrent ? 2 : 1}
                  />
                  <text
                    x={n.x + w / 2}
                    y={n.y + 5}
                    textAnchor="middle"
                    fontSize="14"
                    fontFamily="monospace"
                    fontWeight="600"
                    fill="#f4f1ea"
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* zoom controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(1.6, z + 0.15))}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-white/15 text-white/50 hover:text-cream hover:border-accent/40 transition-colors"
            aria-label="Zoom in"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-white/15 text-white/50 hover:text-cream hover:border-accent/40 transition-colors"
            aria-label="Zoom out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={toggleFullscreen}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-white/15 text-white/50 hover:text-cream hover:border-accent/40 transition-colors"
            aria-label="Fullscreen"
          >
            <Maximize size={14} />
          </button>
        </div>
      </div>

      {/* narrative card */}
      <div className="px-6 md:px-8 pb-6">
        <div className="border border-white/10 rounded-xl bg-white/[0.02] p-5 max-w-md">
          <p className="text-xs text-white/40 mb-2 tracking-wide">
            STEP {step + 1} / {total}
          </p>
          <p
            className="font-bold text-base mb-2"
            style={{ color: CATEGORY_COLORS[current.category] }}
          >
            {current.label}
          </p>
          <p className="text-sm text-white/60 leading-relaxed">{current.detail}</p>

          <div className="h-1 rounded-full bg-white/10 mt-4 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPct}%`,
                backgroundColor: CATEGORY_COLORS[current.category],
              }}
            />
          </div>
        </div>
      </div>

      {/* playback controls */}
      <div className="flex items-center justify-center gap-3 pb-6">
        <button
          onClick={goPrev}
          disabled={step === 0}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-white/15 text-white/60 hover:text-cream hover:border-accent/40 transition-colors disabled:opacity-30"
          aria-label="Previous step"
        >
          <ChevronLeft size={16} />
        </button>

        <button
          onClick={togglePlay}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-colors"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
          {playing ? "Pause" : "Play"}
        </button>

        <button
          onClick={goNext}
          disabled={step === total - 1}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-white/15 text-white/60 hover:text-cream hover:border-accent/40 transition-colors disabled:opacity-30"
          aria-label="Next step"
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={restart}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-white/15 text-white/60 hover:text-cream hover:border-accent/40 transition-colors"
          aria-label="Restart"
        >
          <RotateCcw size={14} />
        </button>

        <button
          onClick={skipEnd}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-white/15 text-white/60 hover:text-cream hover:border-accent/40 transition-colors"
          aria-label="Skip to end"
        >
          <SkipForward size={14} />
        </button>

        <button
          onClick={() => setMuted((m) => !m)}
          className="w-9 h-9 flex items-center justify-center rounded-md border border-white/15 text-white/60 hover:text-cream hover:border-accent/40 transition-colors"
          aria-label="Toggle sound"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>
    </div>
  );
}
