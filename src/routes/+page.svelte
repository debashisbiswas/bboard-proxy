<script lang="ts">
	export let data;
	console.log(data);
</script>

<main class="mx-auto max-w-screen-md">
	{#each data.posts as post}
		<div class="py-6 px-4">
			<p class="font-extrabold text-xl mb-2">
				{post.title}
			</p>

			<p>
				{post.author}
				<span class="font-thin">
					- {post.replies} replies
				</span>
			</p>
		</div>
	{/each}
</main>
