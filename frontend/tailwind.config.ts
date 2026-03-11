import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './styles/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--bg-primary)',
                surface: 'var(--bg-secondary)',
                primary: 'var(--brand-accent)',
                secondary: 'var(--brand-subtle)',
                foreground: 'var(--text-main)',
                muted: 'var(--text-secondary)',
                glass: {
                    bg: 'var(--glass-bg)',
                    border: 'var(--glass-border)',
                }
            },
            fontFamily: {
                sans: ['var(--font-primary)'],
            },
            borderRadius: {
                '2xl': '1rem',
            }
        },
    },
    plugins: [
        "tailwindcss-animate",
        require('@tailwindcss/typography'),
    ],
    darkMode: 'class', // enable next-themes .dark class
};
export default config;
