module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        md: "2px 2px 4px rgb(0 0 0 / 45%);",
      },
      backgroundImage: {
        bg_netflix: "url('../public/images/Netflix-Background.jpg')",
        "gradient-to-b":
          "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);",
      },
      screens: {
        "3xl": "1600px",
        xs: "450px",
        xxs: "400px",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/line-clamp"),
    require("tailwindcss-textshadow"),
  ],
};
