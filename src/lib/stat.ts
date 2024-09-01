export const statTypes = [
	'strength',
	'defence',
	'dexterity',
	'basic',
	'consitution',
	'weapons_tools',
	'intelligence',
	'guns',
	'wisdom',
	'energy_magic',
	'charisma',
	'ultimate'
] as const;

export type StatType = (typeof statTypes)[number];

export class Stat {
	readonly type: StatType;
	readonly value: number;

	constructor(type: StatType, value: number) {
		this.type = type;
		this.value = value;
	}

	static getLabel(type: StatType) {
		return type.replace('_', ' & ').toUpperCase();
	}
}
