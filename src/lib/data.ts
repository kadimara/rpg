import { writable } from 'svelte/store';
import type { Item } from './item';
import type { Stats } from './stat';

export type Info = {
	name: string;
	lifeform: string;
	class: string;
	story: string;
	world: string;
	hp: number;
	hearts: number;
};

export const info = writable<Info>({ hp: 10, hearts: 1 } as Info);
export const baseStats = writable<Stats>({} as Stats);
export const items = writable<Item[]>([]);
export const notes = writable<string[]>([]);
