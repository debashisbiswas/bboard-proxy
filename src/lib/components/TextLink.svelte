<script lang="ts">
    export let href: string;
    let clazz = '';
    export { clazz as class }
</script>

<a
    {href}
    class="transition-colors hover:text-teal-300 font-semibold tracking-tight block {clazz}"
    >
    <slot />
</a>
