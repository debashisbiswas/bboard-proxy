<script lang="ts">
	import { page } from '$app/stores';
	import Error from '$lib/components/Error.svelte';
</script>

<Error message={$page.error?.message} />
