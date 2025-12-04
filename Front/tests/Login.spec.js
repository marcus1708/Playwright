const { test } = require('@playwright/test');
    const { Login, Home } = require('../pages/Serverest');

    const email = 'qa@qa.io';
    const senha = '123';

    test.describe('Cenários de Login', () => {
        test('Realiza o Login com sucesso', async ({ page }) => {
            const login = new Login(page);
            const home = new Home(page);

            // 1. Acessar a página de login
            await login.goto();

            // 2. Realizar o login com credenciais válidas
            await login.Fazer_Login(email, senha);

            // 3. Verificar se o login foi bem-sucedido
            await home.Verif_Login_OK();
        });
        test('Realiza o Login com cred. inválidas', async ({ page }) => {
            const login = new Login(page);

            // 1. Acessar a página de login
            await login.goto();

            // 2. Tentar login com credenciais inexistentes
            await login.Fazer_Login('invalido@teste.com', 'senhaerrada');

            // 3. Verificar a mensagem de erro esperada e a permanência na página de login
            await login.Verif_Msg_Erro('×Email e/ou senha inválidos');
            await login.Verif_Pag_Login();
        });
    });