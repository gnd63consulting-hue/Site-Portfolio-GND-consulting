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
        // Design System GND Consulting — Stitch
        primary: {
          DEFAULT: '#1A1A1A',
          dark: '#000000',
          light: '#333333',
        },
        secondary: {
          DEFAULT: '#4A4A4A',
          dark: '#333333',
          light: '#666666',
        },
        accent: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          light: '#60A5FA',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          light: '#333333',
          lighter: '#4A4A4A',
        },
        gray: {
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
          DEFAULT: '#F3F4F6',
          light: '#D1D5DB',
          lighter: '#9CA3AF',
        },
        text: {
          DEFAULT: '#1A1A1A',
          main: '#1A1A1A',
          muted: '#64748B',
        },
        background: {
          light: '#FFFFFF',
          alt: '#F3F4F6',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
      },
      fontFamily: {
        'display': ['"Clash Display"', 'Syne', 'sans-serif'],
        'sans': ['Inter', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'syne': ['Syne', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'float-particle': 'float-particle 8s linear infinite',
        'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      boxShadow: {
        'modern': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'modern-hover': '0 25px 60px rgba(0, 0, 0, 0.12)',
        'glow-blue': '0 0 120px rgba(59, 130, 246, 0.2)',
      },
      borderRadius: {
        'modern': '24px',
      },
      backdropBlur: {
        'strong': '40px',
      },
      maxWidth: {
        'container': '1400px',
      },
    },
  },
  plugins: [],
};
