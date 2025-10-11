import dns from 'dns';
import path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.BASE_URL,
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        dedupe: ['@mystical-mingles/ui'],
    },
    server: {
        host: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@mystical-mingles/ui/styles/main.scss" as *;
                `
            },
        },
    },
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: 'globalThis',
            },
        },
    }
});
