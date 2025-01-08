import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        keyframes: {
          modalIn: {
            '0%': { transform: 'scale(0.95)', opacity: '0' },
            '100%': { transform: 'scale(1)', opacity: '1' },
          }
        },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    
    animation: {
      'modal-in': 'modalIn 300ms ease-in-out',
    }
  }
  },
  plugins: [],
} satisfies Config;


// extend: {
//   keyframes: {
//     modalIn: {
//       '0%': { transform: 'scale(0.95)', opacity: '0' },
//       '100%': { transform: 'scale(1)', opacity: '1' },
//     }
//   },
//   animation: {
//     'modal-in': 'modalIn 300ms ease-out',
//   }
// }