import { Router } from 'express';
import {
  sanitizeUsuarioInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
} from './usuarioController.js';

const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', findOne);
usuarioRouter.delete('/:id', deleteOne);
usuarioRouter.post('/', sanitizeUsuarioInput, add);
usuarioRouter.patch('/:id', sanitizeUsuarioInput, update);
usuarioRouter.put('/:id', sanitizeUsuarioInput, update);

export { usuarioRouter };
