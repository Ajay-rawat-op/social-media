 /** @type {import('tailwindcss').Config} */
export default {
   content: ["./src/**/*.{html,js}"],
   theme: {
     extend: {
      colors: {
        gray: { 100: '#f5f7fa' },
        indigo: { 400: '#7c3aed', 500: '#5b21b6', 600: '#4c1d95' },
      },
     },
   },
   darkMode: 'class', // Enable dark mode support
   plugins: [require('@tailwindcss/line-clamp')],
 }