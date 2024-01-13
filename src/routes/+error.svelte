<script lang="ts">
	import { page } from '$app/stores';
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
</script>

<div class="grid content-center">
	<div class="text-center text-lg">
		{#if $page.error?.message}
			{$page.error.message}
		{:else}
			Sorry! We're down right now.
		{/if}

		<TextLink href="http://test.woodwind.org/clarinet/BBoard/list.html?f=1"
			>Go to the original BBoard <ArrowIcon /></TextLink
		>
	</div>
</div>
