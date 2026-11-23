import { ArrowUpRight, Expand, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { EstimateCTA } from '../components/EstimateCTA';
import { LightboxModal } from '../components/LightboxModal';
import { SafeImage } from '../components/SafeImage';
import {
  BUSINESS_INFO,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_ITEMS,
  PortfolioCategory,
  RoutePath,
  ServiceOption,
} from '../lib/siteData';

interface ProjectsPageProps {
  onNavigate: (path: RoutePath, hash?: string, prefillService?: ServiceOption) => void;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<PortfolioCategory>('All Work');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All Work') {
      return PORTFOLIO_ITEMS;
    }
    return PORTFOLIO_ITEMS.filter((item) => {
      if (selectedCategory === 'Outdoor Landscaping') {
        return (
          item.category === 'Outdoor Landscaping' ||
          item.category === 'Yard Transformations'
        );
      }
      return item.category === selectedCategory;
    });
  }, [selectedCategory]);

  return (
    <div className="pt-16">
      {/* Portfolio Header */}
      <section className="border-b border-[#DCD6C8] bg-[#EFECE4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#3F523B]">
                Our Projects · Las Vegas, Nevada
              </p>
              <h1 className="font-display text-4xl font-semibold tracking-tight text-[#1E201D] sm:text-5xl">
                Outdoor Spaces Shaped by Detail.
              </h1>
              <p className="text-base leading-relaxed text-[#5B5D56] sm:text-lg">
                Explore paver installations, artificial turf lawns, desert yard cleanups,
                and drip irrigation setups across residential outdoor spaces. Select any
                frame to view full size.
              </p>
            </div>

            <a
              href={BUSINESS_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 border border-[#1E201D] bg-[#FAF8F4] px-5 py-3 text-sm font-semibold text-[#1E201D] transition-colors hover:bg-[#1E201D] hover:text-[#FAF8F4] whitespace-nowrap shrink-0 self-start lg:self-auto"
            >
              <Instagram className="h-4 w-4" aria-hidden="true" />
              <span>View Feed on Instagram ({BUSINESS_INFO.instagramHandle})</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mt-10 flex flex-wrap gap-2 border-t border-[#DCD6C8] pt-6"
          >
            {PORTFOLIO_CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setSelectedCategory(category);
                    setLightboxIndex(null);
                  }}
                  className={`min-h-[40px] px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#3F523B] text-[#FAF8F4]'
                      : 'border border-[#DCD6C8] bg-[#FAF8F4] text-[#5B5D56] hover:border-[#3F523B] hover:text-[#1E201D]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Editorial Asymmetric Portfolio Grid */}
      <section className="bg-[#FAF8F4]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          {filteredItems.length === 0 ? (
            <div className="border border-[#DCD6C8] bg-[#EFECE4] p-12 text-center space-y-3">
              <p className="font-display text-lg font-semibold text-[#1E201D]">
                No items in this view yet.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All Work')}
                className="inline-flex min-h-[44px] items-center bg-[#3F523B] px-5 py-2.5 text-sm font-semibold text-[#FAF8F4] cursor-pointer"
              >
                Show All Work
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
              {filteredItems.map((item, idx) => {
                const spanClass =
                  item.aspectRatio === '16:9'
                    ? 'md:col-span-8'
                    : item.aspectRatio === '3:4'
                      ? 'md:col-span-4'
                      : 'md:col-span-6';

                const aspectClass =
                  item.aspectRatio === '16:9'
                    ? 'aspect-[16/9]'
                    : item.aspectRatio === '3:4'
                      ? 'aspect-[3/4]'
                      : 'aspect-[4/3]';

                return (
                  <motion.article
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    className={`${spanClass} flex flex-col border border-[#DCD6C8] bg-white`}
                  >
                    <button
                      type="button"
                      onClick={() => setLightboxIndex(idx)}
                      className="group relative block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3F523B]"
                      aria-label={`View full size: ${item.title}`}
                    >
                      <SafeImage
                        src={item.image}
                        alt={item.imageAlt}
                        aspectClass={aspectClass}
                        imgClassName="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                      <span className="absolute right-3 bottom-3 inline-flex h-10 w-10 items-center justify-center bg-[#1E201D]/80 text-[#FAF8F4] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <Expand className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </button>

                    <div className="flex flex-1 flex-col justify-between gap-2 p-6">
                      <div className="space-y-1.5">
                        <p className="text-xs font-medium text-[#5B5D56]">
                          {item.serviceTag}
                        </p>
                        <h2 className="font-display text-xl font-semibold text-[#1E201D]">
                          {item.title}
                        </h2>
                        <p className="text-sm leading-relaxed text-[#5B5D56]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          )}

          {/* Instagram Archive Callout */}
          <div className="mt-16 border border-[#DCD6C8] bg-[#EFECE4] p-8 sm:p-10">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-2xl space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#3F523B]">
                  Ongoing Project Archive
                </p>
                <h2 className="font-display text-2xl font-semibold text-[#1E201D]">
                  Follow Recent Las Vegas Installations on Instagram
                </h2>
                <p className="text-sm leading-relaxed text-[#5B5D56] sm:text-base">
                  See ongoing paver installations, synthetic turf projects, yard cleanups,
                  and outdoor updates directly on Skywall Landscape’s Instagram account.
                </p>
              </div>
              <a
                href={BUSINESS_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-[#1E201D] px-6 py-3 text-sm font-semibold text-[#FAF8F4] transition-colors hover:bg-[#3F523B] whitespace-nowrap shrink-0"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                <span>Open @skywall_landscape_llc</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <EstimateCTA
        headline="Let’s Create Something Beautiful Outside."
        subtext="Whether you're planning a new paver installation, artificial turf, or a complete yard refresh, let's discuss your next project."
        buttonLabel="Get a Free Estimate"
        onRequestEstimate={() => onNavigate('/contact', 'estimate-form')}
      />

      <LightboxModal
        items={filteredItems}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={(next) => setLightboxIndex(next)}
      />
    </div>
  );
}
