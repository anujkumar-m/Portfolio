import { motion } from "motion/react";
import {
  Globe,
  Server,
  Database,
  Rocket,
  Smartphone,
  GitBranch,
} from "lucide-react";

const SERVICES = [
  {
    id: "01",
    icon: Globe,
    title: "Frontend Development",
    description:
      "Building fast, responsive, and accessible UIs with React, Next.js, and TypeScript. Focused on clean component architecture, smooth animations, and great user experience.",
  },
  {
    id: "02",
    icon: Server,
    title: "Backend Development",
    description:
      "Building RESTful APIs and server-side logic with Node.js and Express. Handling authentication with JWT, managing routes, middleware, and real-time features with Socket.io.",
  },
  {
    id: "03",
    icon: Database,
    title: "Database Management",
    description:
      "Designing schemas and managing databases with MongoDB and MySQL using Mongoose. Structuring data efficiently for scalable and maintainable full stack applications.",
  },
  {
    id: "04",
    icon: Rocket,
    title: "Deployment & Hosting",
    description:
      "Deploying and hosting full stack applications on Vercel, Render, and Netlify. Comfortable setting up environment variables, custom domains, and CI/CD from GitHub.",
  },
  {
    id: "05",
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Building cross-platform mobile applications with React Native and Expo. Delivering native-feel UI for both iOS and Android from a single JavaScript/TypeScript codebase.",
  },
  {
    id: "06",
    icon: GitBranch,
    title: "Version Control & Collaboration",
    description:
      "Using Git and GitHub for version control, branch management, and collaborative development. Comfortable with pull requests, code reviews, and maintaining clean commit histories.",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="px-6 md:px-12 py-32 border-b border-white/5 scroll-mt-32"
    >
      {/* Header */}
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4">
              What I Do
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              Expertise <br />
              <span className="text-gradient italic">&amp; Services</span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-400 leading-relaxed text-sm md:text-base">
            As a final year IT student, I cover the full stack — from
            designing UIs to deploying APIs — with a strong focus on learning
            and building real-world applications.
          </p>
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.id}
            id={`service-${service.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="group relative bg-[#080809] p-8 md:p-10 hover:bg-indigo-600/5 transition-all duration-500 cursor-default"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-500">
              <service.icon
                size={22}
                className="text-indigo-400 group-hover:text-white transition-colors duration-500"
              />
            </div>

            {/* Number */}
            <span className="absolute top-8 right-8 text-xs font-black text-white/10 group-hover:text-indigo-400/30 transition-colors">
              {service.id}
            </span>

            <h3 className="text-lg md:text-xl font-extrabold uppercase tracking-tight mb-4 group-hover:text-indigo-300 transition-colors duration-500">
              {service.title}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-500">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
