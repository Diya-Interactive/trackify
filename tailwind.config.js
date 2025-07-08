/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4f46e5',
          dark: '#6366f1',
        },
        secondary: {
          light: '#e0e7ff',
          dark: '#1e293b',
        },
        background: {
          light: '#ffffff',
          dark: '#0f172a',
        },
        font: {
          light: '#111827',
          dark: '#f9fafb',
        },
      },
    },
  },
  plugins: [],
};
