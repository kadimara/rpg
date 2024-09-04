import type { ItemDto } from '$lib/item';
import { itemInfoDictionary, type ItemKey } from '$lib/item';
import type { PageLoad } from './$types';

export const load: PageLoad<{ item: ItemDto }> = ({ params }) => {
	return { item: itemInfoDictionary[params.slug as ItemKey] };
};
