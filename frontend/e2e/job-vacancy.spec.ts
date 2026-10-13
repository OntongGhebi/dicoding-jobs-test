import { test, expect } from "@playwright/test";

test.describe("Dicoding Jobs Platform E2E Flow", () => {
  test("1. User can view homepage and search vacancy by title", async ({
    page,
  }) => {
    await page.goto("/");

    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("Dicoding Jobs Platform");

    const searchInput = page.locator(
      'input[placeholder*="Search job by title"]',
    );
    await searchInput.fill("Fullstack");

    const jobCardTitle = page.locator("text=Fullstack Engineer").first();
    await expect(jobCardTitle).toBeVisible();
  });

  test("2. Recruiter can navigate to create vacancy page and fill the form", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await page.click("text=+ Create Vacancy");
    await expect(page).toHaveURL("/vacancies/create");

    await page.fill('input[name="title"]', "DevOps Engineer");
    await page.fill('input[name="company"]', "Dicoding Cloud");
    await page.fill('input[name="location"]', "Jakarta / Remote");
    await page.fill('input[name="salary"]', "Rp 14.000.000 - Rp 20.000.000");
    await page.fill(
      'textarea[name="description"]',
      "Manage cloud infrastructure, CI/CD, and Kubernetes clusters.",
    );

    await page.click('button[type="submit"]');
    await page.waitForURL("/");

    await expect(page).toHaveURL("/");
  });

  test("3. User can view vacancy details and perform edit/delete actions", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const viewButton = page.locator("text=View Details").first();
    await viewButton.click();

    await expect(page).toHaveURL(/\/vacancies\/\d+$/);

    await expect(page.locator("text=Edit")).toBeVisible();
    await expect(page.locator("text=Delete")).toBeVisible();
  });
});
