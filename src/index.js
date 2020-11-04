const hexRgb = require('hex-rgb')
const defaultTheme = require('tailwindcss/defaultTheme')

function rgba(hex, alpha) {
    const { red, green, blue } = hexRgb(hex)
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

module.exports = {
    future: 'all',
    experimental: 'all',
    theme: {
        extend: {
            colors: {
                gray: {
                    '50': '#f8fafc',
                    '100': '#f1f5f9',
                    '200': '#e2e8f0',
                    '300': '#cfd8e3',
                    '400': '#97a6ba',
                    '500': '#64748b',
                    '600': '#475569',
                    '700': '#364152',
                    '800': '#27303f',
                    '900': '#1a202e',
                }
            },
            fontFamily: () => ({
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            }),

            boxShadow: (theme) => ({
                'outline-red': `0 0 0 3px ${rgba(theme('colors.red.300'), 0.45)}`,
                'outline-gray': `0 0 0 3px ${rgba(theme('colors.gray.400'), 0.45)}`,
            }),
            customForms: (theme) => ({
                default: {
                    'input, textarea, multiselect, select, checkbox, radio': {
                        borderColor: theme('colors.gray.300'),
                        '&::placeholder': {
                            color: theme('colors.gray.400'),
                        },
                        '&:focus': {
                            boxShadow: theme('boxShadow.outline-gray'),
                            borderColor: theme('colors.gray.300'),
                        },
                        iconColor: theme('colors.gray.400')
                    },
                    'checkbox, radio': {
                        color: theme('colors.gray.700'),
                    }
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/custom-forms')
    ],
    variants: {
        backgroundColor: ({ after }) => after(['active']),
        textColor: ({ after }) => after(['active']),
    },
};
