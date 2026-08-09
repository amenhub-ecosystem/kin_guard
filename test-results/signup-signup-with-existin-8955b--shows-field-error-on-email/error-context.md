# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: signup.spec.ts >> signup with existing seeded email shows field error on email
- Location: e2e/signup.spec.ts:31:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="fullName"]')

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.beforeEach(async ({ page }) => {
  4  |   // Reset mock backend state before each test
  5  |   await page.goto('/');
  6  |   await page.evaluate(() => {
  7  |     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  8  |     // @ts-ignore
  9  |     return window.__kinGuardMockApi?.__resetMockState?.();
  10 |   });
  11 | });
  12 | 
  13 | test('full signup with new email lands on verify-email', async ({ page }) => {
  14 |   await page.goto('/family-admin/register');
  15 | 
  16 |   await page.fill('input[name="fullName"]', 'Test User');
  17 |   const email = `test.user+${Date.now()}@example.com`;
  18 |   await page.fill('input[name="email"]', email);
  19 |   await page.fill('input[name="password"]', 'Password123!');
  20 |   await page.fill('input[name="confirmPassword"]', 'Password123!');
  21 |   await page.check('input[type="checkbox"]');
  22 | 
  23 |   await Promise.all([
  24 |     page.waitForNavigation({ url: '**/family-admin/verify-email' }),
  25 |     page.click('button:has-text("Create Account")'),
  26 |   ]);
  27 | 
  28 |   expect(page.url()).toContain('/family-admin/verify-email');
  29 | });
  30 | 
  31 | test('signup with existing seeded email shows field error on email', async ({ page }) => {
  32 |   await page.goto('/family-admin/register');
  33 | 
> 34 |   await page.fill('input[name="fullName"]', 'Admin User');
     |              ^ Error: page.fill: Test timeout of 30000ms exceeded.
  35 |   await page.fill('input[name="email"]', 'admin@example.com');
  36 |   await page.fill('input[name="password"]', 'Password123!');
  37 |   await page.fill('input[name="confirmPassword"]', 'Password123!');
  38 |   await page.check('input[type="checkbox"]');
  39 | 
  40 |   await page.click('button:has-text("Create Account")');
  41 | 
  42 |   await expect(page.locator('text=An account with this email already exists.')).toBeVisible();
  43 | });
  44 | 
  45 | test('weak password blocks submission with field error', async ({ page }) => {
  46 |   await page.goto('/family-admin/register');
  47 | 
  48 |   await page.fill('input[name="fullName"]', 'Weak Pass');
  49 |   await page.fill('input[name="email"]', `weak.${Date.now()}@example.com`);
  50 |   await page.fill('input[name="password"]', 'short');
  51 |   await page.fill('input[name="confirmPassword"]', 'short');
  52 |   await page.check('input[type="checkbox"]');
  53 | 
  54 |   await page.click('button:has-text("Create Account")');
  55 | 
  56 |   await expect(page.locator('text=Password must be at least 8 characters long.')).toBeVisible();
  57 | });
  58 | 
```