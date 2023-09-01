<script lang='ts'>
	import {createEventDispatcher} from 'svelte';
	import {dragAndDrop} from '../actions/drag-and-drop';
	import Cell from './Cell.svelte';
	import type {FigureDto, DraggedFigureDto, CoordsDto} from '../types';

	export let figure: FigureDto;

	const dispatch = createEventDispatcher<{
		'figure-dragged': DraggedFigureDto,
		'figure-dropped': CoordsDto
	}>();

	const handleDragged = (coords: CoordsDto) => dispatch('figure-dragged', {figure, coords});
	const handleDropped = (coords: CoordsDto) => dispatch('figure-dropped', coords);
</script>

<div
	class='figure'
	use:dragAndDrop={{handleDragged, handleDropped}}
>
	{#each figure.cells as line}
		<div class='figure-line'>
			{#each line as cell}
				<Cell
					{cell}
					bordered={cell.filled}
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
