<script lang="ts">
    import Heading from '$lib/atoms/heading/index.svelte';
    import Icon from '$lib/atoms/icon/index.svelte';
    import Text from '$lib/atoms/text/index.svelte';

    import type { ExpertiseProps } from './expertise.svelte';

    const { title, icon, summary }: ExpertiseProps = $props();
</script>

<article
    class="hover:border-primary-300 dark:hover:border-primary-600 flex h-full flex-col gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm transition-[color,background-color,border-color,box-shadow] hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
>
    <span
        class="bg-primary-500 shadow-primary-500/30 flex size-11 shrink-0 items-center justify-center rounded-full text-white shadow-md"
    >
        <Icon name={icon} class="h-5 w-5" />
    </span>
    <Heading level={3}>{title}</Heading>
    <Text>{summary}</Text>
</article>
