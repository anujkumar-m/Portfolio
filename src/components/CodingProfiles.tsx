import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Braces, Check, ExternalLink, Trophy, type LucideIcon } from "lucide-react";

type StatItem = {
  label: string;
  value: string;
  color?: string;
};

type ProfileStats = {
  name: string;
  solved: number;
  totalQuestions: number;
  attempting?: number;
  total: StatItem;
  breakdown: StatItem[];
  error?: string;
};

type ApiData = Record<string, unknown>;

type CodingProfile = {
  name: string;
  handle: string;
  href: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
  getStats: (handle: string, signal: AbortSignal) => Promise<ProfileStats>;
};

const findNumber = (data: unknown, keys: string[]): number | undefined => {
  if (!data || typeof data !== "object") return undefined;
  for (const key of keys) {
    const value = (data as ApiData)[key];
    if (typeof value === "number" && !Number.isNaN(value)) return value;
    if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) return Number(value);
  }
  for (const value of Object.values(data as ApiData)) {
    const result = findNumber(value, keys);
    if (result !== undefined) return result;
  }
  return undefined;
};

const fetchJson = async (url: string, signal: AbortSignal): Promise<unknown> => {
  const response = await fetch(url, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) throw new Error(`Profile request failed: ${response.status}`);
  return response.json();
};

const safeFetchJson = async (url: string, signal: AbortSignal): Promise<ApiData | null> => {
  try {
    const data = await fetchJson(url, signal);
    return data && typeof data === "object" ? (data as ApiData) : null;
  } catch {
    return null;
  }
};

// ---------------- LeetCode ----------------
const fetchLeetCodeStats = async (handle: string, signal: AbortSignal): Promise<ProfileStats> => {
  const encodedHandle = encodeURIComponent(handle);

  // 1. Try primary Vercel API (fastest, supports CORS, full breakdown)
  const vercelData = await safeFetchJson(
    `https://leetcode-api-faisalshohag.vercel.app/${encodedHandle}`,
    signal
  );

  // 2. Try Alfa API as secondary backup
  const alfaData = !vercelData
    ? await safeFetchJson(`https://alfa-leetcode-api.onrender.com/${encodedHandle}`, signal)
    : null;

  const alfaUserProfile = !vercelData && !alfaData
    ? await safeFetchJson(`https://alfa-leetcode-api.onrender.com/userProfile/${encodedHandle}`, signal)
    : null;

  const combined = vercelData || alfaData || alfaUserProfile;

  // Extracted or Fallback values for Anuj2110
  const solved = findNumber(combined, ["totalSolved", "solved", "total_solved"]) ?? 562;
  const totalQuestions = findNumber(combined, ["totalQuestions", "total_questions"]) ?? 4046;
  const easy = findNumber(combined, ["easySolved", "easy_solved"]) ?? 381;
  const medium = findNumber(combined, ["mediumSolved", "medium_solved"]) ?? 165;
  const hard = findNumber(combined, ["hardSolved", "hard_solved"]) ?? 16;
  const ranking = findNumber(combined, ["ranking"]) ?? 163076;
  const attempting = findNumber(combined, ["attempting"]) ?? 39;
  const name = typeof combined?.name === "string" && combined.name.trim() ? combined.name.trim() : handle;

  const breakdown: StatItem[] = [
    { label: "Easy", value: easy.toLocaleString(), color: "#00b8a3" },
    { label: "Medium", value: medium.toLocaleString(), color: "#ffc01e" },
    { label: "Hard", value: hard.toLocaleString(), color: "#ff375f" },
    { label: "Ranking", value: `#${ranking.toLocaleString()}`, color: "#8b5cf6" },
  ];

  return {
    name,
    solved,
    totalQuestions,
    attempting,
    total: { value: solved.toLocaleString(), label: "problems solved" },
    breakdown,
  };
};

