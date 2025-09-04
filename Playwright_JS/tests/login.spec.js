const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login — ServeRest', () => {
  test('sucesso no login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('beltrano@qa.com.br', 'teste');
    await loginPage.expectLoggedIn();
  });

  test('erro ao logar com senha inválida', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('beltrano@qa.com.br', '123');
    await loginPage.expectError('×Email e/ou senha inválidos'); // ajusta conforme mensagem real
  });
});
