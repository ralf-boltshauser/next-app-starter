import { Page } from '@playwright/test';

export async function signInUser(page: Page, email: string, password: string) {
  await page.goto('http://localhost:3000/auth/sign-in');

  await page.getByRole('tab', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Email').fill(email);
  await page.getByPlaceholder('Password', { exact: true }).fill(password);
  await page
    .getByLabel('Sign in')
    .getByRole('button', { name: 'Sign In' })
    .click();
}
