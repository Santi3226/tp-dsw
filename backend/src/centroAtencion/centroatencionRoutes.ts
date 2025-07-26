import { Router } from 'express';
import {
  sanitizeCentroAtencionInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
} from './centroatencionController.js';

const centroAtencionRouter = Router();

centroAtencionRouter.get('/', findAll);
centroAtencionRouter.get('/:id', findOne);
centroAtencionRouter.delete('/:id', deleteOne);
centroAtencionRouter.post('/', sanitizeCentroAtencionInput, add);
centroAtencionRouter.patch('/:id', sanitizeCentroAtencionInput, update);
centroAtencionRouter.put('/:id', sanitizeCentroAtencionInput, update);

export { centroAtencionRouter };
