import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { EstimateCTA } from '../components/EstimateCTA';
import { SafeImage } from '../components/SafeImage';
import { PROCESS_STEPS, RoutePath, SERVICES, ServiceOption } from '../data/siteData';

interface ServicesPageProps {
  onNavigate: (path: RoutePath, hash?: string, prefillService?: ServiceOption) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="border-b border-[#DCD6C8] bg-[#EFECE4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F523B]">
              Landscaping Services · Las Vegas, Nevada
            </p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-[#1E201D] sm:text-5xl">
              Outdoor Craftsmanship Built for Desert Living.
            </h1>
            <p className="text-base leading-relaxed text-[#5B5D56] sm:text-lg">
              From custom stone pavers and low-maintenance artificial turf to complete yard
              cleanups and targeted irrigation, every service is tailored to your property.
            </p>
          </div>

          {/* Quick Jump Strip */}
          <div className="mt-10 flex flex-wrap gap-2 border-t border-[#DCD6C8] pt-6">
            {SERVICES.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => scrollToService(service.id)}
                className="inline-flex min-h-[40px] items-center gap-2 border border-[#DCD6C8] bg-[#FAF8F4] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#1E201D] transition-colors hover:border-[#3F523B] hover:text-[#3F523B] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="text-[#B85D3B] tabular-nums">{service.number}</span>
                <span>{service.shortTitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Service Sections */}
      <section className="bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 space-y-24">
          {SERVICES.map((service, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <motion.article
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="scroll-mt-24 grid grid-cols-1 gap-10 border-b border-[#DCD6C8] pb-20 last:border-b-0 last:pb-0 lg:grid-cols-12 lg:items-center lg:gap-14"
              >
                <div
                  className={`lg:col-span-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
                >
                  <div className="border border-[#DCD6C8] bg-[#EFECE4]">
                    <SafeImage
                      src={service.image}
                      alt={service.imageAlt}
                      aspectClass="aspect-[4/3]"
                    />
                  </div>
                </div>

                <div
                  className={`lg:col-span-6 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B85D3B] tabular-nums">
                    Service {service.number}
                  </div>

                  <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1E201D] sm:text-4xl">
                    {service.title}
                  </h2>

                  <p className="text-base leading-relaxed text-[#1E201D] font-medium">
                    {service.summary}
                  </p>

                  <p className="text-sm leading-relaxed text-[#5B5D56] sm:text-base">
                    {service.detailCopy}
                  </p>

                  <div className="border border-[#DCD6C8] bg-[#EFECE4] p-4 text-sm leading-relaxed text-[#3F413B]">
                    {service.climateNote}
                  </div>

                  <div className="space-y-3 pt-1">
                    <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#5B5D56]">
                      Common Applications
                    </h3>
                    <ul className="grid grid-cols-1 gap-2.5 text-sm text-[#1E201D] sm:grid-cols-2">
                      {service.applications.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <Check
                            className="mt-0.5 h-4 w-4 shrink-0 text-[#3F523B]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() =>
                        onNavigate('/contact', 'estimate-form', service.estimateOption)
                      }
                      className="group inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#3F523B] px-6 py-3 text-sm font-semibold text-[#FAF8F4] transition-colors duration-200 hover:bg-[#32422E] whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>{service.ctaLabel}</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Our Process (Proposed Customer Journey) */}
      <section className="border-t border-[#DCD6C8] bg-[#EFECE4]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl space-y-3 mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3F523B]">
              Our Process
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1E201D] sm:text-4xl">
              From First Inquiry to a Finished Yard.
            </h2>
            <p className="text-base leading-relaxed text-[#5B5D56]">
              A clear three-step journey designed to make planning your landscaping project
              straightforward.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="border border-[#DCD6C8] bg-[#FAF8F4] p-7 space-y-4"
              >
                <span className="inline-block font-display text-2xl font-semibold text-[#B85D3B] tabular-nums">
                  {step.step}
                </span>
                <h3 className="font-display text-xl font-semibold text-[#1E201D]">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#5B5D56]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EstimateCTA
        headline="Request Your Free Landscaping Estimate."
        subtext="Have pavers, artificial turf, cleanup, or irrigation work in mind for your Las Vegas property? Let’s talk through your goals."
        buttonLabel="Get a Free Estimate"
        onRequestEstimate={() => onNavigate('/contact', 'estimate-form')}
      />
    </div>
  );
}
