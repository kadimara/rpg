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

export function getStatLabel(stat: StatType) {
	return stat.replace('_', ' & ').toUpperCase();
}

export function getStatImage(stat: StatType) {
	switch (stat) {
		case 'strength':
		case 'dexterity':
		case 'consitution':
		case 'intelligence':
		case 'wisdom':
		case 'charisma':
			return 'd20.jpg';
		case 'defence':
			return 'def.jpg';
		case 'basic':
			return 'd4.jpg';
		case 'weapons_tools':
			return 'd6.jpg';
		case 'guns':
			return 'd8.jpg';
		case 'energy_magic':
			return 'd10.jpg';
		case 'ultimate':
			return 'd12.jpg';
	}
}
