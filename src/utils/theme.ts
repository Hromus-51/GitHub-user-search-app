import type { Theme } from 'theme-ui';

export const theme: Theme = {
    initialColorModeName: 'light',

    colors: {
        text: '#4B6A9B',
        transparentText: 'rgba(75, 105, 155, 0.5)',
        background: '#F6F8FF',
        cardBackground: '#FEFEFE',
        logo: '#222731',
        contrast: '#2B3442',
        secondaryText: '#697C9A',
        notAvaiableText: '#4B6A9B',
        toggleHover: '#222731',
        shadow: 'rgba(70, 96, 187, 0.198567)',

        modes: {
            dark: {
                text: '#FFFFFF',
                transparentText: 'rgba(255, 255, 255, 0.4)',
                background: '#141D2F',
                cardBackground: '#1E2A47',
                logo: '#FFFFFF',
                contrast: '#FFFFFF',
                secondaryText: '#FFFFFF',
                notAvaiableText: '#4B6A9B',
                toggleHover: '#90A4D4',
                shadow: 'none',
            }
        }
    },
}