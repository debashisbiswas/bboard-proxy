<script lang="ts">
	import { formatDate } from '$lib/format-date.js';
	export let data;
</script>

<svelte:head>
	<title>{data.title} | Clarinet Pages</title>
</svelte:head>

<a href="/" class="transition-colors hover:text-teal-300 mb-2 font-semibold tracking-tight block"
	>&lt; Home</a
>
<h1 class="tracking-tight text-slate-200 font-bold text-3xl sm:text-4xl md:text-5xl mb-6">
	{data.title}
</h1>

<div class="space-y-12">
	{#each data.comments as comment}
		<div>
			<div class="flex items-center space-x-2 font-medium mb-2">
				<div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-teal-400">
					{comment.author}
				</div>
				<span class="text-slate-500 tracking-tight">
					{formatDate(comment.date)}
				</span>
			</div>

			<div class="whitespace-pre-line">
				{comment.content}
			</div>
		</div>
	{/each}
</div>
