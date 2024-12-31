import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(page).toHaveTitle(/Parkrun pacer events/);
});

test("has heading", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(
    page.getByRole("heading", {
      name: "Sign in",
    }),
  ).toBeVisible();
});

test("should not have any automatically detectable accessibility issues", async ({
  page,
}) => {
  await page.goto("/sign-in");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
