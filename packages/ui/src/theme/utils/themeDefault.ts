import type { Theme } from '../Theme';

export const defaultSpacing: Theme['spacing'] = 8;
export const defaultShape: Theme['shape'] = { radius: 8 };

export const themeDefaultLight: Theme = {
    palette: {
        mode: 'light',
        info: '#4DADF7',
        error: '#F24822',
        warning: '#FFB547',
        success: '#34C759',
        primary: '#FF6C9F',
        secondary: '#6C3DF4',
        grey: '#F1F1F1',
        text: {
            primary: 'rgb(33, 33, 33)',
            secondary: 'rgb(85, 85, 85)',
            disabled: 'rgb(180, 180, 180)'
        },
        background: {
            paper: '#FAFAFA',
            default: '#FFFFFF',
        },
        divider: 'rgba(0, 0, 0, 0.08)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};

export const themeDefaultDark: Theme = {
    palette: {
        mode: 'dark',
        info: '#72e4fc',
        error: '#ff5377',
        warning: '#FF9457',
        success: '#36e79b',
        primary: '#6c37f4',
        secondary: '#ebff5e',
        grey: '#2A2A2A',
        text: {
            primary: 'rgba(255, 255, 255, 0.87)',
            secondary: 'rgba(255, 255, 255, 0.6)',
            disabled: 'rgba(255, 255, 255, 0.38)'
        },
        background: {
            paper: '#0d0225',
            default: '#30294e',
        },
        divider: 'rgba(255, 255, 255, 0.12)'
    },
    spacing: defaultSpacing,
    shape: defaultShape
};