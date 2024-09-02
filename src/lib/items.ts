import { type ItemDto } from './item';

type KeyTypes = 'bow' | 'dagger' | 'potion_healing' | 'scroll_fireball' | 'shield' | 'sword';

export const items: {
	[key in KeyTypes]: ItemDto;
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
		ability: 'Single use to heal for 1d4',
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
		name: 'Shield',
		description: 'A big wooden shield. Something to hide behind.',
		ability: '',
		stats: ['defence'],
		cells: [
			[0, 0],
			[0, 1]
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
	}
};
