<script lang="ts">
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

<h1 class="tracking-tight text-slate-200 font-bold text-3xl sm:text-4xl md:text-5xl mb-8 md:mb-12">
	Clarinet Pages Reader
</h1>

<div class="space-y-2 mb-4">
	{#each data.posts as post}
		<a
			href="/read?{post.searchParams}"
			class="block group hover:bg-slate-800 py-4 px-2 md:px-4 rounded-lg hover:scale-[101%] transition"
		>
			<h2
				class="font-semibold text-slate-200 group-hover:text-teal-300 focus-visible:text-teal-300 mb-1 transition-colors text-lg"
			>
				{post.title}
			</h2>

			<div class="flex items-center space-x-2 font-medium">
				<div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-teal-400 text-sm">
					{post.author}
				</div>
				<span class="text-slate-500 tracking-tight">
					{formatDate(post.lastPost)} · {post.replies} replies
				</span>
			</div>
		</a>
	{/each}
</div>

<div class="flex">
	{#if data.previousT != null}
		<a
			href={buildNavigationHref(data.previousT, data.previousA)}
			class="transition-colors hover:text-teal-300 font-semibold tracking-tight block"
			>&lt; Newer posts</a
		>
	{/if}

	{#if data.nextT != null}
		<a
			href={buildNavigationHref(data.nextT, data.nextA)}
			class="transition-colors hover:text-teal-300 font-semibold tracking-tight block ml-auto"
			>Older posts &gt;</a
		>
	{/if}
</div>
