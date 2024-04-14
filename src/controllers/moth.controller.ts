import { type Request, type Response } from 'express';
import { type Moth } from '../entities/moth';
import createDebug from 'debug';
import { type MothMemoryRepository } from '../repositories/moth.memory.repo.js';

const debug = createDebug('W6E:controller:moth');

export class MothController {
  constructor(private readonly repo: MothMemoryRepository) {
    debug('Instantiated moth controller');
  }

  getAll(req: Request, res: Response) {
    const result = this.repo.readAll();
    res.json(result);
  }

  getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.readById(id);
    res.json(result);
  }

  create(req: Request, res: Response) {
    const data = req.body as Moth;
    const result = this.repo.create(data);
    res.status(201);
    res.json(result);
  }

  update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body as Moth;
    const result = this.repo.update(id, data);
    res.json(result);
  }

  delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = this.repo.delete(id);
    res.json(result);
  }
}
