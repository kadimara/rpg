import Vector from '$lib/vector';

export class Item {
	readonly name: string;
	readonly cells: Vector[];
	anchor: Vector = new Vector(0, 0);

	constructor(name: string, cells: number[][]) {
		this.name = name;
		this.cells = cells.map((cell) => new Vector(cell[0], cell[1]));
	}

	clone() {
		return new Item(
			this.name,
			this.cells.map((cell) => [cell.x, cell.y])
		);
	}
}
