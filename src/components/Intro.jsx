import { useCallback, useEffect, useRef, useState } from 'react';
import { BRAND, BRAND_SUB } from '../lib/constants';
import { markSiteReady, prefersReducedMotion } from '../lib/ready';

const LETTERS = BRAND.replace("'", '’').split('');

// Fixed positions for the drifting gold dust (x %, y %, size px, delay s, duration s).
const DUST = [
  [8, 78, 2, 0.2, 7], [16, 30, 3, 1.4, 9], [24, 62, 2, 0.8, 8], [31, 88, 2, 2.1, 7],
  [38, 18, 3, 0.5, 10], [46, 72, 2, 1.7, 8], [54, 26, 2, 0.1, 9], [61, 84, 3, 1.1, 7],
  [68, 40, 2, 2.4, 8], [75, 68, 2, 0.6, 10], [82, 22, 3, 1.9, 9], [89, 58, 2, 0.3, 7],
  [94, 82, 2, 1.3, 8], [4, 46, 2, 2.2, 9],
];

const PLAY_MS = 3300; // wordmark build
const SPLIT_MS = 750; // content clears, seam line draws
const EXIT_MS = 1950; // curtains fully open

/**
 * Opening sequence for Kailynne's Lux Collection:
 * monogram draws → wordmark rises letter by letter → gold light passes through it →
 * a seam of gold splits the screen and the two curtains part to reveal the site.
 */
export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('play'); // play → exit
  const [count, setCount] = useState(0);
  const timers = useRef([]);
  const exiting = useRef(false);

  const leave = useCallback(() => {
    if (exiting.current) return;
    exiting.current = true;
    try {
      sessionStorage.setItem('klc_intro_seen', '1');
    } catch {
      /* storage unavailable: the intro simply plays again next visit */
    }
    setPhase('exit');
    setCount(100);
    timers.current.push(setTimeout(markSiteReady, SPLIT_MS));
    timers.current.push(setTimeout(onDone, EXIT_MS));
  }, [onDone]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const playFor = reduced ? 900 : PLAY_MS;
    const started = performance.now();
    const pending = timers.current;

    pending.push(setTimeout(leave, playFor));

    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - started) / (playFor - 250));
      const eased = 1 - Math.pow(1 - t, 3);
      if (!exiting.current) setCount(Math.round(eased * 100));
      if (t < 1 && !exiting.current) frame = requestAnimationFrame(tick);
    });

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') leave();
    };
    window.addEventListener('keydown', onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    return () => {
      pending.forEach(clearTimeout);
      pending.length = 0;
      exiting.current = false;
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [leave]);

  return (
    <div className="intro" data-phase={phase} onClick={leave} role="presentation">
      <div className="intro-panel intro-panel-top" />
      <div className="intro-panel intro-panel-bottom" />
      <div className="intro-seam" />

      <div className="intro-dust" aria-hidden="true">
        {DUST.map(([x, y, size, delay, dur], i) => (
          <span
            key={i}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        ))}
      </div>

      <div className="intro-content">
        <svg className="intro-monogram" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="intro-ring" cx="50" cy="50" r="46" />
          <circle className="intro-ring intro-ring-inner" cx="50" cy="50" r="40" />
          <text x="50" y="66" textAnchor="middle" className="intro-k">K</text>
        </svg>

        <h1 className="intro-word" aria-label={`${BRAND} ${BRAND_SUB}`}>
          {LETTERS.map((ch, i) => (
            <span key={i} className="intro-letter-mask" aria-hidden="true">
              <span className="intro-letter" style={{ '--i': i }}>{ch}</span>
            </span>
          ))}
        </h1>

        <div className="intro-rule" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>

        <p className="intro-sub" aria-hidden="true">{BRAND_SUB}</p>
        <p className="intro-tag">Bags &nbsp;·&nbsp; Clothes &nbsp;·&nbsp; Accra</p>
      </div>

      <div className="intro-meta" aria-hidden="true">
        <span className="intro-count">{String(count).padStart(3, '0')}</span>
        <span className="intro-bar"><span style={{ transform: `scaleX(${count / 100})` }} /></span>
      </div>

      <button type="button" className="intro-skip" onClick={leave}>
        Skip intro
      </button>
    </div>
  );
}
