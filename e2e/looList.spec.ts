import { test, expect } from '@playwright/test';

test('signup and login process', async ({ page }) => {
  // 1. Go to the signup page
  await page.goto('http://localhost:3000/signup');

  // 2-5. Fill in the username and password
  await page.fill('input[placeholder="Username"]', 'testuser');
  await page.fill('input[placeholder="Password"]', 'password123');

  // 6. Click 'Sign Up' button
  await page.click('button:text("Sign Up")');

  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');

  // 7. Check for text 'Welcome'
  await expect(page.locator('body')).toContainText(/Welcome/);

  // 8-11. Fill in the username and password again
  await page.fill('input[placeholder="Username"]', 'testuser');
  await page.fill('input[placeholder="Password"]', 'password123');

  // 12. Click 'Login' button
  await page.click('button:text("Login")');
  // Wait for navigation to complete
  await page.waitForLoadState('networkidle');

  // 13. Check for redirection to home page
  expect(page.url()).toBe('http://localhost:3000/');

  // 14. Check for text 'Previous'
  await expect(page.locator('body')).toContainText('Previous');
});
