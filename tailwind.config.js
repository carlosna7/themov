/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#13110f',
        ink: '#ece3d2',
        muted: '#8c8376',
        line: '#2b2723',
        accent: '#e2513a',
      },
      fontFamily: {
        sans: ['var(--font-archivo)', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'serif'],
        mono: ['var(--font-plex-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
