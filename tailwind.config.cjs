/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./assets/js/**/*.{js}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B1220",
        haze: "#F6F7FB",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,18,32,0.06), 0 12px 40px rgba(10,18,32,0.08)",
      },
    },
  },
};

