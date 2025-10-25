import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/registrationPage';
import { Env } from '../data/env';
import { faker } from '@faker-js/faker';
import { Helper } from '../pages/helper';

let helper = new Helper()

test.describe('Registration page', () => {
    let registrationPage: RegistrationPage;

    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await page.goto('auth/sign-up');
    });

    test('Valid user info registration', async ({ page }) => {
        await registrationPage.setTextFieldByName('firstName', faker.person.firstName());
        await registrationPage.setTextFieldByName('lastName', faker.person.lastName());
        await registrationPage.setTextFieldByName('companyName', faker.company.name());
        await registrationPage.setTextFieldByName('email', faker.internet.email());
        await registrationPage.setDropListByName('industry');
        await registrationPage.setRandomPhoneNumber()
        await registrationPage.setTextFieldByName('password', faker.internet.password());
        await registrationPage.clickSubmite()

        await expect(registrationPage.modalHeader).toContainText('Select Plan', { timeout: 15000 })
        await expect(page).toHaveURL('/dashboard')
    });

    test('Registration with with existing email', async () => {
        await registrationPage.setTextFieldByName('firstName', faker.person.firstName());
        await registrationPage.setTextFieldByName('lastName', faker.person.lastName());
        await registrationPage.setTextFieldByName('companyName', faker.company.name());
        await registrationPage.setTextFieldByName('email', Env.VALID_EMAIL);
        await registrationPage.setDropListByName('industry');
        await registrationPage.setRandomPhoneNumber()
        await registrationPage.setTextFieldByName('password', faker.internet.password());
        await registrationPage.clickSubmite()

        await expect(registrationPage.toastMsg).toHaveText(`Invalid to sign up`, {timeout: 15000})
    });

    test('Click Sign up with empty fields', async () => {
        await registrationPage.clickSubmite()

        await expect(registrationPage.getValidationMsgForField('firstName')).toHaveText('The First Name is required')
        await expect(registrationPage.getValidationMsgForField('lastName')).toHaveText('The Last Name is required')
        await expect(registrationPage.getValidationMsgForField('companyName')).toHaveText('The Company Name is required')
        await expect(registrationPage.getValidationMsgForField('industry', true)).toHaveText('Please, select the industry')
        await expect(registrationPage.getValidationMsgForField('email')).toHaveText('Please, enter your email address')
        await expect(registrationPage.getValidationMsgForField('phone')).toHaveText('The Phone is required')
        await expect(registrationPage.getValidationMsgForField('password')).toHaveText('The Password is required')
    });

    test('Fields validation', async () => {
        const invalidEmails = helper.generateWrongEmails()
        for (const value of invalidEmails) {
            await registrationPage.setTextFieldByName('email', value);
            await expect(registrationPage.getValidationMsgForField('email')).toHaveText('Invalid email address')
        }

        await registrationPage.setTextFieldByName('firstName', faker.string.alpha(1));
        await registrationPage.setTextFieldByName('lastName', faker.string.alpha(1));
        await registrationPage.setDropListByName('phone');
        await registrationPage.setTextFieldByName('phone', faker.string.numeric());
        await registrationPage.setTextFieldByName('password', faker.string.alpha(4));

        await expect(registrationPage.getValidationMsgForField('firstName')).toHaveText('Min length for First Name is 2')
        await expect(registrationPage.getValidationMsgForField('lastName')).toHaveText('Min length for Last Name is 2')
        await expect(registrationPage.getValidationMsgForField('phone')).toHaveText('Wrong number format')
        await expect(registrationPage.getValidationMsgForField('password')).toHaveText('Min length for Password is 5')
    });
});