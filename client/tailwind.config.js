/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1536px",
      },
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        background: {
          DEFAULT: "var(--bg)",
          alt: "var(--bg-alt)",
        },
        foreground: {
          DEFAULT: "var(--foreground)",
          muted: "var(--foreground-muted)",
        },
        border: "var(--border)",
        btn: {
          DEFAULT: "var(--btn-bg)",
          hover: "var(--btn-hover)",
          disabled: "var(--btn-disabled)",
        },
        input: {
          border: "var(--input-border)",
          bg: "var(--input-bg)",
        },
        card: {
          bg: "var(--card-bg)",
          border: "var(--card-border)",
        },
      },
    },
  },
  plugins: [],
};
