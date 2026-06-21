import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeService } from '../core/services/theme.service';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {}
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState('dark');

  useEffect(() => {
    const initialTheme = ThemeService.init();
    setThemeState(initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    ThemeService.setTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
