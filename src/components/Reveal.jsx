import useReveal from '../hooks/useReveal';

/**
 * Scroll-triggered entrance.
 * variant: "up" (default) | "fade" | "left" | "right" | "mask" | "line"
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  children,
  ...rest
}) {
  const ref = useReveal();
  const merged = delay ? { ...style, '--d': `${delay}ms` } : style;

  if (variant === 'mask') {
    return (
      <Tag ref={ref} className={`reveal reveal-mask ${className}`} style={merged} {...rest}>
        <div className="reveal-mask-inner">{children}</div>
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={`reveal reveal-${variant} ${className}`} style={merged} {...rest}>
      {children}
    </Tag>
  );
}
