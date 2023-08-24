import {defineConfig} from 'vite';
import {svelte} from '@sveltejs/vite-plugin-svelte';

/** @see https://vitejs.dev/config/ */
export default defineConfig({
	base: './',
	plugins: [svelte()]
});
