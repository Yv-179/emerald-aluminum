import { Phone } from "lucide-react";

/**
 * Floating click-to-call FAB.
 * Mobile only (lg:hidden) — desktop already has the header CTA visible at all times.
 * Sits at bottom-start (right side in RTL) inside the natural thumb zone.
 * Continuous emerald-green pulse ring draws attention without being noisy.
 */
export default function StickyCallButton() {
  return (
    <a
      href="tel:0505354933"
      aria-label="חייגו עכשיו - 050-535-4933"
      className="fixed bottom-5 start-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_24px_rgba(16,185,129,0.45),0_0_0_4px_rgba(16,185,129,0.12)] transition-transform duration-200 active:scale-95 lg:hidden"
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #34d399 0%, #10b981 55%, #059669 100%)",
      }}
    >
      {/* Outer ping ring – continuous attention pulse */}
      <span
        aria-hidden
        className="absolute inset-0 animate-ping rounded-full opacity-60"
        style={{ background: "rgba(16,185,129,0.55)", animationDuration: "1.8s" }}
      />

      {/* Static halo behind icon */}
      <span
        aria-hidden
        className="absolute inset-1 rounded-full"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      <Phone className="relative h-6 w-6" strokeWidth={2.4} fill="white" />
    </a>
  );
}
