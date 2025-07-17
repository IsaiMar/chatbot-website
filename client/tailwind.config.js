/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#F3F6FD',
          100: '#E3EAFD',
          300: '#4A65B4',
          500: '#1E3A8A',  // Base
          700: '#172D6C',
          900: '#0E1C47',
        },
        secondary: {
          100: '#D1FAE5',
          400: '#34D399',
          600: '#1F7A4B',
          700: '#15803D',  // Base
          800: '#166534',
          900: '#14532D',
        },
        tertiary: {
          100: '#F0F4C3',
          200: '#E6EE9C',
          300: '#DCE775',  // Base
          400: '#D4E157',
          600: '#C0CA33',
          800: '#9E9D24',
        }, 
        light: {
          50:  '#FFFFFF',  
          100: '#FAFAFA',  
          200: '#F5F5F5',   // base
          300: '#E5E5E5',   
          400: '#D4D4D4',  
          500: '#A3A3A3',  
          600: '#737373',  
          700: '#525252', 
    },
      },
    },
  },
  plugins: [],
}