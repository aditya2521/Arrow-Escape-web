'use client';

import { useEffect, useRef, useState } from 'react';

type Store = 'App Store' | 'Google Play';

export function StoreButtons() {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedStore) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedStore(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedStore]);

  return (
    <>
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <StoreButton
          label="App Store"
          sub="Download on the"
          onClick={() => setSelectedStore('App Store')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden>
              <path d="M17.564 12.643a4.72 4.72 0 0 1 2.256-3.966 4.836 4.836 0 0 0-3.806-2.056c-1.6-.168-3.144.947-3.966.947-.837 0-2.087-.923-3.436-.896a5.076 5.076 0 0 0-4.27 2.605c-1.842 3.19-.468 7.898 1.317 10.484.87 1.264 1.89 2.68 3.234 2.63 1.301-.053 1.792-.85 3.36-.85 1.56 0 2.014.85 3.383.82 1.4-.023 2.284-1.276 3.135-2.55.99-1.462 1.395-2.9 1.42-2.973-.031-.014-2.723-1.045-2.75-4.144zM14.6 4.83a4.586 4.586 0 0 0 1.06-3.319 4.706 4.706 0 0 0-3.045 1.573 4.397 4.397 0 0 0-1.089 3.196A3.895 3.895 0 0 0 14.6 4.83z" />
            </svg>
          }
        />
        <StoreButton
          label="Google Play"
          sub="Get it on"
          onClick={() => setSelectedStore('Google Play')}
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden>
              <path d="M3.6 2.3c-.4.4-.6 1-.6 1.7v16c0 .7.2 1.3.6 1.7l9.4-9.7L3.6 2.3zm12 6.3l-2.2 2.2 2.2 2.2 3.6-2.1c1.1-.6 1.1-1.6 0-2.2l-3.6-2.1zm-1 1L5 20.7c.5.1 1.2 0 1.9-.4L14.6 16l-2-2.4-.1 2.1zm0-4L5 3.3c.5-.1 1.2 0 1.9.4L14.6 8l-2 2.4-.1-2.1z" />
            </svg>
          }
        />
      </div>

      {selectedStore && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-transparent px-5 py-8"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedStore(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="coming-soon-title"
            aria-describedby="coming-soon-description"
            className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-white/70 bg-white p-6 text-center text-ink shadow-2xl sm:p-8"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelectedStore(null)}
              aria-label="Close coming soon message"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white/90 text-xl font-bold text-muted shadow-sm transition-colors hover:bg-slate-100 hover:text-ink focus:outline-none focus:ring-2 focus:ring-play focus:ring-offset-2"
            >
              ×
            </button>

            <div className="mx-auto grid h-24 w-24 place-items-center rounded-[28px] bg-gradient-to-br from-play to-blue-700 shadow-pop">
              <img className="h-16 w-16 object-contain brightness-0 invert" src="/arrow-maze-logo.png" alt="" />
            </div>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-4 py-2 text-xs font-black tracking-[0.16em] text-amber-800 shadow-[0_8px_24px_rgba(245,158,11,0.22)]">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-amber-500 ring-4 ring-amber-200" /> COMING SOON
            </span>
            <h2 id="coming-soon-title" className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              Arrow Escape is nearly here
            </h2>
            <p id="coming-soon-description" className="mt-3 leading-relaxed text-muted">
              We’re preparing 500 unique levels and milestone awards for {selectedStore}.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3 text-xs font-extrabold text-slate-600">
              <span className="rounded-full bg-soft px-3 py-2">500 levels</span>
              <span className="rounded-full bg-soft px-3 py-2">Offline play</span>
              <span className="rounded-full bg-soft px-3 py-2">Free to play</span>
            </div>
            <button
              type="button"
              onClick={() => setSelectedStore(null)}
              className="mt-7 w-full rounded-full bg-play px-6 py-3.5 font-black text-white shadow-pop transition-transform hover:bg-playDark active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-play focus:ring-offset-2"
            >
              Sounds good
            </button>
            <a
              href="mailto:aditya159121@gmail.com?subject=Arrow%20Escape%20launch"
              className="mt-4 inline-block text-sm font-bold text-muted underline decoration-slate-300 underline-offset-4 transition-colors hover:text-play"
            >
              Contact: aditya159121@gmail.com
            </a>
          </div>
        </div>
      )}
    </>
  );
}

function StoreButton({
  label,
  sub,
  icon,
  onClick,
}: {
  label: Store;
  sub: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label} — coming soon`}
      className="inline-flex items-center gap-3 rounded-2xl bg-black px-5 py-3 text-left text-white transition-transform hover:bg-black/85 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-play"
    >
      <span>{icon}</span>
      <span className="leading-tight">
        <span className="block text-[10px] uppercase tracking-widest text-white/70">{sub}</span>
        <span className="block text-lg font-black">{label}</span>
      </span>
    </button>
  );
}
