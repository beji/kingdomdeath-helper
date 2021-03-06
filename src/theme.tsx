export const serifFont = "font-family: 'Bitter', serif;"
export const textFont = "font-family: 'Open Sans', sans-serif;"

export const colors = {
  card: '#646464',
  cardBorder: '#8E9293',
  hintedBorder: '#505050',
  page: '#3D3D3D',
  text: '#fcfcfc',
}

export const theme = {
  card: {
    background: '#646464',
    border: {
      base: '#8E9293',
      highlight: '#A12D6A',
      hint: '#505050',
    },
    text: '#fcfcfc',
  },
  gear: {
    background: 'linear-gradient(to bottom, #c7a888 0%,#dacaaf 50%,#c7a888 100%)',
    border: {
      base: '#646464',
      highlight: '#fff',
      hint: '#666',
    },
    text: {
      base: '#252525',
      hint: '#666',
    },
  },
  page: {
    background: {
      base: '#3D3D3D',
      highlight: '#A12D6A',
    },
    font: {
      serif: "font-family: 'Bitter', serif;",
      text: "font-family: 'Open Sans', sans-serif;",
    },
  },
}

export type Theme = typeof theme

export default theme
