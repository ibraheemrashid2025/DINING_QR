type SteakhouseLogoProps = {
  className?: string;
  compact?: boolean;
  mobileTight?: boolean;
};

export function SteakhouseLogo({ className = '', compact = false, mobileTight = false }: SteakhouseLogoProps) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        aria-hidden="true"
        className={compact ? 'h-11 w-11' : mobileTight ? 'h-12 w-12 sm:h-16 sm:w-16' : 'h-16 w-16'}
        fill="none"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" fill="#130908" r="56" stroke="#f97316" strokeOpacity="0.35" strokeWidth="3" />
        <path
          d="M28 43C16 34 13 21 18 10C27 24 41 29 54 28M92 43C104 34 107 21 102 10C93 24 79 29 66 28"
          stroke="#991b1b"
          strokeLinecap="round"
          strokeWidth="10"
        />
        <path
          d="M32 59C32 41 44 30 60 30C76 30 88 41 88 59C88 78 76 99 60 105C44 99 32 78 32 59Z"
          fill="#7f1d1d"
        />
        <path d="M43 58C47 51 53 48 60 48C67 48 73 51 77 58L68 87H52L43 58Z" fill="#0b0908" />
        <path d="M45 70C38 72 35 78 36 86C45 84 50 79 51 72" fill="#f97316" opacity="0.9" />
        <path d="M75 70C82 72 85 78 84 86C75 84 70 79 69 72" fill="#f97316" opacity="0.9" />
        <path d="M48 92C55 96 65 96 72 92" stroke="#fff7ed" strokeLinecap="round" strokeWidth="4" />
        <path d="M49 56H71" stroke="#fff7ed" strokeLinecap="round" strokeOpacity="0.8" strokeWidth="4" />
        <circle cx="50" cy="66" fill="#fff7ed" r="3" />
        <circle cx="70" cy="66" fill="#fff7ed" r="3" />
      </svg>
      <span className="leading-none">
        <span className="block text-[10px] font-black uppercase tracking-[0.28em] text-orange-300">
          Burgers & Steaks
        </span>
        <span
          className={
            compact
              ? 'block text-lg font-black uppercase tracking-tight text-stone-50'
              : mobileTight
                ? 'block text-2xl font-black uppercase tracking-tight text-stone-50 sm:text-3xl'
                : 'block text-3xl font-black uppercase tracking-tight text-stone-50'
          }
        >
          Ember & Oak
        </span>
      </span>
    </div>
  );
}
