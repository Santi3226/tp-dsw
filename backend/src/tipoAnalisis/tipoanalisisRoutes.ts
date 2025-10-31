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
import { authMiddleware } from "../shared/authMiddleware.js";
import asyncHandler from '../shared/asyncHandler.js';

const tipoAnalisisRouter = Router();
tipoAnalisisRouter.use(authMiddleware);
tipoAnalisisRouter.get('/', asyncHandler(findAll));
tipoAnalisisRouter.post('/vincular/', sanitizeTipoAnalisisInput, asyncHandler(vincular));
tipoAnalisisRouter.get('/:id', asyncHandler(findOne));
tipoAnalisisRouter.delete('/:id', asyncHandler(deleteOne));
tipoAnalisisRouter.post('/', sanitizeTipoAnalisisInput, asyncHandler(add));
tipoAnalisisRouter.patch('/:id', sanitizeTipoAnalisisInput, asyncHandler(update));
tipoAnalisisRouter.put('/:id', sanitizeTipoAnalisisInput, asyncHandler(update));


export { tipoAnalisisRouter };
