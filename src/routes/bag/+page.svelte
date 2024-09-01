<script lang="ts">
	import type { Item } from '$lib/item.js';
	import Vector from '$lib/vector';

	export let data;
	const inventory = data.inventory;
	let items = inventory.items;

	const columns = inventory.columns;
	const rows = inventory.rows;

	let gridElement: HTMLDivElement;

	let movingItem: Item | undefined;
	let down = new Vector(0, 0);
	let offset = new Vector(0, 0);
	let itemOffset = new Vector(0, 0);

	const handleDown = (e: PointerEvent) => {
		const cell = getCell(e);
		const item = inventory.findItem(cell);
		if (item) {
			itemOffset = cell.min(item.anchor);
		}

		movingItem = item;
		down = new Vector(e.clientX, e.clientY);
		offset = new Vector(0, 0);

		document.addEventListener('pointermove', handleMove);
		document.addEventListener('pointerup', handleUp);
	};

	const handleMove = (e: PointerEvent) => {
		const pos = new Vector(e.clientX, e.clientY);
		offset = pos.min(down);
	};
	const handleUp = (e: PointerEvent) => {
		if (movingItem) {
			const mouseCell = getCell(e);
			const cell = mouseCell.min(itemOffset);

			if (inventory.canDrop(movingItem, cell)) {
				movingItem.anchor = cell;
				items = inventory.items;
			}
		}
		movingItem = undefined;
		document.removeEventListener('pointermove', handleMove);
		document.removeEventListener('pointerup', handleUp);
	};

	const getCell = (e: PointerEvent) => {
		const position = new Vector(
			e.clientX - gridElement.offsetLeft,
			e.clientY - gridElement.offsetTop
		);
		const cellSize = new Vector(gridElement.clientWidth / columns, gridElement.clientHeight / rows);
		return new Vector(Math.floor(position.x / cellSize.x), Math.floor(position.y / cellSize.y));
	};

	const getItemWidth = (item: Item) => {
		return Math.max(...item.cells.map((cell) => cell.x)) + 1;
	};
	const getItemHeight = (item: Item) => {
		return Math.max(...item.cells.map((cell) => cell.y)) + 1;
	};
</script>

<div
	class="grid"
	style="--columns:{columns}; --rows:{rows};"
	on:pointerdown={handleDown}
	bind:this={gridElement}
>
	{#each Array.apply(null, Array(columns * rows)) as value, i (i)}
		{@const x = i % columns}
		{@const y = Math.floor(i / rows)}
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="cell" style="--x:{x}; --y: {y};">
			x: {x}, y: {y}
		</div>
	{/each}
	{#each items as item, i}
		{@const isMoving = movingItem == item}
		<div
			class="item"
			style="
                --x:{item.anchor.x}; 
                --y: {item.anchor.y};
                --width:{getItemWidth(item)}; 
                --height: {getItemHeight(item)};

				position: relative;
                left: {isMoving ? offset.x : 0}px;
                top: {isMoving ? offset.y : 0}px;
            "
		>
			{item.name}
		</div>
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
		padding: 4px;
		background: crimson;
		cursor: pointer;

		grid-column: calc(var(--x) + 1) / span var(--width);
		grid-row: calc(var(--y) + 1) / span var(--height);

		overflow: hidden;
	}
</style>
