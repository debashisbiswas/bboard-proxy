import { parseHomepage } from '$lib/bboard-parser';
import { cachedFetchPageContent } from '$lib/cached-fetch';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { kv } from '$lib/server/kv';

export const load: PageServerLoad = async ({ url, setHeaders }) => {
	async function getHtml(url: string) {
		let cacheValue = null;
		try {
			cacheValue = (await kv.get(url)) as string | null;
		} catch (e) {
			console.error(e);
		}

		let html;
		if (cacheValue) {
			html = cacheValue;
			const ttl = await kv.ttl(url);
			setHeaders({ 'cache-control': `max-age=${ttl}` });
		} else {
			html = await cachedFetchPageContent(url);
			await kv.set(url, html, { ex: 120 });
		}

		return html;
	}

	const tValue = url.searchParams.get('t');
	const aValue = url.searchParams.get('a');

	const searchParams = new URLSearchParams();

	// f: which forum (1 is clarinet, 2 is ethnic clarinet, 18 is oboe...)
	searchParams.append('f', '1');

	// t: server time for consistent pagination?
	// TODO: if this is close to the current time, redirect and remove the
	// param? This would help with the "navigating back to home" case correctly
	// having no searchParams.
	if (tValue != null) {
		searchParams.append('t', tValue);
	}

	// a: direction of navigation. 1 for back/newer, 2 for forward/older. Seems
	// like as long as the a parameter has some value, the "newer posts" button
	// is shown
	if (aValue != null) {
		searchParams.append('a', aValue);
	}

	const scrapeUrl = 'http://test.woodwind.org/clarinet/BBoard/list.html?' + searchParams.toString();
	const html = await getHtml(scrapeUrl);
	const homepageData = parseHomepage(html);

	if (homepageData.posts.length === 0) {
		error(503, 'Could not get content from the original BBoard. Is the site down?');
	}

	return {
		...homepageData,
		scrapeUrl
	};
};
