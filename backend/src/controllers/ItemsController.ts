import { Request, Response } from 'express'; // Tipos do express
import db from '../database/Connection'; // Conexão com o banco de dados

// Métodos das rotas de /items
class ItemsController {
  // Listar todos os items
  async index(req: Request, res: Response) {
    // Buscar na tabela items do banco de dados todos os dados
    const items = await db('items').select('*');

    // Adicionar campo url em todos os items
    const serializedItems = items.map(item => {
      return {
        ...item,
        id: item.id,
        image_url: `http://localhost:3333/files/${item.image}`,
      }
    });

    return res.json(serializedItems); // Retornar todos os dados
  };
};

export default ItemsController;