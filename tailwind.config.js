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
        'tavern': "url('../images/background/tavern.png')",
        'replay': "url('../images/background/replay1.gif')",
        'twitch': "url('../images/background/twitch.jpeg')",
        'c1': "url('../images/background/christmas1.jpg')",
        'c2': "url('../images/background/christmas2.jpeg')",
        'c3': "url('../images/background/christmas3.jpeg')",
      },
      fontFamily: {
        basic: ['Basic'],
        twitch: ['Twitch'],
        nature: ['Nature'],
        neon: ['Neon'],
        christmas: ['Christmas'],
      },
      scale: {
        '130': '1.30',
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ]
}
