/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // Safelist : classes générées dynamiquement (template literals dans data) que
  // le JIT scanner ne peut pas détecter statiquement. Utilisé par
  // InteractiveBentoGallery (`item.span` strings) qui définit col-span/row-span
  // par data au runtime.
  safelist: [
    { pattern: /^(sm|md):col-span-[1-4]$/ },
    { pattern: /^(sm|md):row-span-[1-4]$/ },
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        // === GND Charte CRÈME (refonte) ===
        bg: '#FDF6EE',
        'bg-alt': '#FFF3E8',
        surface: '#E8D8C5',
        // `text` as object → text-text / text-text-strong / text-text-muted
        // + bg-text-strong, border-text-strong, ring-text, shadow-text
        text: {
          DEFAULT: '#532418',
          strong: '#2A1810',
          muted: '#7D3E2C',
        },
        // `accent` as object → bg-accent / text-accent / text-accent-deep
        accent: {
          DEFAULT: '#FF954F',
          deep: '#E8772C',
          // Version « encre » : orange lisible sur fonds clairs (4,6:1 sur
          // crème #FDF6EE = WCAG AA texte normal). Appliquée automatiquement
          // via refonte.css dans les sections claires.
          ink: '#B4551C',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'mega': '-0.04em',
        'huge': '-0.05em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      maxWidth: {
        'site': '1400px',
      },
    },
  },
  plugins: [],
};
