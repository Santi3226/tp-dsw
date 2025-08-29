/*import { NextFunction, Request, Response } from 'express';
import { ResultadoAnalisis } from './resultadoanalisisEntity.js';
import { orm } from '../shared/db/orm.js';

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
    const resultados = await em.find(ResultadoAnalisis, {});
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
  try {
    // Para buscar un resultado por su clave compuesta, pasamos un objeto
    // con los valores de las claves.
    const resultados = await em.findOneOrFail(ResultadoAnalisis, {
      turno: req.params.turno,
      parametroAnalisis: Number(req.params.parametro),
    });
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
  try {
    const resultado = em.create(ResultadoAnalisis, req.body.sanitizedInput);
    await em.persistAndFlush(resultado);
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
  try {
    const id = Number.parseInt(req.params.id);
    const resultado = em.getReference(ResultadoAnalisis, id);
    em.assign(resultado, req.body);
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
  try {

    const resultado = em.getReference(ResultadoAnalisis, id);
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

export { sanitizeResultadoAnalisisInput, findAll, findOne, deleteOne, add, update };*/
import { NextFunction, Request, Response } from 'express';
import { ResultadoAnalisis } from './resultadoanalisisEntity.js';
import { orm } from '../shared/db/orm.js';
import { Turno } from '../turno/turnoEntity.js'; // Importar la entidad Turno
import { ParametroAnalisis } from '../parametroAnalisis/parametroanalisisEntity.js'; // Importar la entidad ParametroAnalisis

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
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key];
  });
  next();
}

// Get all localidades
async function findAll(req: Request, res: Response) {
  try {
    const resultados = await em.find(ResultadoAnalisis, {});
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
  try {
    const resultados = await em.findOneOrFail(ResultadoAnalisis, {
      turno: Number(req.params.turno),
      parametroAnalisis: Number(req.params.parametro),
    });
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
  try {
    const resultado = em.create(ResultadoAnalisis, req.body.sanitizedInput);
    await em.persistAndFlush(resultado);
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
  try {
    // Para actualizar, primero buscamos la entidad por su clave compuesta
    const resultado = await em.findOneOrFail(ResultadoAnalisis, {
      turno: Number(req.params.turno),
      parametroAnalisis: Number(req.params.parametro),
    });
    // Luego le asignamos los nuevos valores
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
  try {
    // Para eliminar, buscamos la entidad por su clave compuesta
    const resultado = await em.findOneOrFail(ResultadoAnalisis, {
      turno: Number(req.params.turno),
      parametroAnalisis: Number(req.params.parametro),
    });
    // Y luego la eliminamos
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

