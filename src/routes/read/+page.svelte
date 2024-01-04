<script lang="ts">
	export let data;
</script>

<div class="flex items-center justify-between px-2 mb-4">
	<h2 class="font-bold text-xl md:text-3xl">{data.title}</h2>
	<a href="/" class="btn btn-primary">Back</a>
</div>

<div class="space-y-4">
	{#each data.comments as comment}
		<div class="border border-base-content/20 rounded-lg p-4">
			<div class="mb-4 italic">
				<span class="font-bold">{comment.author}</span>
				<span class="text-base-content/60">{comment.date.toLocaleString()}</span>
			</div>
			<div class="whitespace-pre-line">
				{comment.content}
			</div>
		</div>
	{/each}
</div>
