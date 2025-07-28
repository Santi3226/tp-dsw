import { Router } from 'express';
import {
  sanitizeTurnoInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
} from './turnoController.js';

const turnoRouter = Router();

turnoRouter.get('/', findAll);
turnoRouter.get('/:id', findOne);
turnoRouter.delete('/:id', deleteOne);
turnoRouter.post('/', sanitizeTurnoInput, add);
turnoRouter.patch('/:id', sanitizeTurnoInput, update);
turnoRouter.put('/:id', sanitizeTurnoInput, update);

export { turnoRouter };
