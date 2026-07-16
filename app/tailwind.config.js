export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        violet: { 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9' },
        gray: { 900: '#18181b', 950: '#09090b' }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] },
      borderRadius: { '2xl': '16px', '3xl': '24px' },
      backdropBlur: { xs: '2px' }
    }
  },
  plugins: []
};
