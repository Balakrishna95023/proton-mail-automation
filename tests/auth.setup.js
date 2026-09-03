import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

const authFile = '.auth/sender.json';

setup('authenticate as sender', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.clickSignIn();
    await loginPage.login(
        process.env.RECEIVER_EMAIL,
        process.env.RECEIVER_PASSWORD
    );
    await loginPage.expectInboxLoaded();

    // Save authenticated browser state
    await page.context().storageState({
        path: authFile
    });
});