import fs from 'node:fs';
import { parsePostPage } from '$lib/bboard-parser';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// const response = await fetch('http://test.woodwind.org/clarinet/BBoard/list.html?f=1');
	// const text = await response.text();

	const text = fs.readFileSync('src/tests/post.html').toString();
	const postInfo = parsePostPage(text);

	return { ...postInfo };
};
