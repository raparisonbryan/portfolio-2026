export const themeInitScript = `
(function() {
  const STORAGE_KEY = 'portfolio-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  function getInitialTheme() {
    // Priorité: localStorage > light (thème de base blanc)
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) {
      return stored;
    }
    return LIGHT;
  }

  const theme = getInitialTheme();
  document.documentElement.setAttribute('data-theme', theme);

  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, theme);
  }
})();
`;

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'portfolio-theme';

export function getTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  
  return 'light';
}

export function setTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function toggleTheme(): Theme {
  const current = getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}


