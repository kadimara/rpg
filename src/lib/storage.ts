import { Preferences } from '@capacitor/preferences';
import type { Item } from './item';
import type { Stats } from './stat';

type Info = {
	name: string;
	lifeform: string;
	class: string;
	story: string;
	world: string;
};

export class Storage {
	static async getInfo(): Promise<Info> {
		const result = await Preferences.get({
			key: 'info'
		});
		return JSON.parse(result.value || '') as Info;
	}

	static setInfo(info: Info) {
		Preferences.set({
			key: 'info',
			value: JSON.stringify(info)
		});
	}

	// static setBaseStats(stats: Stats) {
	// 	Preferences;
	// }
	// static getBaseStats(): Stats {}

	// static getItems(): Item[] {}

	// static setItems(items: Item[]) {
	// 	Preferences;
	// }

	// static getNotes(): string[] {}

	// static setNotes(notes: string[]) {
	// 	Preferences;
	// }
}
