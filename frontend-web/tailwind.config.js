/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fonts:{
        'archivo':['Archivo', 'sans-serif']
      },
      colors:{
        "primary-blue":"#66C3FF",
        "secondary-blue":"#92AEF1",
        "pale-blue":"#53D8FB",
        "dull-blue":"#458897",
        "olive-black":"#363732",
        "ametyst":"#9D4EDD",
        "wisteria":"#BD98E3",
        "orchid-pink":"#D4AFB9",
        "cream":"#DCE1E9",
        "text":"var(--text)",
        "light-text":"var(--light-text)",
        "primary":"var(--primary)",
        "secondary":"var(--secondary)",
        "dark":"var(--dark)",
        "dark-200":"var(--light-dark)"
      }
    }
  },
  plugins: [],
}