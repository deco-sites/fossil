import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    fontFamily: {
      "soleil-regular": "Soleil-Regular", 
      "soleil-black":"Soleil-Black", 
      "soleil-bold": "Soleil-Bold", 
      "soleil-Light": "Soleil-Light"
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
      colors:{
        "primary":"#262626"
      },
    },
  },
};
