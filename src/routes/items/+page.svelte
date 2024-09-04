<script lang="ts">
	import { goto } from '$app/navigation';
	import { Inventory } from '$lib/inventory';
	import { itemInfoDictionary, type ItemInfo } from '$lib/item';
	import Dialog from '../../components/dialog.svelte';

	let dialog: HTMLDialogElement;

	const handleAdd = (item: ItemInfo) => {
		const dropped = Inventory.tryAdd(item);
		dropped ? goto('/bag') : dialog.showModal();
	};
</script>

<input type="search" placeholder="SEARCH" />
<div class="flex-col gap-1">
	{#each Object.entries(itemInfoDictionary) as [key, item]}
		<div class="flex-row">
			<a class="flexible" href="items/{key}">{item.name.toUpperCase()}</a><button
				on:click={() => handleAdd(item)}>ADD</button
			>
		</div>
	{/each}
</div>

<Dialog bind:dialog>There is no more space</Dialog>

<style>
</style>
