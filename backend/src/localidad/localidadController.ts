import { NextFunction, Request, Response } from 'express';
import { Localidad } from './localidadEntity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em; //EntityManager

function sanitizeLocalidadInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    denominacion: req.body.denominacion,
    codPostal: req.body.codPostal,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key]; //Si falta algun campo lo deja como estaba
  });
  // Aqui van todos los chequeos de seg y datos
  next();
}

// Get all localidades
async function findAll(req: Request, res: Response) {
  try {
    const localidades = await em.find(Localidad, {}, { populate: ['centros'] });
    res.status(200).json({
      message: 'Todas las localidades encontradas: ',
      data: localidades,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching localidades' });
  }
}

//Get one localidad
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const localidades = await em.findOneOrFail(Localidad, { id },{ populate: ['centros'] }); //(Localidad, filtros)
    res.status(200).json({
      message: 'Localidad encontrada: ',
      data: localidades,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || 'Error fetching localidad' });
  }
}

async function add(req: Request, res: Response) {
  try {
    const localidad = em.create(Localidad, req.body.sanitizedInput);
    await em.persistAndFlush(localidad);
    res
      .status(201)
      .json({ message: 'Localidad creada exitosamente', data: localidad });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating localidad', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const localidad = em.getReference(Localidad, id);
    em.assign(localidad, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Localidad actualizada exitosamente', data: localidad });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating localidad', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const localidad = em.getReference(Localidad, id);
    em.remove(localidad);
    await em.flush();
    res.status(200).json({
      message: 'Localidad eliminada exitosamente',
      data: localidad,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting localidad', error: error.message });
  }
}

export { sanitizeLocalidadInput, findAll, findOne, deleteOne, add, update };
