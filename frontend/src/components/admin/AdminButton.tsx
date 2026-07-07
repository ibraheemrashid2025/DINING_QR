import { ButtonHTMLAttributes, ReactNode } from 'react';

type AdminButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
};

const variants = {
  primary: 'bg-orange-600 text-white hover:bg-orange-500',
  secondary: 'border border-stone-700 bg-black/30 text-stone-200 hover:border-orange-500',
  danger: 'bg-red-700 text-white hover:bg-red-600',
};

export function AdminButton({ children, className = '', variant = 'primary', ...props }: AdminButtonProps) {
  return (
    <button
      className={`rounded-full px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
