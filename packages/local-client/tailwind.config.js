/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#10B981",
        danger: "#EF4444",
        warning: "#F59E0B",
        info: "#3B82F6",
        light: "#F3F4F6",
        dark: "#111827",

        "primary-light": "#93C5FD",
        "primary-dark": "#1E3A8A",
        "secondary-light": "#34D399",
        "secondary-dark": "#059669",
        "danger-light": "#FCA5A5",
        "danger-dark": "#DC2626",
        "warning-light": "#FCD34D",
        "warning-dark": "#D97706",
        "info-light": "#93C5FD",
        "info-dark": "#1E3A8A",
        "light-light": "#F9FAFB",
        "light-dark": "#D1D5DB",
        "dark-light": "#4B5563",
        "dark-dark": "#1F2937",

        "primary-transparent": "rgba(30, 64, 175, 0.1)",
        "secondary-transparent": "rgba(16, 185, 129, 0.1)",
        "danger-transparent": "rgba(239, 68, 68, 0.1)",
        "warning-transparent": "rgba(245, 158, 11, 0.1)",
        "info-transparent": "rgba(59, 130, 246, 0.1)",
        "light-transparent": "rgba(243, 244, 246, 0.1)",
        "dark-transparent": "rgba(17, 24, 39, 0.1)",

      },
  },
},
  variants: {
    extend: {
  },
},

  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: ['dracula'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dracula",
  },
} 

