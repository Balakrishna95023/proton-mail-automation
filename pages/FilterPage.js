import { expect } from '@playwright/test';

export class FilterPage {

    constructor(page) {
        this.page = page;

        // =========================================================
        // Filter navigation
        // =========================================================

        this.filtersSettings = page.locator(
            `(//*[contains(text(),"Filter")])[1]`
        );

        this.createFilterlabel = page.locator(
            '(//*[contains(text(),"Filter")])[2]'
        );

        // =========================================================
        // Filter fields
        // =========================================================

        this.actionValueInput = (value) => page.locator(`(//*[text()="${value}"])`);
        this.unreadvalues = page.locator('//*[contains(@class,"item-unread-dot")]');
        this.hasattachmentvalues = page.locator('//*[@data-testid="item-attachment-icon-paper-clip"]');
    }


    async openFilters() {

        await this.filtersSettings.click();

        await expect(
            this.createFilterlabel
        ).toBeVisible();
    }


    async createFilter(action) {
        await this.actionValueInput(action).click();
    }
    async removeFilter(action) {
        await this.openFilters();
        await this.createFilter(action);
    }


    async expectFilterExists(action) {
            if (action == 'Read') {
                await expect(this.unreadvalues).toBeHidden();
            }
            else{
                // Verify count or iterate through them
                for (const icon of await this.hasattachmentvalues.all()) {
                    await expect(icon).toBeVisible();
                }
            }
    }
}