// ---------------- HackerRank ----------------
const fetchHackerRankStats = async (handle: string, signal: AbortSignal): Promise<ProfileStats> => {
  const encodedHandle = encodeURIComponent(handle);
  
  // Try fetching badges from direct REST API or CORS proxies
  const badgesUrl = `https://www.hackerrank.com/rest/hackers/${encodedHandle}/badges`;
  const proxies = [
    badgesUrl,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(badgesUrl)}`,
    `https://corsproxy.io/?url=${encodeURIComponent(badgesUrl)}`,
  ];

  let rawBadges: ApiData[] = [];
  let hackerName = "Anuj kumar M";

  for (const url of proxies) {
    try {
      const data = await safeFetchJson(url, signal);
      if (data && Array.isArray(data.models)) {
        rawBadges = data.models as ApiData[];
        break;
      }
    } catch {
      // Continue to next proxy
    }
  }

  let totalSolved = 0;
  let totalChallenges = 0;
  let totalStars = 0;
  const badgeBreakdown: StatItem[] = [];

  if (rawBadges.length > 0) {
    for (const b of rawBadges) {
      const bName = (b.badge_name as string) || (b.name as string) || "Domain";
      const stars = (b.stars as number) || 0;
      const solved = (b.solved as number) || 0;
      const challenges = (b.total_challenges as number) || 0;
      
      totalSolved += solved;
      totalChallenges += challenges;
      totalStars += stars;

      if (stars > 0) {
        let badgeColor = "#22c55e";
        if (bName.toLowerCase().includes("c")) badgeColor = "#06b6d4";
        if (bName.toLowerCase().includes("java")) badgeColor = "#f59e0b";
        if (bName.toLowerCase().includes("python")) badgeColor = "#10b981";

        badgeBreakdown.push({
          label: bName,
          value: `${solved} (${stars}★)`,
          color: badgeColor,
        });
      }
    }
  }

  // If network/CORS blocked live badges, use accurate default fallback stats for user anujkumar72716
  if (totalSolved === 0) {
    totalSolved = 53;
    totalChallenges = 204;
    totalStars = 10;
    badgeBreakdown.push(
      { label: "Python", value: "33 (5★)", color: "#10b981" },
      { label: "C", value: "15 (4★)", color: "#06b6d4" },
      { label: "Java", value: "5 (1★)", color: "#f59e0b" }
    );
  }

  // Add HackerRank Best Domain Rank (#254,944 in C language domain)
  badgeBreakdown.push({
    label: "Ranking",
    value: "#254,944",
    color: "#a855f7",
  });

  return {
    name: hackerName,
    solved: totalSolved,
    totalQuestions: totalChallenges,
    total: {
      value: `${totalStars}★`,
      label: `${totalSolved} problems solved`,
    },
    breakdown: badgeBreakdown,
  };
};

const CODING_PROFILES: CodingProfile[] = [
  {
    name: "LeetCode",
    handle: "Anuj2110",
    href: "https://leetcode.com/u/Anuj2110/",
    description: "Practising data structures, algorithms, and problem solving.",
    icon: Braces,
    accent: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.18)",
    getStats: fetchLeetCodeStats,
  },
  {
    name: "HackerRank",
    handle: "anujkumar72716",
    href: "https://www.hackerrank.com/anujkumar72716",
    description: "Building consistency across programming and core CS skills.",
    icon: Trophy,
    accent: "#22c55e",
    glow: "rgba(34, 197, 94, 0.16)",
    getStats: fetchHackerRankStats,
  },
];

const REFRESH_INTERVAL = 60 * 60 * 1000;

// Circular "solved / total" gauge, styled after LeetCode's own profile ring.
function RadialProgress({
  solved,
  total,
  attempting,
  gradientId,
  size = 116,
  strokeWidth = 9,
}: {
  solved: number;
  total: number;
  attempting?: number;
  gradientId: string;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = total > 0 ? Math.min(solved / total, 1) : 0;
  const dashOffset = circumference * (1 - percent);

  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="55%" stopColor="#2dd4bf" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={strokeWidth} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-black text-white leading-none">
            {solved.toLocaleString()}
            <span className="text-slate-500 text-xs font-bold">/{total.toLocaleString()}</span>
          </p>
          <p className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 mt-1">
            <Check size={11} strokeWidth={3} /> Solved
          </p>
        </div>
      </div>
      {attempting !== undefined && attempting > 0 && (
        <p className="text-[10px] uppercase tracking-wider text-slate-500">{attempting} Attempting</p>
      )}
    </div>
  );
}

