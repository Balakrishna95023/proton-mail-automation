import { test } from '@playwright/test';
import { InboxPage } from '../pages/InboxPage.js';

test.describe('Folders and Labels', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });


    test('FOLDER-001 - User can apply label to message', async ({
        page
    }) => {

        const inboxPage = new InboxPage(page);

        await inboxPage.selectfirstMessage();

        const label =
            `Automation-${Date.now()}`;

        await inboxPage.createLabel(label);

        await inboxPage.expectMessageHasLabel(
            label
        );
    });

});