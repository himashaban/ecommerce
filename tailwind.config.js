/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],

  theme: {
    extend: {
      screens: {
        sm: "640px", // Small screens (e.g., mobile)
        md: "768px", // Medium screens (e.g., tablets)
        lg: "1024px", // Large screens (e.g., laptops/desktops)
        xl: "1280px", // Extra large screens (e.g., large desktops)
        "2xl": "1536px", // Very large screens
      },
      colors: {
        customGreen: "#00ff00", // Add your custom colors
        customBlue: "#0000ff",
      },
      spacing: {
        128: "32rem", // Custom spacing values (e.g., 128 can be used as spacing or width)
      },
    },
  },

  plugins: [],
};
