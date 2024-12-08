import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2563EB",
          foreground: "#F3F4F6",
        },
        secondary: {
          DEFAULT: "#111827",
          foreground: "#F3F4F6",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#F3F4F6",
        },
        success: {
          DEFAULT: "#22C55E",
          foreground: "#F3F4F6",
        },
        muted: {
          DEFAULT: "#1F2937",
          foreground: "#9CA3AF",
        },
        accent: {
          DEFAULT: "#2563EB",
          foreground: "#F3F4F6",
        },
        popover: {
          DEFAULT: "#111827",
          foreground: "#F3F4F6",
        },
        card: {
          DEFAULT: "#111827",
          foreground: "#F3F4F6",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fold-out": {
          "0%": { 
            transform: "scale(0.9)",
            opacity: "0"
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "0.8"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "fade-in": {
          "0%": { 
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": { 
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-out": {
          "0%": { 
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": { 
            opacity: "0",
            transform: "translateY(10px)"
          }
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;