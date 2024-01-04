<script lang="ts">
	export let data;

	function formatDate(date: Date) {
		return date.toLocaleDateString('en-US', {
			weekday: 'short',
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}
</script>

{#each data.posts as post}
	<a
		class="card hover:bg-base-200 transition-colors sm:max-w-none"
		href="/read?{post.searchParams}"
	>
		<div class="card-body">
			<div class="flex justify-between">
				<div>
					<h2 class="card-title mb-2">{post.title}</h2>
					<p class="opacity-60">
						<span class="text-accent font-semibold">
							{post.author}
						</span>
						· {formatDate(post.lastPost)}
						· {post.replies} replies
					</p>
				</div>
			</div>
		</div>
	</a>
{/each}
