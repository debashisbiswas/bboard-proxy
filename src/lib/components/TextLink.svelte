<script lang="ts">
	export let href: string;
	export let target: string | undefined = undefined;
	let clazz = '';
	export { clazz as class };
</script>

<a
	{href}
    {target}
	class="inline-block font-semibold tracking-tight transition-colors hover:text-teal-300 active:text-teal-300 {clazz}"
>
	<slot />
</a>
