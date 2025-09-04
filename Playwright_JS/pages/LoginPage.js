const { expect } = require('@playwright/test');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('input[name="email"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://front.serverest.dev/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoggedIn() {
    // Ajuste conforme comportamento real após login bem-sucedido
    await expect(this.page).toHaveURL(/front\.serverest\.dev\/admin\/home/);
  }

  async expectError(message) {
    const errorLocator = this.page.locator('role=alert');
    await expect(errorLocator).toHaveText(message);
  }
}

module.exports = { LoginPage };