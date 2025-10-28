/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(280 30% 98%)',
        foreground: 'hsl(280 10% 15%)',
        card: 'hsl(0 0% 100%)',
        'card-foreground': 'hsl(280 10% 15%)',
        primary: {
          DEFAULT: 'hsl(270 60% 65%)',
          foreground: 'hsl(0 0% 100%)',
        },
        secondary: {
          DEFAULT: 'hsl(160 50% 85%)',
          foreground: 'hsl(280 10% 15%)',
        },
        accent: {
          DEFAULT: 'hsl(20 90% 85%)',
          foreground: 'hsl(280 10% 15%)',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, hsl(270 60% 65%), hsl(290 55% 75%))',
        'gradient-secondary': 'linear-gradient(135deg, hsl(160 50% 85%), hsl(180 45% 90%))',
      },
      boxShadow: {
        soft: '0 4px 20px -4px hsl(270 60% 65% / 0.15)',
        card: '0 2px 12px -2px hsl(280 20% 50% / 0.08)',
      },
      borderRadius: {
        lg: '1rem',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
}