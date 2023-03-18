module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  prefix: 'tw-',
  content: [
    "./src/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./docs/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./guides/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
  corePlugins: {
    preflight: false,
  },
};