<script lang="ts">
	import type { StatType } from '$lib/stat';
	import { getStatLabel, getStatImage, statTypes } from '$lib/stat';
	export let data;
	let items = data.inventory.items;

	function getStatValue(stat: StatType): number {
		const items = data.inventory.items;
		const sum = items.reduce(
			(sum, item) => sum + (item.stats?.filter((s) => s === stat).length || 0),
			0
		);
		if (stat == 'defence') {
			return sum + getStatValue('consitution');
		}
		return sum;
	}
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
<br />
<div class="grid">
	{#each statTypes as stat}
		<div class="flex-col">
			{#if stat === 'defence'}
				<aside>CON + LOOT = DEF</aside>
			{/if}
			{getStatLabel(stat)}
			{#if stat === 'defence'}
				<aside>10 + DEF = ENEMY TO <br /> HIT ROLL</aside>
			{/if}
		</div>
		<div
			style="
				position:relative; 
				width: 48px; 
				height: 48px; 
				align-content: center; 
				text-align: center; 
				background-image: url({getStatImage(stat)});
				background-size: cover;
			"
		>
			{getStatValue(stat)}
		</div>
	{/each}
</div>
<br />
<ul>
	{#each items as item, i}
		{#if item.ability}
			<li>
				{item.ability}
				<aside>{item.name.toUpperCase()}</aside>
			</li>
		{/if}
	{/each}
</ul>

HEALTH --- HERO COIN

<style>
	.grid {
		display: grid;
		grid-template-columns: auto auto auto auto;
		align-items: center;
	}

	input:not([type='checkbox']) {
		background: transparent;
		border: none;
		border-bottom: 1px solid;
		border-radius: 0;
		margin: 0 4px;
	}

	.grid {
		font-size: 20px;
		font-weight: bold;
	}

	aside {
		font-size: 10px;
		color: gray;
		font-weight: bold;
	}
</style>
