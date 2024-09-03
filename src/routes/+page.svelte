<script lang="ts">
	import type { Item } from '$lib/item.js';
	import type { StatType } from '$lib/stat';
	import { getStatImage, getStatLabel, statTypes } from '$lib/stat';
	import { Preferences } from '@capacitor/preferences';
	import { onMount } from 'svelte';

	let name: string = '';
	$: window &&
		Preferences.set({
			key: 'name',
			value: name
		});

	type Stats = { [key in StatType]: number };

	export let data;

	let items = data.inventory.items;
	let baseStats = {} as Stats;
	$: lootStats = setLootStats(items) as Stats;
	$: stats = setStats(baseStats, lootStats) as Stats;

	function setLootStats(items: Item[]) {
		const stats = {} as Stats;
		statTypes.forEach((stat) => {
			stats[stat] = items.reduce(
				(sum, item) => sum + (item.stats?.filter((s) => s === stat).length || 0),
				0
			);
		});
		return stats;
	}

	function setStats(baseStats: Stats, lootStats: Stats) {
		const stats = {} as Stats;
		statTypes.forEach((stat) => {
			if (stat == 'defence') {
				stats[stat] =
					(baseStats.constitution || 0) + (lootStats.constitution || 0) + (lootStats[stat] || 0);
				return;
			}
			stats[stat] = (baseStats[stat] || 0) + (lootStats[stat] || 0);
			return;
		});
		return stats;
	}

	onMount(() => {
		Preferences.get({ key: 'name' }).then((result) => {
			console.log(result);
			name = result.value || '';
		});
	});
</script>

<div class="flex-row gap-1">
	<input class="flexible" placeholder="NAME" bind:value={name} />
	<input class="flexible" placeholder="LIFEFORM" />
	<input class="flexible" placeholder="CLASS" />
</div>
<div class="flex-row gap-1">
	<input class="flexible" placeholder="STORY" />
	<input placeholder="WORLD" />
</div>
<br />
<div class="grid">
	{#each statTypes as stat}
		<div class="flex-col stat">
			{#if stat === 'defence'}
				<aside>CON + LOOT = DEF</aside>
			{/if}
			{getStatLabel(stat)}
			{#if stat === 'defence'}
				<aside>10 + DEF = ENEMY TO <br /> HIT ROLL</aside>
			{/if}
		</div>
		<div class="stat-value" style="background-image: url({getStatImage(stat)});">
			{stats[stat]}
		</div>
		<div class="flex-col">
			<div class="input">
				BASE <input
					type="number"
					style="color: {baseStats[stat] ? 'currentColor' : '#222'}"
					bind:value={baseStats[stat]}
				/>
			</div>
			<div class="input">
				LOOT
				<input
					type="number"
					style="color: {lootStats[stat] ? 'currentColor' : '#222'}"
					value={lootStats[stat]}
					disabled
				/>
			</div>
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
				<button
					on:click={() => {
						data.inventory.remove(i);
						items = data.inventory.items;
					}}>USE</button
				>
			</li>
		{/if}
	{/each}
</ul>

HEALTH --- HERO COIN

<style>
	.grid {
		display: grid;
		grid-template-columns: auto auto 132px auto auto 100px;
		align-items: center;
		font-size: 20px;
		font-weight: bold;
	}

	.grid > *:nth-child(6n - 3) {
		margin-right: 32px;
	}

	input:not([type='checkbox']) {
		background: transparent;
		border: none;
		border-bottom: 1px solid;
		border-radius: 0;
		margin: 0 4px;
	}

	.input {
		display: flex;
		flex-direction: row;
		align-items: baseline;

		font-size: 10px;
		color: gray;
		font-weight: bold;
		border-bottom: 1px solid;
	}

	.input input {
		background: transparent;
		border: none;
		width: 100%;
		text-align: center;
	}

	aside {
		font-size: 10px;
		color: gray;
		font-weight: bold;
	}

	.stat {
	}
	.stat-value {
		color: #222222;
		position: relative;
		width: 48px;
		height: 48px;
		align-content: center;
		text-align: center;
		background-size: cover;
		filter: invert(0.89);
	}
</style>
