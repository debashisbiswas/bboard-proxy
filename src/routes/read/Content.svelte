<script lang="ts">
	import type { Comment } from '$lib/bboard-parser';
	export let comment: Comment;
</script>

<div id="injected" class="text-pretty break-words">
	{@html comment.html}
</div>

<!-- TODO: anchor styles are duplicated with TextLink component -->
<style lang="postcss">
	:global(#injected a) {
		@apply underline;
		@apply font-semibold;
		@apply tracking-tight;
		@apply transition-colors;
		@apply hover:text-teal-300;
		@apply active:text-teal-300;
		@apply break-all;
	}

	:global(#injected img) {
		@apply inline;
	}
</style>
