import fs from 'node:fs';
import { expect, test } from 'vitest';
import { parseHomepage, type Post } from '../lib/bboard-parser';

test('parse homepage', () => {
	const html = fs.readFileSync('src/tests/homepage.html');
	const posts = parseHomepage(html.toString());

	const expectedPosts: Post[] = [];
	expect(posts).toStrictEqual(expectedPosts);
});
