/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      display: ["group-hover"],
      cursor: {
        fancy:
          "url('https://w7.pngwing.com/pngs/311/940/png-transparent-computer-icons-eraser-encapsulated-postscript-free-material-angle-rectangle-triangle.png'), pointer",
      },
    },
  },
  plugins: [],
};
