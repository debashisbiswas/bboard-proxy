<script lang="ts">
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import Error from '$lib/components/Error.svelte';
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
			<input
				class="min-w-0 flex-shrink rounded-lg bg-slate-800 p-2"
				name="query"
				type="text"
				required
			/>
			<button class="ml-4 rounded-lg bg-teal-400/10 px-4 py-2 font-bold text-teal-400"
				>Search</button
			>
		</div>
	</form>
</div>

{#await data.homepageData}
	<div class="flex items-center justify-center p-24">
		<Spinner />
	</div>
{:then homepageData}
	{#if homepageData.posts.length > 0}
		<div class="mb-4 space-y-2">
			{#each homepageData.posts as post}
				<Post {post} />
			{/each}
		</div>

		<div class="flex">
			{#if homepageData.previousT != null}
				<TextLink href={buildNavigationHref(homepageData.previousT, homepageData.previousA)}
					>&lt; Newer posts</TextLink
				>
			{/if}

			{#if homepageData.nextT != null}
				<TextLink href={buildNavigationHref(homepageData.nextT, homepageData.nextA)} class="ml-auto"
					>Older posts &gt;</TextLink
				>
			{/if}
		</div>
	{:else}
		<Error message="Could not get content from the original BBoard. Is the site down?" />
	{/if}
{/await}
