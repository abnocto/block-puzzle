<script lang='ts'>
	import type {CellDto} from '../types';

	export let cell: CellDto;
	export let bordered: boolean = true;
</script>

<div
	class='cell'
	class:bordered
	class:filled={cell.filled}
	data-x={cell.coords.x}
	data-y={cell.coords.y}
	data-droppable={cell.droppable}
/>

<style>
	.cell {
		width: 45px;
		height: 45px;
		box-sizing: border-box;
		transition: background-color 1s ease-out;
	}

	.cell.filled {
		transition: none;
		background-color: var(--cell-bg);
	}

	.cell.bordered {
		border: 1px solid var(--cell-border);
	}
</style>
