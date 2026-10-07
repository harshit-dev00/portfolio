import React from "react";
import Background from "../components/Background.jsx";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import TerminalSession from "../components/TerminalSession.jsx";
import SelectedWork from "../components/SelectedWork.jsx";
import Education from "../components/Education.jsx";
import Skills from "../components/Skills.jsx";
import WhatIDo from "../components/WhatIDo.jsx";
import ContactCTA from "../components/ContactCTA.jsx";
import Footer from "../components/Footer.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg text-cream font-mono relative overflow-hidden">
      <Background />
      <Navbar />
      <Hero />
      <TerminalSession />
      <SelectedWork />
      <Education />
      <Skills />
      <WhatIDo />
      <ContactCTA />
      <Footer />
    </div>
  );
}