import { StorageAdapter } from './storage.service';

const THEME_KEY = 'gst_pro_theme';

export const ThemeService = {
  getTheme: () => {
    const saved = StorageAdapter.get(THEME_KEY);
    if (saved) return saved;
    // Default to dark per spec
    return 'dark';
  },

  setTheme: (theme) => {
    StorageAdapter.set(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  },

  init: () => {
    const current = ThemeService.getTheme();
    ThemeService.setTheme(current);
    return current;
  }
};
