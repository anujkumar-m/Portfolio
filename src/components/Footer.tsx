import { motion } from "motion/react";
import { ArrowUpRight, Github, Linkedin, Twitter, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { label: "GitHub", icon: Github, href: "https://github.com/anujkumar-m" },
  { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/anuj-kumar-m-197250328/" },
 // { label: "Twitter", icon: Twitter, href: "https://twitter.com/anujkumarm" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="px-6 md:px-12 py-32 bg-[#080809] border-t border-white/5 relative overflow-hidden scroll-mt-32"
    >
      {/* Background glow */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col items-center text-center relative z-10">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Get In Touch
          </div>
          <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-extrabold tracking-tighter uppercase mb-6">
            Let's Build <br />
            <span className="text-gradient italic">Something Great</span>
          </h2>
          <p className="max-w-md text-slate-400 leading-relaxed mb-12 mx-auto">
            Have a project in mind, an opportunity to discuss, or just want to
            say hi? My inbox is always open.
          </p>
        </motion.div>

        {/* Email CTA */}
        <motion.a
          href="mailto:anujkumar72716@gmail.com"
          id="footer-email-cta"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="group relative inline-flex items-center gap-6 px-8 md:px-12 py-6 md:py-8 rounded-[28px] backdrop-blur-3xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all hover:border-indigo-500/50 shadow-2xl mb-12"
        >
          <Mail className="text-indigo-400 relative z-10 shrink-0" size={24} />
          <span className="relative z-10 text-xl md:text-3xl font-extrabold uppercase tracking-tighter break-all">
            anujkumar72716@gmail.com
          </span>
          <div className="relative z-10 w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center transition-transform group-hover:rotate-45 group-hover:scale-110 shrink-0">
            <ArrowUpRight className="text-white" size={24} />
          </div>
          <motion.div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.a>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex items-center gap-6"
        >
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              id={`footer-${s.label.toLowerCase()}`}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors group"
            >
              <s.icon size={16} className="group-hover:scale-110 transition-transform" />
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          &copy; {currentYear} Anuj Kumar M — All Rights Reserved
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          Available for freelance &amp; full-time opportunities
        </div>
        <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
          Built with React + TypeScript + Vite
        </div>
      </div>
    </footer>
  );
}
