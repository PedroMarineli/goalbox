# Guia de Setup do Banco de Dados com Prisma

Este guia irá ajudá-lo a configurar um banco de dados PostgreSQL e a conectar sua aplicação Next.js a ele usando o Prisma. Você pode escolher entre usar Docker (recomendado para simplicidade) ou uma instalação local.

---

## Opção 1 (Recomendada): Setup com Docker

A maneira mais fácil de ter um ambiente de banco de dados consistente e isolado.

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado e em execução na sua máquina.

### Passo 1: Subir o Banco de Dados com Docker

1.  **Crie um arquivo `docker-compose.yml`** na raiz do seu projeto com o seguinte conteúdo:

    ```yaml
    version: '3.8'
    services:
      postgres:
        image: postgres:13
        container_name: goalbox-db
        restart: always
        ports:
          - "5432:5432"
        environment:
          POSTGRES_USER: docker
          POSTGRES_PASSWORD: docker
          POSTGRES_DB: goalbox
        volumes:
          - postgres_data:/var/lib/postgresql/data

    volumes:
      postgres_data:
    ```

2.  **Inicie o container Docker:** Abra um terminal na raiz do projeto e execute:

    ```bash
    docker-compose up -d
    ```
    Seu banco de dados estará rodando em `localhost:5432`.

3.  **Pule para o Passo de Configuração do Prisma.**

---

## Opção 2: Setup com Instalação Local do PostgreSQL

Use esta opção se preferir instalar o PostgreSQL diretamente no seu sistema operacional.

### Passo 1: Instalar o PostgreSQL

-   **Linux (Debian/Ubuntu):**
    ```bash
    sudo apt update
    sudo apt install postgresql postgresql-contrib
    ```
-   **macOS (usando [Homebrew](https://brew.sh/)):**
    ```bash
    brew install postgresql
    brew services start postgresql
    ```
-   **Windows:**
    Baixe o instalador oficial no [site do PostgreSQL](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads). Durante a instalação, anote a senha que você definir para o superusuário `postgres`.

### Passo 2: Criar o Usuário e o Banco de Dados

1.  **Abra o terminal do PostgreSQL (psql):**
    -   No Linux/macOS: `sudo -u postgres psql`
    -   No Windows: Procure por "SQL Shell (psql)" no menu Iniciar.

2.  **Execute os seguintes comandos SQL.** Substitua `'sua_senha_segura'` por uma senha de sua escolha.

    ```sql
    -- Crie um novo usuário (role) para a sua aplicação
    CREATE ROLE goalbox_user WITH LOGIN PASSWORD 'sua_senha_segura';

    -- Crie o banco de dados
    CREATE DATABASE goalbox;

    -- Dê ao seu novo usuário a propriedade do banco de dados
    ALTER DATABASE goalbox OWNER TO goalbox_user;

    -- (Opcional, mas recomendado) Dê todos os privilégios ao usuário no banco de dados
    GRANT ALL PRIVILEGES ON DATABASE goalbox TO goalbox_user;
    ```

3.  **Saia do psql:** Digite `\q` e pressione Enter.

---

## Configuração do Prisma (Comum a ambas as opções)

### Passo 1: Configurar Variável de Ambiente

O Prisma precisa saber como se conectar ao seu banco de dados.

1.  **Abra o arquivo `.env`** na raiz do projeto.
2.  **Ajuste a `DATABASE_URL`** de acordo com a sua instalação:

    -   **Se usou Docker:**
        ```
        DATABASE_URL="postgresql://docker:docker@localhost:5432/goalbox?schema=public"
        ```
    -   **Se usou Instalação Local:** (Substitua `goalbox_user` e `sua_senha_segura` se usou nomes diferentes)
        ```
        DATABASE_URL="postgresql://goalbox_user:sua_senha_segura@localhost:5432/goalbox?schema=public"
        ```

### Passo 2: Aplicar as Migrações do Prisma

Este comando cria as tabelas no seu banco de dados.

```bash
npm run prisma:migrate
```
O Prisma pedirá um nome para a migração. Você pode digitar algo como "initial_setup" e pressionar Enter.

### Passo 3: Popular o Banco de Dados (Seed)

Com as tabelas vazias, vamos inserir os dados iniciais dos produtos.

```bash
npm run prisma:seed
```

## Iniciar a Aplicação

Tudo pronto! Agora você pode iniciar sua aplicação Next.js.

```bash
npm run dev
```

Acesse `http://localhost:3000/products` e você deverá ver a lista de chuteiras vinda do seu banco de dados PostgreSQL!

## Comandos Úteis do Prisma

-   **Abrir o Prisma Studio:** Uma interface gráfica para visualizar e editar seus dados.
    ```bash
    npm run prisma:studio
    ```
-   **Gerar o Prisma Client:** Útil se você fizer alterações no `schema.prisma`.
    ```bash
    npm run prisma:generate
    ```
