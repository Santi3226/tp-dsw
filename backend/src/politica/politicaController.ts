import { NextFunction, Request, Response } from 'express';
import { Politica } from './politicaEntity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em; //EntityManager

function sanitizePoliticaInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    diaHabilitacionTurnos: req.body.diaHabilitacionTurnos,
    horaInicioTurnos: req.body.horaInicioTurnos,
    horaFinTurnos: req.body.horaFinTurnos
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
    const politicas = await em.find(Politica, {});
    res.status(200).json({
      message: 'Todas las politicas encontradas: ',
      data: politicas,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching politicas' });
  }
}

//Get one politica
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const politicas = await em.findOneOrFail(Politica, { id });
    res.status(200).json({
      message: 'Politica encontrada: ',
      data: politicas,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || 'Error fetching politica' });
  }
}

async function add(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin' ) {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const politica = em.create(Politica, req.body.sanitizedInput);
    await em.persistAndFlush(politica);
    res
      .status(201)
      .json({ message: 'Politica creada exitosamente', data: politica });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating politica', error: error.message });
  }
}

async function update(req: Request, res: Response) {
   if ((req as any).user?.role !== 'admin' ) {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const id = Number.parseInt(req.params.id);
    const politica = em.getReference(Politica, id);
    em.assign(politica, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Politica actualizada exitosamente', data: politica });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating politica', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
   if ((req as any).user?.role !== 'admin' ) {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const id = Number.parseInt(req.params.id);
    const politica = em.getReference(Politica, id);
    em.remove(politica);
    await em.flush();
    res.status(200).json({
      message: 'Politica eliminada exitosamente',
      data: politica,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting politica', error: error.message });
  }
}

export { sanitizePoliticaInput, findAll, findOne, deleteOne, add, update };
