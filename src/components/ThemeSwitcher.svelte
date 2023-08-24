<script lang='ts'>
	import Toggle from 'svelte-toggle';
	import lightThemeIcon from '../assets/light-theme.svg';
	import darkThemeIcon from '../assets/dark-theme.svg';
	import type {Theme} from '../types';

	export let theme: Theme;
</script>

<div class='theme-switcher'>
	<img
		src={lightThemeIcon}
		alt='light-theme'
	/>
	<Toggle
		hideLabel
		toggled={theme === 'dark'}
		toggledColor='var(--cell-bg)'
		untoggledColor='var(--cell-bg)'
		on:toggle
	/>
	<img
		src={darkThemeIcon}
		alt='dark-theme'
	/>
</div>

<style>
	.theme-switcher {
		position: fixed;
		top: 0;
		right: 0;
		display: flex;
		align-items: flex-start;
		padding: var(--gap-m);
	}

	img {
		width: 25px;
		height: 25px;
		filter: invert(var(--color-invert));
	}
</style>
