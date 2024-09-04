export const statTypes = [
	'strength',
	'defence',
	'dexterity',
	'basic',
	'constitution',
	'weapons_tools',
	'intelligence',
	'guns',
	'wisdom',
	'energy_magic',
	'charisma',
	'ultimate'
] as const;

// export const statTypes = [
// 	'strength',
// 	'dexterity',
// 	'defence',
// 	'constitution',
// 	'intelligence',
// 	'wisdom',
// 	'charisma',
// 	'basic',
// 	'weapons_tools',
// 	'guns',
// 	'energy_magic',
// 	'ultimate'
// ] as const;

export type StatType = (typeof statTypes)[number];

export type Stats = { [key in StatType]: number };

export function getStatLabel(stat: StatType) {
	return stat.replace('_', ' & ').toUpperCase();
}

export function getStatImage(stat: StatType) {
	switch (stat) {
		case 'strength':
		case 'dexterity':
		case 'constitution':
		case 'intelligence':
		case 'wisdom':
		case 'charisma':
			return 'd20.png';
		case 'defence':
			return 'def.png';
		case 'basic':
			return 'd4.png';
		case 'weapons_tools':
			return 'd6.png';
		case 'guns':
			return 'd8.png';
		case 'energy_magic':
			return 'd10.png';
		case 'ultimate':
			return 'd12.png';
	}
}
