import { motion } from "motion/react";
import { ExternalLink, ArrowRight, Github } from "lucide-react";

const PROJECTS = [
  {
    title: "CampusReserve",
    category: "React / Node.js / MongoDB",
    description: "A smart campus facility booking platform that lets students and staff reserve labs, seminar halls, and sports venues in real-time with conflict detection and admin approval workflows.",
    year: "2026",
    link: "https://campusreserve.vercel.app/",
    github: "https://github.com/anujkumar-m/CampusReserve",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    image: "/campusreserve.png"
  },
  {
    title: "LearningXchange",
    category: "Node.js / Express / MongoDB",
    description: "Production-grade RESTful API with JWT authentication, rate limiting, caching with Redis, and full CRUD operations for a multi-tenant SaaS platform.",
    year: "2025",
    link: "https://learning-xchange-git-main-samshibin1125-9532s-projects.vercel.app/",
    github: "https://github.com/anujkumar-m/LearningXchange",
    tags: ["React", "Node.js", "MongoDB", "Express", "Websocket", "Real-time Chat Application"],
    image: "/learningxchange.png",
  },
  {
    title: "FinTrack",
    category: "React Native / Node.js / MongoDB",
    description: "A full-featured personal finance tracker mobile app with expense management, bill tracking, borrow/lend records, analytics dashboards, and a premium dark mode UI.",
    year: "2026",
    github: "https://github.com/anujkumar-m/FinTrack-Mobile",
    tags: ["React Native", "Node.js", "MongoDB", "Expo"],
    image: "fintrack.png"
  },

];

export default function ProjectGrid() {
  return (
    <section id="work" className="px-6 md:px-12 py-32 bg-noir-black scroll-mt-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4">Portfolio</p>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            Selected <br /> <span className="text-white/30 italic">Projects</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-xs text-sm text-white/40 font-medium leading-relaxed"
        >
          Real-world full stack applications built with modern technologies and a focus on scalability and performance.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={i}
            id={`project-${i + 1}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-80px", amount: 0.1 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group glass-card p-6 md:p-8 cursor-pointer overflow-hidden"
          >
            {/* Image */}
            <div className="relative aspect-video bg-slate-900/50 rounded-[20px] mb-8 overflow-hidden group-hover:shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-shadow duration-700">
              <motion.img
                src={project.image}
                alt={project.title}
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover opacity-40 transition-all duration-700 group-hover:opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/60 via-transparent to-purple-900/30 pointer-events-none opacity-70 group-hover:opacity-20 transition-opacity duration-700" />

              {/* Tags */}
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full text-[9px] border border-white/10 font-bold uppercase tracking-[0.12em] text-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Year badge */}
              <div className="absolute top-4 right-4 px-2.5 py-1 bg-indigo-600/80 backdrop-blur-sm rounded-lg text-[10px] font-black tracking-widest text-white">
                {project.year}
              </div>
            </div>

            {/* Content */}
            <div className="px-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400/60 mb-2">
                {project.category}
              </p>
              <h3 className="text-xl md:text-2xl font-extrabold mb-3 uppercase tracking-tight group-hover:text-indigo-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors">
                {project.description}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-4">
                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                >
                  <Github size={13} /> Source
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        className="mt-24 text-center"
      >
        <a
          href="https://github.com/anujkumar-m"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity hover:text-indigo-400"
        >
          View all on GitHub <ArrowRight size={14} />
        </a>
      </motion.div>
    </section>
  );
}
