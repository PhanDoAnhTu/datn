/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    content: ['./public/index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            transitionProperty: {
                height: 'height',
                width: 'width',
                maxHeight: 'max-height',
                spacing: 'margin, padding',
            },
            gridTemplateRows: {
                '[auto,auto,1fr]': 'auto auto 1fr',
            },
            colors: {
                magnolia: {
                    DEFAULT: '#fcf7ff',
                    100: '#3f0064',
                    200: '#7f00c8',
                    300: '#b22dff',
                    400: '#d791ff',
                    500: '#fcf7ff',
                    600: '#fcf7ff',
                    700: '#fdf9ff',
                    800: '#fefbff',
                    900: '#fefdff',
                },
                xanthous: {
                    DEFAULT: '#f5b841',
                    100: '#3b2803',
                    200: '#765106',
                    300: '#b17909',
                    400: '#eca20c',
                    500: '#f5b841',
                    600: '#f7c768',
                    700: '#f9d58e',
                    800: '#fbe3b3',
                    900: '#fdf1d9',
                },
                veronica: {
                    DEFAULT: '#a42cd6',
                    100: '#21092b',
                    200: '#421157',
                    300: '#631a82',
                    400: '#8422ae',
                    500: '#a42cd6',
                    600: '#b658de',
                    700: '#c882e6',
                    800: '#daacef',
                    900: '#edd5f7',
                },
                magenta: {
                    DEFAULT: '#f80cd2',
                    100: '#32022a',
                    200: '#650355',
                    300: '#97057f',
                    400: '#ca06a9',
                    500: '#f80cd2',
                    600: '#f93dda',
                    700: '#fb6ee3',
                    800: '#fc9eec',
                    900: '#fecff6',
                },
                licorice: {
                    DEFAULT: '#1c0f13',
                    100: '#050304',
                    200: '#0b0607',
                    300: '#10090b',
                    400: '#150b0e',
                    500: '#1c0f13',
                    600: '#582f3b',
                    700: '#955065',
                    800: '#bd8596',
                    900: '#dec2ca',
                },
            },
            translate: {
                97: '97%',
                '2full': '200%',
            },
            backgroundSize: {
                'size-200': '200% 200%',
            },
            backgroundPosition: {
                'pos-0': '0% 0%',
                'pos-100': '100% 100%',
            },
            height: {
                square: '44rem',
                '1/2square': '30rem',
                '9/10': '90%',
            },
        },
    },

    plugins: [
        require('@headlessui/tailwindcss')({ prefix: 'ui' }),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ],
};
