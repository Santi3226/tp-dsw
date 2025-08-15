import { NextFunction, Request, Response } from 'express';
import { Turno } from './turnoEntity.js';
import { orm } from '../shared/db/orm.js';
import fs from 'fs';

const em = orm.em; //EntityManager

function sanitizeTurnoInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    recibeMail: req.body.recibeMail,
    receta: req.body.receta,
    observacion: req.body.observacion,
    fechaHoraExtraccion: req.body.fechaHoraExtraccion,
    fechaHoraReserva: req.body.fechaHoraReserva,
    paciente: req.body.paciente,
    centroAtencion: req.body.centroAtencion,
    tipoAnalisis: req.body.tipoAnalisis,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key]; //Si falta algun campo lo deja como estaba
  });
  // Aqui van todos los chequeos de seg y datos
  next();
}

// Get all turnos
async function findAll(req: Request, res: Response) {
  try {
    const turnos = await em.find(
      Turno,
      {},
      {
        populate: ['paciente', 'centroAtencion', 'tipoAnalisis'], }
    );
    res.status(200).json({
      message: 'Todos los turnos encontrados: ',
      data: turnos,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching turnos' });
  }
}

//Get one turno
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const turnos = await em.findOneOrFail(
      Turno,
      { id },
      {
        populate: ['paciente', 'centroAtencion', 'tipoAnalisis'],
      }
    );
    res.status(200).json({
      message: 'Turno encontrado: ',
      data: turnos,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching turno' });
  }
}

async function add(req: Request, res: Response) {
  try {
    const { recibeMail, estado, observacion, fechaHoraExtraccion, fechaHoraReserva, paciente, centroAtencion, tipoAnalisis } = req.body; 
    //Pq el formdata me desacomoda los datos del sanitizer
    let filePath = "Sin Receta";
    if (req.file) {
      const newPath = `${req.file.destination}${req.file.originalname}`;
      fs.renameSync(req.file.path, newPath);
      filePath = newPath;
    }
    const turnoData = {
      recibeMail: recibeMail === 'true',
      estado: 'Pendiente', 
      observacion: observacion || "",
      receta: filePath,
      fechaHoraExtraccion: new Date(fechaHoraExtraccion),
      fechaHoraReserva: new Date(fechaHoraReserva),
      paciente: paciente,
      centroAtencion: centroAtencion,
      tipoAnalisis: tipoAnalisis,
    };
    const turno = em.create(Turno, turnoData);
    await em.flush();
    res.status(201).json({ message: 'Turno creado exitosamente', data: turno });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating turno', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const turno = em.getReference(Turno, id);
    em.assign(turno, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Turno actualizado exitosamente', data: turno });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating turno', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const turno = em.getReference(Turno, id);
    await em.removeAndFlush(turno);
    res.status(200).json({
      message: 'Turno eliminada exitosamente',
      data: turno,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting turno', error: error.message });
  }
}

export { sanitizeTurnoInput, findAll, findOne, deleteOne, add, update };
