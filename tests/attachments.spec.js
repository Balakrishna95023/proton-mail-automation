import { test } from '@playwright/test';
import { ComposePage } from '../pages/ComposePage.js';
import { DraftsPage } from '../pages/DraftsPage.js';

test.describe('Attachments', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });


    test('ATTACH-001 - User can send email with attachment', async ({
        page
    }) => {

        const composePage = new ComposePage(page);

        const subject =
            `Attachment Test ${Date.now()}`;

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(
            'Testing email attachment.'
        );

        await composePage.attachFile(
            'test-data/sample.txt'
        );

        await composePage.expectAttachmentVisible(
            'sample.txt'
        );

        await composePage.send();

        await composePage.expectSendSuccess();
    });


    test('ATTACH-002 - Attachment persists in draft', async ({
        page
    }) => {

        const composePage = new ComposePage(page);

        const subject =
            `Attachment Draft ${Date.now()}`;

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(
            'Testing attachment persistence.'
        );

        await composePage.attachFile(
            'test-data/sample.txt'
        );

        await composePage.expectAttachmentVisible(
            'sample.txt'
        );

        await composePage.closeComposer();

        const draftsPage = new DraftsPage(page);
        await draftsPage.open();

        await draftsPage.expectDraftExists(subject);
    });

});