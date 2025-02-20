import type { StatType } from './stat';

export type ItemKey =
	| 'bow'
	| 'dagger'
	| 'potion_healing'
	| 'scroll_fireball'
	| 'shield'
	| 'sword'
	| 'tetris';

export type Cell = readonly [number, number];
export class CellUtil {
	static sub(value: Cell, other: Cell): Cell {
		return [value[0] - other[0], value[1] - other[1]];
	}
	static add(value: Cell, other: Cell): Cell {
		return [value[0] + other[0], value[1] + other[1]];
	}
	static equals(value: Cell, other: Cell): boolean {
		return value[0] == other[0] && value[1] == other[1];
	}
}

export type Item = {
	_id: number;
	anchor: Cell;
} & ItemInfo;

export type ItemInfo = {
	key: ItemKey;
	name: string;
	description: string;
	stats?: StatType[];
	ability?: string;
	singleUse?: boolean;
	cells: Cell[];
};

export const itemInfoDictionary: {
	[key in ItemKey]: ItemInfo;
} = {
	bow: {
		key: 'bow',
		name: 'Bow',
		description: 'I fine handcrafted wooden bow.',
		ability: '',
		stats: ['dexterity'],
		cells: [
			[0, 0],
			[0, 1],
			[0, 2]
		]
	},
	dagger: {
		key: 'dagger',
		name: 'Dagger',
		description: 'A small but very sharp knife, great for cutting things up.',
		ability: '',
		stats: ['dexterity'],
		cells: [[0, 0]]
	},
	potion_healing: {
		key: 'potion_healing',
		name: 'Healing potion',
		description: 'A weird red fluit that will probably heal you.',
		ability: 'Single use to heal for 1d4.',
		singleUse: true,
		cells: [[0, 0]]
	},
	scroll_fireball: {
		key: 'scroll_fireball',
		name: 'Fireball',
		description: 'Hot hot hot!',
		ability: '',
		stats: ['intelligence'],
		cells: [[0, 0]]
	},
	shield: {
		key: 'shield',
		name: 'Common shield',
		description: 'A big wooden shield. Something to hide behind.',
		ability: 'If hit, sacrifice the shield to absorb all of any 1 attack.',
		stats: ['defense', 'defense'],
		cells: [
			[0, 0],
			[1, 0],
			[0, 1],
			[1, 1]
		]
	},
	sword: {
		key: 'sword',
		name: 'Sword',
		description: "A man's best friend.",
		ability: '',
		cells: [
			[0, 0],
			[0, 1]
		]
	},
	tetris: {
		key: 'tetris',
		name: 'Tetris block',
		description: 'A great test to see more of a tetris style element.',
		ability: 'Throw it! If hit you stun the enemy for 1 round.',
		stats: ['basic', 'basic', 'basic', 'basic', 'basic', 'basic'],
		cells: [
			[1, 0],
			[0, 1],
			[1, 1],
			[2, 1]
		]
	}
};
