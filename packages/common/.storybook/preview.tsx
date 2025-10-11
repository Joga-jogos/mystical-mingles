import { StoryFn } from '@storybook/react';

import { ThemeProvider, createTheme } from '@mystical-mingles/ui/theme';

function addLink(url: string) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

addLink('https://cdn-joga-jogos.web.app/assets/css/fonts.css');

export const decorators = [
    (Story: StoryFn) => (
        <ThemeProvider theme={createTheme()}>
            <Story />
        </ThemeProvider>
    ),
];

