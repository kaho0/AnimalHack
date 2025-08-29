import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#2f3e34",
        moss: "#556b57",
        sage: "#9fb29b",
        clay: "#b08a68",
        sand: "#e8e1d6",
        cream: "#f3efe8",
        wine: "#6a3f3b",
        gold: "#c8a96b",
      },
      fontFamily: {
        // Primary elegant serif font for all headings and important text
        serif: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        // Secondary serif for body text and secondary headings
        serifDisplay: ['"Playfair Display"', "ui-serif", "Georgia", "serif"],
        // Sans-serif as fallback for UI elements and small text
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sourceSans: [
          "Source Sans Pro",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
        sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.005em" }],
        base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.002em" }],
        lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0.001em" }],
        xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "0em" }],
        "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.01em" }],
        "3xl": [
          "1.875rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.02em" },
        ],
        "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.02em" }],
        "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "6xl": ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.03em" }],
        "7xl": ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.04em" }],
        "8xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.04em" }],
        "9xl": ["8rem", { lineHeight: "1", letterSpacing: "-0.05em" }],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
        wider: "0.05em",
        widest: "0.1em",
        "ultra-wide": "0.15em",
      },
      lineHeight: {
        "extra-tight": "1.1",
        "super-tight": "1.05",
        "ultra-tight": "1",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.08)",
        medium: "0 12px 32px rgba(0,0,0,0.12)",
        large: "0 20px 40px rgba(0,0,0,0.15)",
        xl: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        "3xl": "0 35px 60px -12px rgba(0, 0, 0, 0.35)",
        "inner-soft": "inset 0 2px 4px rgba(0,0,0,0.06)",
        "glow-gold": "0 0 20px rgba(200, 169, 107, 0.3)",
        "glow-sage": "0 0 20px rgba(159, 178, 155, 0.3)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.5rem",
        xl4: "2rem",
      },
      spacing: {
        "18": "4.5rem",
        "88": "22rem",
        "128": "32rem",
        "144": "36rem",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "fade-in-down": "fadeInDown 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "text-reveal": "textReveal 0.8s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        textReveal: {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      transitionDuration: {
        "2000": "2000ms",
        "3000": "3000ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
        "ease-out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "ease-out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-mesh": "linear-gradient(45deg, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(300px, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(280px, 1fr))",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
};

export default config;
