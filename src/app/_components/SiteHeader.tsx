import Image from 'next/image';
import Link from 'next/link';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container-x header-inner">
        <Link href="/" className="brand" aria-label="Arrow Escape home"><Image src="/arrow-maze-logo.png" width={42} height={42} alt="" priority /><span>ARROW ESCAPE</span></Link>
        <nav><Link href="/#features">Features</Link><Link href="/#awards">Awards</Link><Link href="/#how">How to play</Link><Link href="/support">Support</Link></nav>
        <Link href="/#download" className="header-cta">Download</Link>
      </div>
    </header>
  );
}
