import { test, expect } from '@playwright/test';

test('Home Page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  const pageTitle = await page.title();
  expect(pageTitle).toBe('Plannify App') 
});
