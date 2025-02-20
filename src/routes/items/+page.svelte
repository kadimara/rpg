<script lang="ts">
	import { goto } from '$app/navigation';
	import { Inventory } from '$lib/inventory';
	import { itemInfoDictionary, type ItemInfo } from '$lib/item';
	import { base } from '$app/paths';
	import DialogItem from '../../components/dialogitem.svelte';
	import Dialog from '../../components/dialog.svelte';

	let dialog: HTMLDialogElement;
	let dialogItem: HTMLDialogElement;
	let dialogItemInfo: ItemInfo;
	let searchValue: string = '';

	$: searchValues = searchValue.split(' ');
	$: filteredItems = Object.entries(itemInfoDictionary).filter((value) => {
		const name = value[1].name.toLowerCase();
		return searchValues.every((value) => name.includes(value));
	});

	const handleItemClick = (item: ItemInfo) => {
		dialogItemInfo = item;
		dialogItem.showModal();
	};

	const handleAdd = (item: ItemInfo | undefined) => {
		if (item) {
			const dropped = Inventory.tryAdd(item);
			dropped ? goto('{base}/bag') : dialog.showModal();
		}
	};
</script>

<div class="flex-col gap-1">
	{#each filteredItems as [key, item]}
		<div class="flex-row align-items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flexible" on:click={() => handleItemClick(item)}>
				{item.name.toUpperCase()}
				<aside class="small">{item.ability} &nbsp;</aside>
			</div>
			<button on:click={() => handleAdd(item)}>ADD</button>
		</div>
	{/each}
</div>

<DialogItem bind:dialog={dialogItem} item={dialogItemInfo}>
	<div slot="footer">
		<button on:click={() => handleAdd(dialogItemInfo)}>ADD</button>
	</div>
</DialogItem>
<Dialog bind:dialog>There is no more space</Dialog>

<!-- Extra space so content wont be left underneath the footer when scrolling -->
<div style="height: 45px;" />
<div class="footer flex-col">
	<input type="search" placeholder="SEARCH" bind:value={searchValue} />
</div>

<style>
	.footer {
		position: fixed;
		height: 45px;
		bottom: 48px;
		left: 0;
		right: 0;
		padding: 8px;

		max-width: 500px;
		margin: auto;
	}
</style>
