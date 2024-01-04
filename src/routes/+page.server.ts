import { parseHomepage } from '$lib/bboard-parser';
import { cachedFetchPageContent } from '$lib/cached-fetch';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const html = await cachedFetchPageContent(
		'http://test.woodwind.org/clarinet/BBoard/list.html?f=1'
	);
	const posts = parseHomepage(html);

	return { posts };
};
