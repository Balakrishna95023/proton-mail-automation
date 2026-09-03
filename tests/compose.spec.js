import { test, expect } from '@playwright/test';
import { ComposePage } from '../pages/ComposePage.js';
import mailData from '../test-data/mailData.json' with { type: 'json' };

test.describe('Compose and Send', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });


    test('MAIL-001 - User can send email to a valid recipient', async ({ page }) => {

        const composePage = new ComposePage(page);

        const subject =
            `${mailData.validMail.subject} - ${Date.now()}`;

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(
            mailData.validMail.body
        );

        await composePage.send();

        await composePage.expectSendSuccess();
    });


    test('MAIL-002 - User can send email with CC and BCC', async ({ page }) => {

        const composePage = new ComposePage(page);

        const subject =
            `${mailData.ccBccMail.subject} - ${Date.now()}`;

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterCC(
            process.env.CC_EMAIL
        );

        await composePage.enterBCC(
            process.env.BCC_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(
            mailData.ccBccMail.body
        );

        await composePage.send();

        await composePage.expectSendSuccess();
    });


    test('MAIL-003 - User cannot send email with invalid recipient', async ({ page }) => {

        const composePage = new ComposePage(page);

        await composePage.open();

        await composePage.enterRecipient(
            mailData.invalidRecipient.recipient
        );

        await composePage.enterSubject(
            mailData.invalidRecipient.subject
        );

        await composePage.enterBody(
            mailData.invalidRecipient.body
        );

        await composePage.send();

        await composePage.expectRecipientValidationError();
    });

});