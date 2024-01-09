<script lang="ts">
	export let href: string;
	let clazz = '';
	export { clazz as class };
</script>

<a
	{href}
	class="block font-semibold tracking-tight transition-colors hover:text-teal-300 active:text-teal-300 {clazz}"
>
	<slot />
</a>
