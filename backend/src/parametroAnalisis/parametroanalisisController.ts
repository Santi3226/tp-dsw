import { NextFunction, Request, Response } from 'express';
import { ParametroAnalisis } from './parametroanalisisEntity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em; //EntityManager

function sanitizeParametroAnalisisInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    referencia: req.body.referencia,
    unidad: req.body.unidad,
    resultadoAnalisis: req.body.resultadoAnalisis
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key]; //Si falta algun campo lo deja como estaba
  });
  // Aqui van todos los chequeos de seg y datos
  next();
}

// Get all centros de atencion
async function findAll(req: Request, res: Response) {
   if ((req as any).user?.role !== 'admin' && (req as any).user?.role !== 'user') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const parametroAnalisis = await em.find(
      ParametroAnalisis,
      {},
      {
        populate: ['resultadoAnalisis'],
      }
    );
    res.status(200).json({
      message: 'Todos los parametros encontrados: ',
      data: parametroAnalisis,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching tipos' });
  }
}

//Get one centro de atencion
async function findOne(req: Request, res: Response) {
   if ((req as any).user?.role !== 'admin' && (req as any).user?.role !== 'user') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const id = Number.parseInt(req.params.id);
    const parametroAnalisis = await em.findOneOrFail(
      ParametroAnalisis,
      { id },
      {
        populate: ['resultadoAnalisis'],
      }
    );
    res.status(200).json({
      message: 'ParametroAnalisis encontrado: ',
      data: parametroAnalisis,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching parametros' });
  }
}

async function add(req: Request, res: Response) {
   if ((req as any).user?.role !== 'admin' ) {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const parametroAnalisis = em.create(ParametroAnalisis, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({
      message: 'ParametroAnalisis creado exitosamente',
      data: parametroAnalisis,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating parametroAnalisis', error: error.message });
  }
}

async function update(req: Request, res: Response) {
   if ((req as any).user?.role !== 'admin' ) {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const id = Number.parseInt(req.params.id);
    const parametroAnalisis = em.getReference(ParametroAnalisis, id);
    em.assign(parametroAnalisis, req.body);
    await em.flush();
    res.status(200).json({
      message: 'ParametroAnalisis actualizado exitosamente',
      data: parametroAnalisis,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating parametroAnalisis', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
   if ((req as any).user?.role !== 'admin' ) {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const id = Number.parseInt(req.params.id);
    const parametroAnalisis = em.getReference(ParametroAnalisis, id);
    await em.removeAndFlush(parametroAnalisis);
    res.status(200).json({
      message: 'ParametroAnalisis eliminada exitosamente',
      data: parametroAnalisis,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting parametroAnalisis', error: error.message });
  }
}

export { sanitizeParametroAnalisisInput, findAll, findOne, deleteOne, add, update };
