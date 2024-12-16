<script lang="ts">
	import { goto } from '$app/navigation';
	import { Inventory } from '$lib/inventory';
	import { itemInfoDictionary, type ItemInfo } from '$lib/item';
	import { base } from '$app/paths';
	import Dialog from '../../components/dialog.svelte';

	let dialog: HTMLDialogElement;
	let searchValue: string = '';

	$: searchValues = searchValue.split(' ');
	$: filteredItems = Object.entries(itemInfoDictionary).filter((value) => {
		const name = value[1].name.toLowerCase();
		return searchValues.every((value) => name.includes(value));
	});

	const handleAdd = (item: ItemInfo) => {
		const dropped = Inventory.tryAdd(item);
		dropped ? goto('{base}/bag') : dialog.showModal();
	};
</script>

<div class="flex-col gap-1">
	{#each filteredItems as [key, item]}
		<div class="flex-row align-items-center">
			<a class="flexible" href="items/{key}"
				>{item.name.toUpperCase()}
				<aside class="small">{item.ability} &nbsp;</aside>
			</a><button on:click={() => handleAdd(item)}>ADD</button>
		</div>
	{/each}
</div>

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
	}
</style>
