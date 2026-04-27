"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  type PanInfo,
} from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

/* ─── Timing & easing ──────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── nGallery data ─────────────────────────────────────────────── */
const PROJECTS = [
    { src: "/ngallery/06.avif", label: "חלונות חזית של צימר" },
    { src: "/ngallery/02.avif", label: "חלון פנורמי בסלון" },
    { src: "/ngallery/03.avif", label: "סגירת מרפסת" },
  { src: "/ngallery/04.avif", label: "חדר עבודה אטום לרעשים" },
  { src: "/ngallery/05.avif", label: "חלונות אמבטיה" },
  { src: "/ngallery/01.avif", label: "חלון הזזה 4 כנפיים" },
  { src: "/ngallery/0x.avif", label: "עבודת אלומיניום" },
  { src: "/ngallery/20190210_134602.avif", label: "חלונות עם תריס חשמלי" },
  { src: "/ngallery/20190423_135052.avif", label: "חלונות ודלתות" },
  { src: "/ngallery/20191215_164244.avif", label: "עבודת אלומיניום בתהליך הרכבה" },
  { src: "/ngallery/20220803_122705.avif", label: "חלונות הזזה בסלון" },
  { src: "/ngallery/20241103_144300.avif", label: "חדר עבודה אטום לרעשים" },
  { src: "/ngallery/20250123_162701.avif", label: "ויטרינה לחזית של עסק" },
  { src: "/ngallery/20250408_140516.avif", label: "דלת אלומיניום עם זכוכית חלבית" },
  { src: "/ngallery/IMG-20180221-WA0003.avif", label: "ויטרינות יציאה לחצר" },
  { src: "/ngallery/IMG_20141109_162504.avif", label: "עבודת אלומיניום קלאסית" },
  { src: "/ngallery/IMG_20151022_133048.avif", label: "חלונות מעוצבים" },
  { src: "/ngallery/IMG_20170723_164045.avif", label: "חלונות אלומיניום" },
  { src: "/ngallery/IMG_20180522_132347.avif", label: "חלון גדול" },
  { src: "/ngallery/IMG_20180529_152537.avif", label: "פרויקט מגורים" },
  { src: "/ngallery/IMG_20180529_160829.avif", label: "התקנה מקצועית" },
  { src: "/ngallery/IMG_20181120_154010.avif", label: "חלונות ותריסים" },
  { src: "/ngallery/x.avif", label: "חלון הזזה עם 4 כנפיים" },
  { src: "/ngallery/xx.avif", label: "עבודה בהתאמה אישית" },
  { src: "/ngallery/xxx.avif", label: "תוצאה מושלמת" },
];

