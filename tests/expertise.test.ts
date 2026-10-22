import { expect, test } from '@playwright/test';

const DOMAINS = [
    'Platform & Infrastructure',
    'Delivery & Developer Experience',
    'Full-Stack Product Engineering',
    'Reliability, Observability & Cost'
];

test('the expertise section is titled What I do', async ({ page }) => {
    await page.goto('/');
    await expect(
        page.getByRole('heading', { level: 2, name: 'What I do' })
    ).toBeVisible();
});

for (const domain of DOMAINS) {
    test(`the ${domain} card sums itself up in one sentence`, async ({
        page
    }) => {
        await page.goto('/');
        const card = page
            .getByRole('article')
            .filter({ has: page.getByRole('heading', { name: domain }) });
        await expect(card).toBeVisible();
        await expect(card.getByRole('paragraph')).toHaveCount(1);
        await expect(card.getByRole('listitem')).toHaveCount(0);
    });
}

test('the expertise cards carry no illustrations', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('article').locator('img')).toHaveCount(0);
});
