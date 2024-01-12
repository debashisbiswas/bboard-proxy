import { JSDOM } from 'jsdom';
import { DateTime } from 'luxon';

export type Post = {
	title: string;
	searchParams: string;
	author: string;
	replies: number;
	lastPost: Date;
};

export type HomepageData = {
	posts: Post[];
	previousT: string | null;
	previousA: string | null;
	nextT: string | null;
	nextA: string | null;
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

const BBOARD_TIME_ZONE = 'UTC+4';

export function parseHomepage(html: string): HomepageData {
	const dom = new JSDOM(html);

	const postParents = dom.window.document.querySelectorAll('.PhorumListTable tr');
	const links = [...dom.window.document.querySelectorAll('a')];

	const newerPostsLink = links.find((element) => element.textContent === 'Newer Posts');
	const olderPostsLink = links.find((element) => element.textContent === 'Older Posts');

	let previousT = null;
	let previousA = null;
	if (newerPostsLink) {
		const searchParams = new URLSearchParams(newerPostsLink.href.split('?')[1]);
		previousT = searchParams.get('t');

		const a = searchParams.get('a');
		if (a) {
			previousA = a;
		}
	}

	let nextT = null;
	let nextA = null;
	if (olderPostsLink) {
		const searchParams = new URLSearchParams(olderPostsLink.href.split('?')[1]);
		nextT = searchParams.get('t');

		const a = searchParams.get('a');
		if (a) {
			nextA = a;
		}
	}

	const posts: Post[] = [];
	for (const node of postParents) {
		// There's only one anchor: the post.
		const anchor = node.querySelector('a');

		// Skip the header, the first in the list
		if (!anchor) {
			continue;
		}

		const searchParams = anchor.href.split('?')[1];
		const author = node.children[1]?.textContent?.replace(/ ★2017/, '').trim() ?? '';
		const replies = Number(node.children[2]?.textContent ?? '0');
		const lastPost = DateTime.fromSQL(node.children[3]?.textContent?.trim() ?? '', {
			zone: BBOARD_TIME_ZONE
		}).toJSDate();

		posts.push({
			title: anchor.innerHTML,
			searchParams,
			author,
			replies,
			lastPost
		});
	}

	return {
		posts,
		previousT,
		previousA,
		nextT,
		nextA
	};
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

		const author = lines[0].replace('Author:', '').replace(/★2017/, '').trim();

		const date = DateTime.fromSQL(lines[1].replace('Date:', '').trim(), {
			zone: BBOARD_TIME_ZONE
		}).toJSDate();

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
