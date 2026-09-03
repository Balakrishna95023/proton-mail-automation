import { test } from '@playwright/test';
import { ComposePage } from '../pages/ComposePage.js';
import { DraftsPage } from '../pages/DraftsPage.js';

test.describe('Draft Persistence', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });


    test('DRAFT-001 - Composed email is automatically saved as draft', async ({
        page
    }) => {

        const composePage = new ComposePage(page);
        const draftsPage = new DraftsPage(page);

        const subject = `Draft Auto Save ${Date.now()}`;
        const body = 'Testing Proton Mail draft auto-save functionality.';

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(body);

        await composePage.closeComposer();

        await draftsPage.open();

        await draftsPage.expectDraftExists(subject);
    });


    test('DRAFT-002 - Draft content persists after reopening', async ({
        page
    }) => {

        const composePage = new ComposePage(page);
        const draftsPage = new DraftsPage(page);

        const subject = `Draft Persistence ${Date.now()}`;
        const body = 'This subject and body must persist after reopening.';

        await composePage.open();

        await composePage.enterRecipient(
            process.env.RECEIVER_EMAIL
        );

        await composePage.enterSubject(subject);

        await composePage.enterBody(body);

        await composePage.closeComposer();

        await draftsPage.open();

        await draftsPage.expectDraftExists(subject);

        await draftsPage.openDraft(subject);

        // Verify actual persisted content
        await composePage.expectSubject(subject);
        await composePage.expectBody(body);
    });

});