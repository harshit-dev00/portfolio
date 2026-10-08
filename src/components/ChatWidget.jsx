import React, { useEffect, useRef, useState } from "react";

/* ================= CONFIG ================= */
const BOT_NAME = "Harshit's AI";
const GREETING =
  "Hi 👋 I'm Harshit's assistant. Ask me about his projects, the problems they solve, or how he approaches building them.";

const SUGGESTIONS = [
  "What projects has he built?",
  "What problem does each project solve?",
  "How does he approach a problem?",
  "Is he open to roles?",
];
/* ========================================== */

/* ---- TODO: yahan apna real logic / API call lagana ----
   Ye function user ka text lega aur bot ka reply (string) return karega.
   Abhi sirf dummy reply de raha hai. */
async function getReply(userText) {
  await new Promise((r) => setTimeout(r, 900));
  return "This is a placeholder reply. Connect your backend or API inside getReply() in ChatWidget.jsx.";
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-3 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

function Message({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-accent text-black font-semibold rounded-br-sm"
            : "bg-white/5 border border-white/10 text-white/80 rounded-bl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", text: GREETING }]);

  const endRef = useRef(null);
  const inputRef = useRef(null);

  // naya message aate hi neeche scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, open]);

  // open hone par input focus
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  // Esc se band
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const send = async (text) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    setMessages((m) => [...m, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const reply = await getReply(msg);
      setMessages((m) => [...m, { role: "bot", text: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showSuggestions = messages.length === 1;

  return (
    <>
      <style>{`
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(12px) scale(.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1);   opacity: .5; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      {/* ---------- Chat window ---------- */}
      {open && (
        <div
          className="fixed z-[60] bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[70vh] max-h-[560px] flex flex-col rounded-2xl overflow-hidden bg-bg border border-accent/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)] font-mono"
          style={{ animation: "chatIn .25s ease-out" }}
        >
          {/* header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-accent/15 border border-accent/40 grid place-items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-cream">{BOT_NAME}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Online
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 grid place-items-center rounded-md text-white/50 hover:text-cream hover:bg-white/10 transition"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((m, i) => (
              <Message key={i} role={m.role} text={m.text} />
            ))}

            {showSuggestions && (
              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[11px] text-white/40 tracking-wide">TRY ASKING</span>
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-left text-[12.5px] px-3 py-2 rounded-lg border border-accent/30 text-white/75 hover:bg-accent/10 hover:border-accent/60 hover:text-cream transition"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 rounded-xl rounded-bl-sm">
                  <TypingDots />
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* input */}
          <div className="p-3 border-t border-white/10 bg-white/[0.03]">
            <div className="flex items-end gap-2 rounded-xl border border-white/10 focus-within:border-accent/60 bg-black/30 px-3 py-2 transition">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about my projects…"
                className="flex-1 bg-transparent resize-none outline-none text-[13px] text-cream placeholder:text-white/30 max-h-24"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                aria-label="Send"
                className="w-8 h-8 shrink-0 grid place-items-center rounded-lg bg-accent text-black disabled:opacity-30 disabled:cursor-not-allowed hover:brightness-110 transition"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 12 14-7-5 14-2-6-7-1z" />
                </svg>
              </button>
            </div>
            <div className="text-[10px] text-white/30 text-center mt-2">
              Enter to send · Shift+Enter for new line
            </div>
          </div>
        </div>
      )}

      {/* ---------- Floating button ---------- */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed z-[60] bottom-6 right-4 sm:right-6 w-14 h-14 rounded-full bg-accent text-black grid place-items-center shadow-[0_8px_30px_rgba(249,115,22,0.4)] hover:scale-105 active:scale-95 transition-transform"
      >
        {!open && (
          <span
            className="absolute inset-0 rounded-full bg-accent"
            style={{ animation: "pulseRing 2s ease-out infinite" }}
          />
        )}
        <span className="relative">
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </span>
      </button>
    </>
  );
}