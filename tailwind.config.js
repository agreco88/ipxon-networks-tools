const colors = require("tailwindcss/colors")

module.exports = {
  future: {},
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      height: {
        "5vh": "5vh",
        "10vh": "10vh",
        "15vh": "15vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "75vh": "75vh",
        "77vh": "77vh",
        "80vh": "80vh",
        "90vh": "90vh",
      },
      maxWidth: {
        "5/6": "83.333%",
        "4/6": "66.666667%",
        "1/4": "25%",
        "1/3": "33.3%",
        "1/2": "50%",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        rose: colors.rose,
        ipxonBrown: "#1D1D1D",
        ipxonGray: "#212121",
        ipxonViolet: "#522857",
        ipxonLightMagenta: "#DD097D",
        ipxonLighterMagenta: "#FF33AD",
      },
    },
  },

  variants: {},
  plugins: [require("daisyui")],
  daisyui: {
    styled: false,
  },
}
