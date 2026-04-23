/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1"
        }
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 23, 42, 0.18)"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(56, 189, 248, 0.35), transparent 30%), radial-gradient(circle at top right, rgba(14, 165, 233, 0.25), transparent 25%), linear-gradient(135deg, #0f172a, #111827 45%, #1e293b)"
      }
    }
  },
  plugins: []
};
