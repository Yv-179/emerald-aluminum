"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LayoutGrid, Wrench, Hammer } from "lucide-react";

/* ─── Easings ───────────────────────────────────────────────────── */
const EASE_MECH: [number, number, number, number] = [0.76, 0, 0.24, 1];
const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Timing ────────────────────────────────────────────────────── */
const CURTAIN_DELAY = 0.15;
const CURTAIN_DURATION = 1.15;
// Cards start revealing while curtains are ~60% open
const CARDS_START = CURTAIN_DELAY + CURTAIN_DURATION * 0.6;

/* ─── Service data ──────────────────────────────────────────────── */
const SERVICES = [
  {
    Icon: LayoutGrid,
    title: "חלונות ותריסים",
    sub: "רגילים וחשמליים",
    desc: "חלונות אלומיניום, ויטרינות ותריסים בהתאמה אישית – כולל פתרונות חשמליים חכמים לכל סוג נכס.",
  },
  {
    Icon: Wrench,
    title: "שיפוץ ותיקון",
    sub: "מהיר ואמין",
    desc: "תיקון מסגרות קיימות, החלפת זגוגיות ושיפוץ תריסים ומנגנונים שחוקים – בעבודה נקייה ומסודרת.",
  },
  {
    Icon: Hammer,
    title: "הרכבה מאפס",
    sub: "מתכנון לביצוע",
    desc: "תכנון, ייצור והרכבה מלאה של פרויקטים חדשים – מהבית הפרטי ועד הפרויקט המסחרי הגדול.",
  },
] as const;

/* ─── Metallic curtain texture ──────────────────────────────────── */
const CURTAIN_BG = `repeating-linear-gradient(
  90deg,
  #090909  0px,
  #111111  4px,
  #1a1a1a  5px,
  #101010  9px,
  #090909 14px
)`;

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="relative bg-[#050a0f] py-24 px-4 md:px-8">

      {/* ── Section header ───────────────────────────────────────── */}
      <div className="mb-16 text-center">
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05, duration: 0.6, ease: EASE_SMOOTH }}
        >
          מה אנחנו מציעים
        </motion.p>

        <motion.h2
          className="text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE_SMOOTH }}
        >
          השירותים שלנו
        </motion.h2>

        <motion.div
          className="mx-auto mt-5 h-px w-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: EASE_SMOOTH }}
        />
      </div>

      {/* ── Cards + sliding window curtain ───────────────────────── */}
      <div ref={ref} className="relative mx-auto max-w-5xl">

        {/* Cards grid – sits behind the curtain */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {SERVICES.map(({ Icon, title, sub, desc }, i) => (
            <motion.div
              key={title}
              className="group rounded-2xl border border-white/10 p-8"
              style={{
                background: "rgba(8, 18, 32, 0.65)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: CARDS_START + i * 0.13,
                duration: 0.65,
                ease: EASE_SMOOTH,
              }}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 280, damping: 18 },
              }}
            >
              {/* Metallic top-edge highlight on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 10%, rgba(100,210,255,0.6) 50%, transparent 90%)",
                }}
              />

              {/* Icon container */}
              <div
                className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-shadow duration-300 group-hover:shadow-[0_0_24px_rgba(56,189,248,0.25)]"
                style={{
                  background: "rgba(56,130,210,0.1)",
                  border: "1px solid rgba(56,189,248,0.15)",
                }}
              >
                <Icon className="h-7 w-7 text-sky-400" strokeWidth={1.5} />
              </div>

              <h3 className="mb-1 text-xl font-bold text-white">{title}</h3>
              <p className="mb-3 text-xs font-semibold text-sky-400">{sub}</p>
              <p className="text-sm leading-relaxed text-slate-400">{desc}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Sliding aluminum window curtain ──────────────────── */}
        {/* Wrapper clips the panels so they don't overflow the grid */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">

          {/* Left panel – slides to the left */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2"
            style={{ backgroundImage: CURTAIN_BG }}
            initial={{ x: "0%" }}
            animate={isInView ? { x: "-100%" } : { x: "0%" }}
            transition={{
              delay: CURTAIN_DELAY,
              duration: CURTAIN_DURATION,
              ease: EASE_MECH,
            }}
          >
            {/* Right-edge glow of the left panel (electric track) */}
            <div
              className="absolute inset-y-0 right-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(100,210,255,0.7) 30%, rgba(100,210,255,0.7) 70%, transparent 100%)",
                boxShadow: "0 0 8px rgba(100,210,255,0.5)",
              }}
            />
          </motion.div>

          {/* Right panel – slides to the right */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2"
            style={{ backgroundImage: CURTAIN_BG }}
            initial={{ x: "0%" }}
            animate={isInView ? { x: "100%" } : { x: "0%" }}
            transition={{
              delay: CURTAIN_DELAY,
              duration: CURTAIN_DURATION,
              ease: EASE_MECH,
            }}
          >
            {/* Left-edge glow of the right panel */}
            <div
              className="absolute inset-y-0 left-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(100,210,255,0.7) 30%, rgba(100,210,255,0.7) 70%, transparent 100%)",
                boxShadow: "0 0 8px rgba(100,210,255,0.5)",
              }}
            />
          </motion.div>

          {/* Center seam glow – fades out as panels separate */}
          <motion.div
            className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(160,230,255,0.9) 25%, rgba(160,230,255,0.9) 75%, transparent)",
              boxShadow: "0 0 14px 2px rgba(100,210,255,0.55)",
            }}
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              delay: CURTAIN_DELAY + CURTAIN_DURATION * 0.25,
              duration: 0.35,
            }}
          />
        </div>
      </div>
    </section>
  );
}
