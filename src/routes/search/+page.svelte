<script lang="ts">
	import { formatDate } from '$lib/format-date';
	import { page } from '$app/stores';
	import PageHeader from '../PageHeader.svelte';
	import TextLink from '$lib/components/TextLink.svelte';

	export let data;
</script>

<svelte:head>
	<title>Search - Clarinet BBoard</title>
</svelte:head>

<div class="mb-8">
	<TextLink href="/" class="mb-3">&lt; Home</TextLink>

	<div class="mb-6">
		<PageHeader text="Search" />
	</div>

	<div class="mb-8">
		<form method="get" action="/search">
			<div class="flex w-full">
				<input
					class="rounded-lg bg-slate-800 p-2"
					name="query"
					value={$page.url.searchParams.get('query')}
					type="text"
				/>
				<button class="ml-4 rounded-lg bg-teal-400/10 px-4 py-2 font-bold text-teal-400"
					>Search</button
				>
			</div>
		</form>
	</div>
</div>

{#each data.searchInfo as searchResult}
	<a
		href={searchResult.link}
		class="group block rounded-2xl px-2 py-4 transition hover:scale-[101%] hover:bg-slate-800 active:scale-[101%] active:bg-slate-800 md:px-4"
	>
		<h2
			class="mb-1 text-lg font-semibold text-slate-200 transition-colors group-hover:text-teal-300 group-active:text-teal-300 md:mb-2 md:text-xl"
		>
			{searchResult.subject}
		</h2>

		<div class="mb-2 font-medium">
			<div
				class="mr-1 inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-sm text-teal-400 md:text-base"
			>
				{searchResult.author}
			</div>

			<span class="inline-block tracking-tight text-slate-500">
				{formatDate(searchResult.date)}
			</span>
		</div>

		<p class="text-slate-500">
			{searchResult.preview}
		</p>
	</a>
{/each}
