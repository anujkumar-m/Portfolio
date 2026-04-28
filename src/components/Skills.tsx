import { motion } from "motion/react";

const ALL_SKILLS = [
  // Frontend
  { name: "React", color: "#61DAFB", glow: "rgba(97,218,251,0.35)" },
  { name: "Next.js", color: "#ffffff", glow: "rgba(255,255,255,0.25)" },
  { name: "TypeScript", color: "#3178C6", glow: "rgba(49,120,198,0.4)" },
  { name: "JavaScript", color: "#F7DF1E", glow: "rgba(247,223,30,0.35)" },
  { name: "Tailwind CSS", color: "#38BDF8", glow: "rgba(56,189,248,0.35)" },
  { name: "HTML5", color: "#E34F26", glow: "rgba(227,79,38,0.35)" },
  { name: "CSS3", color: "#1572B6", glow: "rgba(21,114,182,0.35)" },

  // Backend
  { name: "Node.js", color: "#68A063", glow: "rgba(104,160,99,0.4)" },
  { name: "Express.js", color: "#aaaaaa", glow: "rgba(200,200,200,0.2)" },
  { name: "REST APIs", color: "#6366F1", glow: "rgba(99,102,241,0.4)" },
  { name: "Socket.io", color: "#a5b4fc", glow: "rgba(99,102,241,0.3)" },
  { name: "JWT Auth", color: "#FB923C", glow: "rgba(251,146,60,0.35)" },


  // Database
  { name: "MongoDB", color: "#47A248", glow: "rgba(71,162,72,0.4)" },
  { name: "MySQL", color: "#4479A1", glow: "rgba(68,121,161,0.35)" },
  { name: "Mongoose", color: "#fca5a5", glow: "rgba(136,0,0,0.3)" },

  // Deployment & Cloud
  { name: "Vercel", color: "#aaaaaa", glow: "rgba(200,200,200,0.25)" },
  { name: "Render", color: "#46E3B7", glow: "rgba(70,227,183,0.35)" },
  { name: "Netlify", color: "#00C7B7", glow: "rgba(0,199,183,0.35)" },
  { name: "GitHub", color: "#a5b4fc", glow: "rgba(99,102,241,0.3)" },

  // Mobile
  { name: "React Native", color: "#61DAFB", glow: "rgba(97,218,251,0.3)" },
  { name: "Expo", color: "#a5b4fc", glow: "rgba(99,102,241,0.3)" },

  // Tools & Languages
  { name: "Git", color: "#F05032", glow: "rgba(240,80,50,0.35)" },
  { name: "Python", color: "#3776AB", glow: "rgba(55,118,171,0.35)" },
  { name: "C", color: "#5C6BC0", glow: "rgba(92,107,192,0.35)" },
  { name: "C++", color: "#00599C", glow: "rgba(0,89,156,0.4)" },
  { name: "Java", color: "#ED8B00", glow: "rgba(237,139,0,0.4)" },
  { name: "VS Code", color: "#007ACC", glow: "rgba(0,122,204,0.4)" },
  { name: "Postman", color: "#FF6C37", glow: "rgba(255,108,55,0.35)" },
  { name: "Figma", color: "#A259FF", glow: "rgba(162,89,255,0.35)" },
];

// Deterministic float patterns — varied speeds & amplitudes for organic feel
const FLOAT_PATTERNS = [
  { y: [-6, 6],   duration: 3.4 },
  { y: [8, -8],   duration: 2.9 },
  { y: [-10, 5],  duration: 3.8 },
  { y: [5, -12],  duration: 2.6 },
  { y: [-8, 10],  duration: 4.0 },
  { y: [10, -6],  duration: 3.2 },
  { y: [-5, 8],   duration: 2.8 },
  { y: [7, -10],  duration: 3.6 },
];

interface Skill {
  name: string;
  color: string;
  glow: string;
}

interface FloatPattern {
  y: number[];
  duration: number;
}

function FloatingSkillPill({
  skill,
  pattern,
  delay,
  entryDelay,
}: {
  key?: string;
  skill: Skill;
  pattern: FloatPattern;
  delay: number;
  entryDelay: number;
}) {
  return (
    <motion.div
      // Entry animation
      initial={{ opacity: 0, scale: 0.6, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.55,
        delay: entryDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="cursor-default"
    >
      {/* Continuous float wrapper */}
      <motion.div
        animate={{ y: pattern.y }}
        transition={{
          duration: pattern.duration,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay,
        }}
        whileHover={{
          scale: 1.2,
          transition: { duration: 0.22, ease: "easeOut" },
        }}
        className="group"
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border backdrop-blur-sm transition-all duration-500"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            borderColor: `${skill.color}28`,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06)`,
            transition: "box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = `0 0 18px ${skill.glow}, 0 0 36px ${skill.glow}55, inset 0 1px 0 rgba(255,255,255,0.12)`;
            el.style.borderColor = `${skill.color}66`;
            el.style.background = `linear-gradient(135deg, ${skill.glow}18 0%, rgba(255,255,255,0.03) 100%)`;
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLDivElement;
            el.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.06)`;
            el.style.borderColor = `${skill.color}28`;
            el.style.background = "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)";
          }}
        >
          {/* Brand color dot */}
          <span
            className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300"
            style={{
              backgroundColor: skill.color,
              boxShadow: `0 0 5px ${skill.glow}`,
            }}
          />
          <span
            className="text-xs font-bold tracking-wide whitespace-nowrap transition-colors duration-300"
            style={{ color: skill.color }}
          >
            {skill.name}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-6 md:px-12 py-32 border-y border-white/5 bg-[#05050a] relative overflow-hidden scroll-mt-32"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/[0.07] rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4">
            Tech Stack
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            Skills &amp;{" "}
            <span className="text-gradient italic">Technologies</span>
          </h2>
          <p className="mt-6 text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
            Tools and technologies I've worked with while building real-world
            full stack applications.
          </p>
        </motion.div>

        {/* Floating Skills Cloud */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
          {ALL_SKILLS.map((skill, i) => {
            const pattern = FLOAT_PATTERNS[i % FLOAT_PATTERNS.length];
            const floatDelay = (i * 0.18) % 3.0;
            const entryDelay = (i * 0.045) % 1.2;

            return (
              <FloatingSkillPill
                key={skill.name}
                skill={skill}
                pattern={pattern}
                delay={floatDelay}
                entryDelay={entryDelay}
              />
            );
          })}
        </div>

        {/* Skill count footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 mt-16"
        >
          {ALL_SKILLS.length}+ Skills &amp; Growing
        </motion.p>
      </div>
    </section>
  );
}
