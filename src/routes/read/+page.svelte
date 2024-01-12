<script lang="ts">
	import TextLink from '$lib/components/TextLink.svelte';
	import { DateTime } from 'luxon';
	export let data;

	function formatDate(date: Date): string {
		return DateTime.fromJSDate(date).toLocaleString(DateTime.DATETIME_SHORT);
	}
</script>

<svelte:head>
	<title>{data.title} | Clarinet BBoard</title>
</svelte:head>

<div class="mb-8">
	<TextLink href="/" class="mb-3">&lt; Home</TextLink>

	<h1 class="mb-2 text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl md:text-5xl">
		{data.title}
	</h1>

	<TextLink href={data.scrapeUrl}>
		See original post
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

<div class="space-y-12">
	{#each data.comments as comment}
		<div>
			<div class="mb-2 flex items-center space-x-2 font-medium">
				<div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-teal-400">
					{comment.author}
				</div>

				<span class="tracking-tight text-slate-500">
					{formatDate(comment.date)}
				</span>
			</div>

			<div class="px-1">
				<div class="mb-3">
					{#if comment.editDate}
						<div class="italic tracking-tight text-slate-500">
							Edited {formatDate(comment.editDate)}
						</div>
					{/if}
				</div>

				<div class="text-pretty break-words sm:text-lg">
					{#each comment.content as line}
						{#if line.length === 0}
							<br />
						{:else if line.startsWith('> ')}
							<p class="italic text-slate-500">{line.replace('> ', '')}</p>
						{:else}
							<p>{line}</p>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	{/each}
</div>
