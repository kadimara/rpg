<script>
	export let data;
	let { item } = data;
</script>

<h1>{item.name}</h1>
<p>{item.description}</p>
<p>{item.ability}</p>
<p>{JSON.stringify(item.stats || [])}</p>
