/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#09090B'
        },
        surface: {
          light: '#f9fafb', // Soft off-white
          dark: '#111827'
        },
        surfaceElevated: {
          light: '#ffffff', // Cards with shadow
          dark: '#1F2937'
        },
        textPrimary: {
          light: '#111827',
          dark: '#F9FAFB'
        },
        textSecondary: {
          light: '#4b5563',
          dark: '#9CA3AF'
        },
        accent: {
          DEFAULT: '#2563EB',
          dark: '#2563EB'
        },
        secondaryAccent: {
          DEFAULT: '#06B6D4',
          dark: '#06B6D4'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
