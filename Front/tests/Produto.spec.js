const { test } = require('@playwright/test');
    const { Login, Cadastro,Produto } = require('../pages/Serverest');
    
    const email = `qa@qa.io`;
    const senha = '123';
    const nome = 'Produto Teste';
    const preco = '100';
    const descricao = 'Descrição do Produto Teste';
    const qtidade = '10';
    const file = 'tests/files/QA.png';  

    test.describe('Fluxo Produto', () => {
        test('Cria produto', async ({ page }) => {
            const login = new Login(page);
            const produto = new Produto(page);
            const cadastro = new Cadastro(page);

            // 1. Acessar a página de login
            await login.goto();
            await login.Fazer_Login(email, senha)
            await cadastro.Verif_Home();
            
            // 2. Cadastrar produto 
            await produto.Cad_Produto(nome, preco, descricao, qtidade, file);

        });
        test('Lista produto cadastr.', async ({ page }) => {
            const login = new Login(page);
            const produto = new Produto(page);
            const cadastro = new Cadastro(page);

            // 1. Acessar a página de login
            await login.goto();
            await login.Fazer_Login(email, senha)
            await cadastro.Verif_Home();
            
            // 2. Listar Produto cadastrado
            await produto.List_Produto();

        });
    });