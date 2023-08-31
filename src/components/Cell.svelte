<script lang='ts'>
	export let filled: boolean;
	export let bordered: boolean = true;
	export let droppable: boolean = false;
</script>

<div
	class='cell'
	class:filled
	class:bordered
	class:droppable
	on:pointerdown
	on:pointerup
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

	.cell.droppable {
		z-index: 1;
	}
</style>
