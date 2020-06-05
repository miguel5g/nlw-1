import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import path from 'path';

config(); // Carregar variavéis ambiente

// Importar rotas de um arquivo de rotas separado
import Routes from './Routes';

const app = express(); // Criar app

const port = process.env.port || 3333; // Porta que o servidor vai utilizar

// Configurações do servidor
app.use(cors());
app.use(express.json());
app.use(Routes);
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// Iniciar o servidor na porta escolhida
app.listen(port, () => console.log(`Server listening on ${port}`));
