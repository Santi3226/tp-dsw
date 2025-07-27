import { Router } from "express";
import {sanitizePacienteInput, findAll, findOne, deleteOne, add, update} from "./pacienteController.js";

const pacienteRouter = Router();

pacienteRouter.get('/',findAll);
pacienteRouter.get('/:id',findOne);
pacienteRouter.delete('/:id',deleteOne);
pacienteRouter.post('/',sanitizePacienteInput,add);
pacienteRouter.patch('/:id',sanitizePacienteInput,update);
pacienteRouter.put('/:id',sanitizePacienteInput,update);


export {pacienteRouter}