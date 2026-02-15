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
        // Stitch Design System — GND Consulting
        primary: {
          DEFAULT: '#1A1A1A',
          dark: '#000000',
          light: '#4A4A4A',
        },
        secondary: {
          DEFAULT: '#4A4A4A',
          dark: '#333333',
          light: '#6B6B6B',
        },
        accent: {
          DEFAULT: '#3B82F6',
          dark: '#2563eb',
          light: '#60a5fa',
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
          'bright-light': '#F3F4F6',
          'bright-lighter': '#e2e8f0',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        text: {
          DEFAULT: '#1A1A1A',
          muted: '#64748B',
          main: '#1A1A1A',
        },
        'background-light': '#FFFFFF',
        'background-alt': '#F3F4F6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        'display': ['"Clash Display"', 'Syne', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'float-particle': 'float-particle 8s linear infinite',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
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
      maxWidth: {
        'site': '1400px',
      },
    },
  },
  plugins: [],
};
