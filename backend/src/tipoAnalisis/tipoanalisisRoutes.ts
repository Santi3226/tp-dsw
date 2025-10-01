import { Router } from 'express';
import {
  sanitizeTipoAnalisisInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
  vincular,
} from './tipoanalisisController.js';

const tipoAnalisisRouter = Router();

tipoAnalisisRouter.get('/', findAll);
tipoAnalisisRouter.post('/vincular/', sanitizeTipoAnalisisInput, vincular);
tipoAnalisisRouter.get('/:id', findOne);
tipoAnalisisRouter.delete('/:id', deleteOne);
tipoAnalisisRouter.post('/', sanitizeTipoAnalisisInput, add);
tipoAnalisisRouter.patch('/:id', sanitizeTipoAnalisisInput, update);
tipoAnalisisRouter.put('/:id', sanitizeTipoAnalisisInput, update);


export { tipoAnalisisRouter };
