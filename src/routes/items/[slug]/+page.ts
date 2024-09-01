export const load = ({ params }) => {
	return {
		title: 'Item name',
		content: 'Test content for item',
		slug: params.slug
	};
};
