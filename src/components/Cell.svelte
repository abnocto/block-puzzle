<script lang='ts'>
	export let filled: boolean;
	export let bordered: boolean;
</script>

<div
	class='cell'
	class:filled
	class:bordered
	role='figure'
	on:drop
	on:dragover
	on:pointerdown
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
