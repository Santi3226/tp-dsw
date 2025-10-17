import { Router } from "express";
import {sanitizePacienteInput, findAll, findOne, deleteOne, add, update, findSome} from "./pacienteController.js";
import { authMiddleware } from "../shared/authMiddleware.js";
import asyncHandler from '../shared/asyncHandler.js';
const pacienteRouter = Router();

pacienteRouter.use(authMiddleware);
pacienteRouter.get('/', asyncHandler(findAll));
pacienteRouter.get('/filter', asyncHandler(findSome));
pacienteRouter.get('/:id', asyncHandler(findOne));
pacienteRouter.delete('/:id', asyncHandler(deleteOne));
pacienteRouter.post('/',sanitizePacienteInput, asyncHandler(add));
pacienteRouter.patch('/:id',sanitizePacienteInput, asyncHandler(update));
pacienteRouter.put('/:id',sanitizePacienteInput, asyncHandler(update));


export {pacienteRouter}