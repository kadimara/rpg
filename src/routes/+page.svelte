<script>
	import { Stat, statTypes } from '$lib/stat';
</script>

<div class="flex-row">
	<input class="flexible" placeholder="NAME" />
	<input class="flexible" placeholder="LIFEFORM" />
	<input class="flexible" placeholder="CLASS" />
</div>
<div class="flex-row">
	<input class="flexible" placeholder="STORY" />
	<input placeholder="WORLD" />
</div>
<div class="grid">
	{#each statTypes as type}
		<div>{Stat.getLabel(type)}</div>
	{/each}
</div>

<ul>
	<li>Ability lorem ipsum</li>
	<li>Ability lorem ipsum</li>
	<li>Ability lorem ipsum</li>
	<li>Ability lorem ipsum <button>USE</button></li>
</ul>

HEALTH --- HERO COIN

<style>
	.grid {
		display: grid;
		grid-template-columns: auto auto;
	}

	input:not([type='checkbox']) {
		background: transparent;
		border: none;
		border-bottom: 1px solid;
		border-radius: 0;
		margin: 0 4px;
	}
</style>
