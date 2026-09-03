import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Authentication', () => {

    test('AUTH-001 - User can login with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.clickSignIn();
        await loginPage.login(
            process.env.SENDER_EMAIL,
            process.env.SENDER_PASSWORD
        );
        await loginPage.expectInboxLoaded();
    });


    test('AUTH-002 - User cannot login with invalid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.goto();
        await loginPage.clickSignIn();
        await loginPage.login(
            process.env.SENDER_EMAIL,
            'InvalidPassword123!'
        );

        await loginPage.expectLoginError();
    });

});