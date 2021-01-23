const colors = require('tailwindcss/colors')

module.exports = {
    purge: ["./pages/**/*.js", "./components/**/*.js"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            gray: {
                light: "#4f5b62",
                medium: "#3d474d",
                medium2: "#334047",
                main: "#263238",
                dark: "#000a12",
                ...colors.trueGray
            },
            indigo: colors.indigo,
            red: colors.rose,
            yellow: colors.amber,
            pink: {
                light: "#ff94c2",
                main: "#f06292",
                dark: "#ba2d65",
                ...colors.pink
            },
            blue: {
                porygon: "#00ffff",
                lighter: "#d4fffd",
                light: "#c2fffc",
                middle: "#a1fffa",
                darker: "#00c0d1",
                dark: "#00809c",
                ...colors.blue
            },
            green: colors.green,
        }
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
    plugins: [],
};
