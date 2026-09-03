import { test } from '@playwright/test';
import { ComposePage } from '../pages/ComposePage.js';
import { ScheduledPage } from '../pages/ScheduledPage.js';

test.describe('Asynchronous Workflows', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });


    test('ASYNC-001 - User can undo send', async ({ page }) => {

        const composePage = new ComposePage(page);

        const subject =
            `Undo Send ${Date.now()}`;

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(
            'Testing Undo Send.'
        );

        await composePage.send();

        // No arbitrary waitForTimeout()
        await composePage.expectUndoSendVisible();

        await composePage.clickUndoSend();

        await composePage.expectSendCancelled();
        
        await composePage.closeComposer();

        await composePage.clickOnSent();

        await composePage.expectMessageNotSent(
            subject
        );
    });


    test('ASYNC-002 - User can schedule email', async ({
        page
    }) => {

        const composePage = new ComposePage(page);
        const scheduledPage = new ScheduledPage(page);

        const subject =
            `Scheduled Mail ${Date.now()}`;

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(
            'Testing scheduled email.'
        );

        await composePage.scheduleSend("tomorrow");

        await composePage.expectScheduledConfirmation();

        await scheduledPage.open();

        await scheduledPage.expectMessageScheduled(
            subject
        );
    });

});