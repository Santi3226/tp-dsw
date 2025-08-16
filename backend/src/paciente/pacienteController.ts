import { NextFunction, Request, Response } from 'express';
import { Paciente } from './pacienteEntity.js';
import { orm } from '../shared/db/orm.js';
import { FilterQuery } from '@mikro-orm/core';

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

async function findSome(req: Request, res: Response) {
  try {
    const filtros: FilterQuery<Paciente> = {};

    if (req.query.nombre) {
      filtros.nombre = {$like: `%${req.query.nombre as string}%`};
    } 
    if (req.query.dni) {
      filtros.dni = req.query.dni as string;
    }
    if (req.query.edad) {
      const edad = Number(req.query.edad);
      const hoy = new Date();
      
      const fechaNacimientoInicio = new Date(hoy.getFullYear() - (edad + 1), hoy.getMonth(), hoy.getDate() + 1);
      const fechaNacimientoFin = new Date(hoy.getFullYear() - edad, hoy.getMonth(), hoy.getDate()); 

      if (!isNaN(fechaNacimientoInicio.getTime()) && !isNaN(fechaNacimientoFin.getTime())) {
          filtros.fechaNacimiento = { $gte: fechaNacimientoInicio, $lte: fechaNacimientoFin };
      }
    }
    const pacientes = await em.find(Paciente, filtros, { populate: ['turnos'] }); 
    
    res.status(200).json({
      message: 'Pacientes encontrados',
      data: pacientes,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Error fetching paciente',
      error: error.toString()
    });
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

export { sanitizePacienteInput, findAll, findOne, deleteOne, add, update, findSome };
