# Portfólio Vivo Interativo

Este é um portfólio de desenvolvedor full-stack dinâmico e interativo, construído com tecnologias web modernas. Ele foi projetado para ser uma vitrine "viva" do trabalho de um desenvolvedor, com um painel de administração completo para gerenciamento de conteúdo, autenticação simulada e animações envolventes.

## ✨ Funcionalidades

- **Design Moderno:** Interface limpa e responsiva com tema claro/escuro.
- **Cursor Animado:** Um "personagem" interativo que segue o cursor do mouse, melhorando a experiência do usuário.
- **Painel de Administração:** Uma área protegida (`/admin/dashboard`) para gerenciar todos os aspectos do portfólio.
- **Autenticação Simulada:** Sistema de login para acessar o painel (use `admin@admin.com` / `admin`).
- **Gerenciamento de Conteúdo (CRUD):** Adicione, edite e exclua projetos e algoritmos diretamente pela interface.
- **Formulário de Contato:** As mensagens enviadas são salvas e podem ser visualizadas no dashboard.
- **Visualizador de Currículo:** Incorpora um PDF para fácil visualização e download.

---

## 🛠️ Tecnologias Envolvidas

Este projeto utiliza uma abordagem de frontend puro, simulando um backend para criar uma experiência de aplicação completa.

### Frontend

- **React:** Biblioteca principal para a construção da interface de usuário.
- **TypeScript:** Adiciona tipagem estática ao JavaScript para um desenvolvimento mais robusto.
- **Tailwind CSS:** Um framework CSS utility-first para estilização rápida e consistente.
- **Framer Motion:** Biblioteca para criar animações fluidas e complexas.
- **React Router DOM:** Para o gerenciamento de rotas no lado do cliente.
- **React Dropzone:** Utilizado no painel para o upload (simulado) de arquivos.

### Backend (Simulado)

- **React Context API:** Utilizada para criar um "banco de dados" em memória. Ele gerencia o estado global da aplicação (projetos, algoritmos, autenticação), permitindo operações de CRUD de forma interativa sem a necessidade de um servidor real. A arquitetura está pronta para ser conectada a uma API real no futuro.

---

## 🚀 Rodando o Projeto Localmente

Este projeto foi construído com módulos ES nativos e `importmap`, o que significa que ele não precisa de um processo de compilação com ferramentas como Webpack ou Vite para ser executado. Você só precisa de um servidor web local simples para servir os arquivos.

### Pré-requisitos

- Um navegador web moderno (Chrome, Firefox, Edge).
- Acesso à linha de comando (terminal).

### Passos para Executar

Como não há um arquivo `package.json` para instalar dependências com `npm install`, siga uma das opções abaixo para iniciar um servidor local.

#### Opção 1: Usando a extensão "Live Server" no VS Code (Recomendado)

1.  Instale a extensão **Live Server** da Microsoft no Visual Studio Code.
2.  Abra a pasta do projeto no VS Code.
3.  Clique com o botão direito no arquivo `index.html`.
4.  Selecione **"Open with Live Server"**. Seu navegador abrirá automaticamente com o projeto em execução.

#### Opção 2: Usando Python

Se você tiver Python instalado, pode usar seu módulo de servidor HTTP embutido.

1.  Abra seu terminal na pasta raiz do projeto.
2.  Execute o seguinte comando (para Python 3):
    ```bash
    python -m http.server
    ```
3.  Abra seu navegador e acesse `http://localhost:8000`.

#### Opção 3: Usando Node.js (com o pacote `serve`)

Se você tem Node.js e npm instalados, pode usar o pacote `serve`.

1.  Instale o `serve` globalmente (se ainda não o tiver):
    ```bash
    npm install -g serve
    ```
2.  No seu terminal, na pasta raiz do projeto, execute:
    ```bash
    serve .
    ```
3.  Abra seu navegador e acesse o endereço fornecido no terminal (geralmente `http://localhost:3000`).
