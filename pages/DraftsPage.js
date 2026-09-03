import { expect } from '@playwright/test';

export class DraftsPage {

    constructor(page) {
        this.page = page;

        // Replace with your actual locators
        this.draftsLink = page.locator(`//*[@data-testid="navigation-link:all-drafts"]`);
        this.draftBySubject = (subject) =>
            page.locator(`//*[contains(@id,"message-subject")]`)
                .filter({ hasText: subject });
    }

    async open() {
        await this.draftsLink.click();

        await expect(
            this.draftBySubject
        ).toBeDefined();
    }

    async expectDraftExists(subject) {
        await expect(
            this.draftBySubject(subject)
        ).toBeVisible();
    }

    async openDraft(subject) {
        await this.draftBySubject(subject).click();
    }
}