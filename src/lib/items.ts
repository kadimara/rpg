import { Item } from './item';

export const items = {
	bow: new Item('bow', [
		[0, 0],
		[0, 1],
		[0, 2]
	]),
	dagger: new Item('dagger', [[0, 0]]),
	potion: new Item('potion', [[0, 0]]),
	scroll: new Item('scroll', [[0, 0]]),
	sword: new Item('sword', [
		[0, 0],
		[0, 1]
	])
};
