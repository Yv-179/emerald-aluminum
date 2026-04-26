import Link from "next/link";
import { Phone } from "lucide-react";

/**
 * Sticky top header with always-visible click-to-call CTA.
 * Brand sits at the start (right in RTL); phone CTA at the end (left in RTL).
 * Glassmorphism keeps it readable over any section background.
 */
export default function Header() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-40 border-b border-white/10"
      style={{
        background: "rgba(5, 10, 15, 0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">

        {/* Brand */}
        <Link href="/" className="flex items-baseline gap-2">
          <span className="text-base font-bold text-white sm:text-lg">
            אמרלד <span className="text-sky-400">אלומיניום</span>
          </span>
          <span className="hidden text-xs text-slate-400 sm:inline">
            • איכות ללא פשרות
          </span>
        </Link>

        {/* Click-to-call CTA */}
        <a
          href="tel:0505354933"
          aria-label="חייגו עכשיו 050-535-4933"
          className="group inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] sm:gap-2.5 sm:px-4"
          style={{
            background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
            boxShadow:
              "0 0 18px rgba(16,185,129,0.35), inset 0 1px 0 rgba(255,255,255,0.18)",
          }}
        >
          <Phone className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" strokeWidth={2.2} />
          {/* Compact label on mobile, full label on desktop */}
          <span className="hidden sm:inline">חייגו עכשיו:</span>
          <span dir="ltr" className="font-bold tracking-wide">050-535-4933</span>
        </a>
      </div>
    </header>
  );
}
