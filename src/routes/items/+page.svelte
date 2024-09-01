<script lang="ts">
	import { items } from '$lib/items';
</script>

<input type="search" placeholder="SEARCH" />
<ul>
	{#each Object.entries(items) as [key, item]}
		<li><a href="items/{item.name}">{item.name.toUpperCase()}</a></li>
	{/each}
</ul>

<style>
</style>
