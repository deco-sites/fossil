import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    fontFamily: {
      soleil: ["soleil", "Soleil", "sans-serif", "Helvetica Neue", "Helvetica"],
      roboto: ["Roboto Condensed", "sans-serif", "Helvetica Neue", "Helvetica"],
      montserrat: ["Montserrat", "sans-serif", "Helvetica Neue", "Helvetica"],
      scoutCond: ["Scout Condensed", "Roboto Condensed", "sans-serif"],
      arial: ["Arial", "Helvetica Neue", "Helvetica", "sans-serif"],
      gotham: ["Gotham", "sans-serif", "Arial", "Helvetica Neue", "Helvetica"],
      gothamBook: [
        "Gotham Book",
        "sans-serif",
        "Arial",
        "Helvetica Neue",
        "Helvetica",
      ],
      gothamMedium: [
        "Gotham Medium",
        "sans-serif",
        "Arial",
        "Helvetica Neue",
        "Helvetica",
      ],
      gothamBold: [
        "Gotham Bold",
        "sans-serif",
        "Arial",
        "Helvetica Neue",
        "Helvetica",
      ],
      museoSans: ["Museo Sans"],
      auto: ["auto"],
      icomoon: [
        "icomoon",
        "sans-serif",
        "Arial",
        "Helvetica Neue",
        "Helvetica",
      ],
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
        "gray61": "#618175",
      },
      letterSpacing: {
        "one": "1px",
      },
      dropShadow: {
        "5xl": "0 0 1px #000",
      },
      backgroundImage: {
        "arrow-left": "url('/image/fossil-left-arrow.webp')",
        "arrow-right": "url('/image/fossil-right-arrow.webp')",
      },
      backgroundSize: {
        "14": "14px",
      },
      margin: {
        "2px": "2px",
      },
      screens: {
        "xs": "340px",
        "2xs": "375px",
        "3xs": "360px",
        "xxs": "390px",
        "xxxs": "428px",
      },
      fontSize: {
        "18": "18px",
        "22": "22px",
        "28": "28px",
        "32": "32px",
      },
    },
  },
};
