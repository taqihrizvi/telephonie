/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/layouts/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Worksans: ['Work Sans', 'sans-serif'],
        Rajdhani: ['Rajdhani', 'sans-serif'],
      },
      textColors: {
        success: '#439F6E',
        primary: '#1C1D1D',
        secondary: '#003A70',
        default: '#0083B8',
        error: '#F93232',
        validation: '#605DEC',
        Stroke_Focused: '#F845FC',
        disable: '#AAAAAA',
        blue: '#108ABC',
        linkDisabled: '#C4C4C4',
        dark: '#1F2024',
      },
      color: {
        border: '#EFEFEF',
      },
      backgroundColor: {
        primary: '#005070',
        Btn: '#0083B8',
        disable: '#EFEFEF',
        CallBtn: '#40AF6C',
      },
    },
  },
  plugins: [],
};
