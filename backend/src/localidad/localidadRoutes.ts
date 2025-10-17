import { Router } from "express";
import {sanitizeLocalidadInput, findAll, findOne, deleteOne, add, update} from "./localidadController.js";
import { authMiddleware } from '../shared/authMiddleware.js';
import asyncHandler from '../shared/asyncHandler.js';

const localidadRouter = Router();

localidadRouter.get('/', asyncHandler(findAll));
localidadRouter.get('/:id', asyncHandler(findOne));
localidadRouter.delete('/:id',authMiddleware, asyncHandler(deleteOne));
localidadRouter.post('/',authMiddleware,sanitizeLocalidadInput, asyncHandler(add));
localidadRouter.patch('/:id',authMiddleware,sanitizeLocalidadInput, asyncHandler(update));
localidadRouter.put('/:id',authMiddleware,sanitizeLocalidadInput, asyncHandler(update));


export {localidadRouter}