import { useState } from 'react';
import { Check, Copy, ExternalLink, Lock, MapPin, Unlock } from 'lucide-react';
import { GYM_LOCATION } from '../data/gymData';

export function LocationSection() {
  const [mapInteractive, setMapInteractive] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(GYM_LOCATION.fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked in non-secure context; ignore gracefully
    }
  };

  return (
    <section
      id="location"
      aria-label="Gym location and directions"
      className="relative min-h-[600px] w-full overflow-clip py-[clamp(5rem,9vw,8rem)] gutter-x flex items-center"
      style={{
        backgroundColor: 'var(--bg-void)',
        color: 'var(--ink-primary)',
      }}
    >
      {/* Full-bleed Google Maps iframe behind the content */}
      <div className="absolute inset-0 z-0 overflow-clip">
        <iframe
          title="Jesu Fitness Google Maps location in Alandur, Chennai"
          src={GYM_LOCATION.embedUrl}
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0 transition-[filter] duration-300"
          style={{
            pointerEvents: mapInteractive ? 'auto' : 'none',
            filter: mapInteractive
              ? 'invert(90%) hue-rotate(180deg) saturate(1.1) contrast(1.08) brightness(0.95)'
              : 'invert(90%) hue-rotate(180deg) saturate(0.85) contrast(1.12) brightness(0.88)',
          }}
        />
      </div>

      {/* Atmospheric obsidian vignette scrim (melts map smoothly into void above and below) */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
        aria-hidden="true"
        style={{
          opacity: mapInteractive ? 0.25 : 0.85,
          background:
            'linear-gradient(to right, var(--bg-void) 0%, var(--scrim-mid) 36%, transparent 72%), linear-gradient(to bottom, var(--bg-void) 0%, transparent 26%, transparent 74%, var(--bg-void) 100%)',
        }}
      />

      {/* Foreground floating architectural card + map lock toggle */}
      <div className="relative z-[2] flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <div
          className="w-full max-w-[520px] rounded-[var(--radius-md)] border p-[clamp(1.75rem,3.2vw,2.75rem)] backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-nav-scrolled)',
            borderColor: 'var(--border-whisper-strong)',
          }}
        >
          <div className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            <MapPin size={18} aria-hidden="true" />
            <span>Alandur, St. Thomas Mount</span>
          </div>

          <h2 className="mt-3 text-[clamp(2rem,3.6vw,3.1rem)] font-bold leading-[1.06] tracking-[-0.035em]">
            Walk in. Feel the floor.
          </h2>

          <address
            className="mt-4 not-italic text-[1.025rem] leading-relaxed"
            style={{ color: 'var(--ink-secondary)' }}
          >
            {GYM_LOCATION.fullAddress}
          </address>

          <dl
            className="mt-6 grid grid-cols-1 gap-4 border-t pt-5 sm:grid-cols-2"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <div>
              <dt className="text-xs font-medium" style={{ color: 'var(--ink-secondary)' }}>
                Morning batch
              </dt>
              <dd className="mt-1 text-base font-semibold tabular-nums">5:30 AM to 10:30 AM</dd>
            </div>
            <div>
              <dt className="text-xs font-medium" style={{ color: 'var(--ink-secondary)' }}>
                Evening batch
              </dt>
              <dd className="mt-1 text-base font-semibold tabular-nums">4:30 PM to 9:30 PM</dd>
            </div>
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={GYM_LOCATION.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <span>Get directions</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <button type="button" onClick={handleCopy} className="btn-secondary">
              {copied ? (
                <>
                  <Check size={16} aria-hidden="true" />
                  <span>Address copied</span>
                </>
              ) : (
                <>
                  <Copy size={16} aria-hidden="true" />
                  <span>Copy address</span>
                </>
              )}
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMapInteractive((v) => !v)}
          className="btn-secondary"
          style={{
            backgroundColor: 'var(--bg-nav-scrolled)',
            borderColor: mapInteractive ? 'var(--accent)' : 'var(--border-strong)',
            color: mapInteractive ? 'var(--accent)' : 'var(--ink-primary)',
          }}
        >
          {mapInteractive ? (
            <>
              <Lock size={16} aria-hidden="true" />
              <span>Lock map to scroll page</span>
            </>
          ) : (
            <>
              <Unlock size={16} aria-hidden="true" />
              <span>Interact with map</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
