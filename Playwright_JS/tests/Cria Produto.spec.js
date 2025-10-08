const { test, expect } = require('@playwright/test');
const { login } = require('../pages/LoginPage');
const { Cria_Prod } = require('../pages/CreateProd');

test('Realiza Login e Criar Produto', async ({ page }) => {
  await login(page, 'qa@qa.io', '123');
  await page.goto('https://front.serverest.dev/admin/cadastrarprodutos');
  await Cria_Prod(page,'Produto','1000', 'teste prod','200','../files/texto.txt')
});

