import { ArrowRight, ArrowUpRight, Instagram, MapPin, Phone } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { EstimateCTA } from '../components/EstimateCTA';
import { LightboxModal } from '../components/LightboxModal';
import { SafeImage } from '../components/SafeImage';
import {
  BUSINESS_INFO,
  PORTFOLIO_ITEMS,
  RoutePath,
  SERVICES,
  ServiceOption,
  WHY_CHOOSE_ITEMS,
} from '../data/siteData';

interface HomePageProps {
  onNavigate: (path: RoutePath, hash?: string, prefillService?: ServiceOption) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const showcaseItems = PORTFOLIO_ITEMS.slice(0, 4);

  return (
    <div>
      {/* 1. Cinematic Hero Section */}
      <section
        ref={heroRef}
        className="relative flex min-h-[88svh] items-end overflow-hidden bg-[#1E201D] pt-24 pb-16 sm:pb-24"
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 -top-6 -bottom-6"
        >
          <img
            src="/src/assets/images/hero_desert_patio_1795439096317.jpg"
            alt="Las Vegas residential backyard outdoor living space with custom sandstone pavers and artificial turf"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#141613]/90 via-[#141613]/45 to-[#141613]/35"
          />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-6"
          >
            <div className="flex items-center gap-4">
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Skywall Landscape LLC crest logo"
                referrerPolicy="no-referrer"
                className="h-22 w-22 sm:h-28 sm:w-28 rounded-full object-cover border-2 border-[#C9A24D]/80 shadow-xl shrink-0"
              />
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E5E0D5]">
                <MapPin className="h-3.5 w-3.5 text-[#A8B6A2] shrink-0" aria-hidden="true" />
                <span>Serving Homeowners Across Las Vegas, Nevada</span>
              </div>
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#FAF8F4] sm:text-5xl lg:text-[3.75rem]">
              Transform Your Outdoors. Elevate the Way You Live.
            </h1>

