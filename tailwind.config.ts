import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    fontFamily: {
      soleil: "soleil",
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
      },
      backgroundImage: {
        'arrow-left': "url('/image/fossil-left-arrow.webp')",
        'arrow-right': "url('/image/fossil-right-arrow.webp')",
      }, 
      backgroundSize: {
        "14" : "14px"
      }, 
      margin: {
        '2px': '2px',
      }, 
      screens: {
        'xs': '340px',
        '2xs': '375px',
        '3xs': '360px',
        'xxs': '390px',
        'xxxs': '428px',
      },
    },
  },
};
