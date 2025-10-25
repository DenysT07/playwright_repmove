import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Env } from '../data/env';
import { faker } from '@faker-js/faker';

test.describe('Login page', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    loginPage = new LoginPage(page);
  });

  test('Valid credentials login', async ({ page }) => {
    await loginPage.setTextFieldByName('email', Env.VALID_EMAIL);
    await loginPage.setTextFieldByName('password', Env.VALID_PASSWORD);
    await loginPage.clickSubmite()

    await expect(page).toHaveURL('/dashboard')
  });

  test('Valid credentials login with uppercase Email', async ({ page }) => {
    await loginPage.setTextFieldByName('email', Env.VALID_EMAIL.toUpperCase());
    await loginPage.setTextFieldByName('password', Env.VALID_PASSWORD);
    await loginPage.clickSubmite()

    await expect(page).toHaveURL('/dashboard')
  });

  test('Filling "forgot password" form with correct email', async () => {
    await loginPage.clickForgotPassword()
    await loginPage.setTextFieldByName('email', Env.VALID_EMAIL);
    await loginPage.clickSubmite()

    await expect(loginPage.toastMsg).toHaveText(`The link with instruction was sent to ${Env.VALID_EMAIL}`)
  });

  test('Filling "forgot password" form with incorrect email', async () => {
    await loginPage.clickForgotPassword()
    await loginPage.setTextFieldByName('email', faker.internet.email());
    await loginPage.clickSubmite()

    await expect(loginPage.toastMsg).toHaveText(`Invalid to reset password`)
  });

  test('Invalid email login', async () => {
    await loginPage.setTextFieldByName('email', faker.internet.email());
    await loginPage.setTextFieldByName('password', Env.VALID_PASSWORD);
    await loginPage.clickSubmite()

    await expect(loginPage.toastMsg).toHaveText('Invalid to login')
  });

  test('Invalid password login', async () => {
    await loginPage.setTextFieldByName('email', Env.VALID_EMAIL);
    await loginPage.setTextFieldByName('password', faker.internet.password());
    await loginPage.clickSubmite()

    await expect(loginPage.toastMsg).toHaveText('Invalid to login')
  });

  test('Invalid credentials login', async () => {
    await loginPage.setTextFieldByName('email', faker.internet.email());
    await loginPage.setTextFieldByName('password', faker.internet.password());
    await loginPage.clickSubmite()

    await expect(loginPage.toastMsg).toHaveText('Invalid to login')
  });

  test('Incorrect email field validation', async () => {
    await loginPage.setTextFieldByName('email', faker.string.alpha(10));

    await expect(loginPage.getValidationMsgForField('email')).toHaveText('Invalid email address')
  });
});