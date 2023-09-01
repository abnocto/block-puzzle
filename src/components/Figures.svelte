<script lang='ts'>
	import Figure from './Figure.svelte';
	import type {FigureDto} from '../types';

	export let figures: FigureDto[];
</script>

<div class='figures'>
	{#each figures as figure (figure.id)}
		<Figure
			{figure}
			on:figure-dragged
			on:figure-dropped
		/>
	{/each}
</div>

<style>
	.figures {
		display: flex;
		align-items: flex-start;
		gap: var(--gap-l);
		margin-top: var(--gap-l);
	}
</style>
