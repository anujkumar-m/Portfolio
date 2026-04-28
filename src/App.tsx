/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProjectGrid from "./components/ProjectGrid";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Footer from "./components/Footer";
import { motion, AnimatePresence } from "motion/react";
import { Terminal, CheckCircle } from "lucide-react";

const ABOUT_HIGHLIGHTS = [
  "Pre-final year B.Tech IT student (2023–2027 batch)",
  "Strong fundamentals in Data Structures & Algorithms",
  "Built 3+ real-world full stack projects from scratch",
  "Passionate about clean code, system design & best practices",
  "Actively seeking internships & entry-level opportunities",
];

export default function App() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative selection:bg-indigo-500 selection:text-white"
      >
        <Navbar />
        <main>
          {/* ── Hero ── */}
          <Hero />

          {/* ── About Section ── */}
          <section
            id="about"
            className="px-6 md:px-12 py-32 flex justify-center border-y border-white/5 bg-[#080809] relative overflow-hidden scroll-mt-32"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              {/* Left — Quote */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Terminal size={18} className="text-indigo-400" />
                  <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400">
                    About Me
                  </p>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tight text-slate-100 mb-8">
                  "I BUILD{" "}
                  <span className="text-gradient font-bold italic underline decoration-indigo-400/20 underline-offset-8">
                    REAL PROJECTS
                  </span>{" "}
                  THAT SOLVE REAL PROBLEMS — ONE COMMIT AT A TIME."
                </h2>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-[1px] bg-white/10" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
                    The Mission
                  </span>
                  <div className="w-16 h-[1px] bg-white/10" />
                </div>
              </motion.div>

              {/* Right — Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <p className="text-slate-400 leading-relaxed text-base mb-8">
                  I'm <strong className="text-slate-200">Anuj Kumar M</strong>, a
                  pre-final year B.Tech Information Technology student based in
                  India. I'm passionate about full stack development and love
                  building real-world applications that solve actual problems —
                  from clean database schemas and REST APIs to intuitive
                  React-based frontends.
                </p>
                <p className="text-slate-400 leading-relaxed text-base mb-10">
                  As a fresher actively looking for internships and entry-level
                  roles, I bring strong fundamentals, a fast learning mindset,
                  and hands-on project experience across the entire web
                  development stack.
                </p>

                {/* Highlights */}
                <ul className="space-y-3">
                  {ABOUT_HIGHLIGHTS.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle
                        size={16}
                        className="text-indigo-400 mt-0.5 shrink-0"
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>

          {/* ── Projects ── */}
          <ProjectGrid />

          {/* ── Skills ── */}
          <Skills />

          {/* ── Services ── */}
          <Services />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
