import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, ChevronDown, Search, X } from 'lucide-react';

export interface DropdownOption {
  value: string;
  label: string;
  meta?: string;
}

interface PremiumDropdownProps {
  label: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}

export function PremiumDropdown({ label, value, options, onChange }: PremiumDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.findIndex((o) => o.value === value))
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const listId = useId();
  const labelId = useId();

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
      } else {
        setActiveIndex((i) => (i + 1) % options.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else {
        setActiveIndex((i) => (i - 1 + options.length) % options.length);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      if (open) {
        e.preventDefault();
        const opt = options[activeIndex];
        if (opt) onChange(opt.value);
        setOpen(false);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <span id={labelId} className="text-[0.9375rem] font-semibold">
        {label}
      </span>

      <button
        type="button"
        role="combobox"
        aria-labelledby={labelId}
        aria-expanded={open}
        aria-controls={listId}
        aria-haspopup="listbox"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className="field-input flex cursor-pointer items-center justify-between gap-3 text-left"
        style={{
          borderColor: open ? 'var(--accent)' : 'var(--border-input)',
        }}
      >
        <span className="truncate font-medium">{selected?.label}</span>
        <span className="flex shrink-0 items-center gap-2">
          {selected?.meta && (
            <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--accent)' }}>
              {selected.meta}
            </span>
          )}
          <ChevronDown
            size={17}
            aria-hidden="true"
            className="transition-transform duration-200"
            style={{
              color: 'var(--ink-secondary)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            aria-labelledby={labelId}
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
            className="absolute top-[calc(100%+6px)] right-0 left-0 z-40 max-h-64 origin-top overflow-y-auto rounded-[var(--radius-sm)] border p-1.5 shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-strong)',
            }}
          >
            {options.map((opt, idx) => {
              const isSelected = opt.value === value;
              const isActive = idx === activeIndex;
              return (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  className="flex min-h-[42px] cursor-pointer items-center justify-between gap-3 rounded-[3px] px-3 py-2 text-sm transition-colors duration-100"
                  style={{
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                    color: isSelected ? 'var(--accent)' : 'var(--ink-primary)',
                  }}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Check
                      size={15}
                      aria-hidden="true"
                      style={{ opacity: isSelected ? 1 : 0, color: 'var(--accent)' }}
                    />
                    <span>{opt.label}</span>
                  </span>
                  {opt.meta && (
                    <span className="text-xs font-semibold tabular-nums" style={{ color: 'var(--ink-secondary)' }}>
                      {opt.meta}
                    </span>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

interface PremiumComboboxProps {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export function PremiumCombobox({
  label,
  value,
  options,
  onChange,
  placeholder = 'Search or type your goal',
}: PremiumComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputId = useId();
  const listId = useId();

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        if (!query.trim()) setQuery(value);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open, query, value]);

  const trimmed = query.trim().toLowerCase();
  const filtered = trimmed
    ? options.filter((opt) => opt.toLowerCase().includes(trimmed))
    : [...options];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      if (filtered.length > 0) setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(true);
      if (filtered.length > 0) setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter' && open) {
      e.preventDefault();
      const picked = filtered[activeIndex] ?? query.trim();
      if (picked) {
        onChange(picked);
        setQuery(picked);
      }
      setOpen(false);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[0.9375rem] font-semibold">
        {label}
      </label>

      <div className="relative">
        <Search
          size={16}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          style={{ color: 'var(--ink-secondary)' }}
        />
        <input
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className="field-input pr-9 pl-9"
          style={{ borderColor: open ? 'var(--accent)' : 'var(--border-input)' }}
        />
        {query && (
          <button
            type="button"
            aria-label="Clear goal filter"
            onClick={() => {
              setQuery('');
              setOpen(true);
            }}
            className="absolute top-1/2 right-2.5 inline-flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-sm transition-colors hover:text-[var(--ink-primary)]"
            style={{ color: 'var(--ink-secondary)' }}
          >
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={listId}
            role="listbox"
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
            className="absolute top-[calc(100%+6px)] right-0 left-0 z-40 max-h-56 origin-top overflow-y-auto rounded-[var(--radius-sm)] border p-1.5 shadow-2xl"
            style={{
              backgroundColor: 'var(--bg-elevated)',
              borderColor: 'var(--border-strong)',
            }}
          >
            {filtered.length > 0 ? (
              filtered.map((opt, idx) => {
                const isSelected = opt === value;
                const isActive = idx === activeIndex;
                return (
                  <li
                    key={opt}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onChange(opt);
                      setQuery(opt);
                      setOpen(false);
                    }}
                    className="flex min-h-[40px] cursor-pointer items-center gap-2 rounded-[3px] px-3 py-2 text-sm font-medium transition-colors duration-100"
                    style={{
                      backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                      color: isSelected ? 'var(--accent)' : 'var(--ink-primary)',
                    }}
                  >
                    <Check
                      size={15}
                      aria-hidden="true"
                      style={{ opacity: isSelected ? 1 : 0, color: 'var(--accent)' }}
                    />
                    <span>{opt}</span>
                  </li>
                );
              })
            ) : (
              <li
                role="option"
                aria-selected={false}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(query.trim());
                  setOpen(false);
                }}
                className="flex min-h-[40px] cursor-pointer items-center justify-between rounded-[3px] px-3 py-2 text-sm"
                style={{ color: 'var(--accent)' }}
              >
                <span>Use custom goal: &ldquo;{query.trim()}&rdquo;</span>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
