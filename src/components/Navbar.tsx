import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { BUSINESS_INFO, RoutePath, SERVICES } from '../data/siteData';

interface NavbarProps {
  currentPath: RoutePath;
  onNavigate: (path: RoutePath, hash?: string) => void;
}

export function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownTimerRef = useRef<number | null>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const openServicesMenu = () => {
    if (dropdownTimerRef.current) {
      window.clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const closeServicesMenuDelayed = () => {
    if (dropdownTimerRef.current) {
      window.clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = window.setTimeout(() => {
      setServicesOpen(false);
    }, 160);
  };

  const handleLinkClick = (path: RoutePath, hash?: string) => {
    setServicesOpen(false);
    setMobileOpen(false);
    onNavigate(path, hash);
  };

  const isTransparentHero = currentPath === '/' && !scrolled && !mobileOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        isTransparentHero
          ? 'border-b border-white/15 bg-[#1E201D]/35 backdrop-blur-md text-white'
          : 'border-b border-[#DCD6C8] bg-[#FAF8F4]/95 backdrop-blur-md text-[#1E201D]'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark + Crest Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('/');
          }}
          className={`inline-flex items-center gap-3 font-display text-lg font-semibold tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 ${
            isTransparentHero
              ? 'text-white focus-visible:outline-white'
              : 'text-[#1E201D] focus-visible:outline-[#3F523B]'
          }`}
        >
          <img
            src={BUSINESS_INFO.logoUrl}
            alt="Skywall Landscape LLC logo"
            referrerPolicy="no-referrer"
            className="h-12 w-12 rounded-full object-cover border border-[#C9A24D]/70 shrink-0"
          />
          <span>Skywall Landscape</span>
        </a>

        {/* Zone 2: Desktop Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className={`relative py-2 whitespace-nowrap shrink-0 transition-colors ${
              currentPath === '/'
                ? isTransparentHero
                  ? 'text-white after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-white'
                  : 'text-[#3F523B] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3F523B]'
                : isTransparentHero
                  ? 'text-white/85 hover:text-white'
                  : 'text-[#5B5D56] hover:text-[#1E201D]'
            }`}
          >
            Home
          </a>

          <div
            ref={dropdownContainerRef}
            className="relative"
            onMouseEnter={openServicesMenu}
            onMouseLeave={closeServicesMenuDelayed}
          >
            <div className="flex items-center gap-1">
              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/services');
                }}
                className={`relative py-2 whitespace-nowrap shrink-0 transition-colors ${
                  currentPath === '/services'
                    ? isTransparentHero
                      ? 'text-white after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-white'
                      : 'text-[#3F523B] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3F523B]'
                    : isTransparentHero
                      ? 'text-white/85 hover:text-white'
                      : 'text-[#5B5D56] hover:text-[#1E201D]'
                }`}
              >
                Services
              </a>
              <button
                type="button"
                aria-label="Toggle services submenu"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((prev) => !prev)}
                className={`inline-flex h-8 w-6 items-center justify-center rounded transition-colors ${
                  isTransparentHero
                    ? 'text-white/80 hover:text-white'
                    : 'text-[#5B5D56] hover:text-[#1E201D]'
                }`}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    servicesOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {servicesOpen && (
              <div
                onMouseEnter={openServicesMenu}
                onMouseLeave={closeServicesMenuDelayed}
                className="absolute left-0 top-full pt-2 w-64 z-50"
              >
                <div className="border border-[#DCD6C8] bg-[#FAF8F4] p-2 shadow-lg text-[#1E201D]">
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/services');
                    }}
                    className="block px-3 py-2 text-xs font-semibold uppercase tracking-wider text-[#5B5D56] hover:bg-[#EFECE4] hover:text-[#1E201D] transition-colors"
                  >
                    All Landscaping Services
                  </a>
                  <div className="my-1 h-px bg-[#DCD6C8]" />
                  {SERVICES.map((service) => (
                    <a
                      key={service.id}
                      href={`/services#${service.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick('/services', service.id);
                      }}
                      className="flex items-baseline justify-between px-3 py-2.5 text-sm font-medium text-[#1E201D] hover:bg-[#EFECE4] transition-colors"
                    >
                      <span>{service.title}</span>
                      <span className="text-xs text-[#5B5D56] tabular-nums">
                        {service.number}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          <a
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/projects');
            }}
            className={`relative py-2 whitespace-nowrap shrink-0 transition-colors ${
              currentPath === '/projects'
                ? isTransparentHero
                  ? 'text-white after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-white'
                  : 'text-[#3F523B] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3F523B]'
                : isTransparentHero
                  ? 'text-white/85 hover:text-white'
                  : 'text-[#5B5D56] hover:text-[#1E201D]'
            }`}
          >
            Our Projects
          </a>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/contact');
            }}
            className={`relative py-2 whitespace-nowrap shrink-0 transition-colors ${
              currentPath === '/contact'
                ? isTransparentHero
                  ? 'text-white after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-white'
                  : 'text-[#3F523B] after:absolute after:bottom-1 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#3F523B]'
                : isTransparentHero
                  ? 'text-white/85 hover:text-white'
                  : 'text-[#5B5D56] hover:text-[#1E201D]'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="/contact#estimate-form"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/contact', 'estimate-form');
            }}
            className={`hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
              isTransparentHero
                ? 'bg-[#FAF8F4] text-[#1E201D] hover:bg-[#EFECE4] focus-visible:outline-white'
                : 'bg-[#3F523B] text-[#FAF8F4] hover:bg-[#32422E] focus-visible:outline-[#3F523B]'
            }`}
          >
            Free Estimate
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`inline-flex h-11 w-11 items-center justify-center md:hidden transition-colors ${
              isTransparentHero
                ? 'text-white hover:bg-white/10'
                : 'text-[#1E201D] hover:bg-[#EFECE4]'
            }`}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="border-t border-[#DCD6C8] bg-[#FAF8F4] text-[#1E201D] md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto">
          <nav
            aria-label="Mobile Navigation"
            className="mx-auto max-w-7xl px-4 py-6 space-y-1"
          >
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/');
              }}
              className={`flex min-h-[44px] items-center px-3 py-2 text-base font-medium ${
                currentPath === '/' ? 'bg-[#EFECE4] text-[#3F523B]' : 'text-[#1E201D]'
              }`}
            >
              Home
            </a>

            <div className="py-1">
              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/services');
                }}
                className={`flex min-h-[44px] items-center px-3 py-2 text-base font-medium ${
                  currentPath === '/services'
                    ? 'bg-[#EFECE4] text-[#3F523B]'
                    : 'text-[#1E201D]'
                }`}
              >
                Services
              </a>
              <div className="mt-1 space-y-1 pl-5 border-l border-[#DCD6C8] ml-3">
                {SERVICES.map((service) => (
                  <a
                    key={service.id}
                    href={`/services#${service.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick('/services', service.id);
                    }}
                    className="flex min-h-[44px] items-center px-3 py-2 text-sm text-[#5B5D56] hover:text-[#1E201D]"
                  >
                    {service.number}. {service.title}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/projects"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/projects');
              }}
              className={`flex min-h-[44px] items-center px-3 py-2 text-base font-medium ${
                currentPath === '/projects'
                  ? 'bg-[#EFECE4] text-[#3F523B]'
                  : 'text-[#1E201D]'
              }`}
            >
              Our Projects
            </a>

            <a
              href="/contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('/contact');
              }}
              className={`flex min-h-[44px] items-center px-3 py-2 text-base font-medium ${
                currentPath === '/contact'
                  ? 'bg-[#EFECE4] text-[#3F523B]'
                  : 'text-[#1E201D]'
              }`}
            >
              Contact
            </a>

            <div className="pt-5 mt-4 border-t border-[#DCD6C8] space-y-3">
              <a
                href="/contact#estimate-form"
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick('/contact', 'estimate-form');
                }}
                className="flex min-h-[48px] w-full items-center justify-center bg-[#3F523B] px-5 py-3 text-sm font-semibold text-[#FAF8F4] hover:bg-[#32422E]"
              >
                Get a Free Estimate
              </a>
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 border border-[#DCD6C8] bg-white px-5 py-3 text-sm font-semibold text-[#1E201D]"
              >
                <Phone className="h-4 w-4 text-[#3F523B]" aria-hidden="true" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
