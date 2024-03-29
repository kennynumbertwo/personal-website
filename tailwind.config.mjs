/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-sans)"],
      mono: ["var(--font-mono)"],
    },
    fontSize: {
      12: "12px",
      14: "14px",
      16: "16px",
      18: "18px",
      20: "20px",
      22: "22px",
      24: "24px",
      26: "26px",
      28: "28px",
      30: "30px",
      32: "32px",
      34: "34px",
      36: "36px",
      38: "38px",
      40: "40px",
      42: "42px",
      44: "44px",
      46: "46px",
      48: "48px",
      56: "56px",
      64: "64px",
      72: "72px",
    },
    fontWeight: {
      100: "100",
      200: "200",
      300: "300",
      400: "400",
      500: "500",
      600: "600",
      700: "700",
      800: "800",
      900: "900",
    },
    letterSpacing: {
      "0pc": "0",
      "1pc": "0.01em",
      "2pc": "0.02em",
      "3pc": "0.03em",
      "4pc": "0.04em",
      "5pc": "0.05em",
      "6pc": "0.06em",
      "7pc": "0.07em",
      "8pc": "0.08em",
    },
    lineHeight: {
      none: "1.0",
      1.05: "1.05",
      1.1: "1.1",
      1.2: "1.2",
      1.3: "1.3",
      1.4: "1.4",
      1.5: "1.5",
      1.6: "1.6",
      1.8: "1.8",
      2: "2",
    },
    extend: {
      spacing: {
        11: "44px",
        13: "52px",
        15: "60px",
        17: "68px",
        18: "72px",
        19: "76px",
        25: "100px",
        30: "120px",
        35: "140px",
        40: "160px",
        45: "180px",
        50: "200px",
        55: "220px",
        60: "240px",
      },
      borderRadius: {
        2: "2px",
        4: "4px",
        5: "5px",
        6: "6px",
        8: "8px",
        10: "10px",
        20: "20px",
        40: "40px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionDuration: {
        350: "350ms",
        400: "400ms",
      },
      animation: {
        "fade-in-500": "fadeIn 500ms ease-in-out forwards",
        "fade-out-500": "fadeOut 500ms ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
        fadeOut: {
          "0%": { opacity: "100%" },
          "100%": { opacity: "0%" },
        },
        fadeOut60: {
          "0%": { opacity: "100%" },
          "100%": { opacity: "60%" },
        },
      },
    },
  },
  plugins: [],
};
