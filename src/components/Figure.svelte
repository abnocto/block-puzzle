<script lang='ts'>
	import {createEventDispatcher} from 'svelte';
	import Cell from './Cell.svelte';
	import type {FigureDto, DraggedFigureDto} from '../types';

	export let figure: FigureDto;

	let dragged: boolean = false;
	let timeoutId: number | null = null;

	const dispatch = createEventDispatcher<{'figure-dragged': DraggedFigureDto}>();
</script>

<div
	class='figure'
	class:dragged
	role='figure'
	draggable='true'
	on:dragstart={() => {
		dragged = true;
	}}
	on:drag={() => {
		timeoutId && clearTimeout(timeoutId);
		timeoutId = setTimeout(() => dragged = false, 250);
	}}
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
		margin: var(--gap-l);
		transition: opacity 0.01s;
	}

	.figure.dragged {
		opacity: 0;
	}

	.figure-line {
		display: flex;
	}
</style>
