import { test, expect, request } from '@playwright/test';
import fs from 'fs';

const baseURL = 'https://serverest.dev';
const userData = JSON.parse(fs.readFileSync('./data/usuario.json', 'utf-8'));
const prodData = JSON.parse(fs.readFileSync('./data/produto.json', 'utf-8'));
const cartData = JSON.parse(fs.readFileSync('./data/carrinho.json', 'utf-8'));

let api,token,userId,prodId,cartId;

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
  });

  test('Login', async () => {
    const response = await api.post('/login', {
      data: {
        email: userData.email,
        password: userData.password
      }
    });
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.authorization).toBeTruthy();
    token = body.authorization;
  });

  test('Listar usuários', async () => {
    const response = await api.get('/usuarios');
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('Listar usuários com ID', async () => {
    expect(userId).toBeTruthy();
    const response = await api.get(`/usuarios/${userId}`);
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    //expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('Atualizar usuário', async () => {
    expect(userId).toBeTruthy();
    const updatedUser = { ...userData, nome: 'TESTE QA Atualizado' };
    const response = await api.put(`/usuarios/${userId}`, { data: updatedUser });
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    expect(body.message).toBe('Registro alterado com sucesso');
  });
  
  test('Criar produto', async () => {
    expect(token).toBeTruthy();
    const response = await api.post('/produtos', {
      data: prodData,
      headers: {Authorization: `${token}`}
    });
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeTruthy();
    prodId = body._id;
  });

  test('Listar produtos', async () => {
    const response = await api.get('/produtos');
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    //expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('Listar produtos com ID', async () => {
    expect(prodId).toBeTruthy();
    const response = await api.get(`/produtos/${prodId}`);
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    //expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('Atualizar produto', async () => {
    expect(prodId,token).toBeTruthy();
    const updateProd = { ...prodData, nome: 'Autom. Playwright Atualizado' };
    const response = await api.put(`/produtos/${prodId}`,
      {data: updateProd,headers: {Authorization: `${token}`}});
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro alterado com sucesso');
  });

  test('Criar Carrinho', async () => {
    expect(token).toBeTruthy();
    const cart = {produtos: [{idProduto: prodId,quantidade: 1}]}; 
    const response = await api.post('/carrinhos', 
      {data: cart, headers: {Authorization: `${token}`}});
    const body = await response.json();
    expect(response.status()).toBe(201);
    expect(body.message).toBe('Cadastro realizado com sucesso');
    expect(body._id).toBeTruthy();
    cartId = body._id;
  });

  test('Listar Carrinho', async () => {
    const response = await api.get('/carrinhos');
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    //expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('Listar Carrinho com ID', async () => {
    expect(cartId).toBeTruthy();
    const response = await api.get(`/carrinhos/${cartId}`);
    const body = await response.json();
    expect(response.ok()).toBeTruthy();
    //expect(Array.isArray(body.usuarios)).toBeTruthy();
  });

  test('Cancelar Compra', async () => {
    expect(token,cartId).toBeTruthy();
    const response = await api.delete(`/carrinhos/cancelar-compra/`, { headers: {Authorization: `${token}`}});
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro excluído com sucesso. Estoque dos produtos reabastecido');
  });

  test('Deletar produto', async () => {
    expect(token,prodId).toBeTruthy();
    const response = await api.delete(`/produtos/${prodId}`, { headers: {Authorization: `${token}`} });
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro excluído com sucesso');
  });

  test('Deletar usuário', async () => {
    expect(userId).toBeTruthy();
    const response = await api.delete(`/usuarios/${userId}`);
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.message).toBe('Registro excluído com sucesso');
  });
});
