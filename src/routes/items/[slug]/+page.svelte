<script>
	import Grid from '../../../components/grid.svelte';

	export let data;
	let { item } = data;

	let columns = Math.max(...item.cells.map((cell) => cell[0] + 1));
	let rows = Math.max(...item.cells.map((cell) => cell[1] + 1));
</script>

<div class="flex-col flexible">
	<h1>{item.name}</h1>
	<p>{item.description}</p>
	<p>{item.ability}</p>
	<p>{item?.stats || ''}</p>
</div>

<div style="width: {columns * 64}px; height: {rows * 64}px; margin: auto;">
	<Grid {columns} {rows} items={[{ ...item, anchor: [0, 0], _id: -1 }]} />
</div>

<style></style>
