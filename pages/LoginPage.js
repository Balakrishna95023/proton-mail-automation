import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.signInButton = page.locator('text=Sign in');
    this.loginButton = page.locator('button:has-text("Sign in")');
    this.errorMessage = page.locator('text=The password is not correct. Please try again with a different password.');
    this.welcomeText = page.locator('text=Welcome');
    this.securityText = page.locator('text=Privacy and security starts here');
  }

  async goto() {
    await this.page.goto('/');
  }

  async clickSignIn() {
    await this.signInButton.waitFor({ state: 'visible' });
    await this.signInButton.click();
  }

  async login(username, password) {
    await this.usernameInput.waitFor({ state: 'visible' });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }

  async expectInboxLoaded() {
    await expect(this.welcomeText).toBeVisible({ timeout: 100000 });
    await expect(this.securityText).toBeVisible();
  }
}
