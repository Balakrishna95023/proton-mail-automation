import { test } from '@playwright/test';
import { FilterPage } from '../pages/FilterPage.js';

test.describe('Filters', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://mail.proton.me/');
    });
    test('FILTER-001 - Matching emails are processed by filter', async ({
        page
    }) => {

        const filterPage = new FilterPage(page);
        const action = 'Read';

        await filterPage.openFilters();

        await filterPage.createFilter(action);

        await filterPage.expectFilterExists(action);

        await filterPage.removeFilter(action);

        const action1 = 'Has attachments';

        await filterPage.openFilters();

        await filterPage.createFilter(action1);

        await filterPage.expectFilterExists(action1);
    });

});