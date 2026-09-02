import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../_components/SiteHeader';
import { SiteFooter } from '../_components/SiteFooter';

export const metadata: Metadata = {
  title: 'Privacy Policy — Arrow Escape',
  description:
    'How Arrow Escape handles your data. Short version: we barely collect any.',
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x py-16 sm:py-20 max-w-3xl">
          <p className="text-sm font-black tracking-[0.15em] text-play">
            LEGAL
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-ink">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-muted">
            Last updated: August 25, 2026
          </p>

          <div className="legal-prose mt-10">
            <p>
              This Privacy Policy explains how <strong>Arrow Escape</strong>{' '}
              (&ldquo;Arrow Escape&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;)
              handles information when you use our mobile game and this
              website. Short version: we barely collect anything, we do not
              sell your data, and the game is designed to work offline.
            </p>

            <h2>1. Information we collect</h2>
            <p>
              We collect as little as possible. Depending on how you use Arrow
              Escape, this may include:
            </p>
            <ul>
              <li>
                <strong>Game progress:</strong> completed levels, claimed awards, hints, and
                settings are stored <em>locally on your device</em>. They are
                not sent to us.
              </li>
              <li>
                <strong>Device information:</strong> generic technical
                information (operating system version, device model, app
                version) may be collected for crash reporting and to keep the
                app running smoothly.
              </li>
              <li>
                <strong>Aggregated usage:</strong> anonymous, aggregated
                statistics such as levels played and crashes may be collected
                to help us improve the game. These cannot be used to identify
                you.
              </li>
            </ul>

            <h2>2. Information we do NOT collect</h2>
            <ul>
              <li>We do not ask for your name, email, or phone number.</li>
              <li>We do not collect your contacts, photos, or location.</li>
              <li>We do not require an account to play.</li>
              <li>We do not sell or rent your data to anyone.</li>
            </ul>

            <h2>3. How we use information</h2>
            <p>Any information we do collect is used only to:</p>
            <ul>
              <li>Operate, maintain, and improve Arrow Escape.</li>
              <li>Diagnose crashes and fix bugs.</li>
              <li>
                Understand which features and levels players enjoy so we can
                design better ones.
              </li>
            </ul>

            <h2>4. Advertising</h2>
            <p>
              Arrow Escape may show occasional non-intrusive advertisements to
              keep the game free. Third-party ad providers may use standard
              mobile identifiers (such as an advertising ID) to serve ads. You
              can reset or limit this identifier at any time in your device
              settings (iOS: Settings › Privacy › Tracking. Android: Settings ›
              Google › Ads).
            </p>

            <h2>5. Children&rsquo;s privacy</h2>
            <p>
              Arrow Escape is family-friendly and suitable for all ages. We do
              not knowingly collect personal information from children. If you
              believe a child has provided us with personal information, please
              contact us and we will delete it.
            </p>

            <h2>6. Data storage &amp; retention</h2>
            <p>
              Game progress lives on your device. If you uninstall the app,
              that data is gone. Any anonymous analytics or crash data is
              retained only as long as needed to fix issues and improve the
              game.
            </p>

            <h2>7. Your rights</h2>
            <p>
              Depending on where you live (for example, EU/UK under GDPR, or
              California under CCPA), you may have the right to access,
              correct, or delete personal information we hold about you, and to
              object to certain processing. Because we hold very little
              information, most requests are simple to honor — email us and we
              will help.
            </p>

            <h2>8. Third-party services</h2>
            <p>
              We may use trusted service providers for crash reporting,
              analytics, or advertising. These providers are contractually
              limited to processing information on our behalf and are not
              permitted to use it for their own purposes.
            </p>

            <h2>9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make
              meaningful changes, we will update the &ldquo;last updated&rdquo;
              date at the top and, where appropriate, notify players in-app.
            </p>

            <h2>10. Contact us</h2>
            <p>
              Questions or requests? Email us at{' '}
              <a
                href="mailto:aditya159121@gmail.com"
                className="text-play font-semibold underline underline-offset-2"
              >
                aditya159121@gmail.com
              </a>
              . See also our{' '}
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
