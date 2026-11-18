import {useState} from 'react';
import {Sprout} from 'lucide-react';
import {COMPANY_INFO} from '../data/company';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectClass?: string;
  loading?: 'eager' | 'lazy';
  branded?: boolean;
}

export function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  aspectClass = 'aspect-[4/3]',
  loading = 'lazy',
  branded = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#EAE4D7] ${aspectClass} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={imgClassName}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#EAE4D7] to-[#DFD7C4] p-6 text-center text-[#1B3B2B]">
          <Sprout className="h-8 w-8 stroke-[1.5]" aria-hidden="true" />
          <p className="max-w-xs text-xs font-medium text-[#3A403C]">{alt}</p>
        </div>
      )}

      {branded && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#132A1E]/55 via-[#132A1E]/20 to-transparent"
          />
          <div className="pointer-events-none absolute bottom-2.5 left-2.5 flex items-center gap-2 rounded-md border border-[#FAF8F4]/30 bg-[#1B3B2B]/90 px-2 py-1 backdrop-blur-xs">
            <img
              src={COMPANY_INFO.logoUrl}
              alt=""
              aria-hidden="true"
              className="h-5 w-auto shrink-0 rounded bg-white px-1 py-0.5 object-contain"
            />
            <span className="font-display text-[11px] font-semibold tracking-tight text-[#FAF8F4] whitespace-nowrap">
              Abonos Naturales · Hnos. Aguado
            </span>
          </div>
        </>
      )}
    </div>
  );
}
