<script lang='ts'>
	export let visible: boolean;
</script>

<h1
	class='game-over'
	class:visible
>
	GAME OVER!
</h1>

<style>
	.game-over {
		display: none;
		position: absolute;
		width: 50vw;
		font-size: 10rem;
		text-align: center;
	}

	.game-over.visible {
		display: block;
	}
</style>
