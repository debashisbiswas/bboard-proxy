import fs from 'node:fs';
import { parseHomepage } from '$lib/bboard-parser';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// const response = await fetch('http://test.woodwind.org/clarinet/BBoard/list.html?f=1');
	// const text = await response.text();

	const text = fs.readFileSync('src/tests/homepage.html').toString();
	const posts = parseHomepage(text);

	return { posts };
};
