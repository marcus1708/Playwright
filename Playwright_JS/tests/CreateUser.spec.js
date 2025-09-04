const { test } = require('@playwright/test');
const { CreateUser } = require('../pages/CreateUser');

test.describe('Login — ServeRest', () => {
  test('Cadastro de Usuario', async ({ page }) => {
    const createUser = new CreateUser(page);

    await createUser.goto();
    await createUser.nome('TESTE');
    await createUser.email('qa@qa.io');
    await createUser.password('123');
    await createUser.check;
    await createUser.expectCreatedIn();
  });
});
