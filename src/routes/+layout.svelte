<script>
	import Vector from '$lib/vector';
	import { Inventory } from '$lib/inventory';
	import '../app.css';

	export const inventory = new Inventory(
		[
			{
				_id: 0,
				anchor: new Vector(2, 1),
				cells: [new Vector(0, 0), new Vector(1, 0)],
				name: 'sword'
			},
			{
				_id: 1,
				anchor: new Vector(5, 2),
				cells: [new Vector(0, 0), new Vector(0, 1), new Vector(0, 2)],
				name: 'Bow'
			},
			{
				_id: 2,
				anchor: new Vector(0, 0),
				cells: [new Vector(0, 0)],
				name: 'Potion'
			}
		],
		8,
		8
	);
</script>

<slot />
<nav>
	<a href="/">HOME</a>
	<a href="/bag">BAG</a>
	<a href="/items">ITEMS</a>
	<a href="/notes">NOTES</a>
	<a href="/ai">AI</a>
</nav>
