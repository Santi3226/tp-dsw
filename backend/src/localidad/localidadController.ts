import express, { NextFunction, Request, Response } from 'express';
import { LocalidadRepository } from './localidadRepository.js';
import { Localidad } from './localidadEntity.js';
const repository = new LocalidadRepository;

function sanitizeLocalidadInput(req: Request, res: Response, next: NextFunction)
{
  req.body.sanitizeLocalidadInput = {
    denominacion: req.body.denominacion,
    codPostal: req.body.codPostal
  };
  Object.keys(req.body.sanitizeLocalidadInput).forEach(key => 
  {
    if(req.body.sanitizeLocalidadInput[key] === undefined) delete req.body.sanitizeLocalidadInput[key] //Si falta algun campo lo deja como estaba
  }
  )
  // Aqui van todos los chequeos de seg y datos
  next();
}

// Get all localidades
function findAll(req:Request, res:Response)
{ 
res.json({data: repository.findAll()});
}

//Get one localidad
function findOne(req:Request, res:Response)
{
  const localidad = repository.findOne({codPostal:req.params.codPostal});
  if (!localidad) {
    res.status(404).send({ error: 'Localidad not found' });
    return; //Asegurar q la ejecucion termine aca
  }
  res.json({data: localidad});
}

function deleteOne(req:Request, res:Response)
{
  const localidad = repository.delete({codPostal:req.params.codPostal});
  if (!localidad) {
    res.status(404).send({ error: 'Localidad not found' });
    return;
  }
  res.status(201).send({message:"Localidad eliminada", data: localidad});
}

function add(req:Request, res:Response) //?
{
  const {denominacion, codPostal} = req.body.sanitizeLocalidadInput; 
  const newlocalidad = new Localidad(denominacion, codPostal); //lo crea
  repository.add(newlocalidad);
  res.status(201).send({message:"Localidad creada", data: newlocalidad});
}

function update(req:Request, res:Response)
{
  const localidad = repository.update(req.body.sanitizeLocalidadInput);
  if (!localidad) {
    res.status(404).send({ error: 'Localidad not found' });
    return;
  }
  res.send({message: "Localidad actualizada", data: localidad});
}

export{sanitizeLocalidadInput, findAll, findOne, deleteOne, add, update}