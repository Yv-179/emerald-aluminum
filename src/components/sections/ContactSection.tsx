"use client";

import { useState, useRef, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  Mail,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

/* ─── Easing ─────────────────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = (delay: number) => ({
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: EASE } },
});

/* ─── Contact items ──────────────────────────────────────────────── */
const CONTACT_ITEMS = [
  {
    Icon: Phone,
    label: "התקשרו עכשיו",
    value: "050-535-4933",
    href: "tel:0505354933",
    iconBg: "rgba(56,130,210,0.12)",
    iconColor: "#38bdf8",
    glow: "rgba(56,189,248,0.18)",
    border: "rgba(56,189,248,0.18)",
  },
  {
    Icon: MessageCircle,
    label: "WhatsApp",
    value: "לחצו לשליחת הודעה מהירה",
    href: "https://wa.me/9720505354933",
    iconBg: "rgba(37,211,102,0.12)",
    iconColor: "#25D366",
    glow: "rgba(37,211,102,0.18)",
    border: "rgba(37,211,102,0.22)",
  },
  {
    Icon: Mail,
    label: "מייל",
    value: "moshev107@gmail.com",
    href: "mailto:moshev107@gmail.com",
    iconBg: "rgba(56,130,210,0.12)",
    iconColor: "#7dd3fc",
    glow: "rgba(56,189,248,0.12)",
    border: "rgba(56,189,248,0.14)",
  },
] as const;

const SERVICES = [
  "חלונות ותריסים (רגילים וחשמליים)",
  "שיפוץ ותיקון",
  "הרכבה מאפס",
  "אחר",
];

/* ─── Reusable floating-label input ─────────────────────────────── */
function FloatingInput({
  id,
  label,
  type = "text",
  inputMode,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
}) {
  return (
    <div className="relative">
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder=" "
        className="peer w-full bg-transparent pb-2.5 pt-6 text-base text-white placeholder-transparent focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-0 top-2 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:top-[22px] peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-400"
      >
        {label}
      </label>
      {/* Resting underline */}
      <div className="absolute bottom-0 start-0 end-0 h-px bg-white/15 transition-colors duration-200 peer-focus:bg-transparent" />
      {/* Animated focus line – grows from start to end */}
      <div
        className="absolute bottom-0 start-0 h-px w-0 peer-focus:w-full"
        style={{
          background: "linear-gradient(to left, #3b82f6, #38bdf8)",
          transition: "width 350ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 0 6px rgba(56,189,248,0.5)",
        }}
      />
    </div>
  );
}

/* ─── Floating-label textarea ────────────────────────────────────── */
function FloatingTextarea({ id, label }: { id: string; label: string }) {
  return (
    <div className="relative">
      <textarea
        id={id}
        name={id}
        rows={4}
        placeholder=" "
        className="peer w-full resize-none bg-transparent pb-2.5 pt-6 text-base text-white placeholder-transparent focus:outline-none"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute start-0 top-2 text-xs text-slate-500 transition-all duration-200 peer-placeholder-shown:top-[22px] peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-400"
      >
        {label}
      </label>
      <div className="absolute bottom-0 start-0 end-0 h-px bg-white/15 transition-colors duration-200 peer-focus:bg-transparent" />
      <div
        className="absolute bottom-0 start-0 h-px w-0 peer-focus:w-full"
        style={{
          background: "linear-gradient(to left, #3b82f6, #38bdf8)",
          transition: "width 350ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 0 6px rgba(56,189,248,0.5)",
        }}
      />
    </div>
  );
}

/* ─── Floating-label select ─────────────────────────────────────── */
function ServiceSelect() {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <select
        id="service"
        name="service"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="peer w-full cursor-pointer appearance-none bg-transparent pb-2.5 pt-6 text-base text-white focus:outline-none"
      >
        <option value="" disabled hidden />
        {SERVICES.map((s) => (
          <option key={s} value={s} className="bg-[#0c1824] text-white">
            {s}
          </option>
        ))}
      </select>

      <label
        htmlFor="service"
        className={`pointer-events-none absolute start-0 transition-all duration-200 ${value
            ? "top-2 text-xs text-slate-500"
            : "top-[22px] text-base text-slate-500"
          } peer-focus:top-2 peer-focus:text-xs peer-focus:text-sky-400`}
      >
        שירות נדרש
      </label>

      <ChevronDown className="pointer-events-none absolute end-0 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

      <div className="absolute bottom-0 start-0 end-0 h-px bg-white/15 transition-colors duration-200 peer-focus:bg-transparent" />
      <div
        className="absolute bottom-0 start-0 h-px w-0 peer-focus:w-full"
        style={{
          background: "linear-gradient(to left, #3b82f6, #38bdf8)",
          transition: "width 350ms cubic-bezier(0.22,1,0.36,1)",
          boxShadow: "0 0 6px rgba(56,189,248,0.5)",
        }}
      />
    </div>
  );
}

