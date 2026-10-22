import { expect, test } from '@playwright/test';

for (const link of [
    { name: 'Home', url: '/' },
    { name: 'Work Experience', url: '/experience' },
    { name: 'Education & Certifications', url: '/education' }
]) {
    test(`Navbar has link ${link.name} redirecting to ${link.url}`, async ({
        page
    }) => {
        await page.goto('/');
        const foundLink = page.getByRole('link', { name: link.name });
        await expect(foundLink).toBeVisible();
        await foundLink.click();
        await expect(page).toHaveURL(link.url);
    });

    test(`Navbar marks ${link.name} as the current page on ${link.url}`, async ({
        page
    }) => {
        await page.goto(link.url);
        await expect(
            page.getByRole('link', { name: link.name })
        ).toHaveAttribute('aria-current', 'page');
    });
}
