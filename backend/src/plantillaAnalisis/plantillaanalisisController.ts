import { NextFunction, Request, Response } from 'express';
import { PlantillaAnalisis } from './plantillaanalisisEntity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em; //EntityManager

function sanitizePlantillaAnalisisInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    hsAyuno: req.body.hsAyuno,
    preparacion: req.body.preparacion,
    tiempoPrevisto: req.body.tiempoPrevisto,
    fechaDesde: req.body.fechaDesde
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
    const plantillas = await em.find(PlantillaAnalisis, {}, { populate: ['tipoAnalisis'] });
    res.status(200).json({
      message: 'Todas las plantillas encontradas: ',
      data: plantillas,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching plantillas' });
  }
}

//Get one localidad
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const plantillas = await em.findOneOrFail(PlantillaAnalisis, { id },{ populate: ['tipoAnalisis'] }); //(Localidad, filtros)
    res.status(200).json({
      message: 'Plantilla encontrada: ',
      data: plantillas,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || 'Error fetching plantilla' });
  }
}

async function add(req: Request, res: Response) {
  try {
    const plantilla = em.create(PlantillaAnalisis, req.body.sanitizedInput);
    await em.persistAndFlush(plantilla);
    res
      .status(201)
      .json({ message: 'Plantilla creada exitosamente', data: plantilla });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating plantilla', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const plantilla = em.getReference(PlantillaAnalisis, id);
    em.assign(plantilla, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Plantilla actualizada exitosamente', data: plantilla });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating plantilla', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const plantilla = em.getReference(PlantillaAnalisis, id);
    em.remove(plantilla);
    await em.flush();
    res.status(200).json({
      message: 'Plantilla eliminada exitosamente',
      data: plantilla,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting plantilla', error: error.message });
  }
}

export { sanitizePlantillaAnalisisInput, findAll, findOne, deleteOne, add, update };
