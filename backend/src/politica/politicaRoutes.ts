import { Router } from "express";
import {sanitizePoliticaInput, findAll, findOne, deleteOne, add, update} from "./politicaController.js";
import { authMiddleware } from "../shared/authMiddleware.js";
import asyncHandler from '../shared/asyncHandler.js';
const politicaRouter = Router();

politicaRouter.get('/', asyncHandler(findAll));
politicaRouter.get('/:id', asyncHandler(findOne));

politicaRouter.use(authMiddleware);
politicaRouter.delete('/:id',asyncHandler(deleteOne));
politicaRouter.post('/',sanitizePoliticaInput, asyncHandler(add));
politicaRouter.patch('/:id',sanitizePoliticaInput, asyncHandler(update));
politicaRouter.put('/:id',sanitizePoliticaInput, asyncHandler(update));


export {politicaRouter}