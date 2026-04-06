import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const THEME_KEY = 'mintlify-theme';

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const currentTheme =
      (document.documentElement.getAttribute('data-theme') as Theme | null) ??
      'light';
    setTheme(currentTheme);

    const handleThemeChange = (event: Event) => {
      const nextTheme = (event as CustomEvent<Theme>).detail;
      if (nextTheme) setTheme(nextTheme);
    };

    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={() => {
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        {theme === 'dark' ? (
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <circle cx="8" cy="8" r="3.25" strokeWidth="1.5" />
            <path
              d="M8 1.5V3M8 13V14.5M1.5 8H3M13 8H14.5M3.4 3.4L4.45 4.45M11.55 11.55L12.6 12.6M12.6 3.4L11.55 4.45M4.45 11.55L3.4 12.6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="currentColor">
            <path d="M9.52 1.25a.75.75 0 0 1 .82.96 5.75 5.75 0 0 0 7.45 7.45.75.75 0 0 1 .96.82A7.25 7.25 0 1 1 9.52 1.25Z" />
          </svg>
        )}
      </span>
      <span className="theme-toggle__label">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
