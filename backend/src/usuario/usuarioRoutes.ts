import { Router } from 'express';
import {
  sanitizeUsuarioInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
  login,
} from './usuarioController.js';
import { authMiddleware } from '../shared/authMiddleware.js';
import asyncHandler from '../shared/asyncHandler.js';

const usuarioRouter = Router();

// public routes
usuarioRouter.post('/', sanitizeUsuarioInput, asyncHandler(add));
usuarioRouter.post('/login', sanitizeUsuarioInput, asyncHandler(login));

// protect remaining routes
usuarioRouter.use(authMiddleware);

usuarioRouter.get('/', asyncHandler(findAll));
usuarioRouter.get('/:id', asyncHandler(findOne));
usuarioRouter.delete('/:id', asyncHandler(deleteOne));
usuarioRouter.patch('/:id', sanitizeUsuarioInput, asyncHandler(update));
usuarioRouter.put('/:id', sanitizeUsuarioInput, asyncHandler(update));

export { usuarioRouter };
