import { expect } from '@playwright/test';

export class SearchPage {

    constructor(page) {
        this.page = page;

        // =========================================================
        // Basic search
        // =========================================================

        this.searchInput = page.locator(
            '//*[@data-testid="search-keyword"]'
        );
        this.searchInputafterclicking = page.locator(
            '//*[@data-testid="input-input-element"]'
        );

        this.searchButton = page.locator(
            '//*[@data-testid="advanced-search:submit"]'
        );

        this.searchResults = page.locator(
            '//*[contains(@data-testid,"message-item")]'
        );

        // =========================================================
        // Advanced search
        // =========================================================

        this.advancedSearchButton = page.getByText('More search options', { exact: true });

        this.senderInput = page.locator(
            '//*[@id="from"]'
        );

        this.recipientInput = page.locator(
            'YOUR_RECIPIENT_INPUT_LOCATOR'
        );

        this.keywordInput = page.locator(
            'YOUR_KEYWORD_INPUT_LOCATOR'
        );

        this.advancedSearchSubmit = page.locator(
            'YOUR_ADVANCED_SEARCH_SUBMIT_LOCATOR'
        );

        this.clearSearchButton = page.locator(
            'YOUR_CLEAR_SEARCH_LOCATOR'
        );
    }


    async search(keyword) {

        await this.searchInput.click();
        await this.searchInputafterclicking.fill(keyword);

        await this.searchButton.click();

        await expect(
            this.searchResults.first()
        ).toBeVisible();
    }


    async expectResultsContainKeyword(keyword) {

        await expect(
            this.searchResults.first()
        ).toContainText(keyword);
    }


    async openAdvancedSearch() {

        await this.searchInput.click();
        await this.advancedSearchButton.click();

        await expect(
            this.senderInput
        ).toBeVisible();
    }


    async enterSender(email) {

        await this.senderInput.fill(email);
    }


    async enterRecipient(email) {

        await this.recipientInput.fill(email);
    }


    async searchAdvanced() {

        await this.searchButton.click();

        await expect(
            this.searchResults.first()
        ).toBeVisible();
    }


    async expectResultsMatchCriteria({
        sender
    }) {

        const results = this.searchResults.first();

        await expect(results).toContainText(sender);
    }


    async clearSearch() {

        await this.clearSearchButton.click();

        await expect(
            this.searchInput
        ).toHaveValue('');
    }
}