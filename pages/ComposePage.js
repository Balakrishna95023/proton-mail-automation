import { expect } from '@playwright/test';

export class ComposePage {
    constructor(page) {
        this.page = page;
        this.newMessageButton = page.getByText('New message');
        this.loader = page.getByText('Loading Proton Account');
        this.toField = page.getByRole('textbox', { name: 'To' })
        this.ccButton = page.getByText('CC', { exact: true })
        this.bccButton = page.getByRole('button', { name: 'BCC' })

        this.ccField = page.getByLabel('CC', { exact: true })
        this.bccField = page.getByRole('textbox', { name: 'BCC' })

        this.subjectField = page.getByRole('textbox', { name: 'Subject' })
        this.bodyField = page.frameLocator('[title="Email composer"]').locator('#rooster-editor')

        this.sendButton = page.getByText('Send', { exact: true })
        this.sentConfirmation = page.getByText('Message sent.');
        this.recipientError = page.locator('//*[contains(text(),"The following address is not valid")]');

        this.closeButton = page.locator(`//*[@data-testid="composer:close-button"]`);
        this.undoSendButton = page.getByText('Undo', { exact: true });
        this.sendCancelledIndicator = page.getByText('Sending undone', { exact: true });
        this.sentmenu = page.locator(`(//*[text()="Sent"])[1]`);
        this.confirmScheduleButton = page.getByText('Send anyway', { exact: true });
        this.scheduledConfirmation = page.locator('//*[contains(text(),"Message will be sent")]');
        this.sentMessageBySubject = (subject) =>
            page.locator('//*[contains(@id,"message-subject")]')
                .filter({ hasText: subject });
        this.scheduleButton = page.locator(`//*[contains(@data-testid,"composer:scheduled-send")]`);
        this.fileInput = page.locator(
            '//*[@data-testid="composer:attachment-button"]//input[@type="file"]'
        );
        this.attachmentslisttoggle = page.locator('//*[@data-testid="attachment-list:toggle"]');
        this.attachmentByName = (fileName) =>
            page.locator('//*[@data-testid="attachment-item"]')
                .filter({ hasText: fileName });
    }

    async open() {
        await this.newMessageButton.waitFor({ state: 'visible', timeout: 100000});
        await this.newMessageButton.click();

        await expect(this.subjectField).toBeVisible();
    }

    async enterRecipient(email) {
        await this.toField.fill(email);

        // If Proton requires Enter to convert the email
        await this.toField.press('Enter');
    }

    async enterCC(email) {
        await this.ccButton.click();
        await this.ccField.fill(email);
        await this.ccField.press('Enter');
    }

    async enterBCC(email) {
        await this.bccButton.click();
        await this.bccField.fill(email);
        await this.bccField.press('Enter');
    }

    async enterSubject(subject) {
        await this.subjectField.fill(subject);
    }

    async enterBody(body) {
        await this.bodyField.fill(body);
    }

    async send() {
        await expect(this.sendButton).toBeEnabled();

        await this.sendButton.click();
    }

    async expectSendSuccess() {
        await expect(this.sentConfirmation).toBeVisible();
    }

    async expectRecipientValidationError() {
        await expect(this.recipientError).toBeVisible();
    }

    async closeComposer() {
        await this.closeButton.click();
    }
    async expectSubject(subject) {
        await expect(this.subjectField).toHaveValue(subject);
    }

    async expectBody(body) {
        await expect(this.bodyField).toContainText(body);
    }

    async expectUndoSendVisible() {

        await expect(
            this.undoSendButton
        ).toBeVisible();
    }


    async clickUndoSend() {

        await this.undoSendButton.click();
    }


    async expectSendCancelled() {

        await expect(
            this.sendCancelledIndicator
        ).toBeVisible();
    }

    async clickOnSent(){
        await this.sentmenu.click();
    }

    async expectMessageNotSent(subject) {

        // Use the actual UI/state that proves
        // the message wasn't sent.
        await expect(
            this.sentMessageBySubject(subject)
        ).toHaveCount(0);
    }


    // =============================================================
    // Schedule
    // =============================================================

    async openScheduleMenu() {
        await this.scheduleButton.click();
    }


    async scheduleSend(scheduledTime) {

        await this.openScheduleMenu();
        await this.page.locator(`//*[contains(@data-testid,"${scheduledTime}")]`).click();
        // await this.confirmScheduleButton.click();
    }


    async expectScheduledConfirmation() {

        await expect(
            this.scheduledConfirmation
        ).toBeVisible();
    }
    // =============================================================
    // Attachments
    // =============================================================

    async attachFile(filePath) {
        await this.fileInput.setInputFiles(filePath);
    }


    async removeAttachment(fileName) {

        const attachment = this.attachmentByName(fileName);

        await expect(attachment).toBeVisible();

        await attachment
            .locator(`//button[contains(@title,"Remove")]`)
            .click();
    }


    async expectAttachmentVisible(fileName) {
        await this.attachmentslisttoggle.click();
        await expect(
            this.attachmentByName(fileName)
        ).toBeVisible();
    }


    async expectAttachmentNotVisible(fileName) {

        await expect(
            this.attachmentByName(fileName)
        ).toHaveCount(0);
    }
}