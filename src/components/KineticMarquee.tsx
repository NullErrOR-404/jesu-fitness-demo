import { useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { Pause, Play } from 'lucide-react';

interface MarqueeTrackProps {
  items: readonly string[];
  baseVelocity: number;
  paused: boolean;
  hovered: boolean;
  tone: 'obsidian-on-amber' | 'bone' | 'amber-outline';
}

function MarqueeTrack({ items, baseVelocity, paused, hovered, tone }: MarqueeTrackProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 360 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1400], [0, 2.2], { clamp: false });
  const prefersReduced = useReducedMotion();
  const directionRef = useRef<number>(baseVelocity >= 0 ? 1 : -1);

  useAnimationFrame((_, delta) => {
    if (prefersReduced || paused) return;
    const speedScale = hovered ? 0.3 : 1;
    let moveBy = directionRef.current * Math.abs(baseVelocity) * speedScale * (delta / 1000);
    const vBoost = Math.min(Math.abs(velocityFactor.get()), 2.2);
    moveBy += directionRef.current * moveBy * vBoost;

    let next = baseX.get() + moveBy;
    if (next <= -50) next += 50;
    if (next >= 0) next -= 50;
    baseX.set(next);
  });

  const x = useTransform(baseX, (v) => `${v}%`);
  const repeated = [...items, ...items, ...items, ...items];

  const isAmberRibbon = tone === 'obsidian-on-amber';
  const isOutlined = tone === 'amber-outline';

  return (
    <div className="flex w-full overflow-clip whitespace-nowrap select-none">
      <motion.div style={{ x }} className="flex shrink-0 items-center will-change-transform">
        {repeated.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className={
              isAmberRibbon
                ? 'inline-flex items-center gap-5 pr-5 text-[0.95rem] font-bold tracking-[0.04em] tabular-nums sm:text-[1.05rem]'
                : 'inline-flex items-center gap-6 pr-6 text-[clamp(1.2rem,2.1vw,1.8rem)] font-bold tracking-[-0.025em]'
            }
            style={{
              fontFamily: 'var(--font-display)',
              color: isAmberRibbon
                ? 'var(--ink-on-accent)'
                : isOutlined
                  ? 'transparent'
                  : 'var(--ink-primary)',
              WebkitTextStroke: isOutlined ? '1px var(--accent)' : undefined,
              opacity: isOutlined ? 0.78 : 1,
            }}
          >
            <span>{label}</span>
            <span
              className={
                isAmberRibbon
                  ? 'inline-block h-3.5 w-[2px] -skew-x-18 opacity-55'
                  : 'inline-block h-1.5 w-1.5 -skew-x-12'
              }
              style={{
                backgroundColor: isAmberRibbon ? 'var(--ink-on-accent)' : 'var(--accent)',
              }}
              aria-hidden="true"
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

interface KineticMarqueeProps {
  primaryItems: readonly string[];
  secondaryItems?: readonly string[];
  variant: 'amber-ribbon' | 'tilted-dual';
}

export function KineticMarquee({ primaryItems, secondaryItems, variant }: KineticMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);

  if (variant === 'amber-ribbon') {
    return (
      <section
        aria-label="Jesu Fitness quick facts ticker"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative w-full overflow-clip py-2.5"
        style={{ backgroundColor: 'var(--accent)', color: 'var(--ink-on-accent)' }}
      >
        <MarqueeTrack
          items={primaryItems}
          baseVelocity={-3.6}
          paused={paused}
          hovered={hovered}
          tone="obsidian-on-amber"
        />

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play ticker' : 'Pause ticker'}
          className="absolute top-1/2 right-2.5 z-10 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[var(--radius-sm)] transition-opacity hover:opacity-100"
          style={{
            backgroundColor: 'var(--ink-on-accent)',
            color: 'var(--accent)',
          }}
        >
          {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
        </button>
      </section>
    );
  }

  return (
    <section
      aria-label="Training floor energy marquee"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full overflow-clip py-8"
      style={{ backgroundColor: 'var(--bg-void)' }}
    >
      <div
        className="-mx-6 grid gap-2 border-y py-3.5 -rotate-[1.35deg]"
        style={{
          borderColor: 'var(--border-whisper)',
          backgroundColor: 'var(--bg-surface)',
        }}
      >
        <MarqueeTrack
          items={primaryItems}
          baseVelocity={-2.8}
          paused={paused}
          hovered={hovered}
          tone="bone"
        />
        {secondaryItems && (
          <MarqueeTrack
            items={secondaryItems}
            baseVelocity={2.5}
            paused={paused}
            hovered={hovered}
            tone="amber-outline"
          />
        )}
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? 'Play marquee' : 'Pause marquee'}
        className="absolute right-4 bottom-3 z-10 inline-flex h-8 items-center gap-1.5 rounded-[var(--radius-sm)] border px-2.5 text-xs font-semibold transition-colors duration-150 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        style={{
          backgroundColor: 'var(--bg-nav-scrolled)',
          borderColor: 'var(--border-strong)',
          color: 'var(--ink-secondary)',
        }}
      >
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        <span>{paused ? 'Play' : 'Pause'}</span>
      </button>
    </section>
  );
}
