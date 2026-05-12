import React from 'react';

// ── Chip (single or multi select) ──────────────────────────────────
export function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`chip-btn ${selected ? 'selected' : ''}`}
    >
      {label}
    </button>
  );
}

// ── Toggle Switch ──────────────────────────────────────────────────
export function Toggle({ enabled, onChange, label, sub }: { enabled: boolean; onChange: (v: boolean) => void; label: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-stone-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-stone-800">{label}</p>
        {sub && <p className="text-xs text-stone-500 mt-0.5">{sub}</p>}
      </div>
      <button
        type="button"
        className={`toggle-switch ${enabled ? 'on' : ''}`}
        onClick={() => onChange(!enabled)}
        aria-label={label}
      />
    </div>
  );
}

// ── Section Header ─────────────────────────────────────────────────
export function SectionHeader({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <div className="flex items-start gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 text-xl">
        {icon}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-stone-800">{title}</h2>
        <p className="text-sm text-stone-500">{sub}</p>
      </div>
    </div>
  );
}

// ── Field label ────────────────────────────────────────────────────
export function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <label className="block text-sm font-medium text-stone-700 mb-2">
      {children}
      {hint && <span className="font-normal text-stone-400 ml-1">{hint}</span>}
    </label>
  );
}

// ── Text Input ─────────────────────────────────────────────────────
export function Input({ value, onChange, placeholder, type = 'text' }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
    />
  );
}

// ── Select Dropdown ────────────────────────────────────────────────
export function Select({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full px-4 py-2.5 border border-stone-200 rounded-xl text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all appearance-none cursor-pointer"
    >
      <option value="">{placeholder || 'Select...'}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ── Card wrapper ───────────────────────────────────────────────────
export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-stone-200/70 p-5 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// ── Nav buttons ────────────────────────────────────────────────────
export function NavButtons({ onBack, onNext, nextLabel = 'Continue', isLast = false }: {
  onBack: () => void; onNext: () => void; nextLabel?: string; isLast?: boolean;
}) {
  return (
    <div className="flex justify-between mt-6">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 px-5 py-2.5 text-sm text-stone-500 hover:text-stone-700 border border-stone-200 rounded-xl bg-white transition-colors"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className={`flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white rounded-xl transition-all ${isLast ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-gold-600 hover:bg-gold-700'}`}
        style={{ backgroundColor: isLast ? '#15803d' : '#b47a2e' }}
      >
        {nextLabel} →
      </button>
    </div>
  );
}

// ── Chip grid ──────────────────────────────────────────────────────
export function ChipGrid({ options, selected, onToggle, single = false, cols = 3 }: {
  options: string[];
  selected: string | string[];
  onToggle: (val: string) => void;
  single?: boolean;
  cols?: number;
}) {
  const colClass: Record<number, string> = { 2: 'grid-cols-2', 3: 'grid-cols-3', 4: 'grid-cols-2 sm:grid-cols-4' };
  const isSelected = (v: string) => single ? selected === v : (selected as string[]).includes(v);
  return (
    <div className={`grid ${colClass[cols] || 'grid-cols-3'} gap-2`}>
      {options.map(o => (
        <Chip key={o} label={o} selected={isSelected(o)} onClick={() => onToggle(o)} />
      ))}
    </div>
  );
}

// ── File drop zone ─────────────────────────────────────────────────
export function FileDropZone({ label, accept, uploaded, onUpload }: {
  label: string; accept?: string; uploaded: boolean; onUpload: () => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div
        className={`file-drop-zone ${uploaded ? 'uploaded' : ''}`}
        onClick={onUpload}
      >
        {uploaded ? (
          <>
            <p className="text-2xl mb-1">✅</p>
            <p className="text-sm text-green-700 font-medium">Uploaded successfully</p>
          </>
        ) : (
          <>
            <p className="text-2xl mb-2">📁</p>
            <p className="text-sm text-stone-500">Drag & drop or <span className="text-amber-700 font-medium">browse</span></p>
            {accept && <p className="text-xs text-stone-400 mt-1">{accept}</p>}
          </>
        )}
      </div>
    </div>
  );
}
