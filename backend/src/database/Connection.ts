import knex from 'knex';
import path from 'path';

// Conecxão com o banco de dados
const connection = knex({
  client: 'sqlite3', // Tipo de banco de dados
  connection: {
    // Diretório do arquivo
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export default connection;