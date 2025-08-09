import { NextFunction, Request, Response } from 'express';
import { Paciente } from './pacienteEntity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em; //EntityManager

function sanitizePacienteInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    fechaNacimiento: req.body.fechaNacimiento,
    telefono: req.body.telefono,
    email: req.body.email,
    direccion: req.body.direccion
    };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  // Aqui van todos los chequeos de seg y datos
  next();
}

// Get all Pacientes
async function findAll(req: Request, res: Response) {
  try {
    const pacientes = await em.find(Paciente, {}, { populate: ['turnos'] });
    res.status(200).json({
      message: 'Todos los pacientes encontrados: ',
      data: pacientes,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching pacientes' });
  }
}

//Get one paciente
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const pacientes = await em.findOneOrFail(Paciente, { id }, { populate: ['turnos'] }); //(Paciente, filtros)
    res.status(200).json({
      message: 'Paciente encontrada: ',
      data: pacientes,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || 'Error fetching paciente' });
  }
}

async function add(req: Request, res: Response) {
  try {
    const paciente = em.create(Paciente, req.body.sanitizedInput);
    await em.persistAndFlush(paciente);
    res
      .status(201)
      .json({ message: 'Paciente creada exitosamente', data: paciente });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating paciente', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const paciente = em.getReference(Paciente, id);
    em.assign(paciente, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Paciente actualizada exitosamente', data: paciente });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating paciente', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const paciente = em.getReference(Paciente, id);
    em.remove(paciente);
    await em.flush();
    res.status(200).json({
      message: 'Paciente eliminada exitosamente',
      data: paciente,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting paciente', error: error.message });
  }
}

export { sanitizePacienteInput, findAll, findOne, deleteOne, add, update };
