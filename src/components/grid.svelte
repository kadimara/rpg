<script lang="ts">
	import type { Item } from '$lib/item';
	import { createEventDispatcher } from 'svelte';

	export let columns: number;
	export let rows: number;
	export let items: Item[];

	export let movingItemId: number = -1;
	export let movingOffset: { x: number; y: number } = { x: 0, y: 0 };

	export let grid: HTMLDivElement | null = null;

	// assigning the event dispatcher and typing the payload
	const dispatch = createEventDispatcher<{
		click: MouseEvent & { currentTarget: EventTarget & HTMLDivElement };
		pointerdown: PointerEvent;
	}>();

	const getItemWidth = (item: Item) => {
		return Math.max(...item.cells.map((cell) => cell[0])) + 1;
	};
	const getItemHeight = (item: Item) => {
		return Math.max(...item.cells.map((cell) => cell[1])) + 1;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="grid"
	style="--columns:{columns}; --rows:{rows};"
	bind:this={grid}
	on:pointerdown={(e) => dispatch('pointerdown', e)}
	on:click={(e) => dispatch('click', e)}
>
	{#each Array.apply(null, Array(columns * rows)) as value, i (i)}
		{@const x = i % columns}
		{@const y = Math.floor(i / columns)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="cell" style="--x:{x}; --y: {y};">
			x: {x}, y: {y}
		</div>
	{/each}
	{#each items as item, i}
		{@const isMoving = movingItemId == item._id}

		<div
			class="item"
			style="
				--x:{item.anchor[0]}; 
				--y: {item.anchor[1]};
				--width:{getItemWidth(item)}; 
				--height: {getItemHeight(item)};

				position: relative;
				left: {isMoving ? movingOffset.x : 0}px;
				top: {isMoving ? movingOffset.y : 0}px;
			"
		></div>
		{#each item.cells as cell, i}
			<div
				class="item cell"
				style="
					--x:{item.anchor[0] + cell[0]}; 
					--y: {item.anchor[1] + cell[1]}; 
					position: relative;

					margin-right: {item.cells.find((c) => c[0] == cell[0] + 1 && c[1] == cell[1]) ? -5 : 0}px;
					margin-bottom: {item.cells.find((c) => c[0] == cell[0] && c[1] == cell[1] + 1) ? -5 : 0}px;
				"
			>
				{#if i == 0}
					{item.name}
				{/if}
			</div>
		{/each}
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
		gap: 4px;

		user-select: none;

		aspect-ratio: var(--columns) / var(--rows);
		max-width: 100%;
		max-height: 100lvh;

		overflow: visible;
	}

	.cell {
		background: grey;
		padding: 4px;
		grid-column: calc(var(--x) + 1) / span 1;
		grid-row: calc(var(--y) + 1) / span 1;
	}

	.item {
		background: rgba(220, 20, 60, 0.2);

		grid-column: calc(var(--x) + 1) / span var(--width);
		grid-row: calc(var(--y) + 1) / span var(--height);

		overflow: hidden;
	}

	.item.cell {
		padding: 4px;
		background: crimson;
		cursor: pointer;

		grid-column: calc(var(--x) + 1) / span 1;
		grid-row: calc(var(--y) + 1) / span 1;

		overflow: hidden;
	}
</style>
