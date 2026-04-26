"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Timing & easing ──────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── Gallery data ─────────────────────────────────────────────── */
/* Photos live in /public/gallery/ — see README there for filenames. */
const PROJECTS = [
  {
    src: "/gallery/01.jpg",
    alt: "חלון אלומיניום הזזה ארבע כנפיים עם תריס",
    label: "חלון הזזה 4 כנפיים",
  },
  {
    src: "/gallery/02.jpg",
    alt: "התקנת חלון פנורמי גדול בסלון",
    label: "חלון פנורמי בהתקנה",
  },
  {
    src: "/gallery/03.jpg",
    alt: "חלון הזזה דו-כנפי עם תריס בחדר שינה",
    label: "חלון חדר שינה",
  },
  {
    src: "/gallery/04.jpg",
    alt: "חלון רחב ארבע כנפיים עם תריס חשמלי",
    label: "חלון רחב עם תריס",
  },
  {
    src: "/gallery/05.jpg",
    alt: "חלונות אמבטיה עם זכוכית מט וברזים בגוון פליז",
    label: "חלונות אמבטיה",
  },
] as const;

export default function GallerySection() {
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
          העבודות שלנו
        </motion.p>

        <motion.h2
          className="text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
        >
          פרויקטים נבחרים
        </motion.h2>

        <motion.p
          className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-300"
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
        >
          מבחר מהעבודות האחרונות שלנו – איכות ודיוק בכל חלון
        </motion.p>

        <motion.div
          className="mx-auto mt-5 h-px w-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)",
          }}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6, ease: EASE }}
        />
      </div>

      {/* ── Image grid ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map(({ src, alt, label }, i) => (
            <motion.div
              key={label}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/10"
              style={{
                boxShadow:
                  "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.4 + i * 0.1,
                duration: 0.65,
                ease: EASE,
              }}
            >
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark gradient overlay – always visible, stronger on hover */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 30%, rgba(5,10,15,0.7) 100%)",
                }}
              />

              {/* Hover overlay – extra darkening + border glow */}
              <div className="absolute inset-0 bg-[#050a0f]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top-edge glow on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 10%, rgba(100,210,255,0.6) 50%, transparent 90%)",
                }}
              />

              {/* Label */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-sm font-bold text-white drop-shadow-md">
                  {label}
                </p>
              </div>

              {/* Subtle architectural grid overlay */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `
                    linear-gradient(0deg,  transparent 96%, rgba(160,200,240,0.9) 96%),
                    linear-gradient(90deg, transparent 96%, rgba(160,200,240,0.9) 96%)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
