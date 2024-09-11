/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT"
export default withMT( {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      '2xl': {'min': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'min': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'min': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'min': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [],
})

