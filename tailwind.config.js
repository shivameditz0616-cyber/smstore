/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: '#0B0D17', // Deep premium dark
        surface: 'rgba(255, 255, 255, 0.03)',
        'surface-hover': 'rgba(255, 255, 255, 0.08)',
        border: 'rgba(255, 255, 255, 0.08)',
        primary: '#8B5CF6', // Purple
        secondary: '#3B82F6', // Blue
        accent: '#EC4899', // Pink
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      }
    },
  },
  plugins: [],
}
