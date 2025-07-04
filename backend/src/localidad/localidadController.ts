import express, { NextFunction, Request, Response } from 'express';
import { Localidad } from './localidadEntity.js';

function sanitizeLocalidadInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizeLocalidadInput = {
    denominacion: req.body.denominacion,
    codPostal: req.body.codPostal,
  };
  Object.keys(req.body.sanitizeLocalidadInput).forEach((key) => {
    if (req.body.sanitizeLocalidadInput[key] === undefined)
      delete req.body.sanitizeLocalidadInput[key]; //Si falta algun campo lo deja como estaba
  });
  // Aqui van todos los chequeos de seg y datos
  next();
}

// Get all localidades
async function findAll(req: Request, res: Response) {
  res.status(500).json({ message: 'Not implemented yet' });
}

//Get one localidad
async function findOne(req: Request, res: Response) {
  res.status(500).json({ message: 'Not implemented yet' });
}

async function deleteOne(req: Request, res: Response) {
  res.status(500).json({ message: 'Not implemented yet' });
}

async function add(req: Request, res: Response) {
  res.status(500).json({ message: 'Not implemented yet' });
}

async function update(req: Request, res: Response) {
  res.status(500).json({ message: 'Not implemented yet' });
}

export { sanitizeLocalidadInput, findAll, findOne, deleteOne, add, update };
