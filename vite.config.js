import {defineConfig} from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import {resolve} from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    server: {
        hmr: {
            host: 'localhost',
        }
    },
    plugins: [
        laravel({
            input: ['resources/js/app.tsx', 'resources/css/app.scss'],
            refresh: true,
        }),
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '/assets': resolve('./public/assets'),
            'ziggy-js': resolve('./vendor/tightenco/ziggy/dist')
        }
    },
    build: {
        rollupOptions: {
            output: {
                assetFileNames: 'static/[name]-[hash][extname]',
                chunkFileNames: 'chunks/[name]-[hash].js',
            }
        }
    }
});
