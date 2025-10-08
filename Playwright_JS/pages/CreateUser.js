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
    this.adm = page.getByLabel('Cadastrar como administrador?').check();
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://front.serverest.dev/cadastrarusuarios');
  }

  async create(nome,email, password) {
    await this.nomeInput.fill(nome);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
  async expectCreatedIn(){
    await expect(this.page).toHaveURL('https://front.serverest.dev/admin/home');
  }
}

module.exports = { CreateUser };
