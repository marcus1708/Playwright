const { expect } = require('@playwright/test');

class CreateUser {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nome = page.locator('input[name="nome"]');
    this.preco = page.locator('input[name="price"]');
    this.descricao = page.locator('input[name="description"]');
    this.qtidade = page.locator('input[name="quantity"]');
    this.file = page.locator('input[type="file"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async goto() {
    await this.page.goto('https://front.serverest.dev/cadastrarprodutos');
  }

  async create(nome,preco, descricao,qtidade,file) {
    await this.nome.fill(nome);
    await this.preco.fill(preco);
    await this.descricao.fill(descricao);
    await this.qtidade.fill(qtidade);
    await this.file.attach(file);
    await this.submitButton.click();
  }
}
async function Cria_Prod(page,nome,preco, descricao,qtidade,file) {
  await page.fill('input[name="nome"]', nome);
  await page.fill('input[name="price"]', preco);
  await page.fill('input[name="description"]', descricao);
  await page.fill('input[name="quantity"]', qtidade);
  await page.attach('input[name="imagem"]', file);
  await page.click('button[type="submit"]');
}
module.exports = { CreateUser, Cria_Prod};
