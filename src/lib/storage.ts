import { Preferences } from '@capacitor/preferences';
import { writable } from 'svelte/store';
import { itemInfoDictionary, type Cell, type Item, type ItemKey } from './item';
import type { Stats } from './stat';

export type Info = {
	name: string;
	lifeform: string;
	class: string;
	story: string;
	world: string;
};

export const message = writable('Default message');

export class Storage {
	static setInfo(info: Info) {
		Preferences.set({
			key: 'info',
			value: JSON.stringify(info)
		});
	}
	static async getInfo(): Promise<Info> {
		const result = await Preferences.get({
			key: 'info'
		});
		return JSON.parse(result.value || '{}') as Info;
	}

	static setBaseStats(stats: Stats) {
		Preferences.set({
			key: 'baseStats',
			value: JSON.stringify(stats)
		});
	}
	static async getBaseStats(): Promise<Stats> {
		const result = await Preferences.get({
			key: 'baseStats'
		});
		return JSON.parse(result.value || '{}') as Stats;
	}

	static setItems(items: Item[]) {
		const data = items.map((item) => ({ key: item.key, anchor: item.anchor }));
		Preferences.set({
			key: 'items',
			value: JSON.stringify(data)
		});
	}
	static async getItems(): Promise<Item[]> {
		const result = await Preferences.get({
			key: 'items'
		});
		const data = JSON.parse(result.value || '[]') as {
			key: ItemKey;
			anchor: Cell;
		}[];
		return data
			.filter(
				(value) =>
					value.anchor[0] != null && value.anchor[1] != null && itemInfoDictionary[value.key]
			)
			.map((value, i) => ({ ...itemInfoDictionary[value.key], ...value, _id: i }));
	}

	static setNotes(notes: string[]) {
		Preferences.set({
			key: 'notes',
			value: JSON.stringify(notes)
		});
	}
	static async getNotes(): Promise<string[]> {
		const result = await Preferences.get({
			key: 'notes'
		});
		return JSON.parse(result.value || '[]') as string[];
	}
}
