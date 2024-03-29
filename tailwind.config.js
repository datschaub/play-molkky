/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
    // daisyUI config (optional)
    daisyui: {
        styled: true,
        themes: false,
        base: true,
        themes: ["retro"],
    },
};
