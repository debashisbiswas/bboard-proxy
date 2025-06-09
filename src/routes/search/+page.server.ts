import { parseSearchPage } from '$lib/bboard-parser';
import type { PageServerLoad } from './$types';
import { cachedFetchPageContent } from '$lib/cached-fetch';
import { kv } from '$lib/server/kv';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	async function getHtml(scrapeUrl: string) {
		let cacheValue: string | undefined;
		try {
			cacheValue = (await kv?.get(scrapeUrl)) ?? undefined;
		} catch (e) {
			console.error(e);
		}

		let html;
		if (cacheValue) {
			html = cacheValue;
			const ttl = await kv?.ttl(scrapeUrl);

			if (ttl != null) {
				setHeaders({ 'cache-control': `max-age=${ttl}` });
			}
		} else {
			html = await cachedFetchPageContent(scrapeUrl);

			const expiration = 120;
			await kv?.set(scrapeUrl, html, { ex: expiration });
			setHeaders({ 'cache-control': `max-age=${expiration}` });
		}

		return html;
	}

	const query = url.searchParams.get('query');

	if (!query) {
		redirect(302, '/');
	}

	// TODO: If you're going to add pagination, don't parse the pagination
	// links from the original page - do the math yourself. The query
	// parameters accept a begin/end and max, for example:
	// http://test.woodwind.org/Search/index.html?words=legere&begin=21&max=20&sort=swishrank+desc&clarinetBBoard_index=clarinetBBoard_index

	const scrapeUrl =
		'http://test.woodwind.org/Search/index.html?clarinetBBoard_index=clarinetBBoard_index&sort=swishrank+desc&words=' +
		query;
	const html = await getHtml(scrapeUrl);
	const searchInfo = parseSearchPage(html, url);
	return { searchInfo };
};
