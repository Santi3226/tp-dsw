import { Router } from "express";
import {sanitizePoliticaInput, findAll, findOne, deleteOne, add, update} from "./politicaController.js";

const politicaRouter = Router();

politicaRouter.get('/',findAll);
politicaRouter.get('/:id',findOne);
politicaRouter.delete('/:id',deleteOne);
politicaRouter.post('/',sanitizePoliticaInput,add);
politicaRouter.patch('/:id',sanitizePoliticaInput,update);
politicaRouter.put('/:id',sanitizePoliticaInput,update);


export {politicaRouter}