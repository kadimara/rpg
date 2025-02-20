<script>
	import { page } from '$app/stores';
	import { baseStats, info, items, notes } from '$lib/data';
	import { Storage } from '$lib/storage';
	import { onMount } from 'svelte';
	import '../app.css';
	import '../styles/app.css';

	$: path = $page.url.pathname;

	onMount(async () => {
		info.set({ ...$info, ...(await Storage.getInfo()) });
		info.subscribe((info) => Storage.setInfo(info));

		baseStats.set(await Storage.getBaseStats());
		baseStats.subscribe((stats) => Storage.setBaseStats(stats));

		items.set(await Storage.getItems());
		items.subscribe((items) => Storage.setItems(items));

		notes.set(await Storage.getNotes());
		notes.subscribe((notes) => Storage.setNotes(notes));
	});
</script>

<div class="flex-col gap-4 content" class:death={$info.hp == 0}>
	<slot />
</div>

<!-- Extra space so content wont be left under the nav when scrolling -->
<div style="height: 48px;" />
<nav>
	<a href="/" class:active={path == '/'}>HOME</a>
	<a href="/bag" class:active={path == '/bag'}>BAG</a>
	<a href="/items" class:active={path == '/items'}>ITEMS</a>
	<a href="/notes" class:active={path == '/notes'}>NOTES</a>
	<a href="/rules" class:active={path == '/rules'}>RULES</a>
	<!-- <a href="/ai" class:active={path == '/ai'}>AI</a> -->
</nav>

<style>
	.content {
		padding: 8px;
		transition: opacity 0.4s ease;
	}
	.death {
		opacity: 0.5;
	}

	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-evenly;
		background: #222222;

		max-width: 500px;
		margin: auto;
	}

	nav a {
		flex: 1;
		height: 48px;
		text-align: center;
		align-content: center;
		font-weight: bold;
	}

	nav a.active {
		color: #c9c9c9;
		border-bottom: 4px solid #c9c9c9;
		pointer-events: none;
	}
</style>
