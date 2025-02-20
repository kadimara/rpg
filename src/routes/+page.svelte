<script lang="ts">
	import { baseStats, info, items } from '$lib/data';
	import type { Item } from '$lib/item.js';
	import type { StatType } from '$lib/stat';
	import { getStatLabel, statDescriptionDictionary, statTypes } from '$lib/stat';
	import Dialog from '../components/Dialog.svelte';
	import HealthBar from '../components/HealthBar.svelte';
	import Stat from '../components/Stat.svelte';

	type Stats = { [key in StatType]: number };

	$: lootStats = setLootStats($items) as Stats;
	$: stats = setStats($baseStats, lootStats) as Stats;

	let dialogStat: HTMLDialogElement;
	let dialogStatValue: StatType;

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
			if (stat == 'defense') {
				const baseCon = baseStats.constitution || 0;
				const lootCon = lootStats.constitution || 0;
				stats[stat] = Math.min(baseCon + lootCon + lootStat, 10);
				return;
			}
			stats[stat] = Math.min(baseStat + lootStat, 10);
			return;
		});
		return stats;
	};
</script>

<HealthBar />
<div style="display: grid; grid-template-columns: auto auto;">
	<input placeholder="NAME" bind:value={$info.name} />
	<input placeholder="LIFEFORM" bind:value={$info.lifeform} />
	<input placeholder="CLASS" bind:value={$info.class} />
	<input placeholder="WORLD" bind:value={$info.world} />
	<input placeholder="STORY" bind:value={$info.story} style="grid-column: 1 / 3;" />
</div>
<div class="grid align-items-center">
	{#each statTypes as stat}
		<Stat
			{stat}
			value={stats[stat]}
			lootValue={lootStats[stat]}
			bind:baseValue={$baseStats[stat]}
			on:click={(e) => {
				dialogStatValue = e.detail;
				dialogStat.showModal();
			}}
		/>
	{/each}
</div>

<Dialog bind:dialog={dialogStat}>
	<strong>{getStatLabel(dialogStatValue)}</strong>
	<p>{statDescriptionDictionary[dialogStatValue]}</p>
</Dialog>

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
