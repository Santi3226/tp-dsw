import { Router } from "express";
import {sanitizeLocalidadInput, findAll, findOne, deleteOne, add, update} from "./localidadController.js";

const localidadRouter = Router();

localidadRouter.get('/',findAll);
localidadRouter.get('/:codPostal',findOne);
localidadRouter.delete('/:codPostal',deleteOne);
localidadRouter.post('/',sanitizeLocalidadInput,add);
localidadRouter.patch('/:codPostal',sanitizeLocalidadInput,update);
localidadRouter.put('/:codPostal',sanitizeLocalidadInput,update);


export {localidadRouter}