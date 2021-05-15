module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            sans: ['"Heebo"', 'Helvetica', 'Arial', 'sans-serif'],
            body: ['"Heebo"', 'Helvetica', 'Arial', 'sans-serif'],
        },

        extend: {
            colors: {
                primary: {
                    DEFAULT: '#5138ED',
                    dark: '#4833D4',
                },
                header: '#212121',
                sidebar: '#F4F4F1',
                iconActive: '#A1A1A1',
                iconPassive: '#CBCBCB',
            },
            screens: {
                '3xl': '1600px',
                '4xl': '2000px',
                1665: '1665px',
            },
            margin: {
                'sidebar-width': '200px',
            },
            keyframes: {
                dropdown: {
                    '0%': {
                        transform: 'scale(0)',
                    },
                    '100%': {
                        transform: 'scale(1)',
                    },
                },
                'dropdown-reverse': {
                    '0%': {
                        transform: 'scale(0)',
                    },
                    '100%': {
                        transform: 'scale(0)',
                        opacity: '0',
                    },
                },
            },
            animation: {
                dropdown: 'dropdown .2s ease-in',
                'dropdown-reverse': 'dropdown-reverse .2s ease-in',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require('@tailwindcss/line-clamp')],
};
