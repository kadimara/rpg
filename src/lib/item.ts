import Vector from '$lib/vector';
import type { StatType } from './stat';

export type ItemDto = {
	key: string;
	name: string;
	description: string;
	stats?: StatType[];
	ability?: string;
	singleUse?: boolean;
	cells: number[][];
};

export class Item {
	readonly key: string;
	readonly name: string;
	readonly description: string;
	readonly stats?: StatType[];
	readonly ability?: string;
	readonly singleUse?: boolean;
	readonly cells: Vector[];
	anchor: Vector;

	constructor(dto: ItemDto, anchor: Vector) {
		this.key = dto.key;
		this.name = dto.name;
		this.description = dto.description;
		this.stats = dto.stats;
		this.ability = dto.ability;
		this.singleUse = dto.singleUse;
		this.cells = dto.cells.map((cell) => new Vector(cell[0], cell[1]));
		this.anchor = anchor;
		this.key = dto.key;
	}
}
