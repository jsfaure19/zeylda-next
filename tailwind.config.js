/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'tb': "url('../images/background/tavern_brawl.png')",
        'numenor': "url('../images/background/numenor.jpg')"
      },
      fontFamily: {
        wbz: ['Wbz'],
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ]
}
