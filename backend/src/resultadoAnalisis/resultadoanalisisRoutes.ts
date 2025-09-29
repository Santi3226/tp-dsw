import { Router } from "express";
import {sanitizeResultadoAnalisisInput, findAll, findOne, deleteOne, add, update} from "./resultadoanalisisController.js";

const resultadoAnalisisRouter = Router();

resultadoAnalisisRouter.get('/',findAll);
resultadoAnalisisRouter.get('/:id',findOne);
resultadoAnalisisRouter.delete('/:id',deleteOne);
resultadoAnalisisRouter.post('/',sanitizeResultadoAnalisisInput,add);
resultadoAnalisisRouter.patch('/:id',sanitizeResultadoAnalisisInput,update);
resultadoAnalisisRouter.put('/:id',sanitizeResultadoAnalisisInput,update);


export {resultadoAnalisisRouter}