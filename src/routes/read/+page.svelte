<script lang="ts">
	import ArrowIcon from '$lib/components/ArrowIcon.svelte';
	import TextLink from '$lib/components/TextLink.svelte';
	import { formatDate } from '$lib/format-date';
	import Content from './Content.svelte';

	export let data;
	const title = `${data.title} - Clarinet BBoard Reader`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={data.ogDescription} />

	<meta property="og:site_name" content="Clarinet BBoard Reader" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={data.ogDescription} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={data.ogDescription} />
</svelte:head>

<div class="mb-8">
	<TextLink href="/" class="mb-3">&lt; Home</TextLink>

	<h1 class="mb-2 text-3xl font-bold tracking-tight text-slate-200 sm:text-4xl md:text-5xl">
		{data.title}
	</h1>

	<TextLink href={data.scrapeUrl}>
		See original post
		<ArrowIcon />
	</TextLink>
</div>

<div class="space-y-12">
	{#each data.comments as comment}
		<div>
			<div class="mb-2 flex items-center space-x-2 font-medium">
				<div class="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-teal-400">
					{comment.author}
				</div>

				{#if comment.date}
					<span class="tracking-tight text-slate-500">
						{formatDate(comment.date)}
					</span>
				{/if}
			</div>

			<div class="px-1">
				<div class="mb-3">
					{#if comment.editDate}
						<div class="tracking-tight text-slate-500">
							Edited: {formatDate(comment.editDate)}
						</div>
					{/if}
				</div>

				{#if comment.attachments.length > 0}
					<div class="align-items-end mb-3 flex flex-wrap gap-x-6 gap-y-2">
						{#each comment.attachments as attachment}
							<TextLink href={attachment.href} target="_blank">
								<span class="underline">
									{attachment.name}
								</span>
								<ArrowIcon /></TextLink
							>
						{/each}
					</div>
				{/if}

				<Content {comment} />
			</div>
		</div>
	{/each}
</div>
