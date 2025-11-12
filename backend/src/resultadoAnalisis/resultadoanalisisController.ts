import { NextFunction, Request, Response } from 'express';
import { ResultadoAnalisis } from './resultadoanalisisEntity.js';
import { orm } from '../shared/db/orm.js';
import { populate } from 'dotenv';
import { Turno } from '../turno/turnoEntity.js';

const em = orm.em; //EntityManager

function sanitizeResultadoAnalisisInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    valor: req.body.valor,
    parametroAnalisis: req.body.parametroAnalisis,
    tipoAnalisis: req.body.tipoAnalisis,
    turno: req.body.turno,
    estado: req.body.estado
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

// Get all localidades
async function findAll(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin' && (req as any).user?.role !== 'user') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const resultados = await em.find(ResultadoAnalisis, {}, { populate: ['parametroAnalisis', 'turno', 'turno.paciente', 'turno.centroAtencion', 'turno.tipoAnalisis'] });
    res.status(200).json({
      message: 'Todos los resultados encontrados: ',
      data: resultados,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching resultados' });
  }
}

//Get one resultado
async function findOne(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin' && (req as any).user?.role !== 'user') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const resultados = await em.findOneOrFail(ResultadoAnalisis, {
      turno: Number(req.params.turno),
      parametroAnalisis: Number(req.params.parametro),
    }, { populate: ['parametroAnalisis', 'turno', 'turno.paciente', 'turno.centroAtencion', 'turno.tipoAnalisis'] });
    res.status(200).json({
      message: 'Resultado encontrado: ',
      data: resultados,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || 'Error fetching resultado' });
  }
}

async function add(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const resultado = em.create(ResultadoAnalisis, req.body.sanitizedInput);
    em.persist(resultado);
    const turno = em.getReference(Turno, req.body.sanitizedInput.turno);
    em.assign(turno, req.body.sanitizedInput);
    await em.flush();
    res
      .status(201)
      .json({ message: 'Resultado creado exitosamente', data: resultado });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating resultado', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const resultado = await em.findOneOrFail(ResultadoAnalisis, {
      turno: Number(req.params.turno),
      parametroAnalisis: Number(req.params.parametro),
    });
    em.assign(resultado, req.body.sanitizedInput);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Resultado actualizado exitosamente', data: resultado });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating resultado', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  if ((req as any).user?.role !== 'admin') {
    return res.status(403).json({ error: 'Prohibido' });
  }
  try {
    const resultado = await em.findOneOrFail(ResultadoAnalisis, {
      turno: Number(req.params.turno),
      parametroAnalisis: Number(req.params.parametro),
    });
    em.remove(resultado);
    await em.flush();
    res.status(200).json({
      message: 'Resultado eliminado exitosamente',
      data: resultado,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting resultado', error: error.message });
  }
}

export { sanitizeResultadoAnalisisInput, findAll, findOne, deleteOne, add, update };

