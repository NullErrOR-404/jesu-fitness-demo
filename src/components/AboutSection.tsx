import { ABOUT_FACTS, PHOTO_ASSETS } from '../data/gymData';

export function AboutSection() {
  return (
    <section
      id="about"
      className="melt-void w-full py-[clamp(4.5rem,9vw,8.5rem)] gutter-x"
      style={{ color: 'var(--ink-primary)' }}
    >
      <div className="grid grid-cols-1 items-stretch gap-[clamp(2rem,4vw,4rem)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div
          className="min-h-[340px] overflow-clip rounded-[var(--radius-md)] border"
          style={{ borderColor: 'var(--border-whisper)' }}
        >
          <img
            src={PHOTO_ASSETS.aboutFloor}
            alt="Inside view of gym training floor with weights and machines"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between gap-8">
          <div>
            <h2 className="text-[clamp(2.15rem,4.2vw,3.7rem)] font-bold leading-[1.04] tracking-[-0.035em]">
              Small floor. Serious atmosphere.
            </h2>
            <p className="mt-4 max-w-[54ch] text-[1.05rem]" style={{ color: 'var(--ink-secondary)' }}>
              Every member at Jesu Fitness is here to train hard, re-rack the iron, and walk out stronger than yesterday.
            </p>
          </div>

          <dl className="border-t" style={{ borderColor: 'var(--border-whisper)' }}>
            {ABOUT_FACTS.map((fact) => (
              <div
                key={fact.label}
                className="grid grid-cols-1 items-baseline gap-2 border-b py-5 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] sm:gap-4"
                style={{ borderColor: 'var(--border-whisper)' }}
              >
                <dt
                  className="text-base font-semibold"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--ink-primary)' }}
                >
                  {fact.label}
                </dt>
                <dd className="text-[0.95rem]" style={{ color: 'var(--ink-secondary)' }}>
                  {fact.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
