/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {

      fontFamily: {
        'gega-baslik': ["Montserrat", "sans-serif"]
      },


      colors:{
        'gega-gradient-1': '#787171',
        'gega-gradient-2': '#8f8686',
        'gega-circle-2': '#508C9B',
        'gega-circle-3': '#134B70',
      }
    },
  
  },
  plugins: [],
}

