import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#3b82f6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1e293b",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#0ea5e9",
          foreground: "#ffffff",
        },
        outline: "#334155",
      },
    },
  },
  plugins: [],
};
export default config;
