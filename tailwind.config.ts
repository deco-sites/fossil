import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    fontFamily: {
      "soleil-regular": "Soleil-Regular",
      "soleil-bold": "Soleil-Bold",
      "soleil-medium": "Soleil-Medium",
      "soleil-light": "Soleil-Light",
      "soleil-thin": "Soleil-Thin",
    },
    extend: {
      animation: {
        sliding: "sliding 30s linear infinite",
      },
      keyframes: {
        sliding: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      colors: {
        "primary": "#262626",
        "primary-content": "#282828",
        "warning": "#9D6E2D",
      },
      letterSpacing: {
        "one": "1px",
      },
      dropShadow: {
        "5xl": "0 0 1px #000",
      }
    },
  },
};
