import { JSDOM } from 'jsdom';

export type Post = {
	title: string;
	href: string;
	author: string;
	replies: number;
	lastPost: Date;
};

export function parseHomepage(html: string): Post[] {
	const dom = new JSDOM(html);

	const postParents = dom.window.document.querySelectorAll('.PhorumListTable tr');

	const posts: Post[] = [];
	for (const node of postParents) {
		// There's only one anchor: the post.
		const anchor = node.querySelector('a');

		// Skip the header, the first in the list
		if (!anchor) {
			continue;
		}

		const title = anchor.innerHTML;
		const href = anchor.href;

		const author = node.children[1]?.textContent?.trim() ?? '';
		const replies = Number(node.children[2]?.textContent ?? '0');
		// const lastPost = new Date(node.children[3]?.textContent?.trim());
        const lastPost = new Date()

		const post: Post = {
			title,
			href,
			author,
			replies,
            lastPost,
		};

		console.log(post);
		posts.push(post);
	}

	return posts;
}
