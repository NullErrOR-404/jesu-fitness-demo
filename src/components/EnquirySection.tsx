import { useState, type FormEvent, type RefObject } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BATCHES, GOALS, PACKAGES, formatPackageLabel } from '../data/gymData';
import { PremiumCombobox, PremiumDropdown, type DropdownOption } from './PremiumSelect';

interface EnquirySectionProps {
  selectedPackageLabel: string;
  onPackageChange: (label: string) => void;
  nameInputRef: RefObject<HTMLInputElement | null>;
}

interface TrialPassData {
  code: string;
  name: string;
  phone: string;
  goal: string;
  plan: string;
  batch: string;
}

const ALL_PACKAGE_OPTIONS: DropdownOption[] = [
  ...PACKAGES.map((p) => ({
    value: formatPackageLabel(p.tier, false),
    label: `${p.tier} (Gym Access)`,
    meta: `₹${p.basePrice.toLocaleString('en-IN')}`,
  })),
  ...PACKAGES.map((p) => ({
    value: formatPackageLabel(p.tier, true),
    label: `${p.tier} + Personal Training`,
    meta: `₹${p.ptPrice.toLocaleString('en-IN')}`,
  })),
];

const BATCH_OPTIONS: DropdownOption[] = BATCHES.map((b) => ({
  value: b.value,
  label: b.label,
  meta: b.meta,
}));

export function EnquirySection({
  selectedPackageLabel,
  onPackageChange,
  nameInputRef,
}: EnquirySectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [goal, setGoal] = useState<string>(GOALS[0]);
  const [batch, setBatch] = useState<string>(BATCHES[0].value);
  const [pass, setPass] = useState<TrialPassData | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const code = `JF-${Math.floor(1000 + Math.random() * 9000)}`;
    setPass({
      code,
      name: name.trim(),
      phone: phone.trim(),
      goal: goal.trim() || GOALS[0],
      plan: selectedPackageLabel,
      batch,
    });
  };

  const whatsappHref = pass
    ? `https://wa.me/919876543210?text=${encodeURIComponent(
        `Hi Jesu Fitness, I want to claim my Free Trial Pass (${pass.code}). Name: ${pass.name}, Plan: ${pass.plan}, Batch: ${pass.batch}, Goal: ${pass.goal}.`
      )}`
    : '#';

  return (
    <section
      id="enquiry"
      className="melt-surface w-full py-[clamp(5rem,9vw,8.5rem)] gutter-x"
      style={{ color: 'var(--ink-primary)' }}
    >
      <div className="grid grid-cols-1 items-start gap-[clamp(2.5rem,5vw,5rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <h2 className="text-[clamp(2.15rem,4.3vw,3.8rem)] font-bold leading-[1.04] tracking-[-0.035em]">
            Step onto the floor. First session is free.
          </h2>
          <p className="mt-5 max-w-[50ch] text-[1.05rem]" style={{ color: 'var(--ink-secondary)' }}>
            Pick your preferred package and batch. Submit to generate an instant Guest Trial Pass or send your details straight to our WhatsApp desk.
          </p>
        </div>

        <div>
          <AnimatePresence mode="wait" initial={false}>
            {!pass ? (
              <motion.form
                key="enquiry-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
                onSubmit={handleSubmit}
                noValidate
                className="grid gap-5 rounded-[var(--radius-md)] border p-[clamp(1.5rem,3.2vw,2.75rem)]"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-whisper)',
                }}
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="fullName" className="text-[0.9375rem] font-semibold">
                      Full name
                    </label>
                    <input
                      ref={nameInputRef}
                      id="fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      minLength={2}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Arjun Kumar"
                      className="field-input"
                    />
                    <span className="field-error">Enter your name (at least 2 characters).</span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone" className="text-[0.9375rem] font-semibold">
                      Phone number
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      pattern="[0-9+\-\s]{10,15}"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="field-input"
                    />
                    <span className="field-error">Enter a valid 10-digit phone number.</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <PremiumCombobox
                    label="Primary goal"
                    value={goal}
                    options={GOALS}
                    onChange={setGoal}
                    placeholder="Search or type your goal"
                  />

                  <PremiumDropdown
                    label="Preferred package"
                    value={selectedPackageLabel}
                    options={ALL_PACKAGE_OPTIONS}
                    onChange={onPackageChange}
                  />
                </div>

                <PremiumDropdown
                  label="Preferred batch"
                  value={batch}
                  options={BATCH_OPTIONS}
                  onChange={setBatch}
                />

                <button type="submit" className="btn-primary mt-1 w-full">
                  Get free trial pass
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="trial-pass"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                aria-live="polite"
                className="grid gap-6 rounded-[var(--radius-md)] border p-[clamp(1.5rem,3.2vw,2.75rem)]"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--accent)',
                }}
              >
                <div
                  className="flex flex-wrap items-baseline justify-between gap-3 border-b border-dashed pb-5"
                  style={{ borderColor: 'var(--border-strong)' }}
                >
                  <div>
                    <h3 className="text-2xl font-bold tracking-[-0.025em]">Jesu Fitness Guest Pass</h3>
                    <p className="mt-1 text-sm" style={{ color: 'var(--ink-secondary)' }}>
                      Show this pass at the Alandur desk for 1 free workout session.
                    </p>
                  </div>
                  <span
                    className="text-base font-bold tabular-nums"
                    style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)' }}
                  >
                    {pass.code}
                  </span>
                </div>

                <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm" style={{ color: 'var(--ink-secondary)' }}>
                      Member name
                    </dt>
                    <dd className="mt-1 text-base font-semibold">{pass.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm" style={{ color: 'var(--ink-secondary)' }}>
                      Phone
                    </dt>
                    <dd className="mt-1 text-base font-semibold tabular-nums">{pass.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm" style={{ color: 'var(--ink-secondary)' }}>
                      Selected plan
                    </dt>
                    <dd className="mt-1 text-base font-semibold">{pass.plan}</dd>
                  </div>
                  <div>
                    <dt className="text-sm" style={{ color: 'var(--ink-secondary)' }}>
                      Batch &amp; goal
                    </dt>
                    <dd className="mt-1 text-base font-semibold">
                      {pass.batch}, {pass.goal}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Confirm on WhatsApp
                  </a>
                  <button type="button" onClick={() => setPass(null)} className="btn-secondary">
                    Edit enquiry
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
