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
        'replay': "url('../images/background/replay.png')",
        'twitch': "url('../images/background/twitch.png')",
      },
      fontFamily: {
        wbz: ['Wbz'],
        twitch: ['Twitch'],
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ]
}
