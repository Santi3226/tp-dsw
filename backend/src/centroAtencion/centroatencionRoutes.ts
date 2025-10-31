import { Router } from 'express';
import {
  sanitizeCentroAtencionInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
} from './centroatencionController.js';
import { authMiddleware } from '../shared/authMiddleware.js';
import asyncHandler from '../shared/asyncHandler.js';

const centroAtencionRouter = Router();

centroAtencionRouter.get('/', asyncHandler(findAll));
centroAtencionRouter.get('/:id', asyncHandler(findOne));
centroAtencionRouter.delete('/:id',authMiddleware, asyncHandler(deleteOne));
centroAtencionRouter.post('/',authMiddleware, sanitizeCentroAtencionInput, asyncHandler(add));
centroAtencionRouter.patch('/:id', authMiddleware,sanitizeCentroAtencionInput, asyncHandler(update));
centroAtencionRouter.put('/:id',authMiddleware, sanitizeCentroAtencionInput, asyncHandler(update));

export { centroAtencionRouter };
