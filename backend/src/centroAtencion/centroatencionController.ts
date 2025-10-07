import { NextFunction, Request, Response } from 'express';
import { CentroAtencion } from './centroatencionEntity.js';
import { orm } from '../shared/db/orm.js';

const em = orm.em; //EntityManager

function sanitizeCentroAtencionInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    domicilio: req.body.domicilio,
    localidad: req.body.localidad, //Se espera que sea un objeto con id de la localidad
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
  try {
    const centros = await em.find(
      CentroAtencion,
      {},
      {
        populate: ['localidad', 'turno'],
      }
    );
    res.status(200).json({
      message: 'Todos los centros encontrados: ',
      data: centros,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching centros' });
  }
}

//Get one centro de atencion
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const centros = await em.findOneOrFail(
      CentroAtencion,
      { id },
      {
        populate: ['localidad', 'turno'],
      }
    );
    res.status(200).json({
      message: 'Centro encontrado: ',
      data: centros,
    });
  } catch (error: any) {
    if (error.message.includes('CentroAtencion not found')) {
      res.status(404).json({ message: 'Centro not found' });
    } else {
      res.status(500).json({ message: error.message || 'Error fetching centro' });
    }
  }
}

async function add(req: Request, res: Response) {
  try {
    const centro = em.create(CentroAtencion, req.body.sanitizedInput);
    await em.flush();
    res
      .status(201)
      .json({ message: 'Centro creada exitosamente', data: centro });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating centro', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const centro = em.getReference(CentroAtencion, id);
    em.assign(centro, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Centro actualizada exitosamente', data: centro });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating centro', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const centro = em.getReference(CentroAtencion, id);
    await em.removeAndFlush(centro);
    res.status(200).json({
      message: 'Centro eliminada exitosamente',
      data: centro,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting centro', error: error.message });
  }
}

export {
  sanitizeCentroAtencionInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
};
