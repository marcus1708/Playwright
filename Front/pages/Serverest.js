const { expect } = require('@playwright/test');

    class Login {
        /**
         * @param {import('@playwright/test').Page} page
         */
        constructor(page) {
            this.page = page;
            // Seletor para o campo de email e senha (usa regex )
            this.inputEmail = page.getByPlaceholder(/email/i);
            this.inputSenha = page.getByPlaceholder(/senha/i);
            this.btnLogin = page.getByRole('button', { name: 'Entrar' });
            this.alertError = page.getByRole('alert');
        }

        async goto() {
            // Usa a baseURL configurada no playwright.config.js
            await this.page.goto('/login');
        }

        async Fazer_Login(email, senha) {
            await this.inputEmail.fill(email);
            await this.inputSenha.fill(senha);
            await this.btnLogin.click();
        }

        async Verif_Msg_Erro(mensagemEsperada) {
            // Asserção: verifica se o elemento de alerta está visível e contém o texto esperado
            await expect(this.alertError).toBeVisible();
            await expect(this.alertError).toHaveText(mensagemEsperada);
        }
        
        async Verif_Pag_Login() {
             await expect(this.page).toHaveURL(/\/login/);
        }
    }
    class Home {
        /**
         * @param {import('@playwright/test').Page} page
         */
        constructor(page) {
            this.page = page;
            // Seletor para o texto 'Bem-vindo' na página inicial
            this.textWelcome = page.getByText('Serverest Store');
            // Seletor para o botão de Logout
            this.btnLogout = page.getByRole('button', { name: 'Logout' });
        }

        async Verif_Login_OK() {
            // Asserção: verifica se o texto de boas-vindas está visível
            await expect(this.textWelcome).toBeVisible();
            // Asserção: verifica se o botão Logout está visível, indicando que o usuário está logado
            await expect(this.btnLogout).toBeVisible();
            // Asserção: verifica se a URL mudou para /home (ou /cadastroprodutos)
            await expect(this.page).not.toHaveURL('Serverest Store');
        }
    }
    class Cadastro {
        /**
         * @param {import('@playwright/test').Page} page
         */
        constructor(page) {
            this.page = page;
            this.inputNome = page.getByPlaceholder(/nome/i);
            this.inputEmail = page.getByPlaceholder(/email/i);
            this.inputSenha = page.getByPlaceholder(/senha/i);
            this.btnCadastrar = page.getByRole('button', { name: /cadastrar/i });
            this.btnCadastrese = page.getByText(/cadastre-?se/i);
            this.adm = page.getByLabel(/cadastrar como administrador\?/i);
            this.alertError = page.getByRole('alert');
        }

        async Cadastrar() {
            await this.btnCadastrese.click();
            await expect(this.inputNome).toBeVisible({ timeout: 5000 });
        }

        async Fazer_Cadastro(nome,email, senha) {
            await this.inputNome.fill(nome);
            await this.inputEmail.fill(email);
            await this.inputSenha.fill(senha);
            await this.btnCadastrar.click();
        }
        async Verif_Msg_Erro(mensagemEsperada) {
            // Asserção: verifica se o elemento de alerta está visível e contém o texto esperado
            await expect(this.alertError).toBeVisible();
            await expect(this.alertError).toHaveText(mensagemEsperada);
        }
        
        async Verif_Home() {
             await expect(this.page).toHaveURL('https://front.serverest.dev/admin/home');
        }
    }
    class Usuario {
        /**
         * @param {import('@playwright/test').Page} page
         */
        constructor(page) {
            this.page = page;
            this.emailuser = page.getByText('qa@qa.io');
            this.List_User = page.getByTestId('listarUsuarios')
            this.alertError = page.getByRole('alert');
        }

        async List_Usuario() {
            await this.List_User.click();
            await expect(this.emailuser).toBeVisible({ timeout: 5000 });        
        }
    }
    class Produto {
        /**
         * @param {import('@playwright/test').Page} page
         */
        constructor(page) {
            this.page = page;
            this.nome_prod = page.getByText('Soft Aluminum Shoes');
            this.List_Prod = page.getByTestId('listarProdutos')
            this.Cad_Prod = page.getByTestId('cadastrarProdutos')
            this.nome = page.locator('input[name="nome"]');
            this.preco = page.locator('input[name="price"]');
            this.descricao = page.getByTestId('descricao');
            this.qtidade = page.getByTestId('quantity')
            this.file = page.getByTestId('imagem');
            this.submitButton = page.locator('button[type="submit"]');
            this.alertError = page.getByRole('alert');
        }

        async List_Produto() {
            await this.List_Prod.click();
            await expect(this.nome_prod).toBeVisible({ timeout: 5000 });        
        }

        async Cad_Produto(nome, preco, descricao, qtidade, filePath) {
            await this.Cad_Prod.click();
            await this.nome.fill(nome);
            await this.preco.fill(preco);
            await this.descricao.fill(descricao);
            await this.qtidade.fill(qtidade);
            // Envia arquivo usando setInputFiles no locator
            if (filePath) {
                await this.file.setInputFiles(filePath);
            }
            await this.submitButton.click();
        }
    }
    module.exports = { Login, Home, Cadastro, Usuario, Produto };