<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import '../app.pcss';

	onMount(() => {
		window.topbar.config({ barColors: { 0: '#2dd4bf' }, shadowColor: 'rgba(0, 0, 0, .3)' });
	});

	beforeNavigate(() => {
		window.topbar.show(300);
	});

	afterNavigate(() => {
		window.topbar.hide();
	});
</script>

<main class="mx-auto min-h-screen max-w-screen-lg px-4 py-12 md:px-12 md:py-20 lg:px-24">
	<slot />
</main>
