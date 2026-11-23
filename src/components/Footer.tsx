import { ArrowUpRight, Instagram, MapPin, MessageSquare, Phone } from 'lucide-react';
import { BUSINESS_INFO, RoutePath, SERVICES } from '../lib/siteData';

interface FooterProps {
  onNavigate: (path: RoutePath, hash?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-[#DCD6C8] bg-[#EFECE4] text-[#1E201D]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
              className="inline-flex items-center gap-4 font-display text-xl font-semibold tracking-tight text-[#1E201D]"
            >
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Skywall Landscape LLC logo"
                referrerPolicy="no-referrer"
                className="h-18 w-18 rounded-full object-cover border-2 border-[#C9A24D]/70 shrink-0"
              />
              <span>{BUSINESS_INFO.name}</span>
            </a>
            <p className="max-w-md text-sm leading-relaxed text-[#5B5D56]">
              Residential landscaping across Las Vegas, Nevada—specializing in custom paver
              installations, artificial turf, yard cleanups, and desert-conscious irrigation.
            </p>
            <div className="flex items-center gap-2 text-sm font-medium text-[#1E201D]">
              <MapPin className="h-4 w-4 text-[#3F523B] shrink-0" aria-hidden="true" />
              <span>{BUSINESS_INFO.location}</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-[#5B5D56]">
              Pages
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/');
                  }}
                  className="text-[#1E201D] hover:text-[#3F523B] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/services');
                  }}
                  className="text-[#1E201D] hover:text-[#3F523B] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/projects');
                  }}
                  className="text-[#1E201D] hover:text-[#3F523B] transition-colors"
                >
                  Our Projects
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                  className="text-[#1E201D] hover:text-[#3F523B] transition-colors"
                >
                  Contact & Free Estimate
                </a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="md:col-span-2 space-y-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-[#5B5D56]">
              Services
            </h2>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <a
                    href={`/services#${service.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('/services', service.id);
                    }}
                    className="text-[#1E201D] hover:text-[#3F523B] transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact & Social */}
          <div className="md:col-span-3 space-y-3">
            <h2 className="font-display text-xs font-semibold uppercase tracking-wider text-[#5B5D56]">
              Connect
            </h2>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-2 font-medium text-[#1E201D] hover:text-[#3F523B] transition-colors tabular-nums"
                >
                  <Phone className="h-4 w-4 text-[#3F523B]" aria-hidden="true" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.smsHref}
                  className="inline-flex items-center gap-2 text-[#1E201D] hover:text-[#3F523B] transition-colors"
                >
                  <MessageSquare className="h-4 w-4 text-[#3F523B]" aria-hidden="true" />
                  <span>Text Us Directly</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1E201D] hover:text-[#3F523B] transition-colors"
                >
                  <Instagram className="h-4 w-4 text-[#3F523B]" aria-hidden="true" />
                  <span>{BUSINESS_INFO.instagramHandle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#5B5D56]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.yelpUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#1E201D] hover:text-[#3F523B] transition-colors"
                >
                  <span>Customer Reviews on Yelp</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-[#5B5D56]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[#DCD6C8] pt-6 text-xs text-[#5B5D56] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {BUSINESS_INFO.name}. Serving {BUSINESS_INFO.location}.
          </p>
          <p>Free Estimates · Pavers · Artificial Turf · Yard Cleanups · Irrigation</p>
        </div>
      </div>
    </footer>
  );
}
