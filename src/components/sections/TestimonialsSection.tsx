"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

/* ─── Easing ───────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Testimonials data ────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    text: "משה עשה אצלנו עבודה מדהימה. החליף את כל התריסים בבית לתריסים חשמליים. מקצוען אמיתי, הגיע בזמן והשאיר הכל נקי.",
    name: "ישראל",
    city: "חולון",
  },
  {
    text: "שירות יוצא דופן. הצעת המחיר הייתה הוגנת והעבודה ברמה הכי גבוהה שיש. רואים שיש לו ניסיון של שנים.",
    name: "אורית",
    city: "ראשון לציון",
  },
  {
    text: "חיפשנו מישהו שמתמחה בשיפוץ חלונות ישנים ומשה פשוט הציל אותנו. הכל נראה חדש עכשיו. ממליץ בחום!",
    name: "דוד",
    city: "תל אביב",
  },
] as const;

/* ─── 5-star rating component ──────────────────────────────────── */
function StarRating() {
  return (
    <div className="mb-4 flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-5 w-5 fill-amber-400 text-amber-400"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative bg-[#050a0f] px-4 py-24 md:px-8">
      {/* Subtle top separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.18) 40%, rgba(56,189,248,0.18) 60%, transparent 100%)",
        }}
      />

      {/* ── Section header ─────────────────────────────────────── */}
      <div className="mb-16 text-center">
        <motion.p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05, duration: 0.6, ease: EASE }}
        >
          מה הלקוחות אומרים
        </motion.p>

        <motion.h2
          className="text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
        >
          לקוחות ממליצים
        </motion.h2>

        <motion.div
          className="mx-auto mt-5 h-px w-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
        />
      </div>

      {/* ── Testimonial cards ──────────────────────────────────── */}
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map(({ text, name, city }, i) => (
            <motion.div
              key={name}
              className="group relative rounded-2xl border border-white/10 p-8"
              style={{
                background: "rgba(240, 244, 248, 0.06)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                boxShadow:
                  "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.35 + i * 0.15,
                duration: 0.65,
                ease: EASE,
              }}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 280, damping: 18 },
              }}
            >
              {/* Top-edge hover glow */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 10%, rgba(100,210,255,0.6) 50%, transparent 90%)",
                }}
              />

              {/* Quotation mark accent */}
              <div
                className="pointer-events-none absolute end-6 top-5 select-none text-6xl font-bold leading-none"
                style={{ color: "rgba(56,189,248,0.08)" }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <StarRating />

              {/* Testimonial text */}
              <p className="mb-6 text-base leading-relaxed text-slate-300">
                {text}
              </p>

              {/* Divider */}
              <div
                className="mb-4 h-px w-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(56,189,248,0.25), transparent)",
                }}
              />

              {/* Client info */}
              <div className="flex items-center gap-3">
                {/* Avatar placeholder */}
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-sky-400"
                  style={{
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.25)",
                  }}
                >
                  {name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{name}</p>
                  <p className="text-xs text-slate-400">{city}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
