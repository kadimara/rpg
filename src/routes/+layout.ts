import { Inventory } from '$lib/inventory.js';
import { items } from '$lib/items.js';

export const prerender = true;

const inventory = new Inventory(5, 5);
inventory.add(items.bow, 0, 0);
inventory.add(items.dagger, 1, 0);
inventory.add(items.potion_healing, 2, 0);
inventory.add(items.dagger, 3, 0);
inventory.add(items.sword, 2, 2);
inventory.add(items.scroll_fireball, 3, 2);
inventory.add(items.shield, 3, 3);

export function load({}) {
	return {
		inventory
	};
}
