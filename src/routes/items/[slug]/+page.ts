import { itemInfoDictionary, type ItemInfo, type ItemKey } from '$lib/item';
import type { PageLoad } from './$types';

export const load: PageLoad<{ item: ItemInfo }> = ({ params }) => {
	return { item: itemInfoDictionary[params.slug as ItemKey] };
};
