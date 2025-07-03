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
async function findAll(req:Request, res:Response)
{ 
res.json({data: await repository.findAll()});
}

//Get one localidad
async function findOne(req:Request, res:Response)
{
  const localidad = await repository.findOne({id:req.params.id});
  if (!localidad) {
    res.status(404).send({ error: 'Localidad not found' });
    return; //Asegurar q la ejecucion termine aca
  }
  res.json({data: localidad});
}

async function deleteOne(req:Request, res:Response)
{
  const localidad = await repository.delete({id:req.params.id});
  if (!localidad) {
    res.status(404).send({ error: 'Localidad not found' });
    return;
  }
  res.status(201).send({message:"Localidad eliminada", data: localidad});
}

async function add(req:Request, res:Response) //?
{
  const {denominacion, codPostal} = req.body.sanitizeLocalidadInput; 
  const newlocalidad = new Localidad(denominacion, codPostal); //lo crea
  await repository.add(newlocalidad);
  res.status(201).send({message:"Localidad creada", data: newlocalidad});
}

async function update(req:Request, res:Response)
{
  const localidad = await repository.update(req.params.id, req.body.sanitizeLocalidadInput);
  if (localidad===undefined) {
    res.status(404).send({ error: 'Localidad not found' });
    return;
  }
  res.send({message: "Localidad actualizada", data: localidad});
}

export{sanitizeLocalidadInput, findAll, findOne, deleteOne, add, update}