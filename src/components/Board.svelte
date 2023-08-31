<script lang='ts'>
	import {createEventDispatcher} from 'svelte';
	import Cell from './Cell.svelte';
	import type {BoardDto, CoordsDto} from '../types';

	export let highScore: number;
	export let score: number;
	export let board: BoardDto;

	const dispatch = createEventDispatcher<{'figure-drop': CoordsDto}>();
</script>

<div>
	<div class='score'>
		<div class='high-score'>
			High score: {highScore}
		</div>
		<div>
			Game score: {score}
		</div>
	</div>

	<div class='cells'>
		{#each board.cells as line}
			<div class='board-line'>
				{#each line as cell}
					<Cell
						filled={cell.filled}
						droppable={cell.droppable}
						on:pointerup={() => cell.droppable && dispatch('figure-drop', cell.coords)}
					/>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.score {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 1.5rem;
		padding: var(--gap-m) 0;
	}

	.high-score {
		font-weight: bold;
	}

	.board-line {
		display: flex;
	}
</style>
