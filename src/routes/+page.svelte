<script lang="ts">
	export let data;
	console.log(data);
</script>

<main class="mx-auto max-w-screen-md">
	<div class="px-4 py-4">
		<h1 class="tracking-tight font-bold text-lg md:text-2xl">Clarinet Pages Reader</h1>
	</div>

	{#each data.posts as post}
		<a class="card sm:card-side hover:bg-base-200 transition-colors sm:max-w-none" href={post.href}>
			<div class="card-body">
				<div class="flex justify-between">
					<div>
						<h2 class="card-title mb-2">{post.title}</h2>
						<p class="opacity-60">
							{post.author}
						</p>
					</div>

					<div class="flex items-center p-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-6 h-6 inline mr-1"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
							/>
						</svg>
						{post.replies}
					</div>
				</div>
			</div>
		</a>
	{/each}
</main>
