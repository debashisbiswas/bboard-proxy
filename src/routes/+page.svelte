<script lang="ts">
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import PageHeader from './PageHeader.svelte';
	import Post from './Post.svelte';

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
	<title>Home - Clarinet BBoard</title>
</svelte:head>

<div class="mb-8">
	<PageHeader text="The Clarinet BBoard" />

	<TextLink href={data.scrapeUrl}>
		Go to the original Clarinet BBoard
		<ArrowIcon />
	</TextLink>
</div>

<div class="mb-8">
	<form method="get" action="/search">
		<div class="flex w-full">
			<input class="rounded-lg bg-slate-800 p-2" name="query" type="text" />
			<button class="ml-4 rounded-lg bg-teal-400/10 px-4 py-2 font-bold text-teal-400"
				>Search</button
			>
		</div>
	</form>
</div>

{#if data.posts.length > 0}
	<div class="mb-4 space-y-2">
		{#each data.posts as post}
			<Post {post} />
		{/each}
	</div>
{/if}

{#if data.posts.length > 0}
	<div class="flex">
		{#if data.previousT != null}
			<TextLink href={buildNavigationHref(data.previousT, data.previousA)}
				>&lt; Newer posts</TextLink
			>
		{/if}

		{#if data.nextT != null}
			<TextLink href={buildNavigationHref(data.nextT, data.nextA)} class="ml-auto"
				>Older posts &gt;</TextLink
			>
		{/if}
	</div>
{/if}
