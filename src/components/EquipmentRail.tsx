import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'motion/react';
import { EQUIPMENT_LIST, type EquipmentItem } from '../data/gymData';

interface StackPose {
  x: string;
  y: number;
  rotate: number;
  scale: number;
  zIndex: number;
}

// Unevenly stacked central pile at scroll=0 -> flush 5-column fluid grid at scroll=1
const STACK_POSES: StackPose[] = [
  { x: '205%', y: -14, rotate: -7, scale: 0.95, zIndex: 1 },
  { x: '104%', y: 10, rotate: 5, scale: 0.97, zIndex: 2 },
  { x: '-2%', y: -5, rotate: -3, scale: 1.0, zIndex: 5 },
  { x: '-102%', y: 12, rotate: 5.5, scale: 0.97, zIndex: 3 },
  { x: '-204%', y: -8, rotate: -4.5, scale: 0.95, zIndex: 4 },
];

function DeckCard({
  item,
  index,
  progress,
}: {
  item: EquipmentItem;
  index: number;
  progress: MotionValue<number>;
}) {
  const prefersReduced = useReducedMotion();
  const pose = STACK_POSES[index] ?? STACK_POSES[2];

  // Direct 1:1 scroll mapping (no extra spring delay stacked on top of Lenis)
  const x = useTransform(progress, [0, 1], [prefersReduced ? '0%' : pose.x, '0%']);
  const y = useTransform(progress, [0, 1], [prefersReduced ? 0 : pose.y, 0]);
  const rotate = useTransform(progress, [0, 1], [prefersReduced ? 0 : pose.rotate, 0]);
  const scale = useTransform(progress, [0, 1], [prefersReduced ? 1 : pose.scale, 1]);

  return (
    <motion.article
      style={{
        x,
        y,
        rotate,
        scale,
        zIndex: pose.zIndex,
        borderColor: 'var(--border-whisper)',
        backgroundColor: 'var(--bg-elevated)',
        color: 'var(--ink-primary)',
      }}
      className="flex flex-col overflow-clip rounded-[var(--radius-md)] border transition-[border-color] duration-150 hover:border-[var(--accent)] will-change-transform"
    >
      <div className="h-[210px] w-full shrink-0 overflow-clip" style={{ backgroundColor: 'var(--bg-void)' }}>
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.02em]">
          {item.name}
        </h3>
        <p className="text-[0.9rem] leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

export function EquipmentRail() {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Natural non-sticky scroll range: fans smoothly as cards rise from bottom to center
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ['start 94%', 'center 56%'],
  });

  return (
    <section
      id="equipment"
      className="melt-surface w-full overflow-clip py-[clamp(5rem,9vw,8.5rem)] gutter-x"
      style={{ color: 'var(--ink-primary)' }}
    >
      <div className="mb-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 items-end gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        <h2 className="text-[clamp(2.15rem,4.1vw,3.75rem)] font-bold leading-[1.03] tracking-[-0.035em]">
          Everything that builds real strength.
        </h2>
        <p
          className="max-w-[48ch] text-[1.025rem] lg:justify-self-end lg:text-right"
          style={{ color: 'var(--ink-secondary)' }}
        >
          A compact, disciplined training floor equipped with the essential free weights and machines that deliver results.
        </p>
      </div>

      {/* Desktop: Non-sticky 1:1 scroll unfold from uneven stack into flush 5-column fluid grid */}
      <div ref={gridRef} className="hidden grid-cols-5 items-stretch gap-5 lg:grid">
        {EQUIPMENT_LIST.map((item, idx) => (
          <DeckCard key={item.id} item={item} index={idx} progress={scrollYProgress} />
        ))}
      </div>

      {/* Mobile / Tablet: Snappy stacked-to-vertical reveal */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:hidden">
        {EQUIPMENT_LIST.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={prefersReduced ? false : { opacity: 0.6, y: 20, rotate: idx % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col overflow-clip rounded-[var(--radius-md)] border"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-elevated)',
              color: 'var(--ink-primary)',
            }}
          >
            <div className="h-[220px] w-full shrink-0 overflow-clip" style={{ backgroundColor: 'var(--bg-void)' }}>
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <h3 className="text-xl font-semibold tracking-[-0.02em]">{item.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>
                {item.description}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
