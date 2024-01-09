<script lang="ts">
	import TextLink from '$lib/components/TextLink.svelte';
	import { formatDate } from '$lib/format-date.js';

	export let data;

	function buildNavigationHref(t: string, a: string | null) {
		let output = '/';

		if (a != null) {
			const searchParams = new URLSearchParams();
			searchParams.set('t', t);
			searchParams.set('a', a);
			output = '?' + searchParams.toString();
		}

		return output;
	}
</script>

<svelte:head>
	<title>Home | Clarinet Pages</title>
</svelte:head>

<div class="mb-8 md:mb-12">
	<h1 class="tracking-tight text-slate-200 font-bold text-3xl sm:text-4xl md:text-5xl mb-2">
		Clarinet Pages Reader
	</h1>

	<TextLink href={data.scrapeUrl}>
		Go to the original Clarinet Pages
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-4 h-4 inline"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
			/>
		</svg>
	</TextLink>
</div>

<div class="space-y-2 mb-4">
	{#each data.posts as post}
		<a
			href="/read?{post.searchParams}"
			class="block group active:bg-slate-800 hover:bg-slate-800 py-4 px-2 md:px-4 rounded-lg active:scale-[101%] hover:scale-[101%] transition"
		>
			<h2
				class="font-semibold text-slate-200 group-hover:text-teal-300 group-active:text-teal-300 mb-1 transition-colors text-lg"
			>
				{post.title}
			</h2>

			<div class="font-medium">
				<div
					class="inline-flex items-center mr-1 rounded-full bg-teal-400/10 px-3 py-1 text-teal-400 text-sm"
				>
					{post.author}
				</div>

				<span class="text-slate-500 tracking-tight inline-block">
					<span class="mr-1">{formatDate(post.lastPost)}</span>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-4 h-4 inline"
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
	{/each}
</div>

<div class="flex">
	{#if data.previousT != null}
		<TextLink href={buildNavigationHref(data.previousT, data.previousA)}>&lt; Newer posts</TextLink>
	{/if}

	{#if data.nextT != null}
		<TextLink href={buildNavigationHref(data.nextT, data.nextA)} class="ml-auto"
			>Older posts &gt;</TextLink
		>
	{/if}
</div>
