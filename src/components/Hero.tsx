import { motion } from "motion/react";
import { Download, ArrowDown, FileText } from "lucide-react";
import { useState, useRef, useEffect, type MouseEvent } from "react";

const STATS = [
  { label: "Projects Built", value: "3+" },
  { label: "Technologies", value: "15+" },
  { label: "Year of Study", value: "3rd" },
  { label: "CGPA", value: "7.72" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-24 overflow-hidden">
      {/* Mesh Gradient Background */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl z-10"
      >
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs font-semibold mb-8 w-fit">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          OPEN TO INTERNSHIPS &amp; OPPORTUNITIES
        </div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-slate-400 font-medium text-lg mb-4 tracking-wide"
        >
          Hi there, I'm
        </motion.p>

        {/* Name — cursor-reactive color shift */}
        <NameBlock />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-[2px] w-12 bg-indigo-500" />
          <span className="text-lg md:text-xl font-bold tracking-widest text-indigo-300 uppercase">
            Full Stack Developer &amp; Pre-Final Year IT Student
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="max-w-lg text-lg text-slate-400/90 leading-relaxed"
          >
            A pre-final year B.Tech IT student who loves building real-world
            full stack applications — from clean React UIs to robust Node.js
            backends. Eager to learn, grow, and contribute to impactful teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex gap-4 flex-wrap"
          >
            <a
              id="hero-view-work"
              href="#work"
              className="px-8 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition-all hover:scale-105 shadow-lg shadow-indigo-600/30"
            >
              View My Projects
            </a>
            <a
              id="hero-resume-btn"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-indigo-600/20 hover:border-indigo-500/50 transition-all group"
            >
              <FileText size={16} className="group-hover:text-indigo-400 transition-colors" />
              View Resume
            </a>
            <a
              id="hero-hire-me"
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all"
            >
              <Download size={16} /> Hire Me
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl"
        >
          {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-3xl md:text-4xl font-extrabold text-gradient">
                {stat.value}
              </span>
              <span className="text-xs text-slate-500 font-semibold uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-12 right-6 md:right-12 flex flex-col items-center gap-2"
      >
        <ArrowDown size={16} className="opacity-30 animate-bounce" />
        <span className="text-[10px] uppercase tracking-widest opacity-30 font-medium [writing-mode:vertical-lr]">
          Scroll down
        </span>
      </motion.div>
    </section>
  );
}

/* ── Typewriter + cursor-reactive name block ─────────────────────────── */

const FULL_NAME    = "ANUJ KUMAR M.";
const KUMAR_START  = 5;
const KUMAR_END    = 10;
const TYPE_SPEED   = 130;   // ms per char while typing
const DELETE_SPEED = 75;    // ms per char while deleting
const PAUSE_AFTER  = 2200;  // ms pause after fully typed
const PAUSE_BEFORE = 600;   // ms pause after fully deleted
const GLITCH_DURATION = 1200; // ms of glitch before typing starts
const GLITCH_INTERVAL = 70;   // ms between glitch frames

const GLITCH_CHARS = "!@#$%^&*<>?/\\[]{}|~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomGlitch(len: number) {
  return Array.from({ length: len }, () =>
    GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
  ).join("");
}

type Phase = "glitch" | "typing" | "deleting";

function NameBlock() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [displayed, setDisplayed] = useState("");
  const [glitchText, setGlitchText] = useState(randomGlitch(FULL_NAME.length));
  const [phase, setPhase] = useState<Phase>("glitch");
  const [done, setDone] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  // ── Phase 1: Glitch scramble ──
  useEffect(() => {
    if (phase !== "glitch") return;

    // Scramble rapidly
    const scramble = setInterval(() => {
      setGlitchText(randomGlitch(FULL_NAME.length));
    }, GLITCH_INTERVAL);

    // After GLITCH_DURATION → begin real typing
    const end = setTimeout(() => {
      clearInterval(scramble);
      setPhase("typing");
    }, GLITCH_DURATION);

    return () => {
      clearInterval(scramble);
      clearTimeout(end);
    };
  }, [phase]);

  // ── Phase 2 & 3: Looping typewriter ──
  useEffect(() => {
    if (phase === "typing") {
      if (displayed.length >= FULL_NAME.length) {
        setDone(true);
        const t = setTimeout(() => setPhase("deleting"), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplayed(FULL_NAME.slice(0, displayed.length + 1)),
        TYPE_SPEED,
      );
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length === 0) {
        const t = setTimeout(() => setPhase("typing"), PAUSE_BEFORE);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplayed((prev) => prev.slice(0, -1)),
        DELETE_SPEED,
      );
      return () => clearTimeout(t);
    }
  }, [displayed, phase]);

  // ── Color palette (cursor X → hue shift) ──
  const hue  = Math.round(220 + pos.x * 140);
  const hue2 = (hue + 50) % 360;

  const gradientText = hovered
    ? `linear-gradient(90deg, hsl(${hue},90%,70%) 0%, hsl(${hue2},95%,65%) 100%)`
    : `linear-gradient(90deg, #818cf8 0%, #c084fc 100%)`;

  const bgGlow = hovered
    ? `radial-gradient(ellipse 55% 70% at ${pos.x * 100}% ${pos.y * 100}%, hsl(${hue},80%,55%)18, transparent 70%)`
    : "none";

  const handleMouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // ── Split displayed text into segments ──
  const before  = displayed.slice(0, KUMAR_START);                          // "ANUJ "
  const middle  = displayed.slice(KUMAR_START, Math.min(displayed.length, KUMAR_END)); // "KUMAR" (partial)
  const after   = displayed.length > KUMAR_END ? displayed.slice(KUMAR_END) : "";    // " M."

  return (
    <h1
      ref={ref}
      onMouseEnter={() => done && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative text-[clamp(3.5rem,12vw,8rem)] font-extrabold tracking-[-0.04em] leading-[0.9] mb-4 select-none rounded-2xl px-2 -mx-2 cursor-default"
      style={{ background: bgGlow, transition: "background 0.3s ease" }}
    >
      {/* ── GLITCH PHASE ── */}
      {phase === "glitch" && (
        <span
          style={{
            color: "#4ade80",
            fontFamily: "monospace",
            animation: "glitch-flicker 0.14s step-start infinite",
            display: "inline-block",
            filter: "hue-rotate(90deg) brightness(1.4)",
            textShadow: "0 0 8px #4ade80, 2px 0 0 #f472b6, -2px 0 0 #38bdf8",
          }}
        >
          {glitchText}
        </span>
      )}

      {/* ── TYPING / DELETING PHASE ── */}
      {phase !== "glitch" && (
        <>
          {/* ANUJ */}
          {before && (
            <span style={{ color: hovered ? `hsl(${hue}, 85%, 80%)` : "#f1f5f9", transition: "color 0.35s ease" }}>
              {before}
            </span>
          )}

          {/* KUMAR — gradient */}
          {middle && (
            <span
              style={{
                backgroundImage: gradientText,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {middle}
            </span>
          )}

          {/* M. */}
          {after && (
            <span style={{ color: hovered ? `hsl(${hue2}, 85%, 80%)` : "#f1f5f9", transition: "color 0.35s ease" }}>
              {after}
            </span>
          )}
        </>
      )}

      {/* Blinking cursor */}
      <span
        style={{
          display: "inline-block",
          width: "0.08em",
          marginLeft: "0.06em",
          backgroundColor:
            phase === "glitch"
              ? "#4ade80"
              : done
              ? hovered ? `hsl(${hue}, 90%, 65%)` : "#818cf8"
              : "#f1f5f9",
          verticalAlign: "middle",
          height: "0.85em",
          borderRadius: "2px",
          animation: "blink 1.1s step-start infinite",
          transition: "background-color 0.25s ease",
        }}
      />

      {/* CSS keyframes */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes glitch-flicker {
          0%   { opacity: 1;    transform: skewX(0deg); }
          20%  { opacity: 0.85; transform: skewX(-1.5deg); }
          40%  { opacity: 1;    transform: skewX(1deg); }
          60%  { opacity: 0.9;  transform: skewX(0.5deg); }
          80%  { opacity: 1;    transform: skewX(-0.5deg); }
          100% { opacity: 1;    transform: skewX(0deg); }
        }
      `}</style>
    </h1>
  );
}
