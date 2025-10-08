const { test, expect } = require('@playwright/test');
const { login } = require('../pages/LoginPage');

test('Realiza Login e Listar Produtos', async ({ page }) => {
  await login(page, 'qa@qa.io', '123');
  await page.goto('https://front.serverest.dev/admin/listarprodutos');
});

