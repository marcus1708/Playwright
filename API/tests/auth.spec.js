import { test, expect, request } from '@playwright/test';
import { setAuthToken } from '../utils/authHelper.js';

const baseURL = 'https://serverest.dev';

test.describe('Autenticação', () => {
  let api;

  test.beforeAll(async ({ playwright }) => {
    api = await request.newContext({ baseURL });
  });

  test('Deve logar com usuário válido e salvar token', async () => {
    const response = await api.post('/login', {
      data: {
        email: 'qa@qa.com', // usuário já existente no ServeRest
        password: '123'
      }
    });

    expect(response.ok()).toBeTruthy();

    const body = await response.json();
    expect(body).toHaveProperty('authorization');

    setAuthToken(body.authorization); // salva token em memória
    console.log('Token salvo:', body.authorization);
  });
});
