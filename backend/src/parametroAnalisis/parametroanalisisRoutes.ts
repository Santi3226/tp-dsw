import { Router } from 'express';
import {
  sanitizeParametroAnalisisInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
} from './parametroanalisisController.js';

const parametroAnalisisRouter = Router();

parametroAnalisisRouter.get('/', findAll);
parametroAnalisisRouter.get('/:id', findOne);
parametroAnalisisRouter.delete('/:id', deleteOne);
parametroAnalisisRouter.post('/', sanitizeParametroAnalisisInput, add);
parametroAnalisisRouter.patch('/:id', sanitizeParametroAnalisisInput, update);
parametroAnalisisRouter.put('/:id', sanitizeParametroAnalisisInput, update);

export { parametroAnalisisRouter };
