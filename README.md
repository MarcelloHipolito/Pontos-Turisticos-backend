
# API de Pontos Turísticos - Backend Node.js

Este projeto é uma API RESTful desenvolvida em Node.js com Express e MongoDB para gerenciar pontos turísticos. A API permite criar, listar e atualizar pontos com informações como nome, descrição, localização e uma foto.

## Funcionalidades

- 📥 **Cadastro de pontos turísticos** com:
  - Nome
  - Descrição
  - Localização
  - Upload de foto
- 📄 **Listagem de todos os pontos cadastrados**
- 🖼️ **Atualização da foto** de um ponto existente
- ✅ **Endpoint de status** para verificar se a API e o banco estão funcionando

## Tecnologias utilizadas

- Node.js
- Express
- MongoDB com Mongoose
- Multer para upload de imagens
- dotenv para variáveis de ambiente
- CORS
- Servir arquivos estáticos (imagens)

## Endpoints principais

| Método | Rota                       | Descrição                        |
|--------|-----------------------------|-----------------------------------|
| GET    | `/api/pontos`               | Lista todos os pontos            |
| POST   | `/api/pontos`               | Cria um novo ponto (com foto)    |
| PUT    | `/api/pontos/:id/foto`      | Atualiza a foto de um ponto      |
| GET    | `/api/status`               | Verifica status da API e banco   |
| GET    | `/uploads/:nome-da-imagem`  | Acessa as imagens salvas         |

## Instalação e execução

### Pré-requisitos

- Node.js instalado
- MongoDB local ou em nuvem (MongoDB Atlas)

### Passos

1. Clone este repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ponto-turistico
   FRONTEND_URL=http://<seu-ip>:<porta-do-frontend> # opcional para controle de CORS
   ```
4. Inicie o servidor:
   ```
   node index.js
   ```
5. A API estará rodando em `http://localhost:5000`

## Estrutura de pastas

```
├── controllers/
│   └── pontosController.js
├── models/
│   └── PontoTuristico.js
├── public/
│   └── uploads/ (fotos salvas)
├── routes/
│   └── pontosRoutes.js
├── .env
├── index.js
```

## Observações

- A pasta `/public/uploads` é criada automaticamente se não existir.
- As imagens ficam disponíveis publicamente via URL.
- O CORS permite conexões do frontend, que deve ser configurado corretamente no `.env`.


