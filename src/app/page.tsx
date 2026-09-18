import Image from 'next/image';
import { PlayingSection } from './_components/PlayingSection';
import { RealLevelPreview, previewArrowCount } from './_components/RealLevelPreview';
import { SiteFooter } from './_components/SiteFooter';
import { SiteHeader } from './_components/SiteHeader';
import { StoreButtons } from './_components/StoreButtons';

const features = [
  { number: '01', title: '500 unique mazes', body: 'Every level has its own validated layout, route mix, and removal order—from Foundations to Grandmaster.' },
  { number: '02', title: 'Balanced directions', body: 'Up, down, left, and right stay in play. Read the whole board instead of repeating one obvious move.' },
  { number: '03', title: 'Satisfying motion', body: 'The arrowhead leads and the long tail follows smoothly out of the maze like a moving snake.' },
  { number: '04', title: 'Play your way', body: 'Choose any of all 500 unlocked levels, zoom into dense boards, and use hints when you need a nudge.' },
];

const awardTiers = [
  { icon: '🪨', name: 'Stone', level: '5 levels' },
  { icon: '🥉', name: 'Bronze', level: '20 levels' },
  { icon: '🥈', name: 'Silver', level: '110 levels' },
  { icon: '🏆', name: 'Gold', level: '250 levels' },
  { icon: '💎', name: 'Legend', level: '500 levels' },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero-shell">
          <div className="hero-grid container-x">
            <div className="fade-up">
              <div className="eyebrow"><span className="status-dot" />AVAILABLE ON THE APP STORE</div>
              <h1>Find the arrow<br />that can escape.</h1>
              <p className="hero-copy">A dense logic puzzle built from long, twisting arrows. Clear every path in the right order across 500 unique, validated levels.</p>
              <StoreButtons />
              <div className="hero-proof">
                <span><b>500</b> unique levels</span>
                <span><b>4-way</b> direction balance</span>
                <span><b>Offline</b> play</span>
              </div>
            </div>
            <div className="hero-visual" aria-label="Arrow Escape game preview">
              <div className="phone-card">
                <div className="phone-top"><span>LEVEL 01</span><strong>{previewArrowCount} left</strong></div>
                <div className="maze-stage"><RealLevelPreview /></div>
                <div className="phone-bottom"><span>● ● ●</span><strong>Find the blue escape</strong></div>
              </div>
              <div className="logo-float"><Image src="/arrow-maze-logo.png" width={88} height={88} alt="Arrow Escape multi-arrow logo" /></div>
            </div>
          </div>
        </section>

        <section id="awards" className="awards-section">
          <div className="container-x section-pad awards-grid">
            <div className="awards-copy">
              <div className="section-heading"><span>MILESTONES THAT MATTER</span><h2>Every trophy tells your story.</h2></div>
              <p>Reach hand-picked milestones, collect increasingly rare trophies, and earn free hints along the way. Rewards grow with the challenge—including a final Legend trophy at Level 500.</p>
              <div className="award-stat"><strong>25</strong><span>collectible milestone trophies</span></div>
            </div>
            <div className="award-track">
              {awardTiers.map((tier, index) => (
                <article className="award-tier" key={tier.name}>
                  <div className={`award-icon award-icon-${index}`}>{tier.icon}</div>
                  <div><strong>{tier.name}</strong><span>{tier.level}</span></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="section-dark">
          <div className="container-x section-pad">
            <div className="section-heading light"><span>DESIGNED TO STAY INTERESTING</span><h2>No two boards should feel the same.</h2></div>
            <div className="feature-grid">
              {features.map((feature) => (
                <article className="feature-card" key={feature.number}><span>{feature.number}</span><h3>{feature.title}</h3><p>{feature.body}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="container-x section-pad how-grid">
          <div className="logo-panel"><Image src="/arrow-maze-logo.png" width={420} height={420} alt="Interlocking Arrow Escape logo" /></div>
          <div className="how-copy">
            <div className="section-heading"><span>ONE RULE. DEEP PUZZLES.</span><h2>Tap only what can leave.</h2></div>
            <ol>
              <li><b>Scan.</b> Follow each arrowhead and check its escape route.</li>
              <li><b>Tap.</b> A clear arrow glides out head-first; a blocked arrow costs a life.</li>
              <li><b>Unravel.</b> Every move opens new paths until the entire matrix is clear.</li>
            </ol>
          </div>
        </section>

        <PlayingSection />

        <section id="download" className="container-x launch-wrap">
          <div className="launch-card">
            <div><span className="launch-kicker">NOW ON THE APP STORE</span><h2>Your next puzzle obsession is here.</h2><p>Choose any level, master all 500, and collect every milestone trophy along the way. Google Play is coming soon.</p></div>
            <StoreButtons />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