            <p className="max-w-2xl text-base leading-relaxed text-[#E5E0D5] sm:text-lg">
              Beautiful outdoor spaces start with thoughtful landscaping. From custom pavers
              and artificial turf to irrigation and complete yard cleanups, Skywall Landscape
              brings your outdoor vision to life across Las Vegas.
            </p>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => onNavigate('/contact', 'estimate-form')}
                className="group inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#FAF8F4] px-7 py-3.5 text-sm font-semibold text-[#1E201D] transition-colors duration-200 hover:bg-[#EFECE4] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Get a Free Estimate</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="inline-flex min-h-[48px] items-center justify-center border border-white/40 bg-black/25 px-7 py-3.5 text-sm font-semibold text-[#FAF8F4] backdrop-blur-sm transition-colors duration-200 hover:border-white hover:bg-black/40 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Explore Our Projects
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Brand Introduction */}
      <section className="border-b border-[#DCD6C8] bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3F523B]">
                Desert Outdoor Living
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1E201D] sm:text-4xl">
                Your Outdoor Space Deserves More.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-5 text-base leading-relaxed text-[#5B5D56] sm:text-lg"
            >
              <p>
                In Las Vegas, your front and back yards are an extension of your home.
                Thoughtfully planned landscaping turns bare dirt, uneven stone, or weathered
                concrete into clean, welcoming spaces where family and guests naturally gather.
              </p>
              <p>
                Whether you are upgrading a patio with interlocking pavers, replacing thirsty
                lawn with artificial turf, restoring an overgrown lot, or refining desert
                irrigation lines, Skywall Landscape LLC focuses on clean lines, durable
                surfaces, and everyday usability.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-6 text-sm font-semibold text-[#1E201D]">
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services');
                  }}
                  className="inline-flex items-center gap-1.5 text-[#3F523B] hover:text-[#1E201D] transition-colors"
                >
                  <span>Explore All Services</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-1.5 text-[#1E201D] hover:text-[#3F523B] transition-colors tabular-nums"
                >
                  <Phone className="h-4 w-4 text-[#3F523B]" aria-hidden="true" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Featured Services (01 - 04) */}
      <section className="bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-14 flex flex-col justify-between gap-4 border-b border-[#DCD6C8] pb-8 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3F523B]">
                Core Services
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1E201D] sm:text-4xl">
                Built for Las Vegas Homes.
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/services')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3F523B] hover:text-[#1E201D] transition-colors self-start sm:self-auto cursor-pointer"
            >
              <span>View Detailed Service Guide</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-20">
            {SERVICES.map((service, index) => {
              const isReversed = index % 2 === 1;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
                >
                  <div
                    className={`lg:col-span-6 ${
                      isReversed ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <a
                      href={`/services#${service.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate('/services', service.id);
                      }}
                      className="group block overflow-hidden border border-[#DCD6C8]"
                    >
                      <SafeImage
                        src={service.image}
                        alt={service.imageAlt}
                        aspectClass="aspect-[4/3]"
                        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </a>
                  </div>

                  <div
                    className={`lg:col-span-6 space-y-5 ${
                      isReversed ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5D56] tabular-nums">
                      <span className="text-[#B85D3B]">{service.number}</span>
                      <span aria-hidden="true">/</span>
                      <span>Las Vegas Residential Service</span>
                    </div>

                    <h3 className="font-display text-2xl font-semibold tracking-tight text-[#1E201D] sm:text-3xl">
                      {service.number}. {service.title}
                    </h3>

                    <p className="text-base leading-relaxed text-[#5B5D56]">
                      {service.summary}
                    </p>

                    <ul className="grid grid-cols-1 gap-2 border-t border-[#DCD6C8] pt-4 text-sm text-[#1E201D] sm:grid-cols-2">
                      {service.applications.slice(0, 4).map((app) => (
                        <li key={app} className="flex items-baseline gap-2">
                          <span className="text-[#3F523B]" aria-hidden="true">
                            —
                          </span>
                          <span>{app}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap items-center gap-5 pt-2">
                      <button
                        type="button"
                        onClick={() =>
                          onNavigate('/contact', 'estimate-form', service.estimateOption)
                        }
                        className="inline-flex min-h-[44px] items-center justify-center bg-[#3F523B] px-6 py-3 text-sm font-semibold text-[#FAF8F4] transition-colors duration-200 hover:bg-[#32422E] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {service.ctaLabel}
                      </button>

                      <a
                        href={`/services#${service.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate('/services', service.id);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E201D] hover:text-[#3F523B] transition-colors"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Editorial Project Showcase */}
      <section className="border-y border-[#DCD6C8] bg-[#EFECE4]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3F523B]">
                Selected Outdoor Transformations
              </p>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1E201D] sm:text-4xl">
                Craftsmanship Across Every Corner of the Yard.
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigate('/projects')}
                className="inline-flex min-h-[44px] items-center gap-2 border border-[#1E201D] px-5 py-2.5 text-sm font-semibold text-[#1E201D] transition-colors hover:bg-[#1E201D] hover:text-[#FAF8F4] cursor-pointer"
              >
                <span>Explore Full Portfolio</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {showcaseItems.map((item, idx) => {
              const colSpan =
                idx === 0
                  ? 'md:col-span-7'
                  : idx === 1
                    ? 'md:col-span-5'
                    : idx === 2
                      ? 'md:col-span-5'
                      : 'md:col-span-7';
              const aspectClass =
                item.aspectRatio === '16:9'
                  ? 'aspect-[16/9]'
                  : item.aspectRatio === '3:4'
                    ? 'aspect-[3/4] md:aspect-[4/3]'
                    : 'aspect-[4/3]';

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  className={`${colSpan} flex flex-col`}
                >
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group block w-full text-left border border-[#DCD6C8] bg-[#FAF8F4] transition-colors hover:border-[#3F523B] cursor-pointer"
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.imageAlt}
                      aspectClass={aspectClass}
                      imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="p-5 sm:p-6 space-y-1.5">
                      <p className="text-xs font-medium text-[#5B5D56]">
                        {item.serviceTag}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-[#1E201D] group-hover:text-[#3F523B] transition-colors">
                        {item.title}
                      </h3>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Skywall Landscape + Verified Social Trust (Yelp & Instagram) */}
      <section className="bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3F523B]">
                  Why Choose Skywall Landscape
                </p>
                <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1E201D] sm:text-4xl">
                  Thoughtful Work, Straightforward Service.
                </h2>
                <p className="text-base leading-relaxed text-[#5B5D56]">
                  Homeowners across Las Vegas turn to Skywall Landscape LLC for practical
                  outdoor solutions, clear communication, and clean workmanship.
                </p>
              </div>

              {/* Verified Reviews & Recent Instagram Feed */}
              <div className="border border-[#DCD6C8] bg-[#EFECE4] p-6 space-y-4">
                <h3 className="font-display text-base font-semibold text-[#1E201D]">
                  Verified Reviews & Recent Projects
                </h3>
                <p className="text-sm leading-relaxed text-[#5B5D56]">
                  Read verified homeowner reviews on Yelp or explore recent completed jobs
                  directly on our Instagram feed.
                </p>
                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href={BUSINESS_INFO.yelpUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-between border border-[#1E201D] bg-[#FAF8F4] px-4 py-2.5 text-sm font-semibold text-[#1E201D] transition-colors hover:bg-[#1E201D] hover:text-[#FAF8F4]"
                  >
                    <span>Read Customer Reviews on Yelp</span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                  <a
                    href={BUSINESS_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center justify-between border border-[#DCD6C8] bg-[#FAF8F4] px-4 py-2.5 text-sm font-semibold text-[#1E201D] transition-colors hover:border-[#3F523B] hover:text-[#3F523B]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Instagram className="h-4 w-4 text-[#3F523B]" aria-hidden="true" />
                      <span>{BUSINESS_INFO.instagramHandle}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2">
                {WHY_CHOOSE_ITEMS.map((item) => (
                  <div
                    key={item.number}
                    className="border-t border-[#DCD6C8] pt-5 space-y-2"
                  >
                    <span className="text-xs font-semibold tracking-wider text-[#B85D3B] tabular-nums">
                      {item.number}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-[#1E201D]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#5B5D56]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Homepage CTA */}
      <EstimateCTA
        headline="Ready to Transform Your Yard?"
        subtext="Tell us about your outdoor project and request your free estimate."
        buttonLabel="Get Your Free Estimate"
        onRequestEstimate={() => onNavigate('/contact', 'estimate-form')}
      />

      <LightboxModal
        items={showcaseItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(next) => setLightboxIndex(next)}
      />
    </div>
  );
}
