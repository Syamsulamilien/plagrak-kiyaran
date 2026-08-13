/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#EAF4EA", 100: "#CCE5CD", 200: "#A5D1A7", 300: "#7CBC7F",
          400: "#57A65B", 500: "#3D8F41", 600: "#2E7D32", 700: "#276A2A",
          800: "#1F5522", 900: "#153B17", 950: "#0C220D",
        },
        earth: {
          50: "#F3EEEC", 100: "#E4D8D3", 200: "#CBB6AC", 300: "#B0968A",
          400: "#8D6E63", 500: "#7A5C51", 600: "#654B41", 700: "#503C34",
          800: "#3C2C27", 900: "#281D19",
        },
        mist: "#F4F6F8",
        gold: { 100: "#F6E9C9", 300: "#E3C578", 500: "#C9962C", 600: "#A87A20", 700: "#8A6419" },
        dusk: { DEFAULT: "#16241A", 800: "#1C2E20", 700: "#243A29" },
      },
      fontFamily: { display: ["Poppins", "sans-serif"], body: ["Inter", "sans-serif"] },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(22, 36, 26, 0.10), 0 2px 8px -2px rgba(22, 36, 26, 0.06)",
        "soft-lg": "0 12px 48px -8px rgba(22, 36, 26, 0.16), 0 4px 16px -4px rgba(22, 36, 26, 0.08)",
      },
      animation: {
        "drift-slow": "drift 40s linear infinite",
        "drift-slower": "drift 70s linear infinite reverse",
        float: "float 6s ease-in-out infinite",
        "fade-in": "fadeIn 0.6s ease-out forwards",
      },
      keyframes: {
        drift: { "0%": { transform: "translateX(-10%)" }, "100%": { transform: "translateX(10%)" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-10px)" } },
        fadeIn: { "0%": { opacity: 0, transform: "translateY(16px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
      },
      borderRadius: { "4xl": "2rem" },
    },
  },
  plugins: [],
};
