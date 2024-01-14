import { JSDOM } from 'jsdom';
import { DateTime } from 'luxon';
import { parse } from 'node-html-parser';

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

export type Attachment = {
	name: string;
	href: string;
};

export type Comment = {
	author: string;
	date: Date | null;
	html: string;
	editDate: Date | null;
	attachments: Attachment[];
};

export type PostInfo = {
	title: string;
	comments: Comment[];
	ogDescription: string;
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
		if (!anchor || !anchor.textContent) {
			continue;
		}

		const searchParams = anchor.href.split('?')[1];
		const author = node.children[1]?.textContent?.replace(/ ★2017/, '').trim() ?? '';
		const replies = Number(node.children[2]?.textContent ?? '0');
		const lastPost = DateTime.fromSQL(node.children[3]?.textContent?.trim() ?? '', {
			zone: BBOARD_TIME_ZONE
		}).toJSDate();

		posts.push({
			title: anchor.textContent,
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

export function parsePostPage(html: string, url: URL): PostInfo {
	function extractAuthor(html: string, regex: RegExp) {
		const match = html.match(regex);

		let author = '';
		if (match && match[1] != null) {
			author = match[1];
			// TODO
			author = author.replace('2017', '');
		}

		return author;
	}

	function extractDate(html: string, regex: RegExp) {
		const match = html.match(regex);

		let date = null;
		if (match && match[2] != null) {
			const matchedDate = match[2];

			date = DateTime.fromSQL(matchedDate, { zone: BBOARD_TIME_ZONE }).toJSDate();
		}

		return date;
	}

	function extractAttachments(html: string, regex: RegExp) {
		const matches = html.matchAll(regex);

		const attachments = [];

		for (const match of matches) {
			const href = match[1];
			const name = match[2];

			attachments.push({
				name,
				href
			});
		}

		return attachments;
	}

	function extractEditDate(html: string, regex: RegExp) {
		const match = html.match(regex);

		let editDate = null;

		if (match) {
			editDate = DateTime.fromSQL(match[2], { zone: BBOARD_TIME_ZONE }).toJSDate();
		}

		return editDate;
	}

	const dom = new JSDOM(html);

	const headerParent = dom.window.document.querySelector('.PhorumTableHeader');

	const title = headerParent?.textContent?.trim() ?? '';

	const commentParents = Array.from(dom.window.document.querySelectorAll('.PhorumMessage'));

	let ogDescription = '';
	const comments = commentParents.flatMap((comment) => {
		let html = comment.innerHTML;

		// Extractions: get data, remove from content
		// todo: should be one function, not two
		const authorRegex = /Author:&nbsp;<a.*>(.*)<\/a>.*<br>/;
		const author = extractAuthor(html, authorRegex);
		html = html.replace(authorRegex, '');

		const dateRegex = /Date:(&nbsp;)+(.*)<br>/;
		const date = extractDate(html, dateRegex);
		html = html.replace(dateRegex, '');

		const attachmentRegex = /Attachment:&nbsp; <a href="(.*)">(.*)<\/a> (.*)<br>/g;
		const attachments = extractAttachments(html, attachmentRegex);
		html = html.replaceAll(attachmentRegex, '');

		const editStringRegex = /(<br>)*Post Edited \((.*)\)/;
		const editDate = extractEditDate(html, editStringRegex);
		html = html.replace(editStringRegex, '');

		// "Trim" breaks and newlines
		html = html.replace(/^(<br>|\n)+|(<br>|\n)+$/g, '');

		// Enrichments: augment content
		html = html.replaceAll(
			'http://test.woodwind.org/clarinet/BBoard/read.html',
			`${url.protocol}//${url.host}/read`
		);

		const parsed = parse(html);

		if (!ogDescription) {
			ogDescription = parsed.textContent.replace(/\s+/g, ' ').trim().slice(0, 60) + '…';
		}

		return {
			author,
			date,
			html,
			editDate,
			attachments
		};
	});

	return {
		title,
		comments,
		ogDescription
	};
}
