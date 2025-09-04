const { test } = require('@playwright/test');
const { CreateUser } = require('../pages/CreateUser');

test.describe('Create User — ServeRest', () => {
  test('Cadastro de Usuario', async ({ page }) => {
    const createUser = new CreateUser(page);

    await createUser.goto();
    await createUser.create('TESTE QA', 'qa@qa.io', '123');
    await createUser.expectCreatedIn();
  });
});
