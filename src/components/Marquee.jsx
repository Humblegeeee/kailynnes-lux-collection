export default function Marquee({ items, className = '' }) {
  // Repeat the list so one row is always wider than the screen.
  const loop = [...items, ...items, ...items];

  const row = (hidden) => (
    <div className="marquee-row" aria-hidden={hidden || undefined}>
      {loop.map((item, i) => (
        <span key={i} className="marquee-item">
          {item}
          <span className="marquee-star">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
