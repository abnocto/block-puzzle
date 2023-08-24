<script lang='ts'>
	import Figure from './Figure.svelte';
	import type {FigureDto} from '../types';

	export let figures: FigureDto[];
</script>

<div
	class='figures'
	style:--figure-amount={figures.length}
>
	{#each figures as figure (figure.id)}
		<Figure
			{figure}
			on:figure-dragged
		/>
	{/each}
</div>

<style>
	.figures {
		display: grid;
		grid-template-columns: repeat(var(--figure-amount), 1fr);
	}
</style>
