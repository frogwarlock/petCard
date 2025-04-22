# PetCard

Uma carteirinha digital para o seu animal de estimação, onde você gerencia **pets**, **vacinas** e **consultas**.

---

## 📂 Estrutura do Projeto

```
PetCard/
├── backend/                # API em Node.js + Express
│   ├── Controllers/        # Lógica dos endpoints
│   ├── Routes/             # Definição das rotas RESTful
│   ├── uploads/            # Imagens enviadas (pets)
│   ├── db.js               # Conexão MySQL via dotenv
│   ├── .env.example        # Exemplo de variáveis de ambiente
│   ├── petcare.sql         # Dump de estrutura e dados iniciais
│   ├── index.js            # Inicialização do servidor
│   └── package.json        # Dependências e scripts do backend
└── frontend/               # SPA em React + Tailwind
    └── trab1/
        ├── public/         # index.html e assets estáticos
        ├── src/            # Código-fonte React
        │   ├── components/ # Header, Footer, Cards…
        │   ├── pages/      # Home, PetDetails, NewPet…
        │   └── services/   # petService, vacinaService, consultaService
        ├── tailwind.config.js
        ├── postcss.config.js
        └── package.json    # Dependências e scripts do frontend
```

---

## 🚀 Funcionalidades Principais

- **CRUD completo de Pets**
  - Cadastrar novo pet (com upload de foto)
  - Listar todos os pets em cards
  - Editar e excluir um pet diretamente na lista

- **Gestão de Vacinas**
  - Adicionar, editar e remover vacinas para cada pet
  - Validação de campos obrigatórios 

- **Gestão de Consultas**
  - Adicionar, editar e remover consultas para cada pet
  - Campos de motivo e observações

- **Upload de Imagens**
  - Fotos de pets enviadas via formulário e armazenadas em `backend/uploads`
  - Exclusão automática da imagem antiga ao atualizar

- **Interface Responsiva**
  - React + Tailwind CSS
  - Navegação com React Router

- **Validações & Tratamento de Erros**
  - Frontend: alertas e bloqueio de envio se campos obrigatórios estiverem vazios
  - Backend: checagem de `req.body`, retorno de status 400 e mensagens de erro

---

## 💻 Tecnologias Utilizadas

- **Frontend**
  - React 
  - Tailwind CSS
  - React Router
  - Axios

- **Backend**
  - Node.js + Express
  - MySQL (via `mysql2/promise`)
  - Multer (upload de imagens)
  - CORS
  - dotenv

---

## 🔧 Pré‑requisitos

- Node.js 
- npm
- MySQL instalado e em execução

---

## 📦 Setup e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/frogwarlock/petCard.git
cd petCard
```

### 2. Configurar o Banco de Dados
1. Crie um banco MySQL chamado `petcare` (ou outro nome à sua escolha).
2. Importe os arquivos relacionados ao petcare com **Server > Data Import** do MySQL
3. No diretório `backend/`, crie um arquivo `.env` baseado em `.env.example`:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=sua_senha
   DB_NAME=petcare
   PORT=4000
   ```

### 3. Rodar o Backend
```bash
cd backend
npm install
npm run dev
```
O servidor estará em `http://localhost:4000`.

### 4. Rodar o Frontend
```bash
cd frontend/trab1
npm install
npm start
```
O aplicativo abrirá em `http://localhost:3000`.

---

## 📝 Observações

- A pasta `backend/uploads/` contém imagens de exemplo dos pets; ela **não** está ignorada para que as fotos apareçam após o clone.
- Ajuste as credenciais do MySQL no `.env` conforme seu ambiente local.


---

## 🎥 Vídeo de Apresentação

> [Link para o vídeo de demonstração](https://youtu.be/u8stZmOgiz0) Deixar vídeo em 1.5x

---

## Autor

Isabella Lucena Conceição

Projeto individual para disciplina de Experiência Criativa, Trabalho 1 – 5º período

