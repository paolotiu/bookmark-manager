module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Heebo', 'Helvetica', 'Arial', 'sans-serif'],
        },
        extend: {
            colors: {
                primary: '#5138ED',
            },
            screens: {
                '3xl': '1600px',
                '4xl': '2000px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
