<script lang="ts">
	import TextLink from '$lib/components/TextLink.svelte';
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
	<title>Home | Clarinet BBoard</title>
</svelte:head>

<div class="mb-8 md:mb-12">
	<h1 class="mb-2 text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl md:text-5xl">
		The Clarinet BBoard
	</h1>

	<TextLink href={data.scrapeUrl}>
		Go to the original Clarinet BBoard
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
				d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
			/>
		</svg>
	</TextLink>
</div>

{#if data.posts.length > 0}
	<div class="mb-4 space-y-2">
		{#each data.posts as post}
			<Post {post} />
		{/each}
	</div>
{:else}
	<p class="sm:text-lg">Could not fetch posts from the BBoard. Is the original site down?</p>
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
