import { useState } from 'react';
import { Mountain } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectClass?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectClass = 'aspect-[4/3]',
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#EFECE4] ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EFECE4] via-[#E5E0D5] to-[#D8D1C2] p-6 text-center"
          role="img"
          aria-label={alt}
        >
          <Mountain className="h-8 w-8 text-[#5B5D56]" aria-hidden="true" />
          <p className="max-w-xs text-sm font-medium text-[#3F413B]">{alt}</p>
        </div>
      )}
    </div>
  );
}
