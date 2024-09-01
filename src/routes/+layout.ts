import { Inventory } from '$lib/inventory.js';
import { items } from '$lib/items.js';

export const prerender = true;

const inventory = new Inventory(5, 5);
inventory.add(items.bow, 0, 0);
inventory.add(items.potion, 1, 0);
inventory.add(items.potion, 2, 0);
inventory.add(items.dagger, 3, 0);
inventory.add(items.sword, 2, 2);
inventory.add(items.scroll, 3, 2);

export function load({ params }) {
	return {
		inventory
	};
}
