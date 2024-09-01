import type { Item } from './item';
import Vector from './vector';

export class Inventory {
	readonly columns: number = 0;
	readonly rows: number = 0;
	readonly items: Item[] = [];

	constructor(columns: number, rows: number) {
		this.columns = columns;
		this.rows = rows;
	}

	findItem(cell: Vector): Item | undefined {
		return this.items.find((item) => {
			return this.hitItem(item, cell);
		});
	}

	hitItem(item: Item, cell: Vector) {
		return item.cells.some((c) => {
			return cell.equals(item.anchor.add(c));
		});
	}

	canDrop(item: Item, cell: Vector) {
		const cellsToCheck = item.cells.map((c) => cell.add(c));
		const itemsToCheck = this.items.filter((i) => i !== item);
		for (cell of cellsToCheck) {
			// Cell is outside grid.
			if (cell.x < 0 || this.columns - 1 < cell.x || cell.y < 0 || this.rows - 1 < cell.y) {
				return false;
			}
			// Cell is on a used cell.
			if (itemsToCheck.some((item) => Boolean(this.hitItem(item, cell)))) {
				return false;
			}
		}
		return true;
	}

	add(item: Item, x: number, y: number) {
		const anchor = new Vector(x, y);
		if (this.canDrop(item, anchor)) {
			const clone = item.clone();
			clone.anchor = anchor;
			this.items.push(clone);
		}
	}
}
