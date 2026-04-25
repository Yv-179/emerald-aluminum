"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const HIGHLIGHTS = [
  "30 שנות ניסיון מעשי",
  "אחריות מלאה על כל עבודה",
  "יחס אישי וליווי צמוד",
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      className="relative bg-[#050a0f] px-4 py-24 md:px-8"
    >
      {/* Subtle top separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.18) 40%, rgba(56,189,248,0.18) 60%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Text column (first in DOM = right side in RTL) ─────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Eyebrow */}
            <motion.p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            >
              המומחיות שלנו
            </motion.p>

            {/* Heading */}
            <motion.h2
              className="mb-5 text-3xl font-bold leading-tight text-white md:text-4xl"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
            >
              משה ושדי{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #38bdf8 0%, #7dd3fc 100%)",
                }}
              >
                – מעל 30 שנות ניסיון באלומיניום
              </span>
            </motion.h2>

            {/* Divider */}
            <motion.div
              className="mb-6 h-px w-16"
              style={{
                background:
                  "linear-gradient(90deg, rgba(56,189,248,0.7), transparent)",
                transformOrigin: "right",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            />

            {/* Paragraph */}
            <motion.p
              className="mb-8 text-base leading-relaxed text-slate-300"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            >
              עולם האלומיניום הוא הרבה מעבר לחומר גלם; הוא החיבור שבין הבית לחוץ,
              בין עיצוב לפרקטיקה. עם למעלה מ-3 עשורים של עשייה בשטח, משה ושדי
              מביא איתו מקצועיות בלתי מתפשרת, שקיפות מלאה וירידה לפרטים הקטנים
              ביותר. כל פרויקט, מתיקון נקודתי ועד להתקנה מורכבת, מבוצע מתוך
              מחויבות אישית לכל לקוח. מהייעוץ הראשוני בביתכם ועד לגימור המושלם
              – הניסיון שלנו הוא השקט הנפשי שלכם.
            </motion.p>

            {/* Highlights list */}
            <ul className="space-y-3">
              {HIGHLIGHTS.map((item, i) => (
                <motion.li
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 16 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.55 + i * 0.1,
                    duration: 0.5,
                    ease: EASE,
                  }}
                >
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(56,189,248,0.14)",
                      border: "1px solid rgba(56,189,248,0.3)",
                    }}
                  >
                    <Check className="h-3.5 w-3.5 text-sky-400" strokeWidth={3} />
                  </div>
                  <span className="text-base font-medium text-white">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Image column (left side in RTL) ────────────────────── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          >
            {/* Outer accent frame */}
            <div className="relative">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
                style={{
                  boxShadow:
                    "0 24px 60px rgba(0,0,0,0.55), 0 0 40px rgba(56,189,248,0.08)",
                }}
              >
                {/* Placeholder photo – replace with real portrait of משה */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&w=900&q=80"
                  alt="עבודות אלומיניום מקצועיות"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />

                {/* Bottom darkening gradient – improves badge readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(5,10,15,0.55) 100%)",
                  }}
                />

                {/* Subtle architectural grid overlay */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `
                      linear-gradient(0deg,  transparent 96%, rgba(160,200,240,0.9) 96%),
                      linear-gradient(90deg, transparent 96%, rgba(160,200,240,0.9) 96%)
                    `,
                    backgroundSize: "70px 70px",
                  }}
                />
              </div>

              {/* Floating "30+" badge – sits on the bottom-start corner */}
              <motion.div
                className="absolute -bottom-5 start-5 rounded-2xl px-5 py-3"
                style={{
                  background: "rgba(8,18,32,0.92)",
                  border: "1px solid rgba(56,189,248,0.3)",
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow:
                    "0 12px 36px rgba(0,0,0,0.5), 0 0 24px rgba(56,189,248,0.18)",
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
              >
                <div className="text-3xl font-bold leading-none text-sky-400">
                  +30
                </div>
                <div className="mt-1 text-xs font-medium text-slate-300">
                  שנות ניסיון
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
