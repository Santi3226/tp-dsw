import { Router } from "express";
import {sanitizePlantillaAnalisisInput, findAll, findOne, deleteOne, add, update} from "./plantillaanalisisController.js";

const plantillaAnalisisRouter = Router();

plantillaAnalisisRouter.get('/',findAll);
plantillaAnalisisRouter.get('/:id',findOne);
plantillaAnalisisRouter.delete('/:id',deleteOne);
plantillaAnalisisRouter.post('/',sanitizePlantillaAnalisisInput,add);
plantillaAnalisisRouter.patch('/:id',sanitizePlantillaAnalisisInput,update);
plantillaAnalisisRouter.put('/:id',sanitizePlantillaAnalisisInput,update);


export {plantillaAnalisisRouter}