const { test } = require('@playwright/test');
    const { Login, Cadastro,Usuario } = require('../pages/Serverest');
    
    const email = `qa@qa.io`;
    const senha = '123';

    test.describe('Lista Usuario', () => {
        test('Lista usuario cadastr.', async ({ page }) => {
            const login = new Login(page);
            const usuario = new Usuario(page);
            const cadastro = new Cadastro(page);

            // 1. Acessar a página de login
            await login.goto();
            await login.Fazer_Login(email, senha)
            await cadastro.Verif_Home();
            
            // 2. Listar usuário cadastrado
            await usuario.List_Usuario();
            //await expect(usuario.emailuser).toBeVisible();

        });
    });