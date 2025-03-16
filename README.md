# Repositório de Repositórios

Este é um projeto React que permite adicionar, visualizar e excluir repositórios do GitHub. O projeto usa a API do GitHub para buscar informações sobre os repositórios e exibi-los na interface.

## Funcionalidades

- Adicionar repositórios do GitHub.
- Exibir informações do repositório, como nome, proprietário e avatar.
- Excluir repositórios da lista.
- Armazenar os repositórios localmente no navegador.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces.
- **Axios**: Biblioteca para fazer requisições HTTP.
- **GitHub API**: API para buscar informações sobre repositórios do GitHub.
- **LocalStorage**: Armazenamento local de dados no navegador.

## Como Rodar o Projeto

### 1. Clonar o Repositório

Clone este repositório para o seu computador:

```bash
git clone https://github.com/SeuUsuario/repositorios.git


````


### 2.  Instalar Dependências

Dentro da pasta do projeto, instale as dependências:

```bash
npm install

````



### 3. Configurar o Token de Acesso do GitHub

Crie um token de acesso pessoal do GitHub e substitua na linha de código do arquivo src/services/api.js:

```bash
const api = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer SEU_TOKEN_AQUI`,
  },
});


````

### 4. Rodar o Projeto

Execute o projeto com o seguinte comando:

```bash
npm start

````
O aplicativo estará disponível em http://localhost:3000.

## Como Usar

- Digite o nome do repositório no formato usuario/repositorio no campo de entrada e clique no botão de adicionar.
- O repositório será listado na tela com informações como nome, proprietário e avatar.
- Você pode excluir um repositório clicando no ícone de lixeira ao lado dele.



