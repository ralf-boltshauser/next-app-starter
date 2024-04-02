import { prisma } from '@/lib/client';
import { expect, test } from '@playwright/test';
import bcrypt from 'bcryptjs';
import { signInUser } from '../helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe.serial('Buying plans', () => {
  const rand = Math.random().toString(36).substring(7);
  const email = `test-${rand}@user.ch`;
  const password = 'password';
  test('should recognize tier', async ({ page }) => {
    await prisma.user.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email,
        password: await bcrypt.hash(password, 10),
        name: 'Test User',
      },
    });

    await page.goto('http://localhost:3000/auth/sign-in');

    await signInUser(page, email, password);

    await page.getByRole('button', { name: 'Settings' }).click();

    await expect(page.getByText('Current plan is: Free')).toBeVisible();
  });

  test('should buy plan', async ({ page }) => {
    await signInUser(page, email, password);

    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('link', { name: 'Purchase Plan' }).click();
    await page
      .getByRole('button', { name: 'Buy Now' })
      .first()
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Buy Now' }).first().click();

    await page.waitForTimeout(1000);
    await page.getByPlaceholder('1234 1234 1234').fill('4242 4242 4242 42422');
    await page.getByPlaceholder('1234 1234 1234').press('Tab');
    await page.getByPlaceholder('MM / YY').fill('12 / 38');
    await page.getByPlaceholder('MM / YY').press('Tab');
    await page.getByPlaceholder('CVC').fill('123');
    await page.getByPlaceholder('CVC').press('Tab');
    await page.getByPlaceholder('Full name on card').fill('asdf');
    await page.getByTestId('hosted-payment-submit-button').click();
    await expect(page).toHaveURL('http://localhost:3000/checkout/success', {
      timeout: 30000,
    });

    await page.getByRole('button', { name: 'Settings' }).click();

    await expect(page.getByText('Current plan is: Basic')).toBeVisible();
  });

  test('should upgrade plan', async ({ page }) => {
    await signInUser(page, email, password);

    // wait for page to be ready
    await page.waitForSelector('text=Settings');
    await page.goto('http://localhost:3000/pricing');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Buy Now' }).nth(1).click();

    await page.getByPlaceholder('1234 1234 1234').fill('4242 4242 4242 42422');
    await page.getByPlaceholder('1234 1234 1234').press('Tab');
    await page.getByPlaceholder('MM / YY').fill('12 / 38');
    await page.getByPlaceholder('MM / YY').press('Tab');
    await page.getByPlaceholder('CVC').fill('123');
    await page.getByPlaceholder('CVC').press('Tab');
    await page.getByPlaceholder('Full name on card').fill('asdf');
    await page.getByTestId('hosted-payment-submit-button').click();
    await expect(page).toHaveURL('http://localhost:3000/checkout/success', {
      timeout: 30000,
    });

    await page.getByRole('button', { name: 'Settings' }).click();

    await expect(page.getByText('Current plan is: Pro')).toBeVisible();
  });

  test('should cancel plan', async ({ page }) => {
    await signInUser(page, email, password);

    await page.getByRole('button', { name: 'Settings' }).click();

    await page
      .getByRole('button', { name: 'Manage Billing' })
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Manage Billing' }).click();

    await page
      .locator('[data-test="cancel-subscription"]')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.locator('[data-test="cancel-subscription"]').click();

    await page.getByTestId('confirm').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.getByTestId('confirm').click();

    await page
      .locator('[data-test="cancel-reason-opt-unused"]')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.locator('[data-test="cancel-reason-opt-unused"]').check();

    await page
      .getByTestId('cancellation_reason_submit')
      .scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.getByTestId('cancellation_reason_submit').click();

    await page.getByTestId('return-to-business-link').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.getByTestId('return-to-business-link').click();

    await page.getByRole('button', { name: 'Settings' }).click();

    const res = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        stripeCustomer: {
          include: {
            tier: true,
          },
        },
      },
    });

    expect(res?.stripeCustomer?.planExpires).toBeTruthy();
  });

  test('delete user', async ({ page }) => {
    await prisma.user.delete({
      where: {
        email,
      },
    });
  });
});
