<script lang="ts">
	import { formatDate } from '$lib/format-date.js';
	export let data;
</script>

<svelte:head>
	<title>{data.title} | Clarinet Pages</title>
</svelte:head>

<div class="flex items-center justify-between px-2 mb-4">
	<h2 class="font-bold text-xl md:text-3xl">{data.title}</h2>
	<a href="/" class="btn btn-neutral">Back</a>
</div>

<div class="space-y-4">
	{#each data.comments as comment}
		<div class="p-4">
			<div class="mb-2">
				<span class="font-semibold text-primary">{comment.author}</span>
				<span class="text-base-content/60">· {formatDate(comment.date)}</span>
			</div>
			<div class="whitespace-pre-line">
				{comment.content}
			</div>
		</div>
	{/each}
</div>
