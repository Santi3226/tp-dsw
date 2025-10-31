import { Router } from "express";
import {sanitizePlantillaAnalisisInput, findAll, findOne, deleteOne, add, update} from "./plantillaanalisisController.js";
import { authMiddleware } from "../shared/authMiddleware.js";
import asyncHandler from '../shared/asyncHandler.js';

const plantillaAnalisisRouter = Router();

plantillaAnalisisRouter.use(authMiddleware);
plantillaAnalisisRouter.get('/', asyncHandler(findAll));
plantillaAnalisisRouter.get('/:id', asyncHandler(findOne));
plantillaAnalisisRouter.delete('/:id', asyncHandler(deleteOne));
plantillaAnalisisRouter.post('/',sanitizePlantillaAnalisisInput, asyncHandler(add));
plantillaAnalisisRouter.patch('/:id',sanitizePlantillaAnalisisInput, asyncHandler(update));
plantillaAnalisisRouter.put('/:id',sanitizePlantillaAnalisisInput, asyncHandler(update));


export {plantillaAnalisisRouter}