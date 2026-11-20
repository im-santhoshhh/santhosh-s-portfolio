/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Dark mode is keyed off `[data-theme="dark"]` on the html element so the
  // same attribute drives both the CSS-variable tokens (in globals.css) and
  // any optional `dark:` Tailwind variants.
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        debug: 'violet',
        // brand tokens — wired to CSS variables so they respect the active
        // theme. `bg-brgray` and `bg-brblue` keep working everywhere they
        // were already used (LetsTalk, AboutUs button hover, etc.) but now
        // automatically swap palettes when the theme changes.
        brgray: 'var(--color-btn-light-bg)',
        brblue: 'var(--color-accent)',
        // generic theme tokens with opacity support
        bg: 'rgb(var(--color-bg-rgb, 249 248 255) / <alpha-value>)',
        'bg-alt': 'rgb(var(--color-bg-alt-rgb, 255 255 255) / <alpha-value>)',
        fg: 'rgb(var(--color-text-rgb, 6 6 7) / <alpha-value>)',
        'fg-muted': 'rgb(var(--color-text-muted-rgb, 85 85 85) / <alpha-value>)',
        'fg-subtle': 'rgb(var(--color-text-subtle-rgb, 136 136 136) / <alpha-value>)',
        accent: 'rgb(var(--color-accent-rgb, 0 22 236) / <alpha-value>)',
        'accent-soft': 'rgb(var(--color-accent-soft-rgb, 217 230 255) / <alpha-value>)',
        'theme-border': 'rgb(var(--color-border-rgb, 217 230 255) / <alpha-value>)',
      },
    },
    fontFamily: {
      // Every named family resolves to Inter so any existing
      // `font-Aeonik`/`font-AeonikMedium`/`font-AeonikBold` class — and the
      // default `font-sans` — silently picks up the site-wide typeface
      // without touching every component.
      sans: ["var(--font-inter)", "Inter", "sans-serif"],
      Inter: ["var(--font-inter)", "Inter", "sans-serif"],
      Aeonik: ["var(--font-inter)", "Inter", "sans-serif"],
      AeonikBold: ["var(--font-inter)", "Inter", "sans-serif"],
      AeonikMedium: ["var(--font-inter)", "Inter", "sans-serif"],
    },
  },
  plugins: [
    require('tailwindcss-3d')
  ],
};
