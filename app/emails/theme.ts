import type { TailwindConfig } from 'react-email';
import plugin from 'tailwindcss/plugin';

const colors = {
    // Page / outer background
    bg: '#f0f2f5',
    // Card / content background
    'bg-2': '#ffffff',
    // Footer background
    'bg-footer': '#f6f8fa',
    // Text
    fg: '#1a1a1a',
    'fg-2': '#333333',
    'fg-3': '#444444',
    'fg-muted': '#888888',
    'fg-inverted': '#FFFFFF',
    // Borders / dividers
    stroke: '#e8eaed',
    'stroke-strong': '#e4e4e7',
    // Brand green (accent bar, links)
    brand: '#2e7d32',
} as const;

const fontScale = {
    11: {
        fontSize: '11px',
        fontWeight: '400',
        letterSpacing: '0',
        lineHeight: '18px',
    },
    13: {
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '0',
        lineHeight: '1.4',
    },
    14: {
        fontSize: '14px',
        fontWeight: '400',
        lineHeight: '22px',
    },
    16: {
        fontSize: '16px',
        fontWeight: '400',
        letterSpacing: '0',
        lineHeight: '1.5',
    },
    19: {
        fontSize: '19px',
        fontWeight: '700',
        letterSpacing: '-0.3px',
        lineHeight: '1.2',
    },
    20: {
        fontSize: '20px',
        fontWeight: '700',
        lineHeight: '28px',
    },
    24: {
        fontSize: '24px',
        fontWeight: '600',
        letterSpacing: '-0.084px',
        lineHeight: '1.25',
    },
} as const;

export const SyntacTailwindConfig: TailwindConfig = {
    plugins: [
        plugin(({ addUtilities, addVariant }) => {
            addVariant('mobile', '@media (max-width: 660px)');

            const utilities: Record<string, Record<string, string>> = {};
            for (const [step, token] of Object.entries(fontScale)) {
                utilities[`.font-${step}`] = token;
            }
            addUtilities(utilities);
        }),
    ],
    theme: {
        extend: {
            colors,
            fontFamily: {
                // Match the HTML template (email-safe stack)
                sans: ['Helvetica', 'Arial', 'sans-serif'],
            },
            maxWidth: {
                email: '660px',
            },
            boxShadow: {
                card: '0 1px 6px rgba(0,0,0,0.10)',
            },
        },
    },
};