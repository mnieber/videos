module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        delete: 'pulse 1s ease-in-out infinite',
      },
      colors: {
        transparent: 'transparent',
        bodyText: 'hsl(210, 20%, 25%)',
      },
    },
  },
  plugins: [],
};
