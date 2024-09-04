<script>
	import Grid from '../../../components/grid.svelte';

	export let data;
	let { item } = data;

	let columns = Math.max(...item.cells.map((cell) => cell[0] + 1));
	let rows = Math.max(...item.cells.map((cell) => cell[1] + 1));
	1;
</script>

<h1>{item.name}</h1>
<div class="flex-row">
	<div class="flex-col flexible">
		<p>{item.description}</p>
		<p>{item.ability}</p>
		<p>{JSON.stringify(item.stats || [])}</p>
	</div>

	<div style="width: {columns * 64}px;">
		<Grid {columns} {rows} items={[{ ...item, anchor: [0, 0], _id: -1 }]} />
	</div>
</div>

<style></style>
