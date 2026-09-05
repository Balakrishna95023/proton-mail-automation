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
            page.locator(`//mark[text()="${label}"]`);
        // =========================================================
        // Navigation
        // =========================================================

        this.inboxLink = page.locator('//*[@data-testid="sidebar-label:Inbox"]');
        this.trashLink = page.locator('//*[@data-testid="sidebar-label:Trash"]');
        this.moreoptions = page.locator('//*[@data-shortcut-target="toggle-more-items"]');
        this.applybutton = page.locator('//*[@data-testid="label-dropdown:apply"]');
        // =========================================================
        // Message
        // =========================================================
        this.firstmessagesubject = page.locator('(//*[@data-testid="message-row:subject"])[1]');

        this.messageBySubject = (subject) =>
            page.locator('//*[@data-testid="message-row:subject"]')
                .filter({ hasText: subject }).first();
        this.checkboxbysubject = (subject) => page.locator(`//*[@data-testid="message-row:subject" and contains(normalize-space(.), "${subject}")]/ancestor::*[@data-shortcut-target="item-container"][1]//*[@data-testid="item-checkbox"]`).first();
        // =========================================================
        // Message actions
        // =========================================================

        this.starButton = (subject) => page.locator(`//*[@data-testid="message-row:subject" and contains(normalize-space(.), "${subject}")]/ancestor::*[@data-shortcut-target="item-container"][1]//*[@data-testid="item-star-false"]`).first();

        this.unstarButton = (subject) => page.locator(`//*[@data-testid="message-row:subject" and contains(normalize-space(.), "${subject}")]/ancestor::*[@data-shortcut-target="item-container"][1]//*[@data-testid="item-star-true"]`).first();
        
        this.archiveButton = (subject) => page.locator(`//*[@data-testid="message-row:subject" and contains(normalize-space(.), "${subject}")]/ancestor::*[@data-shortcut-target="item-container"][1]//*[text()="Move to archive"]/..`).first();
        
        this.deleteButton = (subject) => page.locator(`//*[@data-testid="message-row:subject" and contains(normalize-space(.), "${subject}")]/ancestor::*[@data-shortcut-target="item-container"][1]//*[text()="Move to trash"]/..`).first();

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
        
    }


    // =============================================================
    // Navigation
    // =============================================================

    async openInbox() {
        await this.inboxLink.click();

        await expect(this.inboxLink).toBeVisible();
    }

    async getFirstMessageSubject(){
        await expect(this.firstmessagesubject).toBeVisible({ timeout: 100000 });
        return (await this.firstmessagesubject.textContent()).trim();
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
        const button1 = this.starButton(subject);
        const button2 = this.unstarButton(subject);
        
        if (await button1.isVisible()) {
            await button1.click();
        } else {
            await expect(button2).toBeVisible();
        }
    }



    async unstarMessage(subject) {
        const button1 = this.starButton(subject);
        const button2 = this.unstarButton(subject);

        if (await button2.isVisible()) {
            await button2.click();
        } else {
            await expect(button1).toBeVisible();
        }
    }


    async expectMessageStarred(subject) {
        await expect(
            this.unstarButton(subject)
        ).toHaveAttribute('aria-pressed', 'true');
    }


    async expectMessageUnstarred(subject) {
        await expect(
            this.starButton(subject)
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
        const button = this.deleteButton(subject).first();

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
        await this.checkboxbysubject(subject).first().click();
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
        await this.applybutton.click();
    }

    async selectfirstMessage() {
        await this.firstemailcheckbox.click();
    }


    async expectMessageHasLabel(label) {

        await expect(
            this.firstemaillabel
        ).toContainText(label);
    }
}