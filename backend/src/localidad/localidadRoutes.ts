import { Router } from "express";
import {sanitizeLocalidadInput, findAll, findOne, deleteOne, add, update} from "./localidadController.js";

const localidadRouter = Router();

localidadRouter.get('/',findAll);
localidadRouter.get('/:id',findOne);
localidadRouter.delete('/:id',deleteOne);
localidadRouter.post('/',sanitizeLocalidadInput,add);
localidadRouter.patch('/:id',sanitizeLocalidadInput,update);
localidadRouter.put('/:id',sanitizeLocalidadInput,update);


export {localidadRouter}