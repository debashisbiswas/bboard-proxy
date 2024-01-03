<script lang="ts">
	export let data;
</script>

<div class="flex items-center justify-between px-2 mb-4">
	<h2 class="font-bold text-xl md:text-3xl">{data.title}</h2>
	<a href="/" class="btn">Back</a>
</div>

{#each data.comments as comment}
	<div class="border rounded whitespace-pre-line p-4 mb-4 mx-2">
		{comment}
	</div>
{/each}
