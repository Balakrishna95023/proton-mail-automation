import { test } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage.js';

test.describe('Search', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });


    test('SEARCH-001 - User can search by keyword', async ({
        page
    }) => {

        const searchPage = new SearchPage(page);

        const keyword = 'Automation';

        await searchPage.search(keyword);

        await searchPage.expectResultsContainKeyword(
            keyword
        );
    });


    test('SEARCH-002 - User can perform advanced multi-condition search', async ({
        page
    }) => {

        const searchPage = new SearchPage(page);

        await searchPage.openAdvancedSearch();

        await searchPage.enterSender(
            process.env.RECEIVER_EMAIL
        );

        await searchPage.searchAdvanced();

        await searchPage.expectResultsMatchCriteria({
            sender: process.env.RECEIVER_EMAIL
        });
    });

});