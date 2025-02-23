# Cliente Plus - Sistema de Gerenciamento de Clientes e Usuários

## 📋 Descrição

Sistema de gerenciamento de clientes e usuários desenvolvido com Laravel no backend e React no frontend, permitindo cadastro de usuários e gerenciamento de clientes.

## 🚀 Pré-requisitos

-   PHP (versão 8.2 ou superior)
-   Composer
-   Node.js (versão 19.0 ou superior)
-   MySQL
-   XAMPP (opcional, para ambiente de desenvolvimento)

## 💻 Instalação

### Backend (Laravel)

1. Clone o repositório:
    ```bash
    git clone https://github.com/orsanor/cliente-plus
    cd cliente-plus
    ```
2. Instale as dependências do PHP:
    ```bash
    composer install
    ```
3. Configure o ambiente:
    ```bash
    cp .env.example .env
    ```
4. Configure o banco de dados no arquivo `.env`:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=clientes_plus
    DB_USERNAME=root
    DB_PASSWORD=
    ```

5. Gere a chave da aplicação:
    ```bash
    php artisan key:generate
    ```
6. Execute as migrations:
    ```bash
    php artisan migrate
    ```
7. Inicie o servidor:
    ```bash
    php artisan serve
    ```

### Frontend (React)

1. Acesse a pasta do frontend:
    ```bash
    cd ../cliente-plus-frontend
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Configure o ambiente do frontend:
    ```bash
    cp .env.example .env
    ```
4. Configure a URL da API no arquivo `.env`:
    ```env
    VITE_API_URL=http://localhost:8000
    ```
5. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## 🌐 Acessando o Sistema

-   **Backend**: [http://localhost:8000](http://localhost:8000)
-   **Frontend**: [http://localhost:5173](http://localhost:5173)

## 🛠️ Tecnologias Utilizadas

### Backend:

-   Laravel 11
-   PHP 8.2
-   Laravel Sanctum (autenticação)
-   MySQL

### Frontend:

-   React 19
-   Vite
-   TailwindCSS
-   React Router DOM
-   Axios
-   Mui
-   Toast
-   ViaCep

## 🔐 Funcionalidades

-   Autenticação de usuários
-   Cadastro de novos usuários
-   Gerenciamento de clientes (CRUD)
-   Interface responsiva
-   Proteção de rotas
