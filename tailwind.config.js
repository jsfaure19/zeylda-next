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
