import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Reset mock backend state before each test
  await page.goto('/');
  await page.evaluate(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return window.__kinGuardMockApi?.__resetMockState?.();
  });
});

test('full signup with new email lands on verify-email', async ({ page }) => {
  await page.goto('/family-admin/register');

  await page.fill('input[name="fullName"]', 'Test User');
  const email = `test.user+${Date.now()}@example.com`;
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', 'Password123!');
  await page.fill('input[name="confirmPassword"]', 'Password123!');
  await page.check('input[type="checkbox"]');

  await Promise.all([
    page.waitForNavigation({ url: '**/family-admin/verify-email' }),
    page.click('button:has-text("Create Account")'),
  ]);

  expect(page.url()).toContain('/family-admin/verify-email');
});

test('full signup flow continues from verify-email to care-circle setup intro', async ({ page }) => {
  await page.goto('/family-admin/register');

  await page.fill('input[name="fullName"]', 'OTP Flow User');
  const email = `otp.flow+${Date.now()}@example.com`;
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', 'Password123!');
  await page.fill('input[name="confirmPassword"]', 'Password123!');
  await page.check('input[type="checkbox"]');

  await Promise.all([
    page.waitForNavigation({ url: '**/family-admin/verify-email' }),
    page.click('button:has-text("Create Account")'),
  ]);

  const otp = await page.evaluate(async (targetEmail) => {
    // @ts-expect-error test helper is attached in dev/test mode
    return window.__kinGuardMockApi?.__getLastOtpForEmail?.(targetEmail);
  }, email);

  await expect.poll(() => otp).not.toBeNull();

  const digits = String(otp).split('');
  const otpInputs = page.locator('input[autocomplete="one-time-code"]');
  for (let i = 0; i < digits.length; i++) {
    await otpInputs.nth(i).fill(digits[i]);
  }

  await page.click('button:has-text("Verify Account")');

  await expect(page).toHaveURL(/\/family-admin\/care-circle-setup$/);
});

test('signup with existing seeded email shows field error on email', async ({ page }) => {
  await page.goto('/family-admin/register');

  await page.fill('input[name="fullName"]', 'Admin User');
  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'Password123!');
  await page.fill('input[name="confirmPassword"]', 'Password123!');
  await page.check('input[type="checkbox"]');

  await page.click('button:has-text("Create Account")');

  await expect(page.locator('text=An account with this email already exists.')).toBeVisible();
});

test('weak password blocks submission with field error', async ({ page }) => {
  await page.goto('/family-admin/register');

  await page.fill('input[name="fullName"]', 'Weak Pass');
  await page.fill('input[name="email"]', `weak.${Date.now()}@example.com`);
  await page.fill('input[name="password"]', 'short');
  await page.fill('input[name="confirmPassword"]', 'short');
  await page.check('input[type="checkbox"]');

  await page.click('button:has-text("Create Account")');

  await expect(page.locator('text=Password must be at least 8 characters long.')).toBeVisible();
});
