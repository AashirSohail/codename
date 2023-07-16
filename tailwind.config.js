/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        /* Red */
        darkRed: "#e34234",
        lightRed: "#fa8072",

        /* Blue */
        darkBlue: "#4682b4",
        lightBlue: "#6495ed",

        /* Yellow */
        darkYellow: "#E5AA70",
        lightYellow: "#F0E68C",

        /* Gray */
        darkGray: "#71797E",
        lightGray: "#818589",
      },
    },
  },
  plugins: [],
};
