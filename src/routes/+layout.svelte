<script>
	import { page } from '$app/stores';
	import { baseStats, info, items, notes } from '$lib/data';
	import { Storage } from '$lib/storage';
	import { onMount } from 'svelte';
	import '../app.css';

	$: path = $page.url.pathname;

	onMount(async () => {
		info.set(await Storage.getInfo());
		info.subscribe((info) => Storage.setInfo(info));

		baseStats.set(await Storage.getBaseStats());
		baseStats.subscribe((stats) => Storage.setBaseStats(stats));

		items.set(await Storage.getItems());
		items.subscribe((items) => Storage.setItems(items));

		notes.set(await Storage.getNotes());
		notes.subscribe((notes) => {
			console.log('SET NOTES');
			Storage.setNotes(notes);
		});
	});
</script>

<div class="flex-col gap-4" style="padding: 8px;">
	<slot />
</div>

<!-- Extra space so content wont be left under the nav when scrolling -->
<div style="height: 30px;" />
<nav>
	<a href="/" class:active={path == '/'}>HOME</a>
	<a href="/bag" class:active={path == '/bag'}>BAG</a>
	<a href="/items" class:active={path == '/items'}>ITEMS</a>
	<a href="/notes" class:active={path == '/notes'}>NOTES</a>
	<!-- <a href="/ai" class:active={path == '/ai'}>AI</a> -->
</nav>

<style>
	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;

		display: flex;
		justify-content: space-evenly;
		background: #222222;
	}

	nav a {
		flex: 1;
		height: 48px;
		text-align: center;
		align-content: center;
	}

	nav a.active {
		color: #c9c9c9;
		border-bottom: 4px solid #c9c9c9;
	}
</style>
