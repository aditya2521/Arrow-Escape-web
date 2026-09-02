import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../_components/SiteHeader';
import { SiteFooter } from '../_components/SiteFooter';

export const metadata: Metadata = {
  title: 'Support — Arrow Escape',
  description: 'Get help, report a bug, or send feedback about Arrow Escape.',
};

const faqs = [
  {
    q: 'How do I play?',
    a: 'Tap an arrow. If the path in front of it is clear, it flies off the board. Clear every arrow to complete the level. That is the whole game.',
  },
  {
    q: 'I lost my progress after reinstalling.',
    a: 'Progress is saved locally on your device. Uninstalling the app removes it. We are working on optional cloud sync — stay tuned.',
  },
  {
    q: 'How do I earn hints?',
    a: 'You start with 5 hints. Win streaks and milestone awards provide more free hints. There are no coins, no shop, and no way to buy hints — the game rewards playing.',
  },
  {
    q: 'The app is stuck / crashed.',
    a: 'Try closing and reopening the app. If it keeps happening, please email us with your device model and OS version and we\'ll investigate.',
  },
  {
    q: 'Can my kids play?',
    a: 'Yes. Arrow Escape is family-friendly, has no chat, and does not collect personal information.',
  },
];

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x py-16 sm:py-20 max-w-3xl">
          <p className="text-sm font-black tracking-[0.15em] text-play">
            SUPPORT
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-ink">
            How can we help?
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed">
            Quick answers below. If you can&rsquo;t find what you need, drop us
            a line and a human will get back to you.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <a
              href="mailto:aditya159121@gmail.com"
              className="bg-play text-white rounded-3xl p-6 shadow-pop hover:-translate-y-1 transition-transform"
            >
              <div className="text-3xl">✉️</div>
              <h3 className="mt-3 font-black text-lg">Email support</h3>
              <p className="mt-1 text-sm text-white/85">
                aditya159121@gmail.com
              </p>
            </a>
            <div className="bg-soft rounded-3xl p-6">
              <div className="text-3xl">🐞</div>
              <h3 className="mt-3 font-black text-lg text-ink">
                Report a bug
              </h3>
              <p className="mt-1 text-sm text-muted">
                Include device model, OS version, and the level you were on.
              </p>
            </div>
          </div>

          <h2 className="mt-14 text-2xl font-black text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-soft border-y border-soft">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <span className="font-bold text-ink pr-4">{f.q}</span>
                  <span className="text-play group-open:rotate-45 transition-transform text-xl">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="mt-14 bg-soft rounded-3xl p-6">
            <p className="text-sm text-muted">
              Looking for something legal? See our{' '}
              <Link
                href="/privacy"
                className="text-play font-semibold underline underline-offset-2"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link
                href="/terms"
                className="text-play font-semibold underline underline-offset-2"
              >
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
