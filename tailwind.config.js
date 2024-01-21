/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'main': '#003300',
      'black': colors.black,
      'white': colors.white,
      'gray': colors.gray,
      'emerald': colors.emerald,
      'indigo': colors.indigo,
      'yellow': colors.yellow,
      'green': colors.green,
      'red': colors.red,
      'blue': colors.blue,
      'purple': colors.purple,
      'pink': colors.pink,
      'slate': colors.slate,
    },
    extend: {
      backgroundImage: {
        'tb': "url('../images/background/tavern_brawl.png')",
        'tavern': "url('../images/background/tavern.png')",
        'replay': "url('../images/background/replay1.gif')",
        'twitch': "url('../images/background/twitch.jpeg')",
        'twitch-gif': "url('../images/background/twitch.gif')"
      },
      fontFamily: {
        basic: ['Basic'],
        twitch: ['Twitch'],
        nature: ['Nature'],
        neon: ['Neon']
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