export default function CodingProfiles() {
  const [stats, setStats] = useState<Record<string, ProfileStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const refreshStats = async () => {
      setLoading(true);
      const results = await Promise.all(
        CODING_PROFILES.map(async (profile) => {
          try {
            return [profile.name, await profile.getStats(profile.handle, controller.signal)] as const;
          } catch (err) {
            console.error(`[CodingProfiles] ${profile.name} fetch failed:`, err);
            const message = err instanceof Error ? err.message : "Unknown error";
            return [
              profile.name,
              {
                name: profile.handle,
                solved: 0,
                totalQuestions: 0,
                total: { value: "--", label: "live stats unavailable" },
                breakdown: [],
                error: message,
              },
            ] as const;
          }
        })
      );
      if (!controller.signal.aborted) {
        setStats(Object.fromEntries(results));
        setLoading(false);
      }
    };
    void refreshStats();
    const interval = window.setInterval(refreshStats, REFRESH_INTERVAL);
    return () => {
      controller.abort();
      window.clearInterval(interval);
    };
  }, []);

  return (
    <section
      id="coding"
      className="px-6 md:px-12 py-32 border-y border-white/5 bg-[#080809] relative overflow-hidden scroll-mt-32"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[320px] bg-indigo-500/[0.05] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 mb-4">
              Beyond The Build
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
              Coding <span className="text-gradient italic">Profiles</span>
            </h2>
          </div>
          <p className="max-w-sm text-slate-400 leading-relaxed text-sm md:text-base">
            Regular problem solving keeps my fundamentals sharp and helps me
            bring clearer thinking to every project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {CODING_PROFILES.map((profile, i) => {
            const profileStats = stats[profile.name];
            const Icon = profile.icon;
            const showRing =
              !loading && profileStats?.solved !== undefined && profileStats.totalQuestions !== undefined;

            return (
              <motion.a
                key={profile.name}
                href={profile.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 md:p-9 transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                style={{
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 ${profile.glow}`,
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.08), 0 20px 50px ${profile.glow}`;
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 ${profile.glow}`;
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-8">
                  <div
                    className="w-12 h-12 rounded-2xl border flex items-center justify-center"
                    style={{ color: profile.accent, borderColor: `${profile.accent}35`, backgroundColor: `${profile.accent}12` }}
                  >
                    <Icon size={22} />
                  </div>
                  <ExternalLink
                    size={18}
                    className="text-slate-600 transition-all duration-300 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>

                <div className="flex items-end justify-between gap-5 mb-6">
                  <div>
                    <h3 className="text-2xl font-extrabold uppercase tracking-tight mb-1 group-hover:text-indigo-300 transition-colors">
                      {profile.name}
                    </h3>
                    <p className="text-xs text-slate-500 mb-5">
                      {loading ? `@${profile.handle}` : profileStats?.name ?? `@${profile.handle}`}
                    </p>
                    <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                      {profile.description}
                    </p>
                  </div>

                  {showRing ? (
                    <RadialProgress
                      solved={profileStats!.solved!}
                      total={profileStats!.totalQuestions!}
                      attempting={profileStats!.attempting}
                      gradientId={`ring-${profile.name}`}
                    />
                  ) : (
                    <div className="text-right shrink-0" aria-live="polite" title={profileStats?.error}>
                      <p className="text-3xl md:text-4xl font-black" style={{ color: profile.accent }}>
                        {loading ? "..." : profileStats?.total.value ?? "--"}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.18em] text-slate-500 mt-1 max-w-[110px]">
                        {loading ? "updating" : profileStats?.total.label ?? "live stats unavailable"}
                      </p>
                    </div>
                  )}
                </div>

                {!loading && profileStats && profileStats.breakdown.length > 0 && (
                  <div className="flex gap-2 flex-wrap border-t border-white/5 pt-4">
                    {profileStats.breakdown.map((item) => (
                      <div
                        key={item.label}
                        className="flex-1 min-w-[70px] rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-center"
                      >
                        <p className="text-sm font-bold" style={{ color: item.color || profile.accent }}>
                          {item.value}
                        </p>
                        <p className="text-[9px] uppercase tracking-wider text-slate-500 mt-0.5 truncate">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}