import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/*.{js,ts,jsx,tsx,mdx}',
    './components/*.{js,ts,jsx,tsx,mdx}',
    './app/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        h1: '2.5rem',
        h2: '2rem',
        h3: '1.75rem',
        h4: '1.5rem',
        h5: '1.25rem',
        h6: '1rem',
      },
      fontWeight: {
        h1: '800',
        h2: '700',
        h3: '600',
        h4: '500',
        h5: '400',
        h6: '300',
      },
    },
  },
  plugins: [],
}
export default config
