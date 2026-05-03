import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = [
  { name: 'Classic', icon: '🐾', primary: '#1D9E75', nav: '#0f172a', bg: '#fcfcfd', card: '#ffffff', text: '#0f172a', textSec: '#475569', textMut: '#94a3b8', navText: '#ffffff', err: '#ef4444', errBg: '#fef2f2', warn: '#f59e0b', warnBg: '#fffbeb' },
  { name: 'Pastel', icon: '🧸', primary: '#ffb7b2', nav: '#ffdad9', bg: '#fff5f5', card: '#ffffff', text: '#6b4f4f', textSec: '#8a6e6e', textMut: '#b29a9a', navText: '#6b4f4f', err: '#ff8a8a', errBg: '#fff0f0', warn: '#ffcc80', warnBg: '#fff9f0' },
  { name: 'Dark', icon: '🌙', primary: '#818cf8', nav: '#1e293b', bg: '#0f172a', card: '#1e293b', text: '#f8fafc', textSec: '#94a3b8', textMut: '#64748b', navText: '#f8fafc', err: '#f87171', errBg: 'rgba(248, 113, 113, 0.1)', warn: '#fbbf24', warnBg: 'rgba(251, 191, 36, 0.1)' },
  { name: 'Neon', icon: '🌈', primary: '#f472b6', nav: '#4c1d95', bg: '#1e1b4b', card: '#312e81', text: '#fdf2f8', textSec: '#d1d5db', textMut: '#9ca3af', navText: '#fdf2f8', err: '#fb7185', errBg: 'rgba(251, 113, 133, 0.1)', warn: '#facc15', warnBg: 'rgba(250, 204, 21, 0.1)' },
  { name: 'Sunset', icon: '🌅', primary: '#fb923c', nav: '#7c2d12', bg: '#fff7ed', card: '#ffffff', text: '#431407', textSec: '#7c2d12', textMut: '#9a3412', navText: '#ffffff', err: '#dc2626', errBg: '#fef2f2', warn: '#ea580c', warnBg: '#fff7ed' },
  { name: 'Forest', icon: '🌲', primary: '#4ade80', nav: '#064e3b', bg: '#f0fdf4', card: '#ffffff', text: '#022c22', textSec: '#064e3b', textMut: '#14532d', navText: '#ffffff', err: '#dc2626', errBg: '#fef2f2', warn: '#16a34a', warnBg: '#f0fdf4' },
  { name: 'Ocean', icon: '🌊', primary: '#38bdf8', nav: '#0c4a6e', bg: '#f0f9ff', card: '#ffffff', text: '#082f49', textSec: '#0c4a6e', textMut: '#075985', navText: '#ffffff', err: '#ef4444', errBg: '#fef2f2', warn: '#0ea5e9', warnBg: '#f0f9ff' },
];

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('app-theme');
    return savedTheme || 'Classic';
  });

  useEffect(() => {
    const theme = themes.find(t => t.name === currentTheme) || themes[0];
    const root = document.documentElement;
    
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--bg-nav', theme.nav);
    root.style.setProperty('--bg-main', theme.bg);
    root.style.setProperty('--bg-card', theme.card);
    root.style.setProperty('--text-primary', theme.text);
    root.style.setProperty('--text-secondary', theme.textSec);
    root.style.setProperty('--text-muted', theme.textMut);
    root.style.setProperty('--text-on-nav', theme.navText);
    root.style.setProperty('--error', theme.err);
    root.style.setProperty('--error-bg', theme.errBg);
    root.style.setProperty('--warning', theme.warn);
    root.style.setProperty('--warning-bg', theme.warnBg);
    
    // Derived colors for specific themes if needed
    if (currentTheme === 'Dark' || currentTheme === 'Neon') {
      root.style.setProperty('--border-color', 'rgba(255,255,255,0.1)');
      root.style.setProperty('--text-secondary', 'rgba(248, 250, 252, 0.7)');
    } else {
      root.style.setProperty('--border-color', '#e5e7eb');
      root.style.setProperty('--text-secondary', '#475569');
    }

    localStorage.setItem('app-theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
