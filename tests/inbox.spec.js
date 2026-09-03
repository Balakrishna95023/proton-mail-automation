import { test } from '@playwright/test';
import { InboxPage } from '../pages/InboxPage.js';

test.describe('Inbox and Message Actions', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });


    test('INBOX-001 - Opening unread message marks it as read', async ({
        page
    }) => {

        const inboxPage = new InboxPage(page);

        const subject = process.env.TEST_MESSAGE_SUBJECT;

        await inboxPage.openMessage(subject);

        await inboxPage.expectMessageRead();
    });


    test('INBOX-002 - User can star and unstar message', async ({
        page
    }) => {

        const inboxPage = new InboxPage(page);

        const subject = process.env.TEST_MESSAGE_SUBJECT;

        await inboxPage.starMessage(subject);

        await inboxPage.expectMessageStarred(subject);

        await inboxPage.unstarMessage(subject);

        await inboxPage.expectMessageUnstarred(subject);
    });


    test('INBOX-003 - User can archive message', async ({
        page
    }) => {

        const inboxPage = new InboxPage(page);

        const subject = process.env.TEST_MESSAGE_SUBJECT;

        await inboxPage.archiveMessage(subject);

        await inboxPage.expectMessageNotInInbox(subject);
    });


    test('INBOX-004 - User can delete and restore message', async ({
        page
    }) => {

        const inboxPage = new InboxPage(page);

        const subject = process.env.TEST_MESSAGE_SUBJECT;

        await inboxPage.deleteMessage(subject);

        await inboxPage.openTrash();

        await inboxPage.expectMessageExists(subject);

        await inboxPage.restoreMessage(subject);

        await inboxPage.openInbox();

        await inboxPage.expectMessageExists(subject);
    });

});