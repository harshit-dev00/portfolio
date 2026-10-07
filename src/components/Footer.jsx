import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const navLinks = ["Projects", "Work", "About"];
const socialLinks = [
  { label: "GitHub", href: "https://github.com/harshit-dev00" },
  { label: "LinkedIn", href: "#" },
  { label: "Email", href: "mailto:harshitupadhyay.tech@gmail.com" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 px-8 md:px-12 pt-14 pb-8">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-14">
        <div>
          <p className="text-lg font-bold text-cream mb-2">
            Harshit<span className="text-white/40">.</span>Upadhyay
          </p>
          <p className="text-sm text-accent">
            Software developer, India
          </p>
        </div>

        <nav className="flex gap-8 text-sm text-white/60">
          {navLinks.map((link) => (
            <a key={link} href="#" className="hover:text-cream transition-colors">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex gap-8 text-sm text-white/60">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs text-white/40">
        <span>© 2026 Harshit Upadhyay</span>

        <div className="flex items-center gap-4">
          <button
            aria-label="Previous"
            className="hover:text-cream transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <span className="text-white/30">◐</span>
          <button aria-label="Next" className="hover:text-cream transition-colors">
            <ArrowRight size={14} />
          </button>
        </div>

        <span>Designed and built from scratch.</span>
      </div>
    </footer>
  );
}