import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect } from 'react';
import { PortfolioItem } from '../lib/siteData';

interface LightboxModalProps {
  items: PortfolioItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChangeIndex: (nextIndex: number) => void;
}

export function LightboxModal({
  items,
  activeIndex,
  onClose,
  onChangeIndex,
}: LightboxModalProps) {
  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const current = isOpen ? items[activeIndex] : null;

  useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onChangeIndex((activeIndex + 1) % items.length);
      } else if (e.key === 'ArrowLeft') {
        onChangeIndex((activeIndex - 1 + items.length) % items.length);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, activeIndex, items.length, onClose, onChangeIndex]);

  if (!isOpen || !current || activeIndex === null) {
    return null;
  }

  const prevIndex = (activeIndex - 1 + items.length) % items.length;
  const nextIndex = (activeIndex + 1) % items.length;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#141613]/95 p-4 text-[#FAF8F4] sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={current.title}
      onClick={onClose}
    >
      {/* Top Bar */}
      <div
        className="flex items-center justify-between gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xs font-medium tracking-wider uppercase text-[#C7C4B9] tabular-nums">
          <span>{current.serviceTag}</span>
          <span className="mx-2" aria-hidden="true">
            ·
          </span>
          <span>
            {activeIndex + 1} / {items.length}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close full-size project viewer"
          className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Main Image Frame */}
      <div
        className="relative mx-auto flex my-auto max-h-[75vh] max-w-5xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={current.image}
          alt={current.imageAlt}
          referrerPolicy="no-referrer"
          className="max-h-[74vh] w-auto max-w-full object-contain shadow-2xl"
        />
      </div>

      {/* Bottom Controls & Caption */}
      <div
        className="mx-auto flex w-full max-w-5xl flex-col gap-4 border-t border-white/15 pt-4 sm:flex-row sm:items-center sm:justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            {current.title}
          </h3>
          <p className="text-sm text-[#C7C4B9]">{current.description}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => onChangeIndex(prevIndex)}
            aria-label="Previous project image"
            className="inline-flex h-11 items-center gap-1.5 border border-white/20 px-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            <span>Prev</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeIndex(nextIndex)}
            aria-label="Next project image"
            className="inline-flex h-11 items-center gap-1.5 border border-white/20 px-4 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10 cursor-pointer"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
