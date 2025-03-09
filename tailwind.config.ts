import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          100: "var(--primary-100)",
          150: "var(--primary-150)",
          200: "var(--primary-200)",
          500: "var(--primary-500)",
        },
        secondary: {
          500: "var(--secondary-500)",
        },
        gray: {
          100: "var(--gray-100)",
        },
      },
    },
  },
  plugins: [],
});

export default config;
