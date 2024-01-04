<script lang="ts">
	import { formatDate } from '$lib/format-date.js';

	export let data;
</script>

<svelte:head>
	<title>Home | Clarinet Pages</title>
</svelte:head>

{#each data.posts as post}
	<a
		class="card hover:bg-base-200 transition-colors sm:max-w-none"
		href="/read?{post.searchParams}"
	>
		<div class="card-body">
			<div class="flex justify-between">
				<div>
					<h2 class="card-title mb-2">{post.title}</h2>

					<div>
						<span class="text-primary font-semibold">
							{post.author}
						</span>
						<span class="text-base-content/60">
							· {formatDate(post.lastPost)}
							· {post.replies} replies
						</span>
					</div>
				</div>
			</div>
		</div>
	</a>
{/each}
