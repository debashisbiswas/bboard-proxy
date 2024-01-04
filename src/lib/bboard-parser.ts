import { JSDOM } from 'jsdom';

export type Post = {
	title: string;
	href: string;
	author: string;
	replies: number;
	lastPost: Date;
};

export type Comment = {
	author: string;
	date: Date;
	content: string;
};

export type PostInfo = {
	title: string;
	comments: Comment[];
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
		const lastPost = new Date();

		const post: Post = {
			title,
			href,
			author,
			replies,
			lastPost
		};

		console.log(post);
		posts.push(post);
	}

	return posts;
}

export function parsePostPage(html: string): PostInfo {
	const dom = new JSDOM(html);

	const postParents = Array.from(dom.window.document.querySelectorAll('.PhorumListTable tr'));
	const headerParent = postParents[0];
	const title = headerParent.textContent?.trim() ?? '';

	const commentParents = Array.from(dom.window.document.querySelectorAll('.PhorumMessage'));

	const comments = commentParents.flatMap((comment) => {
		const content = comment.textContent?.trim();

		if (!content) {
			return [];
		}

		const lines = content.split('\n');

		const author = lines[0].replace('Author:', '').trim();
		// TODO: timezone?
		const date = new Date(lines[1].replace('Date:', '').trim());

		return {
			author,
			date,
			content: lines.slice(2).join('\n')
		};
	});

	return {
		title,
		comments
	};
}
