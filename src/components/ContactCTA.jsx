import React from "react";

export default function ContactCTA() {
  return (
    <section className="px-8 md:px-12 py-32 relative z-10 text-center">
      <h2 className="text-4xl md:text-6xl font-extrabold text-cream mb-6 leading-tight">
        Have something worth building?
      </h2>
      <p className="text-white/60 text-lg mb-10">
        Open to new-grad roles and problems worth the effort.
      </p>
      <button className="border border-accent/70 text-cream text-sm font-semibold px-6 py-3 rounded-md hover:bg-accent/10 transition-colors">
        Get in touch
      </button>
    </section>
  );
}