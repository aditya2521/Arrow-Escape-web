import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0F172A',
        muted: '#64748B',
        soft: '#F1F5F9',
        play: '#2563EB',
        playDark: '#1D4ED8',
        accent: '#F59E0B',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.08)',
        pop: '0 12px 30px rgba(37, 99, 235, 0.28)',
      },
    },
  },
  plugins: [],
};

export default config;
