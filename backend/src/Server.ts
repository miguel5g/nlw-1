import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config(); // Usar .env

// import Routes from './Routes';

const app = express();
const port = process.env.port || 3333;

// Configurações do servidor
app.use(cors());
// app.use(Routes);

app.listen(port);
