import { parsePostPage } from '$lib/bboard-parser';
import type { PageServerLoad } from './$types';
import { cachedFetchPageContent } from '$lib/cached-fetch';
import { error } from '@sveltejs/kit';
import { kv } from '$lib/server/kv';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	async function getHtml(scrapeUrl: string) {
		let cacheValue = null;
		try {
			cacheValue = (await kv.get(scrapeUrl)) as string | null;
		} catch (e) {
			console.error(e);
		}

		let html;
		if (cacheValue) {
			html = cacheValue;
			const ttl = await kv.ttl(scrapeUrl);
			setHeaders({ 'cache-control': `max-age=${ttl}` });
		} else {
			html = await cachedFetchPageContent(scrapeUrl);

			const expiration = 120;
			await kv.set(scrapeUrl, html, { ex: expiration });
			setHeaders({ 'cache-control': `max-age=${expiration}` });
		}

		return html;
	}

	const scrapeUrl = 'http://test.woodwind.org/clarinet/BBoard/read.html?' + url.searchParams;
	const html = await getHtml(scrapeUrl);
	const postInfo = parsePostPage(html, url);

	if (postInfo.comments.length === 0) {
		error(503, 'Could not get content from the original BBoard. Is the site down?');
	}

	return {
		...postInfo,
		scrapeUrl
	};
};
