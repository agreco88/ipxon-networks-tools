const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  future: {},
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      height: {
        "10vh": "10vh",
        "20vh": "20vh",
        "30vh": "30vh",
        "40vh": "40vh",
        "50vh": "50vh",
        "60vh": "60vh",
        "70vh": "70vh",
        "80vh": "80vh",
        "90vh": "90vh",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        rose: colors.rose,
        ipxonGray: "#212121",
      },
    },
  },

  variants: {},
  plugins: [require("daisyui")],
}
