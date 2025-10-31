import { Router } from "express";
import {sanitizeResultadoAnalisisInput, findAll, findOne, deleteOne, add, update} from "./resultadoanalisisController.js";
import { authMiddleware } from "../shared/authMiddleware.js";
import asyncHandler from '../shared/asyncHandler.js';
const resultadoAnalisisRouter = Router();

resultadoAnalisisRouter.use(authMiddleware);
resultadoAnalisisRouter.get('/', asyncHandler(findAll));
resultadoAnalisisRouter.get('/:id', asyncHandler(findOne));
resultadoAnalisisRouter.delete('/:id', asyncHandler(deleteOne));
resultadoAnalisisRouter.post('/',sanitizeResultadoAnalisisInput, asyncHandler(add));
resultadoAnalisisRouter.patch('/:id',sanitizeResultadoAnalisisInput, asyncHandler(update));
resultadoAnalisisRouter.put('/:id',sanitizeResultadoAnalisisInput, asyncHandler(update));


export {resultadoAnalisisRouter}