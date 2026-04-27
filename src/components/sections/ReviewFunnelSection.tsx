"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Send,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

/* ─── Configuration ──────────────────────────────────────────────
 * Replace the two placeholders below before going live.
 * Both can also be moved to env vars (NEXT_PUBLIC_*) if preferred.
 * ──────────────────────────────────────────────────────────────── */
const N8N_WEBHOOK_URL = "https://yarinv.app.n8n.cloud/webhook/efe375fc-c75d-43bf-95ee-573523b68890";
const GOOGLE_REVIEW_LINK = "YOUR_GOOGLE_REVIEW_LINK_HERE";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type SubmitStatus = "idle" | "submitting" | "submitted" | "error";

/* ════════════════════════════════════════════════════════════════
 * Smart Review Funnel
 * 1 ⭐–3 ⭐ → internal feedback form → POST to webhook (kept private)
 * 4 ⭐–5 ⭐ → public Google Review CTA (drives social proof)
 * ════════════════════════════════════════════════════════════════ */
export default function ReviewFunnelSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [form, setForm] = useState({ name: "", phone: "", feedback: "" });

  // Visual fill driven by hover preview, falling back to the locked rating.
  const display = hover || rating;

  const showNegativeForm = rating > 0 && rating <= 3 && status !== "submitted";
  const showPositiveCta = rating >= 4;
  const showThankYou = status === "submitted";

  const locked = status === "submitting" || status === "submitted";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          name: form.name,
          phone: form.phone,
          feedback: form.feedback,
          source: "אמרלד אלומיניום – דירוג",
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      setStatus("submitted");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("Review feedback submission failed:", err);
      setStatus("error");
    }
  }

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <section
      ref={ref}
      className="relative bg-[#050a0f] px-4 py-24 md:px-8"
    >
      {/* Top separator – visual continuity with neighbouring sections */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.18) 40%, rgba(56,189,248,0.18) 60%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-2xl">
        {/* ── Header ──────────────────────────────────────────── */}
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
            דירוג ומשוב
          </p>
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            איך הייתה החוויה איתנו?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-slate-400">
            המשוב שלכם עוזר לנו להעניק שירות טוב יותר
          </p>
        </motion.div>

        {/* ── Glass card ──────────────────────────────────────── */}
        <motion.div
          className="rounded-2xl border border-white/10 p-6 sm:p-10"
          style={{
            background: "rgba(8,18,32,0.6)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow:
              "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          {/* ── Star rating ─────────────────────────────────── */}
          {/* dir=ltr keeps the universal "1 left → 5 right" reading,
              which Israeli users instantly recognise (Google, Wolt, etc.) */}
          <div className="flex flex-col items-center gap-3">
            <div dir="ltr" className="flex gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5].map((n) => {
                const filled = n <= display;
                return (
                  <motion.button
                    key={n}
                    type="button"
                    aria-label={`${n} כוכבים`}
                    aria-pressed={rating === n}
                    onClick={() => !locked && setRating(n)}
                    onMouseEnter={() => !locked && setHover(n)}
                    onMouseLeave={() => !locked && setHover(0)}
                    onFocus={() => !locked && setHover(n)}
                    onBlur={() => !locked && setHover(0)}
                    disabled={locked}
                    whileHover={locked ? undefined : { scale: 1.12 }}
                    whileTap={locked ? undefined : { scale: 0.92 }}
                    className="rounded-full p-1 outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-emerald-400/60 disabled:cursor-default"
                  >
                    <Star
                      className={`h-9 w-9 transition-all duration-200 sm:h-10 sm:w-10 ${filled
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-600"
                        }`}
                      strokeWidth={1.4}
                      style={
                        filled
                          ? {
                            filter:
                              "drop-shadow(0 0 8px rgba(251,191,36,0.45))",
                          }
                          : undefined
                      }
                    />
                  </motion.button>
                );
              })}
            </div>

            {rating === 0 && (
              <p className="text-xs text-slate-500">
                בחרו מספר כוכבים כדי להתחיל
              </p>
            )}
          </div>

          {/* ── Reactive panel: form / Google CTA / thank-you ── */}
          <AnimatePresence mode="wait" initial={false}>
            {/* Final state – shown after a successful negative-feedback submit */}
            {showThankYou && (
              <motion.div
                key="thank-you"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-6 text-center"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    boxShadow: "0 0 24px rgba(16,185,129,0.28)",
                  }}
                >
                  <CheckCircle2
                    className="h-6 w-6 text-emerald-400"
                    strokeWidth={1.6}
                  />
                </div>
                <p className="text-base font-medium text-white">
                  תודה על המשוב, ניצור קשר בהקדם.
                </p>
              </motion.div>
            )}

            {/* 4-5 ⭐ → Google review CTA */}
            {!showThankYou && showPositiveCta && (
              <motion.div
                key="positive-cta"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8 flex flex-col items-center gap-5 text-center"
              >
                <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                  תודה רבה! נשמח מאוד אם תשתפו את החוויה שלכם גם בגוגל.
                </p>

                <motion.a
                  href={GOOGLE_REVIEW_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-bold text-white"
                  style={{
                    background:
                      "linear-gradient(135deg, #059669 0%, #10b981 60%, #34d399 100%)",
                    boxShadow:
                      "0 0 24px rgba(16,185,129,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow:
                      "0 0 36px rgba(16,185,129,0.6), inset 0 1px 0 rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  לדירוג בגוגל לחצו כאן
                  <ExternalLink
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5"
                    strokeWidth={2.2}
                  />
                </motion.a>
              </motion.div>
            )}

            {/* 1-3 ⭐ → internal feedback form */}
            {!showThankYou && showNegativeForm && (
              <motion.form
                key="negative-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="mt-8 space-y-7"
              >
                <FloatingInput
                  id="rf-name"
                  label="שם מלא"
                  value={form.name}
                  onChange={(v) => update("name", v)}
                  required
                  autoComplete="name"
                />
                <FloatingInput
                  id="rf-phone"
                  label="טלפון"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v)}
                  required
                />
                <FloatingTextarea
                  id="rf-feedback"
                  label="איך נוכל להשתפר?"
                  value={form.feedback}
                  onChange={(v) => update("feedback", v)}
                  required
                />

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    שליחת המשוב נכשלה. נא לנסות שוב או להתקשר אלינו ישירות.
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-bold text-white disabled:opacity-70"
                  style={{
                    background:
                      "linear-gradient(135deg, #059669 0%, #10b981 60%, #34d399 100%)",
                    boxShadow:
                      "0 0 24px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.16)",
                    minHeight: 56,
                  }}
                  whileHover={
                    status === "submitting"
                      ? undefined
                      : {
                        scale: 1.02,
                        boxShadow:
                          "0 0 36px rgba(16,185,129,0.5), inset 0 1px 0 rgba(255,255,255,0.18)",
                      }
                  }
                  whileTap={{ scale: 0.98 }}
                >
                  {status === "submitting" ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      שולח...
                    </>
                  ) : (
                    <>
                      <Send
                        className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1"
                        strokeWidth={1.8}
                      />
                      שלח משוב
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════
 * Floating-label input (private to this file)
 * Uses Tailwind's `peer` + `placeholder=" "` trick for label motion.
 * Emerald accent on focus to match the funnel's primary action colour.
 * ════════════════════════════════════════════════════════════════ */
function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  required,
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full bg-transparent pb-2.5 pt-6 text-base text-white placeholder-transparent focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-0 top-2 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:top-[22px] peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-400"
      >
        {label}
      </label>
      {/* Resting underline */}
      <div className="absolute bottom-0 start-0 end-0 h-px bg-white/15 transition-colors duration-200 peer-focus:bg-transparent" />
      {/* Focus underline – grows from start to end */}
      <div
        className="absolute bottom-0 start-0 h-px w-0 peer-focus:w-full"
        style={{
          background: "linear-gradient(to left, #059669, #10b981)",
          transition: "width 350ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 0 6px rgba(16,185,129,0.45)",
        }}
      />
    </div>
  );
}

/* ─── Floating-label textarea ────────────────────────────────── */
function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder=" "
        className="peer w-full resize-none bg-transparent pb-2.5 pt-6 text-base text-white placeholder-transparent focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-0 top-2 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:top-[22px] peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-emerald-400"
      >
        {label}
      </label>
      <div className="absolute bottom-0 start-0 end-0 h-px bg-white/15 transition-colors duration-200 peer-focus:bg-transparent" />
      <div
        className="absolute bottom-0 start-0 h-px w-0 peer-focus:w-full"
        style={{
          background: "linear-gradient(to left, #059669, #10b981)",
          transition: "width 350ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 0 6px rgba(16,185,129,0.45)",
        }}
      />
    </div>
  );
}
