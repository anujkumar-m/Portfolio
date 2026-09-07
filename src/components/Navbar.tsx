import { motion } from "motion/react";
import { Github, Linkedin, Mail, Code2, FileText } from "lucide-react";

const NAV_LINKS = [
  { name: "Work", href: "#work" },
  { name: "Skills", href: "#skills" },
  { name: "Coding", href: "#coding" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

const SOCIALS = [
  { icon: Github, href: "https://github.com/anujkumar-m", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/anuj-kumar-m-197250328/", label: "LinkedIn" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center">
          <Code2 size={16} className="text-white" />
        </div>
        <a href="/" className="text-xl font-extrabold tracking-tight">
          ANUJ<span className="text-indigo-400">.</span>
        </a>
      </div>

      <div className="hidden md:flex gap-8 items-center glass-nav px-6 py-3">
        {NAV_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-sm font-medium transition-colors hover:text-indigo-400 text-slate-300"
          >
            {link.name}
          </a>
        ))}
        <div className="w-px h-4 bg-white/20" />
        <a
          id="navbar-resume-btn"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-300 border border-indigo-500/30 px-3.5 py-1.5 rounded-full hover:bg-indigo-600/20 hover:border-indigo-400/60 hover:text-indigo-200 transition-all"
        >
          <FileText size={13} /> Resume
        </a>
        <a
          href="mailto:anujkumar72716@gmail.com"
          className="text-sm font-bold bg-indigo-600 text-white px-4 py-1.5 rounded-full hover:bg-indigo-500 transition-colors"
        >
          Hire Me
        </a>
      </div>

      <div className="hidden lg:flex items-center gap-4">
        {SOCIALS.map((social, i) => (
          <a
            key={i}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="opacity-40 transition-all hover:opacity-100 hover:scale-110 hover:text-indigo-400"
          >
            <social.icon size={18} />
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
