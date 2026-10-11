/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: {
          DEFAULT: "var(--surface)",
          elevated: "var(--surface-elevated)",
        },
        border: "var(--border)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
        },
        claude: {
          50: "#FAF8F5",
          100: "#F5ECE4",
          200: "#EED7C5",
          300: "#E4BFA6",
          400: "#E29479",
          500: "#DA7756",
          600: "#C86443",
          700: "#A94E31",
          800: "#7C361E",
          900: "#4D2111",
          950: "#181715",
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "Roboto", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'card': '0 4px 12px 0 rgba(0, 0, 0, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
};
