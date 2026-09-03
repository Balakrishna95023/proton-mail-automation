import { expect } from '@playwright/test';

export class InboxPage {

    constructor(page) {
        this.page = page;

        this.firstemailcheckbox = page.locator(`(//*[@data-testid="item-checkbox"])[1]`);
        this.firstemaillabel = page.locator(`(//*[@data-testid="label-item:body-button"])[1]`);
        this.LabelButton = page.locator(
            '//*[@data-testid="toolbar:labelas"]'
        );
        this.createLabelButton = page.locator(
            '//*[@data-testid="label-dropdown:add-label"]'
        );
        this.labelNameInput = page.locator(
            '//*[@id="folder"]'
        );
        this.labelinput = page.locator(
            '//*[@data-testid="label-dropdown:search-input"]'
        );
        this.saveLabelButton = page.locator(
            '//*[@data-testid="label-modal:save"]'
        );
        this.labelOption = (label) =>
            page.getByText(label, { exact: true });
        // =========================================================
        // Navigation
        // =========================================================

        this.inboxLink = page.locator('YOUR_INBOX_LINK_LOCATOR');
        this.trashLink = page.locator('//*[@data-testid="sidebar-label:Trash"]');
        this.moreoptions = page.locator('//*[@data-shortcut-target="toggle-more-items"]');

        // =========================================================
        // Message
        // =========================================================

        this.messageBySubject = (subject) =>
            page.locator('//*[@data-testid="message-row:subject"]')
                .filter({ hasText: subject });
        this.checkboxbysubject = (subject) =>
            this.messageBySubject(subject)
                .locator('xpath=./ancestor::*[@data-shortcut-target="item-container"][1]')
                .locator('.//*[@data-testid="item-checkbox"]');
        // =========================================================
        // Message actions
        // =========================================================

       this.starButton = (subject) =>
            this.messageBySubject(subject)
                .locator('xpath=ancestor::*[@data-shortcut-target="item-container"][1]//*[@data-testid="item-star-true"]');

        this.unstarButton = (subject) =>
            this.messageBySubject(subject)
                .locator('xpath=./ancestor::*[@data-shortcut-target="item-container"][1]')
                .locator('.//*[@data-testid="item-star-true"]');

        this.archiveButton = (subject) =>
            this.messageBySubject(subject)
                .locator('xpath=./ancestor::*')
                .locator('.//*[text()="Move to archive"]/..');

        this.deleteButton = (subject) =>
            this.messageBySubject(subject)
            .locator('xpath=./ancestor::*[@data-shortcut-target="item-container"][1]')
                .locator('.//*[@data-testid="item-delete"]');

        // =========================================================
        // Read state
        // =========================================================

        this.readMessage = page.locator(
            '//*[@data-testid="conversation-header:subject"]'
        );

        // =========================================================
        // Restore
        // =========================================================

        this.restoreButton = page.locator(
            '//*[@data-testid="toolbar:movetoinbox"]'
        );

        // =========================================================
        // Labels
        // =========================================================

        this.labelMenuButton = page.locator(
            'YOUR_LABEL_MENU_LOCATOR'
        );



        
    }


    // =============================================================
    // Navigation
    // =============================================================

    async openInbox() {
        await this.inboxLink.click();

        await expect(this.inboxLink).toBeVisible();
    }


    async openTrash() {
        await this.moreoptions.click();
        await this.trashLink.click();

        await expect(this.trashLink).toBeVisible();
    }


    // =============================================================
    // Message
    // =============================================================

    async openMessage(subject) {
        const message = this.messageBySubject(subject);

        await expect(message).toBeVisible();

        await message.click();
    }


    async expectMessageExists(subject) {
        await expect(
            this.messageBySubject(subject)
        ).toBeVisible();
    }


    async expectMessageNotInInbox(subject) {
        await expect(
            this.messageBySubject(subject)
        ).toHaveCount(0);
    }


    // =============================================================
    // Read / unread
    // =============================================================

    async expectMessageRead() {
        await expect(this.readMessage).toBeVisible();
    }


    // =============================================================
    // Star
    // =============================================================

    async starMessage(subject) {
        const button = this.starButton(subject);

        await expect(button).toBeVisible();

        await button.click();
    }


    async unstarMessage(subject) {
        const button = this.starButton(subject);

        await expect(button).toBeVisible();

        await button.click();
    }


    async expectMessageStarred(subject) {
        await expect(
            this.starButton(subject)
        ).toHaveAttribute('aria-pressed', 'true');
    }


    async expectMessageUnstarred(subject) {
        await expect(
            this.unstarButton(subject)
        ).toHaveAttribute('aria-pressed', 'false');
    }


    // =============================================================
    // Archive
    // =============================================================

    async archiveMessage(subject) {

        const message = this.messageBySubject(subject);
        await expect(message).toBeVisible();
        await message.hover();
        const button = this.archiveButton(subject);

        await expect(button).toBeVisible();

        await button.click();
    }


    // =============================================================
    // Delete
    // =============================================================

    async deleteMessage(subject) {
        const message = this.messageBySubject(subject);
        await expect(message).toBeVisible();
        await message.hover();
        const button = this.deleteButton(subject);

        await expect(button).toBeVisible();

        await button.click();
    }


    // =============================================================
    // Restore
    // =============================================================

    async restoreMessage(subject) {
        const message = this.messageBySubject(subject);
        await expect(message).toBeVisible();
        await message.hover();
        await this.checkboxbysubject(subject).click();
        await this.restoreButton.click();
    }


    // =============================================================
    // Labels
    // =============================================================

    async createLabel(label) {

        await this.LabelButton.click();
        await this.createLabelButton.click();

        await this.labelNameInput.fill(label);

        await this.saveLabelButton.click();

        await this.labelinput.fill(label);
        await expect(
            this.labelOption(label)
        ).toBeVisible();
    }

    async selectfirstMessage() {
        await this.firstemailcheckbox.click();
    }


    // async applyLabel( label) {


    //     await expect(message).toBeVisible();

    //     await message.click();

    //     await this.labelMenuButton.click();

    //     await this.labelOption(label).click();
    // }


    async expectMessageHasLabel(label) {

        await expect(
            this.firstemaillabel
        ).toContainText(label);
    }
}