/* ─── Main section ──────────────────────────────────────────────── */
export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1400);
  }

  return (
    <section id="contact" className="relative bg-[#050a0f] px-4 py-24 md:px-8" ref={ref}>

      {/* Subtle top separator */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56,189,248,0.25) 40%, rgba(56,189,248,0.25) 60%, transparent 100%)",
        }}
      />

      <div className="mx-auto max-w-5xl">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <motion.p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400"
            variants={fadeUp(0)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            נשמח לשמוע מכם
          </motion.p>
          <motion.h2
            className="text-3xl font-bold text-white md:text-4xl"
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            צרו קשר
          </motion.h2>
          <motion.div
            className="mx-auto mt-5 h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(56,189,248,0.7), transparent)",
            }}
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.6, ease: EASE }}
          />
        </div>

        {/* ── Two-column grid ─────────────────────────────────────── */}
        {/*   RTL: first child → right column, second → left column  */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── Contact info ──────────────────────────────────────── */}
          <motion.div
            className="flex flex-col justify-center gap-5"
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p className="mb-2 text-slate-400 leading-relaxed">
              מוזמנים לפנות אלינו בכל שאלה, לקבל ייעוץ ראשוני או לתאם ביקור
              ללא עלות בבית הלקוח.
            </p>

            {CONTACT_ITEMS.map(
              ({ Icon, label, value, href, iconBg, iconColor, glow, border }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-xl p-4 transition-all duration-200 active:scale-[0.98]"
                  style={{
                    background: "rgba(10,20,35,0.55)",
                    border: `1px solid ${border}`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                  variants={fadeUp(0.3 + i * 0.1)}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{
                    y: -3,
                    boxShadow: `0 8px 32px ${glow}`,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-shadow duration-200 group-hover:shadow-lg"
                    style={{ background: iconBg }}
                  >
                    <Icon
                      className="h-6 w-6"
                      style={{ color: iconColor }}
                      strokeWidth={1.5}
                    />
                  </div>
                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                    <p className="truncate text-base font-medium text-white">
                      {value}
                    </p>
                  </div>
                </motion.a>
              )
            )}
          </motion.div>

          {/* ── Form ─────────────────────────────────────────────── */}
          <motion.div
            variants={fadeUp(0.25)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div
              className="rounded-2xl border border-white/10 p-6 sm:p-8"
              style={{
                background: "rgba(8,18,32,0.6)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                boxShadow:
                  "0 8px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {status === "sent" ? (
                /* ── Success state ─────────────────────────────────── */
                <motion.div
                  className="flex flex-col items-center justify-center gap-4 py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-full"
                    style={{
                      background: "rgba(56,189,248,0.12)",
                      boxShadow: "0 0 32px rgba(56,189,248,0.25)",
                    }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-sky-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white">ההודעה נשלחה!</h3>
                  <p className="text-slate-400">
                    נחזור אליכם בהקדם האפשרי. תודה שפניתם אלינו.
                  </p>
                </motion.div>
              ) : (
                /* ── Form fields ───────────────────────────────────── */
                <form onSubmit={handleSubmit} className="space-y-7" noValidate>
                  <FloatingInput id="name" label="שם מלא" autoComplete="name" />
                  <FloatingInput
                    id="phone"
                    label="טלפון"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                  />
                  <ServiceSelect />
                  <FloatingTextarea id="message" label="הודעה (אופציונלי)" />

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-6 py-4 text-base font-bold text-white disabled:opacity-70"
                    style={{
                      background:
                        "linear-gradient(135deg, #1d4ed8 0%, #0369a1 60%, #0891b2 100%)",
                      boxShadow:
                        "0 0 24px rgba(56,189,248,0.3), 0 0 60px rgba(56,189,248,0.1), inset 0 1px 0 rgba(255,255,255,0.12)",
                      minHeight: 56,
                    }}
                    whileHover={
                      status !== "sending"
                        ? {
                          scale: 1.02,
                          boxShadow:
                            "0 0 36px rgba(56,189,248,0.5), 0 0 80px rgba(56,189,248,0.2)",
                        }
                        : {}
                    }
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "sending" ? (
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
                        שלח פנייה
                      </>
                    )}

                    {/* Shimmer sweep */}
                    <span
                      className="pointer-events-none absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-700 group-hover:translate-x-full"
                      aria-hidden
                    />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
