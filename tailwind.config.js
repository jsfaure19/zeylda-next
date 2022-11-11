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
        'twitch': "url('../images/background/twitch.png')",
        'twitch-gif': "url('../images/background/twitch.gif')",
        'prepare': "url('../images/background/prepare.gif')"
      },
      fontFamily: {
        basic: ['Basic'],
        twitch: ['Twitch'],
        nature: ['Nature'],
        basic2: ['Basic']
      },
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/aspect-ratio'),
  ]
}
