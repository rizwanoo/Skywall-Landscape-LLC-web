import { MotionConfig } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { ROUTE_SEO, RoutePath, ServiceOption } from './data/siteData';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ServicesPage } from './pages/ServicesPage';

function normalizePath(pathname: string): RoutePath {
  const cleaned = pathname.replace(/\/+$/, '') || '/';
  if (cleaned === '/services') return '/services';
  if (cleaned === '/projects') return '/projects';
  if (cleaned === '/contact') return '/contact';
  return '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() =>
    normalizePath(window.location.pathname)
  );
  const [prefillService, setPrefillService] = useState<ServiceOption | undefined>(
    undefined
  );

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Synchronize page-specific SEO title, description, OpenGraph, and canonical URL
  useEffect(() => {
    const seo = ROUTE_SEO[currentPath];
    document.title = seo.title;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', seo.description);
    updateMeta('meta[property="og:title"]', seo.title);
    updateMeta('meta[property="og:description"]', seo.description);
    updateMeta('meta[name="twitter:title"]', seo.title);
    updateMeta('meta[name="twitter:description"]', seo.description);

    const canonicalUrl = `${window.location.origin}${currentPath === '/' ? '/' : currentPath}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [currentPath]);

  const handleNavigate = useCallback(
    (path: RoutePath, hash?: string, selectedService?: ServiceOption) => {
      if (selectedService) {
        setPrefillService(selectedService);
      }

      const targetUrl = hash ? `${path}#${hash}` : path;
      if (window.location.pathname + window.location.hash !== targetUrl) {
        window.history.pushState(null, '', targetUrl);
      }
      setCurrentPath(path);

      if (hash) {
        window.requestAnimationFrame(() => {
          window.setTimeout(() => {
            const target = document.getElementById(hash);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 60);
        });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#FAF8F4] text-[#1E201D]">
        <Navbar currentPath={currentPath} onNavigate={handleNavigate} />

        <main className="flex-1">
          {currentPath === '/' && <HomePage onNavigate={handleNavigate} />}
          {currentPath === '/services' && <ServicesPage onNavigate={handleNavigate} />}
          {currentPath === '/projects' && <ProjectsPage onNavigate={handleNavigate} />}
          {currentPath === '/contact' && <ContactPage prefillService={prefillService} />}
        </main>

        <Footer onNavigate={handleNavigate} />
      </div>
    </MotionConfig>
  );
}
