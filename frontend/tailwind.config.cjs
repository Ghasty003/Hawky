/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{.js,.jsx,.ts,.tsx}"],
  theme: {
    extend: {
      colors: {
        login: "rgb(255, 245, 157)",
        register: "rgb(144, 202, 249)",
        primary: "#251e3e",
        secondary: "#5b5d8d",
        "empty-chat": "#9fa8da",
        navbg: "rgba(0, 0, 0, .2)",
      },
      fontFamily: {
        heading: "cursive",
      },
      screens: {
        mobile: { max: "550px" },
      },
    },
  },
  plugins: [],
};
