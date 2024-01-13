import { parsePostPage } from '$lib/bboard-parser';
import type { PageServerLoad } from './$types';
import { cachedFetchPageContent } from '$lib/cached-fetch';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	const scrapeUrl = 'http://test.woodwind.org/clarinet/BBoard/read.html?' + url.searchParams;
	const text = await cachedFetchPageContent(scrapeUrl);
	const postInfo = parsePostPage(text, url);

	setHeaders({ 'cache-control': 'max-age=60' });

	return {
		...postInfo,
		scrapeUrl
	};
};
