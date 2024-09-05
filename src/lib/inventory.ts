import { get } from 'svelte/store';
import { items } from './data';
import type { Cell, Item, ItemInfo } from './item';

export class Inventory {
	static columns: number = 5;
	static rows: number = 5;

	static get items() {
		return get(items);
	}

	static findItemId(cell: Cell): number {
		const id = this.items.find((item) => {
			return this.hitItem(item, cell);
		})?._id;
		return id != undefined ? id : -1;
	}

	static hitItem(item: Item, cell: Cell) {
		const anchor = item.anchor;
		return item.cells.some((c) => {
			return cell[0] == anchor[0] + c[0] && cell[1] == anchor[1] + c[1];
		});
	}

	static canDrop(item: Item | ItemInfo, cell: Cell) {
		const cellsToCheck: Cell[] = item.cells.map((c) => [cell[0] + c[0], cell[1] + c[1]]);
		const itemsToCheck = this.items.filter((value) => value._id != (item as Item)._id);
		for (cell of cellsToCheck) {
			// Cell is outside grid.
			if (cell[0] < 0 || this.columns - 1 < cell[0] || cell[0] < 0 || this.rows - 1 < cell[1]) {
				return false;
			}
			// Cell is on a used cell.
			if (itemsToCheck.some((item) => Boolean(this.hitItem(item, cell)))) {
				return false;
			}
		}
		return true;
	}

	static add(item: Item | ItemInfo, cell: Cell): boolean {
		if (this.canDrop(item, cell)) {
			items.set([...this.items, { ...item, anchor: cell, _id: this.items.length }]);
			return true;
		}
		return false;
	}

	static tryAdd(info: ItemInfo): boolean {
		for (let y = 0; y < this.rows; y++) {
			for (let x = 0; x < this.columns; x++) {
				const added = this.add(info, [x, y]);
				if (added) {
					return true;
				}
			}
		}
		return false;
	}

	static remove(_id: number) {
		items.set(this.items.filter((item) => item._id != _id));
	}

	static get(_id: number) {
		return this.items.find((item) => item._id == _id);
	}
}
