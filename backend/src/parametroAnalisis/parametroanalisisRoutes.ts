import { Router } from 'express';
import {
  sanitizeParametroAnalisisInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
} from './parametroanalisisController.js';
import { authMiddleware } from "../shared/authMiddleware.js";
import asyncHandler from '../shared/asyncHandler.js';
const parametroAnalisisRouter = Router();

parametroAnalisisRouter.use(authMiddleware);
parametroAnalisisRouter.get('/', asyncHandler(findAll));
parametroAnalisisRouter.get('/:id', asyncHandler(findOne));
parametroAnalisisRouter.delete('/:id', asyncHandler(deleteOne));
parametroAnalisisRouter.post('/', sanitizeParametroAnalisisInput, asyncHandler(add));
parametroAnalisisRouter.patch('/:id', sanitizeParametroAnalisisInput, asyncHandler(update));
parametroAnalisisRouter.put('/:id', sanitizeParametroAnalisisInput, asyncHandler(update));

export { parametroAnalisisRouter };
