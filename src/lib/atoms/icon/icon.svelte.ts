import Award from '~icons/lucide/award';
import Briefcase from '~icons/lucide/briefcase';
import Check from '~icons/lucide/check';
import Cloud from '~icons/lucide/cloud';
import Code from '~icons/lucide/code';
import GraduationCap from '~icons/lucide/graduation-cap';
import Linkedin from '~icons/lucide/linkedin';
import Rocket from '~icons/lucide/rocket';
import ShieldCheck from '~icons/lucide/shield-check';

import type { Component } from 'svelte';

export type IconName =
    | 'briefcase'
    | 'graduationCap'
    | 'certificate'
    | 'check'
    | 'cloud'
    | 'rocket'
    | 'code'
    | 'shield'
    | 'linkedin';

/* Lucide, via unplugin-icons: each import is inlined as an SVG component at
   build time. The names here stay ours, so swapping a glyph is a one-line
   change and callers never learn which set we draw from. */
export const ICONS: Record<IconName, Component> = {
    briefcase: Briefcase,
    graduationCap: GraduationCap,
    certificate: Award,
    check: Check,
    cloud: Cloud,
    rocket: Rocket,
    code: Code,
    shield: ShieldCheck,
    linkedin: Linkedin
};
