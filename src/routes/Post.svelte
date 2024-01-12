<script lang="ts">
	import type { Post } from '$lib/bboard-parser';
	import { DateTime } from 'luxon';
	import { onMount } from 'svelte';

	export let post: Post;

	let now = DateTime.now();

	onMount(() => {
		const interval = setInterval(() => {
			now = DateTime.now();
		}, 1000 - new Date().getMilliseconds());

		return () => {
			clearInterval(interval);
		};
	});

	$: humanDate = DateTime.fromJSDate(post.lastPost).toRelative({ base: now });
</script>

<a
	href="read?{post.searchParams}"
	class="group block rounded-2xl px-2 py-4 transition hover:scale-[101%] hover:bg-slate-800 active:scale-[101%] active:bg-slate-800 md:px-4"
>
	<h2
		class="mb-1 text-lg font-semibold text-slate-200 transition-colors group-hover:text-teal-300 group-active:text-teal-300 md:mb-2 md:text-xl"
	>
		{post.title}
	</h2>

	<div class="font-medium">
		<div
			class="mr-1 inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-sm text-teal-400 md:text-base"
		>
			{post.author}
		</div>

		<span class="inline-block tracking-tight text-slate-500">
			<span class="mr-1">{humanDate}</span>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="inline h-4 w-4"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
				/>
			</svg>
			{post.replies}
		</span>
	</div>
</a>
