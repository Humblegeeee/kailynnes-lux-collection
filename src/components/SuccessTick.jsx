/** A gold ring that draws itself, then a tick, then a soft pulse. */
export default function SuccessTick({ size = 72, className = '' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <circle className="tick-halo" cx="32" cy="32" r="30" />
      <circle className="tick-ring" cx="32" cy="32" r="30" />
      <path className="tick-mark" d="M20 33 l8.5 8.5 L45 24" />
    </svg>
  );
}
