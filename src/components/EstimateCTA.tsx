import { ArrowRight, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { BUSINESS_INFO } from '../data/siteData';

interface EstimateCTAProps {
  headline: string;
  subtext: string;
  buttonLabel: string;
  onRequestEstimate: () => void;
}

export function EstimateCTA({
  headline,
  subtext,
  buttonLabel,
  onRequestEstimate,
}: EstimateCTAProps) {
  return (
    <section className="bg-[#1E201D] text-[#FAF8F4]">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8B6A2]">
              Las Vegas, Nevada · Free Estimates
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#FAF8F4] sm:text-4xl lg:text-5xl">
              {headline}
            </h2>
            <p className="text-base leading-relaxed text-[#D4D1C7] sm:text-lg">
              {subtext}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
            <button
              type="button"
              onClick={onRequestEstimate}
              className="group inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#FAF8F4] px-7 py-3.5 text-sm font-semibold text-[#1E201D] transition-colors duration-200 hover:bg-[#EFECE4] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>{buttonLabel}</span>
              <ArrowRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#4D524B] px-6 py-3.5 text-sm font-semibold text-[#FAF8F4] transition-colors duration-200 hover:border-[#FAF8F4] whitespace-nowrap shrink-0 tabular-nums"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
