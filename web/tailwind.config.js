const plugin = require('tailwindcss/plugin');
const themeSwapper = require('tailwindcss-theme-swapper');

module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        borderColor: (theme) => ({
            ...theme('colors'),
            DEFAULT: '#D1D5DB',
        }),
        fontFamily: {
            sans: ['"Heebo"', 'Helvetica', 'Arial', 'sans-serif'],
            body: ['"Heebo"', 'Helvetica', 'Arial', 'sans-serif'],
        },

        extend: {
            screens: {
                '3xl': '1600px',
                '4xl': '2000px',
                1665: '1665px',
            },
            margin: {
                'sidebar-width': '300px',
            },
        },
    },
    plugins: [
        themeSwapper({
            themes: [
                {
                    name: 'base',
                    selectors: [':root'],
                    theme: {
                        colors: {
                            white: '#FFF',
                            primary: {
                                DEFAULT: '#5138ED',
                                dark: '#4833D4',
                            },
                            header: '#212121',
                            sidebar: '#F4F4F1',
                            iconActive: '#A1A1A1',
                            iconPassive: '#CBCBCB',
                            hoverColor: 'rgba(55, 53, 47, 0.08)',
                            sidebarIcon: '#B0B0B0',
                            chevron: '#9E9E9E',
                            inactiveSidebar: '#8B8B8B',
                            altBg: '#F9F9F9',
                            borderActive: '#b7b7b7',
                            inputGrayBg: 'hsla(0,0%,77%,0.18)',
                            inputGrayText: 'hsla(0,0%,67%,1)',
                        },
                    },
                },
                {
                    name: 'dark',
                    selectors: ['[data-theme="dark"]'],
                    theme: {
                        colors: {
                            white: '#FFF',
                        },
                    },
                },
            ],
        }),
        require('@tailwindcss/line-clamp'),
        plugin(function ({ addUtilities, theme, e }) {
            const colors = theme('colors');

            const shadowBorderUtilities = Object.keys(colors).reduce((acc, key) => {
                if (typeof colors[key] === 'string') {
                    return {
                        ...acc,
                        [`.shadow-border-b-${e(key)}`]: {
                            'box-shadow': `0 1px 0 ${colors[key]}`,
                        },
                    };
                }

                const colorShades = Object.keys(colors[key]);

                return {
                    ...acc,
                    ...colorShades.reduce(
                        (a, shade) => ({
                            ...a,
                            [`.shadow-border-b-${e(key)}-${shade}`]: {
                                'box-shadow': `0 1px 0 ${colors[key][shade]}`,
                            },
                        }),
                        {},
                    ),
                };
            }, {});
            addUtilities(shadowBorderUtilities, ['responsive', 'hover', 'focus-within']);
            addUtilities({
                'outline-default': {
                    outline: '2px solid black',
                },
            });
        }),
    ],
};
