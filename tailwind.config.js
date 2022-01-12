const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  future: {},
  purge: [],
  theme: {
    extend: {
      color: {
        rose: colors.rose,
      },
    },
  },

  variants: {},
  plugins: [require("daisyui")],
}