/* ─── Swipe threshold ──────────────────────────────────────────── */
const SWIPE_THRESHOLD = 50;

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const total = PROJECTS.length;

  /* ── Navigation helpers ──────────────────────────────────────── */
  const goTo = useCallback(
    (idx: number, dir?: number) => {
      const next = ((idx % total) + total) % total;
      setDirection(dir ?? (next > current ? 1 : -1));
      setCurrent(next);
    },
    [current, total]
  );

  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1, 1), [current, goTo]);

  /* ── Keyboard navigation ─────────────────────────────────────── */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  /* ── Drag handler ────────────────────────────────────────────── */
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      next();
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      prev();
    }
  };

  /* ── Slide animation variants ────────────────────────────────── */
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? -400 : 400,
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? 400 : -400,
      opacity: 0,
      scale: 0.92,
    }),
  };

  /* ── Visible dots (max 7, centered around current) ───────────── */
  const MAX_DOTS = 7;
  const dotStart = Math.max(0, Math.min(current - Math.floor(MAX_DOTS / 2), total - MAX_DOTS));
  const dotEnd = Math.min(total, dotStart + MAX_DOTS);
  const visibleDots = Array.from({ length: dotEnd - dotStart }, (_, i) => dotStart + i);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-[#050a0f] px-4 py-24 md:px-8 overflow-hidden"
      >
        {/* Subtle top separator */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.18) 40%, rgba(56,189,248,0.18) 60%, transparent 100%)",
          }}
        />

        {/* ── Section header ─────────────────────────────────────── */}
        <div className="mb-14 text-center">
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

        {/* ── Carousel ───────────────────────────────────────────── */}
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
        >
          {/* Main image area */}
          <div className="relative">
            {/* Image container */}
            <div
              className="relative mx-auto overflow-hidden rounded-2xl border border-white/10"
              style={{
                aspectRatio: "16/10",
                boxShadow:
                  "0 8px 60px rgba(0,0,0,0.5), 0 0 80px rgba(56,189,248,0.05), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={current}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PROJECTS[current].src}
                    alt={PROJECTS[current].label}
                    className="h-full w-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 50%, rgba(5,10,15,0.85) 100%)",
                    }}
                  />

                  {/* Label */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                    <motion.p
                      className="text-lg font-bold text-white drop-shadow-lg md:text-xl"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                    >
                      {PROJECTS[current].label}
                    </motion.p>
                    <motion.p
                      className="mt-1 text-sm text-slate-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                    >
                      {current + 1} / {total}
                    </motion.p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Zoom button */}
              <button
                onClick={() => setLightbox(current)}
                className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/70 backdrop-blur-sm transition-all hover:bg-black/60 hover:text-white"
                aria-label="הגדלת תמונה"
              >
                <ZoomIn size={18} />
              </button>

              {/* Architectural grid overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `
                    linear-gradient(0deg,  transparent 96%, rgba(160,200,240,0.9) 96%),
                    linear-gradient(90deg, transparent 96%, rgba(160,200,240,0.9) 96%)
                  `,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* ── Arrow buttons ──────────────────────────────────── */}
            <button
              onClick={prev}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0a1520]/80 text-white/70 shadow-xl backdrop-blur-md transition-all hover:border-sky-400/30 hover:bg-[#0a1520] hover:text-white hover:shadow-sky-400/10 md:h-14 md:w-14"
              aria-label="תמונה קודמת"
            >
              <ChevronRight size={22} />
            </button>
            <button
              onClick={next}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#0a1520]/80 text-white/70 shadow-xl backdrop-blur-md transition-all hover:border-sky-400/30 hover:bg-[#0a1520] hover:text-white hover:shadow-sky-400/10 md:h-14 md:w-14"
              aria-label="תמונה הבאה"
            >
              <ChevronLeft size={22} />
            </button>
          </div>

          {/* ── Dots indicator ───────────────────────────────────── */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {dotStart > 0 && (
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            )}
            {visibleDots.map((idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="group relative p-1"
                aria-label={`תמונה ${idx + 1}`}
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${idx === current
                      ? "h-2.5 w-2.5 bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                      : "h-2 w-2 bg-white/25 group-hover:bg-white/50"
                    }`}
                />
              </button>
            ))}
            {dotEnd < total && (
              <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
            )}
          </div>

          {/* ── Thumbnail strip ──────────────────────────────────── */}
          <div className="mt-6 overflow-hidden">
            <div className="flex justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {PROJECTS.map(({ src, label }, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`relative flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${idx === current
                      ? "ring-2 ring-sky-400 ring-offset-2 ring-offset-[#050a0f] opacity-100 scale-105"
                      : "opacity-40 hover:opacity-70 grayscale hover:grayscale-0"
                    }`}
                  style={{ width: 64, height: 48 }}
                  aria-label={label}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={label}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              aria-label="סגירה"
            >
              <X size={24} />
            </button>

            {/* Lightbox arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                const p = ((lightbox - 1) + total) % total;
                setLightbox(p);
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              aria-label="תמונה קודמת"
            >
              <ChevronRight size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const n = (lightbox + 1) % total;
                setLightbox(n);
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20"
              aria-label="תמונה הבאה"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Lightbox image */}
            <motion.div
              className="relative max-h-[85vh] max-w-[90vw]"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={PROJECTS[lightbox].src}
                alt={PROJECTS[lightbox].label}
                className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 rounded-b-xl bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-center text-lg font-bold text-white">
                  {PROJECTS[lightbox].label}
                </p>
                <p className="mt-1 text-center text-sm text-white/60">
                  {lightbox + 1} / {total}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
