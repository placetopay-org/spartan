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
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
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

            /**
             * Base Form Input Data
             */
            let baseFormFocus = {
                'outline': theme('outline.none.0') ,
                'outline-offset': theme('outline.none.1'),
                '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
                '--tw-ring-offset-width': '0px',
                '--tw-ring-offset-color': '#fff',
                '--tw-ring-opacity': theme('opacity.50'),
                '--tw-ring-color': `${rgba(theme('colors.gray.400'), 'var(--tw-ring-opacity)')}`,
                '--tw-ring-offset-shadow': `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
                '--tw-ring-shadow': `var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
                'box-shadow': `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000)`,
                'border-color': theme('colors.gray.300'),
            }

            let baseFormInput =  {
                borderColor: theme('colors.gray.300'),
                borderRadius: theme('borderRadius.md'),
                '&::placeholder': {
                    color: theme('colors.gray.400'),
                    opacity: theme('opacity.100')
                },
                '&:focus': baseFormFocus,
            };

            const formInputs = {
                '.form-input': baseFormInput,
                '.form-textarea': baseFormInput,
                '.form-select': baseFormInput,
                '.form-multiselect': baseFormInput,
                '.form-radio': {
                    borderColor: theme('colors.gray.300'),
                    color: theme('colors.gray.900'),
                    '&:focus': baseFormFocus,
                },
                '.form-checkbox': {
                    borderColor: theme('colors.gray.300'),
                    color: theme('colors.gray.900'),
                    borderRadius: theme('borderRadius.DEFAULT'),
                    '&:focus': baseFormFocus,
                }
            }

            /** Order matters **/
            addComponents(formInputs);
            addComponents(inputs)
            addComponents(buttons)
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
