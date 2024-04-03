import { prisma } from '@/lib/client';
import { expect, test } from '@playwright/test';
import { signUpUser } from '../helpers';

let rand, name, email: string, password;
test.beforeEach(async ({ page }, testInfo: any) => {
  rand = Math.random().toString(36).substring(7);
  name = 'John Doe';
  email = `test-user-${rand}@user.ch`;
  password = 'password';

  testInfo.email = email;

  await signUpUser(page, name, email, password);
  await page.getByRole('button', { name: 'Settings' }).click();
});

test.describe.serial('Profile Form', () => {
  test('should update the first name', async ({ page }, testInfo: any) => {
    await page.waitForTimeout(600);
    await page.getByPlaceholder('First and Last Name').click();
    await page.getByPlaceholder('First and Last Name').fill('Jane Doe');
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: 'Save' }).click();
    await page.waitForSelector('text=Profile has been updated successfully!');

    await page.waitForTimeout(600);

    const user = await prisma.user.findUnique({
      where: {
        email: testInfo.email,
      },
    });

    expect(user?.name).toBe('Jane Doe');
  });

  test('should fail with empty first name', async ({ page }) => {
    await page.getByPlaceholder('First and Last Name').scrollIntoViewIfNeeded();
    await page.getByPlaceholder('First and Last Name').click();
    await page.waitForTimeout(300);
    await page.getByPlaceholder('First and Last Name').fill('');
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
