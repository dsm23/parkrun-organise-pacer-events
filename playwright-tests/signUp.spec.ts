import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/sign-up");

  await expect(page).toHaveTitle(/Parkrun pacer events/);
});

test("has heading", async ({ page }) => {
  await page.goto("/sign-up");

  await expect(
    page.getByRole("heading", {
      name: "Sign up",
    }),
  ).toBeVisible();
});

test("should not have any automatically detectable accessibility issues", async ({
  page,
}) => {
  await page.goto("/sign-up");

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});
