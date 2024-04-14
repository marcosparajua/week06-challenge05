import { Router as router } from 'express';
import { MothController } from '../controllers/moth.controller.js';
import createDebug from 'debug';
import { MothMemoryRepository } from '../repositories/moth.memory.repo.js';

const debug = createDebug('W6E:router:moth');
debug('Starting moth router');
export const mothRouter = router();
const mothRepo = new MothMemoryRepository();
const mothController = new MothController(mothRepo);

mothRouter.get('/', mothController.getAll.bind(mothController));
mothRouter.get('/:id', mothController.getById.bind(mothController));
mothRouter.post('/', mothController.create.bind(mothController));
mothRouter.patch('/:id', mothController.update.bind(mothController));
mothRouter.delete('/:id', mothController.delete.bind(mothController));
