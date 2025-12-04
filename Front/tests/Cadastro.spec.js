const { test } = require('@playwright/test');
    const { Login, Cadastro } = require('../pages/Serverest');
    
    const nome = 'QA';
    const email = `qa@qa.io`;
    const senha = '123';

    test.describe('Cadastro com Sucesso', () => {
        test('Realiza o cadastro com sucesso', async ({ page }) => {
            const login = new Login(page);
            const cadastro = new Cadastro(page);

            // 1. Acessar a página de login
            await login.goto();

            // 2. Abrir o formulário de cadastro e realizar o cadastro com credenciais válidas
            await cadastro.Cadastrar();
            await cadastro.Fazer_Cadastro(nome, email, senha);

            // Verifica se voltamos para a tela de login após o cadastro
            await cadastro.Verif_Home();

        });
    });