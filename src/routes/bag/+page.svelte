<script lang="ts">
	import { items } from '$lib/data';
	import { Inventory } from '$lib/inventory';
	import { CellUtil, type Cell } from '$lib/item';
	import DialogItem from '../../components/DialogItem.svelte';
	import Grid from '../../components/Grid.svelte';

	type Pos = {
		x: number;
		y: number;
	};

	let dialog: HTMLDialogElement;
	let dialogItemId = -1;
	$: dialogItem = Inventory.get(dialogItemId);

	const columns = Inventory.columns;
	const rows = Inventory.rows;

	let gridElement: HTMLDivElement;

	let movingItemId: number;
	let down: Pos = { x: 0, y: 0 };
	let movingOffset: Pos = { x: 0, y: 0 };
	let itemOffset: Cell = [0, 0];

	$: uniqueItems = $items.filter((item, pos) => {
		return $items.findIndex((item2) => item.key === item2.key) == pos;
	});

	const handleDown = (customEvent: CustomEvent<PointerEvent>) => {
		const e = customEvent.detail;
		const cell = getCell(e);
		movingItemId = Inventory.findItemId(cell);
		const item = Inventory.get(movingItemId);
		if (item) {
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
		const item = Inventory.get(movingItemId);
		if (item) {
			const mouseCell = getCell(e);
			const cell = CellUtil.sub(mouseCell, itemOffset);

			if (Inventory.canDrop(item, cell)) {
				items.update((items) =>
					items.map((i) => (i._id == movingItemId ? { ...i, anchor: cell } : i))
				);
			}
		}
		movingItemId = -1;
		document.removeEventListener('pointermove', handleMove);
		document.removeEventListener('pointerup', handleUp);
	};

	const getCell = (e: PointerEvent | MouseEvent): Cell => {
		const position = {
			x: e.clientX - gridElement.offsetLeft,
			y: e.clientY - gridElement.offsetTop
		};
		const cellSize = { x: gridElement.clientWidth / columns, y: gridElement.clientHeight / rows };
		return [Math.floor(position.x / cellSize.x), Math.floor(position.y / cellSize.y)];
	};

	const handleRemoveItem = () => {
		Inventory.remove(dialogItemId);
		dialogItemId = -1;
		dialog.close();
	};

	const handleClick = (customEvent: CustomEvent<MouseEvent>) => {
		// Dont open item modal when mouse moved.
		if (Math.abs(movingOffset.x) < 4 && Math.abs(movingOffset.y) < 4) {
			const e = customEvent.detail;
			const cell = getCell(e);
			dialogItemId = Inventory.findItemId(cell);
			dialogItemId > -1 && dialog.showModal();
		}
	};
</script>

<Grid
	{columns}
	{rows}
	{movingItemId}
	{movingOffset}
	bind:grid={gridElement}
	bind:items={$items}
	on:pointerdown={handleDown}
	on:click={handleClick}
/>
<div class="flex-col gap-1">
	<h2>Abilities</h2>
	{#each uniqueItems as item, i}
		{#if item.ability}
			<div class="flex-col">
				<aside class="small">{item.name.toUpperCase()}</aside>
				{item.ability}
			</div>
		{/if}
	{/each}
</div>

<DialogItem bind:dialog item={dialogItem}>
	<div slot="footer" class="flex-row gap-1">
		{#if dialogItem?.singleUse}
			<button on:click={handleRemoveItem}>USED</button>
		{/if}
		<button on:click={handleRemoveItem}>DROP</button>
	</div>
</DialogItem>
