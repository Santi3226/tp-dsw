import { Router } from 'express';
import {
  sanitizeTurnoInput,
  findAll,
  findOne,
  deleteOne,
  findSome,
  add,
  update,
} from './turnoController.js';
import { authMiddleware } from "../shared/authMiddleware.js";
import asyncHandler from '../shared/asyncHandler.js';

import multer from 'multer';
const upload = multer({ dest: 'public/uploads/' });
const turnoRouter = Router();
turnoRouter.use(authMiddleware);
turnoRouter.get('/', asyncHandler(findAll));
turnoRouter.get('/filter', asyncHandler(findSome));
turnoRouter.get('/:id', asyncHandler(findOne));
turnoRouter.delete('/:id', asyncHandler(deleteOne));
turnoRouter.post('/', upload.single('receta'), asyncHandler(add));
turnoRouter.patch('/:id', sanitizeTurnoInput, asyncHandler(update));
turnoRouter.put('/:id', sanitizeTurnoInput, asyncHandler(update));

export { turnoRouter };
