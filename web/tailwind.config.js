module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['Heebo', 'Helvetica', 'Arial', 'sans-serif'],
        },

        extend: {
            colors: {
                primary: {
                    DEFAULT: '#5138ED',
                    dark: '#4833D4',
                },
            },
            screens: {
                '3xl': '1600px',
                '4xl': '2000px',
                1665: '1665px',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
