/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
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
        // Nouvelle palette moderne
        primary: {
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          light: '#60a5fa',
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
          light: '#38bdf8',
        },
        accent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
          light: '#fb923c',
        },
        dark: {
          DEFAULT: '#ffffff',
          light: '#f1f5f9',
          lighter: '#e2e8f0',
        },
        gray: {
          DEFAULT: '#f8fafc',
          light: '#cbd5e1',
          lighter: '#94a3b8',
          bright: '#ffffff',
          'bright-light': '#f1f5f9',
          'bright-lighter': '#e2e8f0',
        },
        text: {
          DEFAULT: '#1e293b',
          muted: '#475569',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'float-particle': 'float-particle 8s linear infinite',
      },
      boxShadow: {
        'modern': '0 10px 40px rgba(0, 0, 0, 0.2)',
        'modern-hover': '0 25px 60px rgba(0, 0, 0, 0.3)',
        'glow-primary': '0 0 30px rgba(59, 130, 246, 0.4)',
        'glow-secondary': '0 0 30px rgba(16, 185, 129, 0.4)',
      },
      borderRadius: {
        'modern': '24px',
      },
      backdropBlur: {
        'strong': '40px',
      },
    },
  },
  plugins: [],
};
