/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#352F36",
        primary: "#F4CE14",
        primary2: "#F8F8FF",
        accent: "#5928e5",
        thead: "#e2e8f0",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        sh: "0px 2px 3px -1px rgba(0, 0, 0, .1), 0px 1px 0px 0px rgba(25, 28, 33, .02), 0px 0px 0px 1px rgba(25, 28, 33, .08)",
      },
    },
  },
  plugins: [],
};
