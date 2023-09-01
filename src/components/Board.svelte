<script lang='ts'>
	import Cell from './Cell.svelte';
	import type {BoardDto} from '../types';

	export let highScore: number;
	export let score: number;
	export let board: BoardDto;
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
					<Cell {cell} />
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
