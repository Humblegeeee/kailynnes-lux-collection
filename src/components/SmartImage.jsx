import { useState } from 'react';

function Picture({ src, alt, className, tone, label, ...rest }) {
  const [status, setStatus] = useState(src ? 'loading' : 'error');

  if (status === 'error') {
    return (
      <div
        className={`img-fallback ${tone === 'dark' ? 'img-fallback-dark' : ''} ${className}`}
        role="img"
        aria-label={alt}
      >
        {tone !== 'dark' && <span className="img-fallback-mark">K</span>}
        {tone !== 'dark' && label && <span className="img-fallback-label">{label}</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`img-fade ${status === 'loaded' ? 'is-loaded' : ''} ${className}`}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
      {...rest}
    />
  );
}

/** Image that fades in once loaded and shows a branded placeholder if it fails. */
export default function SmartImage({ src, alt = '', className = '', tone = 'light', label, ...rest }) {
  return <Picture key={src || 'none'} src={src} alt={alt} className={className} tone={tone} label={label} {...rest} />;
}
