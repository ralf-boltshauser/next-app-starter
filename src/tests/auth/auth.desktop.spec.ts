import { expect, test } from '@playwright/test';
import { signInUser } from '../helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe('Sign up Form Validation, negative tests', () => {
  const rand = Math.random().toString(36).substring(7);
  const email = `test-${rand}@user.ch`;
  const name = 'John Doe';
  const password = 'password';

  test('should navigate to sign up', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.getByRole('tab', { name: 'Sign up' }).click();
    expect(await page.url()).toContain('sign-in');
    await page.waitForTimeout(1000);
  });

  test('should fail with invalid email', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-in');

    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByPlaceholder('First and Last Name').fill(name);
    await page.getByPlaceholder('Email').fill('invalid-email');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await page.waitForSelector('text=Please enter a valid email address');
  });

  test('should fail with short password', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-in');

    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByPlaceholder('First and Last Name').fill(name);
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password', { exact: true }).click();
    await page.getByPlaceholder('Password', { exact: true }).fill('1234');
    await page
      .getByPlaceholder('Password Confirmation', { exact: true })
      .click();
    await page
      .getByPlaceholder('Password Confirmation', { exact: true })
      .fill('1234');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await page.waitForSelector(
      'text=The password must be at least 8 characters long.'
    );
  });

  test('should fail with mismatched passwords', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-in');

    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByPlaceholder('First and Last Name').fill(name);
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password', { exact: true }).fill(password);
    await page
      .getByPlaceholder('Password Confirmation', { exact: true })
      .fill('password123');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await page.waitForSelector('text=Passwords do not match.');
  });
});

test.describe.serial('Sign up / Sign in', () => {
  const rand = Math.random().toString(36).substring(7);
  const email = `test-${rand}@user.ch`;
  const name = 'John Doe';
  const password = 'password';
  test('should create an account and sign out', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-in');

    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByPlaceholder('First and Last Name').fill(name);
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password', { exact: true }).fill(password);
    await page
      .getByPlaceholder('Password Confirmation', { exact: true })
      .fill(password);
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();

    // Sign out
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: 'Sign Out' }).click();
    await expect(page).toHaveURL('http://localhost:3000');
  });

  test('should sign in with existing account', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-in');

    await signInUser(page, email, password);

    await expect(page).toHaveURL('http://localhost:3000/');
    await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
  });

  test('delete account', async ({ page }) => {
    await page.goto('http://localhost:3000/auth/sign-in');
    await page.getByRole('tab', { name: 'Sign up' }).click();
    await page.getByPlaceholder('First and Last Name').fill(name);
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password', { exact: true }).fill(password);
    await page
      .getByPlaceholder('Password Confirmation', { exact: true })
      .fill('password');
    await page.getByRole('button', { name: 'Sign Up' }).click();

    await page.getByRole('button', { name: 'Settings' }).click();
    await page.getByRole('button', { name: 'Delete Account' }).isVisible();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Delete Account' }).click();
    await page.waitForSelector(
      'text=Are you sure you want to delete your account?'
    );
    await page
      .getByRole('button', { name: 'Delete account permanently' })
      .click();

    await expect(page).toHaveURL('http://localhost:3000/auth/sign-in');
  });
});
