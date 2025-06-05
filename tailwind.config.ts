import type { Config } from 'tailwindcss'

export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		screens: {
			sm: '430px',
			sx: '560px',
			md: '640px',
			md2: '768px',
			lg: '976px',
			xl: '1200px',
			'2xl': '1440px',
			'3xl': '1600px'
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				md: '2.5rem'
			}
		},
		spacing: {
			px: '1px',
			0: '0',
			0.5: '0.125rem',
			1: '0.25rem',
			1.5: '0.375rem',
			2: '0.5rem',
			2.5: '0.625rem',
			3: '0.75rem',
			3.5: '0.875rem',
			4: '1rem',
			5: '1.25rem',
			6: '1.5rem',
			7: '1.75rem',
			8: '2rem',
			9: '2.25rem',
			10: '2.5rem',
			11: '2.75rem',
			12: '3rem',
			14: '3.5rem',
			16: '4rem',
			20: '5rem',
			24: '6rem',
			28: '7rem',
			32: '8rem',
			36: '9rem',
			40: '10rem',
			44: '11rem',
			48: '12rem',
			52: '13rem',
			56: '14rem',
			60: '15rem',
			64: '16rem',
			72: '18rem',
			80: '20rem',
			96: '24rem'
		},
		borderRadius: {
			none: '0',
			sm: '8px',
			DEFAULT: '.5rem',
			lg: '1rem',
			full: '9999px'
		},
		fontFamily: {
			default: ['var(--font-geist-sans)', 'sans-serif'],
			logo: ['var(--font-playwrite)', 'sans-serif'],
			playfair: ['var(--font-playfair)', 'serif']
		},
		fontSize: {
			sm: ['12px', '16px'],
			md: ['14px', '20px'],
			lg: ['16px', '24px'],
			xl: ['20px', '28px'],
			'2xl': ['24px', '28px'],
			'3xl': ['30px', '36px'],
			'4xl': ['36px', '40px'],
			'5xl': ['48px', '48px'],
			'6xl': ['64px', '64px'],
			'7xl': ['96px', '96px']
		},
		colors: {
			transparent: 'var(--color-transparent)',
			white: 'rgba(var(--color-white), <alpha-value>)',
			black: 'rgba(var(--color-black), <alpha-value>)',
			gray: {
				50: 'rgba(var(--color-gray-50), <alpha-value>)',
				100: 'rgba(var(--color-gray-100), <alpha-value>)',
				200: 'rgba(var(--color-gray-200), <alpha-value>)',
				300: 'rgba(var(--color-gray-300), <alpha-value>)',
				400: 'rgba(var(--color-gray-400), <alpha-value>)',
				500: 'rgba(var(--color-gray-500), <alpha-value>)',
				600: 'rgba(var(--color-gray-600), <alpha-value>)',
				700: 'rgba(var(--color-gray-700), <alpha-value>)',
				800: 'rgba(var(--color-gray-800), <alpha-value>)',
				900: 'rgba(var(--color-gray-900), <alpha-value>)'
			},
			yellow: 'rgba(252, 211, 77)',
			red: {
				50: 'rgba(var(--color-red-50), <alpha-value>)',
				100: 'rgba(var(--color-red-100), <alpha-value>)',
				200: 'rgba(var(--color-red-200), <alpha-value>)',
				300: 'rgba(var(--color-red-300), <alpha-value>)',
				400: 'rgba(var(--color-red-400), <alpha-value>)',
				500: 'rgba(var(--color-red-500), <alpha-value>)',
				600: 'rgba(var(--color-red-600), <alpha-value>)',
				700: 'rgba(var(--color-red-700), <alpha-value>)',
				800: 'rgba(var(--color-red-800), <alpha-value>)',
				900: 'rgba(var(--color-red-900), <alpha-value>)'
			},
			orange: {
				50: 'rgba(var(--color-orange-50), <alpha-value>)',
				100: 'rgba(var(--color-orange-100), <alpha-value>)',
				200: 'rgba(var(--color-orange-200), <alpha-value>)',
				300: 'rgba(var(--color-orange-300), <alpha-value>)',
				400: 'rgba(var(--color-orange-400), <alpha-value>)',
				500: 'rgba(var(--color-orange-500), <alpha-value>)',
				600: 'rgba(var(--color-orange-600), <alpha-value>)',
				700: 'rgba(var(--color-orange-700), <alpha-value>)',
				800: 'rgba(var(--color-orange-800), <alpha-value>)',
				900: 'rgba(var(--color-orange-900), <alpha-value>)'
			},
			green: {
				50: 'rgba(var(--color-green-50), <alpha-value>)',
				100: 'rgba(var(--color-green-100), <alpha-value>)',
				200: 'rgba(var(--color-green-200), <alpha-value>)',
				300: 'rgba(var(--color-green-300), <alpha-value>)',
				400: 'rgba(var(--color-green-400), <alpha-value>)',
				500: 'rgba(var(--color-green-500), <alpha-value>)',
				600: 'rgba(var(--color-green-600), <alpha-value>)',
				700: 'rgba(var(--color-green-700), <alpha-value>)',
				800: 'rgba(var(--color-green-800), <alpha-value>)',
				900: 'rgba(var(--color-green-900), <alpha-value>)'
			},
			blue: {
				50: 'rgba(var(--color-blue-50), <alpha-value>)',
				100: 'rgba(var(--color-blue-100), <alpha-value>)',
				200: 'rgba(var(--color-blue-200), <alpha-value>)',
				300: 'rgba(var(--color-blue-300), <alpha-value>)',
				400: 'rgba(var(--color-blue-400), <alpha-value>)',
				500: 'rgba(var(--color-blue-500), <alpha-value>)',
				600: 'rgba(var(--color-blue-600), <alpha-value>)',
				700: 'rgba(var(--color-blue-700), <alpha-value>)',
				800: 'rgba(var(--color-blue-800), <alpha-value>)',
				900: 'rgba(var(--color-blue-900), <alpha-value>)'
			}
		},
		extend: {
			backgroundImage: {
				basic: 'url("/assets/basic.jpg")',
				banner: 'url("/assets/banner.jpg")',
				stillife: 'url("/assets/still-life.jpg")',
				coffeebeans: 'url("/assets/coffee-beans-23.jpg")',
				private: 'url("/assets/coffee-beans.jpg")',
				barista: 'url("/assets/barista.jpg")',
				traditional: 'url("/assets/cafe-56.jpg")',
				cup: 'url("/assets/cup-42.jpg")'
			},
			keyframes: {
				// SLIDE
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slide-in-left': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-left': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'slide-in-top': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-out-top': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(-100%)' }
				},
				'slide-in-bottom': {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' }
				},
				'slide-out-bottom': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' }
				},
				// SCALE
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'scale-out': {
					'0%': { opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)' },
					'100%': { opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0.8)' }
				},
				'dialog-scale-in': {
					'0%': { opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0.8)' },
					'100%': { opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)' }
				},
				'dialog-scale-out': {
					'0%': { opacity: '1', transform: 'translateX(-50%) translateY(-50%) scale(1)' },
					'100%': { opacity: '0', transform: 'translateX(-50%) translateY(-50%) scale(0.8)' }
				},
				// FADE
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			}
		},
		animation: {
			'slide-in-right': 'slide-in-right 0.3s ease-in-out',
			'slide-out-right': 'slide-out-right 0.3s ease-in-out',
			'slide-in-left': 'slide-in-left 0.3s ease-in-out',
			'slide-out-left': 'slide-out-left 0.3s ease-in-out',
			'slide-in-top': 'slide-in-top 0.3s ease-in-out',
			'slide-out-top': 'slide-out-top 0.3s ease-in-out',
			'slide-in-bottom': 'slide-in-bottom 0.3s ease-in-out',
			'slide-out-bottom': 'slide-out-bottom 0.3s ease-in-out',

			'scale-in': 'dialog-scale-in 0.2s ease-in-out',
			'scale-out': 'dialog-scale-out 0.2s ease-in-out',
			'dialog-scale-in': 'dialog-scale-in 0.2s ease-in-out',
			'dialog-scale-out': 'dialog-scale-out 0.2s ease-in-out',

			'fade-in': 'fade-in 0.3s ease-in-out',
			'fade-out': 'fade-out 0.3s ease-in-out',

			'accordion-down': 'accordion-down 0.2s ease-out',
			'accordion-up': 'accordion-up 0.2s ease-out'
		}
	},
	plugins: []
} satisfies Config
