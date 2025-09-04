const { expect } = require('@playwright/test');

class CreateUser {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nomeInput = page.locator('input[name="nome"]');
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://front.serverest.dev/cadastrarusuarios');
  }
  async expectCreatedIn() {
    await expect(this.page).toHaveURL(/front\.serverest\.dev\/home/);
  }

  async expectError(message) {
    const errorLocator = this.page.locator('role=alert');
    await expect(errorLocator).toHaveText(message);
  }
}

module.exports = { CreateUser };