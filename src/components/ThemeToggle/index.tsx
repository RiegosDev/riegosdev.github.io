'use client';

import * as React from 'react';
import {
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const {
    setTheme,
    theme,
    systemTheme,
  } = useTheme();

  // Resolve hidratação para evitar mismatch entre server e client
  const [mounted, setMounted] =
    React.useState(false);
  React.useEffect(
    () => setMounted(true),
    [],
  );

  if (!mounted) {
    return (
      <div className='h-9 w-9 rounded-full bg-white/5 border border-white/10 animate-pulse'></div>
    );
  }

  const currentTheme =
    theme === 'system'
      ? systemTheme
      : theme;

  return (
    <button
      onClick={() =>
        setTheme(
          currentTheme === 'dark'
            ? 'light'
            : 'dark',
        )
      }
      className='relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors shadow-sm'
      aria-label='Alternar tema'>
      <Sun className='h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-400' />
      <Moon className='absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-emerald-400' />
    </button>
  );
}
