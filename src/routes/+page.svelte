<script lang="ts">
    import { resolve } from '$app/paths';
    import Heading from '$lib/atoms/heading/index.svelte';
    import Link from '$lib/atoms/link/index.svelte';
    import Text from '$lib/atoms/text/index.svelte';
    import Expertise from '$lib/resume/expertise/index.svelte';

    const primaryButtonClasses =
        'bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white shadow-sm transition-colors dark:text-gray-950';
</script>

<svelte:head>
    <title>Tsiorintsoa ANDRIAMIHAMINA - DevOps Consultant</title>
    <meta
        name="description"
        content="DevOps consultant and full-stack engineer working in demanding environments, from corporate and investment banking to energy-sector SaaS. GitOps-driven Kubernetes platforms, infrastructure as code, short delivery lead times, and the reliability and product engineering that go with them."
    />
    <meta
        name="keywords"
        content="DevOps, GitOps, Kubernetes, Terraform, Full-Stack Development, CI/CD, Automation, Cloud-Native, Developer Experience, Software Delivery, Infrastructure as Code, Observability, Site Reliability, Cloud Cost Optimization"
    />
</svelte:head>

<!-- Each section is announced the same way: title, then the brand rule that the
     site header opens with. -->
{#snippet sectionTitle(text: string)}
    <div class="space-y-3">
        <Heading level={2}>{text}</Heading>
        <span
            aria-hidden="true"
            class="from-primary-500 block h-1 w-16 rounded-full bg-gradient-to-r to-transparent"
        ></span>
    </div>
{/snippet}

<div class="space-y-16 sm:space-y-20">
    <section class="max-w-3xl space-y-6">
        <p
            class="text-2xl leading-snug font-bold text-gray-900 sm:text-3xl dark:text-white"
        >
            I help engineering teams ship with confidence — and I can build the
            product, not only the pipeline.
        </p>
        <Text size="lg">
            I'm a DevOps consultant at
            <Link href="https://www.shodops.io/">Shodops</Link>. Since 2018 I've
            worked where development and operations meet, in corporate and
            investment banking and then energy-sector SaaS, where “it works on
            my machine” isn't an option.
        </Text>
        <div class="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link href="#contact" variant="plain" class={primaryButtonClasses}>
                Let's talk
            </Link>
            <Link href={resolve('/experience', {})}>See where I've worked</Link>
        </div>
    </section>

    <section class="space-y-8">
        {@render sectionTitle('What I do')}
        <div class="grid gap-6 sm:grid-cols-2">
            <Expertise
                title="Platform & Infrastructure"
                icon="cloud"
                summary="Kubernetes platforms run on GitOps and infrastructure as code with Terraform, so every change is reviewed, versioned, and reproducible — including migrations to AWS."
            />
            <Expertise
                title="Delivery & Developer Experience"
                icon="rocket"
                summary="Short lead times and boring releases, backed by a test pyramid on ephemeral environments and a platform teams can serve themselves from."
            />
            <Expertise
                title="Full-Stack Product Engineering"
                icon="code"
                summary="The product, not only the pipeline: Spring Boot and React applications, well-designed API contracts, and internal tools engineers actually want to use."
            />
            <Expertise
                title="Reliability, Observability & Cost"
                icon="shield"
                summary="Monitoring that catches problems before users do, high availability you've actually tested, and a cloud bill that shrinks without trading away reliability."
            />
        </div>
    </section>

    <section
        id="contact"
        class="scroll-mt-24 border-primary-200 bg-primary-50/70 dark:border-primary-800/60 dark:bg-primary-900/25 space-y-6 rounded-2xl border p-6 sm:p-10"
    >
        {@render sectionTitle("Let's talk")}
        <Text size="lg" class="max-w-3xl">
            If your teams are waiting on deployments, or your platform has grown
            faster than the standards around it, I'd be glad to hear about it.
        </Text>
        <Link
            href="mailto:tsiorintsoa.andriamihamina@shodops.io"
            variant="plain"
            class={primaryButtonClasses}
        >
            tsiorintsoa.andriamihamina@shodops.io
        </Link>
    </section>
</div>
