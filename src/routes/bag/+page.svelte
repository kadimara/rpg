<script lang="ts">
	import { items } from '$lib/data';
	import { Inventory } from '$lib/inventory';
	import { CellUtil, type Cell, type Item } from '$lib/item';
	import Dialog from '../../components/dialog.svelte';
	import Grid from '../../components/grid.svelte';

	type Pos = {
		x: number;
		y: number;
	};

	let dialog: HTMLDialogElement;
	let dialogItemId = -1;

	const columns = Inventory.columns;
	const rows = Inventory.rows;

	let gridElement: HTMLDivElement;

	let movingItemIndex: number;
	let down: Pos = { x: 0, y: 0 };
	let movingOffset: Pos = { x: 0, y: 0 };
	let itemOffset: Cell = [0, 0];

	const handleDown = (customEvent: CustomEvent<PointerEvent>) => {
		const e = customEvent.detail;
		const cell = getCell(e);
		movingItemIndex = Inventory.findItemIndex(cell);
		if (movingItemIndex != -1) {
			const item = $items[movingItemIndex];
			itemOffset = CellUtil.sub(cell, item.anchor);
		}

		down = { x: e.clientX, y: e.clientY };
		movingOffset = { x: 0, y: 0 };

		document.addEventListener('pointermove', handleMove);
		document.addEventListener('pointerup', handleUp);
	};

	const handleMove = (e: PointerEvent) => {
		const pos = { x: e.clientX, y: e.clientY };
		movingOffset = { x: pos.x - down.x, y: pos.y - down.y };
	};
	const handleUp = (e: PointerEvent) => {
		if (movingItemIndex != -1) {
			const item = $items[movingItemIndex];
			const mouseCell = getCell(e);
			const cell = CellUtil.sub(mouseCell, itemOffset);

			if (Inventory.canDrop(item, cell)) {
				$items[movingItemIndex].anchor = cell;
			}
		}
		movingItemIndex = -1;
		document.removeEventListener('pointermove', handleMove);
		document.removeEventListener('pointerup', handleUp);
	};

	const getCell = (e: PointerEvent): Cell => {
		const position = {
			x: e.clientX - gridElement.offsetLeft,
			y: e.clientY - gridElement.offsetTop
		};
		const cellSize = { x: gridElement.clientWidth / columns, y: gridElement.clientHeight / rows };
		return [Math.floor(position.x / cellSize.x), Math.floor(position.y / cellSize.y)];
	};

	const getItemWidth = (item: Item) => {
		return Math.max(...item.cells.map((cell) => cell[0])) + 1;
	};
	const getItemHeight = (item: Item) => {
		return Math.max(...item.cells.map((cell) => cell[1])) + 1;
	};

	const handleRemoveItem = () => {
		Inventory.remove(dialogItemId);
		dialogItemId = -1;
		dialog.close();
	};

	const handleClickItem = (e: CustomEvent<Item>) => {
		dialogItemId = e.detail._id;
		dialog.showModal();
	};
</script>

<Grid
	{columns}
	{rows}
	{movingItemIndex}
	{movingOffset}
	bind:grid={gridElement}
	bind:items={$items}
	on:pointerdown={handleDown}
	on:clickitem={handleClickItem}
/>
<ul>
	{#each $items as item, i}
		{#if item.ability}
			<li>
				{item.ability}
				<aside>{item.name.toUpperCase()}</aside>
			</li>
		{/if}
	{/each}
</ul>

<Dialog bind:dialog>
	{@const item = Inventory.get(dialogItemId)}
	<h2>{item?.name}</h2>
	<p>
		{item?.description}
	</p>
	<p>
		{item?.ability}
	</p>
	{#if item?.stats}
		<p>
			{item?.stats}
		</p>
	{/if}
	{#if item?.singleUse}
		<button on:click={handleRemoveItem}>USED</button>
	{/if}
	<button on:click={handleRemoveItem}>DROP</button>
</Dialog>
