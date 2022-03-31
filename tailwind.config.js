const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "320px",
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
      "3xl": "1700px",
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
        bebas: ["Bebas Neue"],
      },
      colors: {
        "admin-dark-gray": "#525A68",
        "admin-dark-light-gray": "#67768b",
        "admin-medium-gray": "#a1a7af",
        "admin-light-gray": "#bcc3d5",
        "admin-extra-light-gray": "#f0f2f9",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
