import type { ItemDto } from '$lib/item';
import { items } from '$lib/items';
import type { PageLoad } from './$types';

export const load: PageLoad<{ item: ItemDto }> = ({ params }) => {
	const item = (items as { [key: string]: ItemDto })[params.slug];
	return { item };
};
