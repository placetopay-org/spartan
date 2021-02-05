const hexRgb = require('hex-rgb')
const plugin = require('tailwindcss/plugin')
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
            opacity: {
                '65': '0.65'
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
                    'input, textarea, multiselect, select': {
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
                        borderColor: theme('colors.gray.300'),
                        color: theme('colors.gray.900'),
                        '&:focus': {
                            boxShadow: theme('boxShadow.outline-gray'),
                            borderColor: theme('colors.gray.300'),
                        },
                    }
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/custom-forms'),
        plugin(function ({ addComponents, theme }) {
            const inputs = {
                '.has-error': {
                    borderColor: theme('colors.red.300'),
                    color: theme('colors.red.900'),
                    '&:focus': {
                        borderColor: theme('colors.red.300'),
                        boxShadow: theme('boxShadow.outline-red'),
                    },
                    '&::placeholder': {
                        color: theme('colors.red.400')
                    }
                },
                '.form-label': {
                    display: 'block',
                    fontSize: theme('fontSize.sm'),
                    fontWeight: theme('fontWeight.medium'),
                    lineHeight: theme('lineHeight.5'),
                    color: theme('colors.gray.700'),
                },
                '.form-input-error': {
                    marginTop: theme('spacing.2'),
                    color: theme('colors.red.500'),
                    fontSize: theme('fontSize.sm'),
                    lineHeight: theme('lineHeight.5'),
                },
                '.form-input-help': {
                    marginTop: theme('spacing.2'),
                    color: theme('colors.gray.500'),
                    fontSize: theme('fontSize.sm'),
                    lineHeight: theme('lineHeight.5'),
                }
            };

            const buttons = {
                '.btn': {
                    padding: '.5rem 1rem',
                    borderWidth: '1px',
                    borderRadius: theme('borderRadius.md'),
                    fontSize: theme('fontSize.base'),
                    lineHeight: theme('lineHeight.6'),
                    fontWeight: theme('fontWeight.medium'),
                    transitionProperty: theme('transitionProperty.default'),
                    transitionTimingFunction: theme('transitionTimingFunction.in-out'),
                    transitionDuration: theme('transitionDuration.150'),
                    '&:focus': {
                        outline: 'none',
                        borderColor: theme('colors.gray.700'),
                        boxShadow: theme('boxShadow.outline-gray'),
                    },
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                '.btn-dark': {
                    borderColor: 'transparent',
                    color: theme('colors.white'),
                    backgroundColor: theme('colors.gray.900'),
                    '&:hover': {
                        backgroundColor: theme('colors.gray.700'),
                    },
                    '&:active': {
                        backgroundColor: theme('colors.gray.700'),
                    }
                },
                '.btn-white': {
                    borderColor: theme('colors.gray.300'),
                    color: theme('colors.gray.700'),
                    backgroundColor: theme('colors.white'),
                    '&:focus': {
                        outline: 'none',
                    },
                    '&:hover': {
                        backgroundColor: theme('colors.gray.50'),
                    },
                    '&:active': {
                        backgroundColor: theme('colors.gray.50'),
                    }
                },
                '.btn-disabled': {
                    opacity: theme('opacity.65'),
                    pointerEvents: 'none',
                }
            }

            addComponents(buttons)
            addComponents(inputs)
        })
    ],
    variants: {
        backgroundColor: ({ after }) => after(['active']),
        textColor: ({ after }) => after(['active']),
    },
    purge: {
        content: [
            './app/**/*.php',
            './resources/**/*.html',
            './resources/**/*.js',
            './resources/**/*.jsx',
            './resources/**/*.ts',
            './resources/**/*.tsx',
            './resources/**/*.php',
            './resources/**/*.vue',
            './resources/**/*.twig',
        ],
        options: {
            defaultExtractor: (content) => content.match(/[\w-/.:]+(?<!:)/g) || [],
            whitelistPatterns: [/-active$/, /-enter$/, /-leave-to$/, /show$/],
        },
    },
};
