import { parsePostPage } from '$lib/bboard-parser';
import type { PageServerLoad } from './$types';
import { cachedFetchPageContent } from '$lib/cached-fetch';

export const load: PageServerLoad = async ({ url }) => {
	const postUrl = 'http://test.woodwind.org/clarinet/BBoard/read.html?' + url.searchParams;
	const text = await cachedFetchPageContent(postUrl);
	const postInfo = parsePostPage(text);

	return { ...postInfo };
};
