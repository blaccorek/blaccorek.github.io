import { expect, test } from '@playwright/test';

test('the intro states what I offer', async ({ page }) => {
    await page.goto('/');
    await expect(
        page.getByText(/I help engineering teams ship with confidence/)
    ).toBeVisible();
});

test("the intro's call to action jumps to the contact section", async ({
    page
}) => {
    await page.goto('/');
    await page.getByRole('link', { name: "Let's talk" }).click();
    await expect(page).toHaveURL(/#contact$/);
    await expect(
        page.getByRole('heading', { level: 2, name: "Let's talk" })
    ).toBeInViewport();
});

test('the intro links to the work experience page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: "See where I've worked" }).click();
    await expect(page).toHaveURL('/experience');
});
