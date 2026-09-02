import Image from 'next/image';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-x footer-main">
        <div><div className="brand footer-brand"><Image src="/arrow-maze-logo.png" width={42} height={42} alt="" /><span>ARROW ESCAPE</span></div><p>Long paths. Clean escapes. 500 unique levels and collectible milestone awards.</p></div>
        <div className="footer-links"><a href="mailto:aditya159121@gmail.com">aditya159121@gmail.com</a><Link href="/support">Support</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      </div>
      <div className="container-x footer-bottom">© {new Date().getFullYear()} Arrow Escape. All rights reserved.</div>
    </footer>
  );
}
