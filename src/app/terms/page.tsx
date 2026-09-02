import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteHeader } from '../_components/SiteHeader';
import { SiteFooter } from '../_components/SiteFooter';

export const metadata: Metadata = {
  title: 'Terms of Service — Arrow Escape',
  description:
    'The rules for using Arrow Escape. Play fair, be kind, have fun.',
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="container-x py-16 sm:py-20 max-w-3xl">
          <p className="text-sm font-black tracking-[0.15em] text-play">
            LEGAL
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-ink">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-muted">
            Last updated: August 25, 2026
          </p>

          <div className="legal-prose mt-10">
            <p>
              Welcome to <strong>Arrow Escape</strong>. These Terms of Service
              (&ldquo;Terms&rdquo;) govern your use of the Arrow Escape mobile
              app and this website (together, the &ldquo;Service&rdquo;). By
              using the Service you agree to these Terms. If you do not agree,
              please do not use the Service.
            </p>

            <h2>1. The short version</h2>
            <ul>
              <li>Arrow Escape is free to play.</li>
              <li>Play fair, don&rsquo;t cheat, don&rsquo;t abuse the app.</li>
              <li>
                We own the game; you own your saved progress on your device.
              </li>
              <li>The game is provided &ldquo;as is&rdquo;.</li>
            </ul>

            <h2>2. Using the Service</h2>
            <p>You agree to use the Service only for lawful purposes. In particular, you agree not to:</p>
            <ul>
              <li>
                Reverse-engineer, decompile, or attempt to extract source code,
                except as permitted by law.
              </li>
              <li>
                Use bots, scripts, or automated tools to interact with the
                game.
              </li>
              <li>
                Attempt to disrupt, overload, or compromise the app, servers,
                or other players&rsquo; experience.
              </li>
              <li>
                Copy, redistribute, or sell any part of the game without our
                written permission.
              </li>
            </ul>

            <h2>3. Intellectual property</h2>
            <p>
              Arrow Escape — including its name, logo, artwork, levels, code,
              sound, and design — is owned by us and protected by copyright
              and other intellectual-property laws. We grant you a personal,
              limited, non-transferable, non-exclusive license to install and
              play Arrow Escape on devices you own, for your own non-commercial
              enjoyment.
            </p>

            <h2>4. No in-app purchases</h2>
            <p>
              Arrow Escape does <strong>not</strong> sell coins, hints, lives,
              or any other virtual item. There is no shop, no paywall, and no
              way to spend money inside the game. You start with three hints
              and earn more through win streaks and milestone awards — purely by
              playing.
            </p>

            <h2>5. Advertising</h2>
            <p>
              Some parts of the Service may include advertising. By using the
              Service you agree that we (or our advertising partners) may
              display ads. See our{' '}
              <Link
                href="/privacy"
                className="text-play font-semibold underline underline-offset-2"
              >
                Privacy Policy
              </Link>{' '}
              for details on advertising identifiers.
            </p>

            <h2>6. Updates &amp; availability</h2>
            <p>
              We may update, change, or discontinue any part of the Service at
              any time — for example, to fix bugs, improve gameplay, or comply
              with legal requirements. We do our best to keep the Service
              running, but do not guarantee it will be available at all times
              or free of errors.
            </p>

            <h2>7. Disclaimer of warranties</h2>
            <p>
              The Service is provided <strong>&ldquo;as is&rdquo;</strong> and{' '}
              <strong>&ldquo;as available&rdquo;</strong>, without warranties
              of any kind, whether express or implied, including warranties of
              merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>

            <h2>8. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Arrow Escape and its team
              will not be liable for any indirect, incidental, special,
              consequential, or punitive damages, or any loss of profits or
              data, arising from or related to your use of the Service. Our
              total liability for any claim arising from these Terms will not
              exceed the greater of ten U.S. dollars (US$10) or the amount you
              paid us in the preceding twelve months.
            </p>

            <h2>9. Termination</h2>
            <p>
              You may stop using the Service at any time by uninstalling the
              app. We may suspend or terminate your access to the Service if
              you violate these Terms.
            </p>

            <h2>10. Governing law</h2>
            <p>
              These Terms are governed by the laws of your country of
              residence to the extent required by local consumer-protection
              law. Otherwise, they are governed by the laws applicable to the
              publisher of Arrow Escape, without regard to conflict-of-law
              principles.
            </p>

            <h2>11. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. If we make
              meaningful changes, we will update the &ldquo;last updated&rdquo;
              date at the top. Continued use of the Service after changes take
              effect means you accept the updated Terms.
            </p>

            <h2>12. Contact us</h2>
            <p>
              Questions about these Terms? Email us at{' '}
              <a
                href="mailto:aditya159121@gmail.com"
                className="text-play font-semibold underline underline-offset-2"
              >
                aditya159121@gmail.com
              </a>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
