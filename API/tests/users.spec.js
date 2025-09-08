import { test, expect, request } from '@playwright/test';
import fs from 'fs';

const baseURL = 'https://serverest.dev';
const userData = JSON.parse(fs.readFileSync('./data/usuario.json', 'utf-8'));

let api;
let userId;

test.describe.serial('CRUD Usuários', () => {
  test.beforeAll(async () => {
    api = await request.newContext({
      baseURL,
      ignoreHTTPSErrors: true
    });
  });

  test('Criar usuário', async () => {
    const response = await api.post('/usuarios', { data: userData });
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeTruthy();

    userId = body._id;
    console.log("USER ID SALVO:", userId);
  });

  test('Listar usuários', async () => {
    const response = await api.get('/usuarios');
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('Atualizar usuário', async () => {
    expect(userId).toBeTruthy();
    const updatedUser = { ...userData, nome: 'TESTE QA Atualizado' };

    const response = await api.put(`/usuarios/${userId}`, { data: updatedUser });
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  test('Deletar usuário', async () => {
    expect(userId).toBeTruthy();
    const response = await api.delete(`/usuarios/${userId}`);
    const body = await response.json();

    expect(response.ok()).toBeTruthy();
    expect(body.message).toBe('Registro excluído com sucesso');
  });
});
