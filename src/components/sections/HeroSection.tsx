"use client";

import { motion } from "framer-motion";
import { PhoneCall } from "lucide-react";

/* ─── Timing constants ──────────────────────────────────────────── */
const SHUTTER_DELAY = 0.4;
const SHUTTER_DURATION = 1.5; // per spec — shutter opens within 1.5s
const CONTENT_START = SHUTTER_DELAY + SHUTTER_DURATION * 0.85; // small delay after shutter is mostly open

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">

      {/* ── Background image placeholder (replace src with real photo) ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
        alt="חלון אלומיניום מעוצב"
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />

      {/* Subtle glassmorphism blur over the image – improves readability */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(160deg, rgba(5,10,15,0.65) 0%, rgba(8,18,30,0.55) 50%, rgba(5,10,15,0.75) 100%)",
        }}
      />

      {/* ── Architectural overlay (frame geometry + sheen) ─────────── */}
      <div className="absolute inset-0">
        {/* Aluminum grid overlay – simulates window-frame geometry */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `
              linear-gradient(0deg,   transparent 97%, rgba(160,200,240,0.9) 97%),
              linear-gradient(90deg,  transparent 97%, rgba(160,200,240,0.9) 97%)
            `,
            backgroundSize: "90px 90px",
          }}
        />

        {/* Central radial glow – light through glass */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(56,130,210,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Diagonal reflection streak – metallic sheen */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(200,230,255,0.8) 48%, transparent 55%)",
          }}
        />
      </div>

      {/* ── Electric Roller Shutter ──────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-30"
        initial={{ y: "0%" }}
        animate={{ y: "-100%" }}
        transition={{
          delay: SHUTTER_DELAY,
          duration: SHUTTER_DURATION,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        {/* Shutter slat texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg,
              #0a0a0a  0px,
              #121212  5px,
              #1c1c1c  6px,
              #141414 10px,
              #0a0a0a 16px
            )`,
          }}
        />

        {/* Vertical metallic sheen down the centre */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, transparent 35%, rgba(255,255,255,0.025) 50%, transparent 65%)",
          }}
        />

        {/* Electric glow line – bottom edge of the shutter */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 3 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.7, 1] }}
          transition={{
            delay: SHUTTER_DELAY - 0.15,
            duration: 0.4,
            times: [0, 0.2, 0.5, 1],
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(80,190,255,0.6) 20%, rgba(180,240,255,1) 50%, rgba(80,190,255,0.6) 80%, transparent 100%)",
              boxShadow:
                "0 0 18px 4px rgba(100,210,255,0.55), 0 0 50px 10px rgba(100,210,255,0.2)",
            }}
          />
        </motion.div>

        {/* Faint scan-line sweep that races ahead of the shutter edge */}
        <motion.div
          className="absolute left-0 right-0 h-24 pointer-events-none"
          style={{
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(60,170,255,0.06) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── Glassmorphism content card ───────────────────────────── */}
      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <motion.div
          className="w-full max-w-2xl rounded-2xl border border-white/10 px-8 py-12 text-center"
          style={{
            background: "rgba(8, 18, 32, 0.55)",
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            boxShadow:
              "0 8px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: CONTENT_START, duration: 0.75, ease: EASE }}
        >
          {/* Headline */}
          <motion.h1
            className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: CONTENT_START + 0.1, duration: 0.75, ease: EASE }}
          >
            אמרלד אלומיניום באיכות ללא פשרות
            <span
              className="mt-2 block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #38bdf8 0%, #7dd3fc 50%, #bae6fd 100%)",
              }}
            >
              מהתכנון ועד ההתקנה
            </span>
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="mx-auto mb-6 h-px w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)",
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: CONTENT_START + 0.25, duration: 0.6, ease: EASE }}
          />

          {/* Sub-headline */}
          <motion.p
            className="mb-10 text-base leading-relaxed text-slate-300 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: CONTENT_START + 0.35, duration: 0.7, ease: EASE }}
          >
            מומחים בייצור והרכבת חלונות ותריסים (רגילים וחשמליים).
            <br className="hidden sm:block" />{" "}
            הצעת מחיר וייעוץ בבית הלקוח &ndash; ללא עלות!
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-base font-bold text-white transition-shadow duration-300"
            style={{
              background:
                "linear-gradient(135deg, #1d4ed8 0%, #0369a1 60%, #0891b2 100%)",
              boxShadow:
                "0 0 24px rgba(56,189,248,0.35), 0 0 60px rgba(56,189,248,0.12), inset 0 1px 0 rgba(255,255,255,0.12)",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: CONTENT_START + 0.5, duration: 0.6, ease: EASE }}
            whileHover={{
              scale: 1.05,
              boxShadow:
                "0 0 36px rgba(56,189,248,0.55), 0 0 80px rgba(56,189,248,0.22), inset 0 1px 0 rgba(255,255,255,0.15)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <PhoneCall className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
            לקבלת הצעת מחיר חינם
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
