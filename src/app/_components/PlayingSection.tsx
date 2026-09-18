import { ArrowUpRight, MousePointer2, MoveUpRight, Sparkles } from 'lucide-react';
import { PuzzleDemo } from './PuzzleDemo';
import './game-preview.css';

export function PlayingSection() {
  return <section id="play" className="container-x play-section">
    <div className="play-copy">
      <span className="play-kicker">FIND YOUR WAY</span>
      <h2>One simple rule.<br/><span>So many aha’s.</span></h2>
      <p className="play-description">Every arrow has somewhere to go. You just need to find the ones with a clear way out.</p>
      <ol className="play-steps">
        <li><span>01</span><div><h3>Take a little look.</h3><p>Follow the arrows. Spot a path with nothing in the way.</p></div><MousePointer2/></li>
        <li><span>02</span><div><h3>Make your move.</h3><p>Tap a clear arrow and watch it glide off the board.</p></div><MoveUpRight/></li>
        <li><span>03</span><div><h3>Let it all unravel.</h3><p>Open up new paths until every arrow finds its escape.</p></div><Sparkles/></li>
      </ol>
      <a href="#try-it" className="play-note">Try the actual first level. <ArrowUpRight size={20}/></a>
    </div>
    <PuzzleDemo/>
  </section>;
}
