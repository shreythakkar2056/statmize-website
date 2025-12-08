import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
 theme: {
  extend: {
    fontFamily: {
      // This string must match the variable name in layout.tsx
      sans: ['var(--font-plus-jakarta-sans)', 'sans-serif'], 
    },
  },
},
  plugins: [],
};
export default config;