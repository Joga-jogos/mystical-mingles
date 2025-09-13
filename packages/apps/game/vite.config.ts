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
        }
    },
    server: {
        host: true,
        port: 3001
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @use "@mystical-mingles/ui/styles/mixin.scss" as *;
                    @use "@mystical-mingles/ui/styles/reset.scss" as *;
                    @use "@mystical-mingles/ui/styles/variables.scss" as *;
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
