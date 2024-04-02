import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/auth/sign-in');

  await page.getByRole('tab', { name: 'Sign up' }).click();
  await page.getByPlaceholder('First and Last Name').fill('John Doe');
  await page.getByPlaceholder('Email').fill('asdf@asdf.ch');
  await page.getByPlaceholder('Password', { exact: true }).fill('password');
  await page
    .getByPlaceholder('Password Confirmation', { exact: true })
    .fill('password');
  await page.getByRole('button', { name: 'Sign Up' }).click();

  await page.getByRole('button', { name: 'Settings' }).click();
});

test.describe.serial('Profile Form', () => {
  test('should update the first name', async ({ page }) => {
    await page.getByPlaceholder('First and Last Name').click();
    await page.getByPlaceholder('First and Last Name').fill('Jane Doe');
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForSelector('text=Profile has been updated successfully!');

    await page
      .getByRole('heading', { name: "Jane's Settings" })
      .scrollIntoViewIfNeeded();
    await expect(
      page.getByRole('heading', { name: "Jane's Settings" })
    ).toBeVisible();
  });

  test('should fail with empty first name', async ({ page }) => {
    await page.getByPlaceholder('First and Last Name').click();
    await page.waitForTimeout(300);
    await page.getByPlaceholder('First and Last Name').fill('');
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'Save' }).click();

    await page.waitForSelector('text=Name is a required field');
  });

  // This breaks the other tests
  // test('delete account', async ({ page }) => {
  //   await page.getByRole('button', { name: 'Delete Account' }).isVisible();
  //   await page.waitForTimeout(500);
  //   await page.getByRole('button', { name: 'Delete Account' }).click();
  //   await page.waitForSelector(
  //     'text=Are you sure you want to delete your account?'
  //   );
  //   await page
  //     .getByRole('button', { name: 'Delete account permanently' })
  //     .click();

  //   await expect(page).toHaveURL('http://localhost:3000/auth/sign-in');
  // });
});
