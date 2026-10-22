import { describe, expect, it } from 'vitest';

import { ICONS, type IconName } from './icon.svelte';

describe('ICONS', () => {
    const names = Object.keys(ICONS) as IconName[];

    it('registers every name the type allows', () => {
        expect(names).toHaveLength(9);
    });

    it.each(names)('%s resolves to a component', (name) => {
        expect(ICONS[name]).toBeTypeOf('function');
    });

    /* Two names pointing at the same import is almost always a copy-paste slip
       in the map rather than a deliberate choice. */
    it('draws a distinct glyph for each name', () => {
        expect(new Set(Object.values(ICONS)).size).toBe(names.length);
    });
});
