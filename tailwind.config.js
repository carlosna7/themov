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
        paper: '#0d0e10',
        surface: '#16181b',
        ink: '#eef0f2',
        muted: '#8a9097',
        line: '#24272b',
        accent: '#00a8ff',
        'accent-strong': '#66cbff',
        leaf: '#5fd68a',
      },
      fontFamily: {
        sans: ['var(--font-aeonik)', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
