<script lang="ts">
	import { baseStats, info, items } from '$lib/data';
	import type { Item } from '$lib/item.js';
	import type { StatType } from '$lib/stat';
	import { statTypes } from '$lib/stat';
	import Stat from '../components/stat.svelte';

	type Stats = { [key in StatType]: number };

	$: lootStats = setLootStats($items) as Stats;
	$: stats = setStats($baseStats, lootStats) as Stats;

	const setLootStats = (items: Item[]) => {
		const stats = {} as Stats;
		statTypes.forEach((stat) => {
			stats[stat] = items.reduce(
				(sum, item) => sum + (item.stats?.filter((s) => s === stat).length || 0),
				0
			);
		});
		return stats;
	};

	const setStats = (baseStats: Stats, lootStats: Stats) => {
		const stats = {} as Stats;
		statTypes.forEach((stat) => {
			const baseStat = baseStats[stat] || 0;
			const lootStat = lootStats[stat] || 0;
			if (stat == 'defence') {
				const baseCon = baseStats.constitution || 0;
				const lootCon = lootStats.constitution || 0;
				stats[stat] = Math.min(baseCon + lootCon + lootStat);
				return;
			}
			stats[stat] = Math.min(baseStat + lootStat, 10);
			return;
		});
		return stats;
	};
</script>

<div style="display: grid; grid-template-columns: auto auto;">
	<input placeholder="NAME" bind:value={$info.name} />
	<input placeholder="LIFEFORM" bind:value={$info.lifeform} />
	<input placeholder="CLASS" bind:value={$info.class} />
	<input placeholder="WORLD" bind:value={$info.world} />
	<input placeholder="STORY" bind:value={$info.story} style="grid-column: 1 / 3;" />
</div>
<div class="grid gap-1 align-items-center">
	{#each statTypes as stat}
		<Stat
			{stat}
			value={stats[stat]}
			lootValue={lootStats[stat]}
			bind:baseValue={$baseStats[stat]}
		/>
	{/each}
</div>

HEALTH --- HERO COIN

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr auto;
		margin: 0px 16px;
	}

	input:not([type='checkbox']) {
		background: transparent;
		border: none;
		border-bottom: 1px solid;
		border-radius: 0;
		margin: 0 4px;
		min-width: 0;
	}
</style>
