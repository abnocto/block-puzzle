<script lang='ts'>
	import {createEventDispatcher} from 'svelte';
	import {dragAndDrop} from '../actions/drag-and-drop';
	import Cell from './Cell.svelte';
	import type {FigureDto, DraggedFigureDto} from '../types';

	export let figure: FigureDto;

	const dispatch = createEventDispatcher<{'figure-dragged': DraggedFigureDto}>();
</script>

<div
	class='figure'
	use:dragAndDrop
>
	{#each figure.cells as line}
		<div class='figure-line'>
			{#each line as cell}
				<Cell
					filled={cell.filled}
					bordered={cell.filled}
					on:pointerdown={() => {
						dispatch('figure-dragged', {
							figure,
							coords: cell.coords
						});
					}}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.figure {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.figure-line {
		display: flex;
	}
</style>
