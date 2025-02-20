<script lang="ts">
	import type { ItemInfo } from '$lib/item';
	import Dialog from './Dialog.svelte';
	import Grid from './Grid.svelte';

	export let dialog: HTMLDialogElement;
	export let item: ItemInfo | undefined;

	$: columns = item ? Math.max(...item?.cells.map((cell) => cell[0] + 1)) : 0;
	$: rows = item ? Math.max(...item?.cells.map((cell) => cell[1] + 1)) : 0;
</script>

<Dialog bind:dialog>
	{#if item}
		<strong>{item.name.toUpperCase()}</strong>
		<p>
			{item.description}
		</p>
		<p>
			{item.ability}
		</p>
		{#if item.stats}
			<p>
				{item.stats}
			</p>
		{/if}
		<div style="width: {columns * 64}px; margin: auto;">
			<Grid {columns} {rows} items={[{ ...item, anchor: [0, 0], _id: -1 }]} />
		</div>
	{/if}
	<slot name="footer" />
</Dialog>
