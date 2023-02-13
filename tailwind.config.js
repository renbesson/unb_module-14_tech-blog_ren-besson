/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/layouts/*.handlebars", "./views/*.handlebars"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
