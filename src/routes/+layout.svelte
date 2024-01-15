<script lang="ts">
	import { onMount } from 'svelte';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import '../app.pcss';

	onMount(() => {
		window.topbar.config({ barColors: { 0: '#2dd4bf' }, shadowColor: 'rgba(0, 0, 0, .3)' });
	});

	beforeNavigate((navigation) => {
		if (!navigation.willUnload) {
			window.topbar.show(500);
		}
	});

	afterNavigate(() => {
		window.topbar.hide();
	});
</script>

<svelte:head>
	<meta
		name="description"
		content="A reader for the Clarinet BBoard focused on a streamlined mobile reading experience."
	/>

	<meta property="og:url" content="https://clarinet-bboard.vercel.app" />
	<meta property="og:type" content="website" />

	<meta property="og:title" content="Clarinet BBoard Reader" />
	<meta
		property="og:description"
		content="A reader for the Clarinet BBoard focused on a streamlined mobile reading experience."
	/>
	<meta property="og:image" content="/og.png" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="clarinet-bboard.vercel.app" />
	<meta property="twitter:url" content="https://clarinet-bboard.vercel.app" />
	<meta name="twitter:title" content="Clarinet BBoard Reader" />
	<meta
		name="twitter:description"
		content="A reader for the Clarinet BBoard focused on a streamlined mobile reading experience."
	/>
	<meta name="twitter:image" content="/og.png" />
</svelte:head>

<main class="mx-auto min-h-screen max-w-screen-lg px-4 py-12 md:px-12 md:py-20 lg:px-24">
	<slot />
</main>
