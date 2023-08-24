<script lang='ts'>
	import {createThemeStore} from '../store/theme';
	import {createGameStore} from '../store/game';
	import {ATTR_THEME} from '../constants';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import Board from './Board.svelte';
	import Figures from './Figures.svelte';

	const theme = createThemeStore();
	const game = createGameStore();

	$: document.body.setAttribute(ATTR_THEME, $theme);
</script>

<div class='app'>
	<ThemeSwitcher
		theme={$theme}
		on:toggle={() => theme.toggle()}
	/>
	<Board
		highScore={$game.highScore}
		score={$game.score}
		board={$game.board}
		on:figure-drop={(event) => game.addDraggedFigureToBoard(event.detail)}
	/>
	<Figures
		figures={$game.figures}
		on:figure-dragged={(event) => game.setDraggedFigure(event.detail)}
	/>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
