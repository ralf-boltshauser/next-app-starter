import { prisma } from '@/lib/client';
import { fromMail } from '@/lib/mail/mail-types';
import { expect, test } from '@playwright/test';
import bcrypt from 'bcryptjs';
import { signInUser } from '../helpers';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000');
});

test.describe.serial('password reset form validation', () => {
  const rand = Math.random().toString(36).substring(7);
  const email = `test-${rand}@user.ch`;
  const password = 'password';
  const newPassword = 'new-password';

  test('should create user', async ({ page }) => {
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
  });

  test('should fail sign in with wrong password', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('tab', { name: 'Sign in' }).click();
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Password').fill('wrong-password');
    await page
      .getByLabel('Sign in')
      .getByRole('button', { name: 'Sign In' })
      .click();
    await expect(
      page.getByRole('button', { name: 'Reset Password' })
    ).toBeVisible();
  });

  test('should not reset password with invalid email', async ({ page }) => {
    await page.goto(
      'http://localhost:3000/auth/error?error=Failed%20to%20authorize%20user'
    );

    await page.getByRole('button', { name: 'Reset Password' }).click();
    await page.getByPlaceholder(fromMail).fill('invalid email');

    await page.getByRole('button', { name: 'Reset Password' }).click();

    await page.waitForSelector('text=Please enter a valid email address');
  });

  test('should not reset password with wrong email', async ({ page }) => {
    await page.goto(
      'http://localhost:3000/auth/error?error=Failed%20to%20authorize%20user'
    );

    await page.getByRole('button', { name: 'Reset Password' }).click();
    await page
      .getByPlaceholder(fromMail)
      .fill(
        `some-email-that-does-not-exist-${Math.random().toString(36).substring(7)}@user.ch`
      );

    await page.getByRole('button', { name: 'Reset Password' }).click();

    await page.waitForSelector('text=User not found');
  });
});

test.describe.serial('password reset', () => {
  const rand = Math.random().toString(36).substring(7);
  const email = `test-${rand}@user.ch`;
  const password = 'password';
  const newPassword = 'new-password';

  test('should create user', async ({ page }) => {
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
  });

  test('should send reset token email', async ({ page }) => {
    await page.goto(
      'http://localhost:3000/auth/error?error=Failed%20to%20authorize%20user'
    );
    await page.getByRole('button', { name: 'Reset Password' }).click();
    await page.getByPlaceholder(fromMail).fill(email);

    await page.getByRole('button', { name: 'Reset Password' }).click();

    await page.waitForSelector('text=Reset password email sent!');

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    expect(user?.resetToken).toBeTruthy();
  });

  test('should reset password', async ({ page }) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    await page.goto(`http://localhost:3000/auth/reset/${user?.resetToken}`);
    await page.getByPlaceholder('New Password').fill(newPassword);
    await page.getByPlaceholder('Password Confirmation').fill(newPassword);

    // get by test id reset-password-form
    await page.getByTestId('reset-password-form').click();

    await page.waitForURL('http://localhost:3000/auth/sign-in');
  });

  test('sign in with new password', async ({ page }) => {
    await signInUser(page, email, newPassword);
    await page.waitForURL('http://localhost:3000/');

    expect(page.url()).toBe('http://localhost:3000/');
    await page.getByRole('button', {
      name: 'Sign Out',
    });
  });

  test('delete user', async ({ page }) => {
    await prisma.user.delete({
      where: {
        email,
      },
    });
  });
});
