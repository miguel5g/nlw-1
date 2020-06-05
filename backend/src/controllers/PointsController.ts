import { Request, Response } from 'express'; // Tipos do express
import db from '../database/Connection'; // Conexão com o banco de dados

// Metódos da rota /points
class PointsController {
  // Método que lista todos os pontos de acordo com os filtros
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query; // Pegar os filtros passados

    // Transformar items em Array
    const parsedItems = String(items)
      .split(',')
      .map(item => Number(item.trim()));

    /* OBS: trim() remove todos os espaços antes/depois da string */

    // Procurar no banco de dados de acordo com os filtros
    const points = await db('points')
      .join('points_items', 'points.id', '=', 'points_items.point_id')
      .whereIn('points_items.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('points.*');

    // Retornar os resultados
    return res.json(points);
  }

  // Método que lista apenas 1 ponto de acordo com id
  async show(req: Request, res: Response) {
    const { id } = req.params; // Pegar o id dos parms

    // Pesquisar no banco de dados o id e pegar apenas o primeiro resultado
    const point = await db('points').where('id', id).first();

    // Verificar se tem algum resultado, se não retornar erro
    if (!point) return res.status(404).json({ error: 'Point not found' });

    // Buscar items que aquele ponto pode receber
    const items = await db('items')
      .join('points_items', 'items.id', '=', 'points_items.item_id')
      .where('points_items.point_id', id)
      .select('items.title');

    return res.json({ ...point, items }); // Retornar resultados
  }

  // Método que cria um ponto de coleta
  async create(req: Request, res: Response) {
    // Pegar dados passados pelo usuário
    const {
      /* image, */
      name,
      email,
      whatsapp,
      items,
      city,
      uf,
      latitude,
      longitude
    } = req.body;

    const trx = await db.transaction(); // Criar uma transaction

    // Dados do ponto que será criado
    const point = {
      image: 'https://media-cdn.tripadvisor.com/media/photo-s/15/d3/c2/93/popular-market.jpg',
      name,
      email,
      whatsapp,
      city,
      uf,
      latitude,
      longitude
    };

    // Inserir ponto no banco de dados
    const insertedIds = await trx('points').insert(point);
    const point_id = insertedIds[0]; // Pegar o id dele

    // Criar um array com os items e id do ponto de coleta
    const pointItems = items.map((item_id: number) => {
      return {
        point_id,
        item_id,
      }
    });

    // Adicionar items e id do ponto de coleta em uma tabela de relacionamento
    await trx('points_items').insert(pointItems);

    await trx.commit(); // Encerrar a transiction

    return res.json({ id: point_id, ...point }); // Retornar dados criados
  }
}

export default PointsController;