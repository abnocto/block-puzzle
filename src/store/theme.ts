import {writable} from 'svelte/store';
import {STORAGE_THEME} from '../constants';
import type {Theme} from '../types';

const loadTheme = (): Theme => {
	return localStorage.getItem(STORAGE_THEME) as Theme ?? 'dark';
};

const saveTheme = (theme: Theme) => {
	localStorage.setItem(STORAGE_THEME, theme);
};

export const createThemeStore = () => {
	const initialTheme = loadTheme();

	const {subscribe, update} = writable<Theme>(initialTheme);

	return {
		subscribe,
		toggle: () => update((theme) => {
			const nextTheme = theme === 'light' ? 'dark' : 'light';
			saveTheme(nextTheme);

			return nextTheme;
		})
	};
};
