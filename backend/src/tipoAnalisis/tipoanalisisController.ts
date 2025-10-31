import { NextFunction, Request, Response } from 'express';
import { TipoAnalisis } from './tipoanalisisEntity.js';
import { orm } from '../shared/db/orm.js';
import { TipoAnalisisParametro } from './tipoanalisisparametroEntity.js';

const em = orm.em; //EntityManager

function sanitizeTipoAnalisisInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    importe: req.body.importe,
    plantillaAnalisis: req.body.plantillaAnalisis,
    resultadoAnalisis: req.body.resultadoAnalisis,
    tipoAnalisisParametro: req.body.tipoAnalisisParametro,
    tipoAnalisis: req.body.tipoAnalisis,
    parametroAnalisis: req.body.parametroAnalisis
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
    const tipoAnalisis = await em.find(
      TipoAnalisis,
      {},
      {
        populate: ['plantillaAnalisis'],
      }
    );
    res.status(200).json({
      message: 'Todos los tipos encontrados: ',
      data: tipoAnalisis,
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
    const tipoAnalisis = await em.findOneOrFail(
      TipoAnalisis,
      { id },
      {
        populate: ['plantillaAnalisis'],
      }
    );
    res.status(200).json({
      message: 'TipoAnalisis encontrado: ',
      data: tipoAnalisis,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching tipos' });
  }
}

async function add(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const tipoAnalisis = em.create(TipoAnalisis, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({
      message: 'TipoAnalisis creado exitosamente',
      data: tipoAnalisis,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating tipoAnalisis', error: error.message });
  }
}

async function update(req: Request, res: Response) {
    if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const id = Number.parseInt(req.params.id);
    const tipoAnalisis = em.getReference(TipoAnalisis, id);
    em.assign(tipoAnalisis, req.body);
    await em.flush();
    res.status(200).json({
      message: 'TipoAnalisis actualizado exitosamente',
      data: tipoAnalisis,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating tipoAnalisis', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const id = Number.parseInt(req.params.id);
    const tipoAnalisis = em.getReference(TipoAnalisis, id);
    await em.removeAndFlush(tipoAnalisis);
    res.status(200).json({
      message: 'TipoAnalisis eliminada exitosamente',
      data: tipoAnalisis,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting tipoAnalisis', error: error.message });
  }
}
async function vincular(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const tipoAnalisisParametro = em.create(TipoAnalisisParametro, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json({
      message: 'TipoAnalisisParametro creado exitosamente',
      data: tipoAnalisisParametro,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating tipoAnalisisParametro', error: error.message });
  }
}

export { sanitizeTipoAnalisisInput, findAll, findOne, deleteOne, add, update , vincular };
