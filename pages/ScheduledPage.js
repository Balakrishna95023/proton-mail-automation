import { expect } from '@playwright/test';

export class ScheduledPage {

    constructor(page) {
        this.page = page;

        this.scheduledLink = page.locator(
            `//*[@data-testid="navigation-link:scheduled"]`
        );
        this.scheduledLinkheader = page.locator(
            `//h2[@title="Scheduled"]`
        );

        this.scheduledMessageBySubject = (subject) =>
            page.locator(`//*[contains(@id,"message-subject")]`)
                .filter({ hasText: subject });
    }


    async open() {

        await this.scheduledLink.click();

        await expect(
            this.scheduledLinkheader
        ).toBeVisible();
    }


    async expectMessageScheduled(subject) {

        await expect(
            this.scheduledMessageBySubject(subject)
        ).toBeVisible();
    }
}