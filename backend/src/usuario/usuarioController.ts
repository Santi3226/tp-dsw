import { NextFunction, Request, Response } from 'express';
import { Usuario } from './usuarioEntity.js';
import { orm } from '../shared/db/orm.js';
import bcrypt from 'bcrypt';

const em = orm.em; //EntityManager
const saltRounds = 10;

function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {
  const myPlaintextPassword = req.body.contraseña;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(myPlaintextPassword, salt);

  req.body.sanitizedInput = {
    email: req.body.email,
    contraseña: hash,
    role: req.body.role,
    paciente: req.body.paciente,
  };
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined)
      delete req.body.sanitizedInput[key]; //Si falta algun campo lo deja como estaba
  });
  // Aqui van todos los chequeos de seg y datos
  next();
}

// Get all Pacientes
async function findAll(req: Request, res: Response) {
  try {
    const usuarios = await em.find(Usuario, {}, { populate: ['paciente'] });
    res.status(200).json({
      message: 'Todos los usuarios encontrados: ',
      data: usuarios,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching usuarios' });
  }
}

//Get one usuario
async function findOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuarios = await em.findOneOrFail(
      Usuario,
      { id },
      { populate: ['paciente'] }
    ); //(Paciente, filtros)
    res.status(200).json({
      message: 'Usuario encontrado: ',
      data: usuarios,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: error.message || 'Error fetching usuario' });
  }
}

async function add(req: Request, res: Response) {
  try {
    const usuario = em.create(Usuario, req.body.sanitizedInput);
    await em.persistAndFlush(usuario);
    res
      .status(201)
      .json({ message: 'Usuario creado exitosamente', data: usuario });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error creating usuario', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = em.getReference(Usuario, id);
    em.assign(usuario, req.body);
    await em.flush();
    res
      .status(200)
      .json({ message: 'Usuario actualizado exitosamente', data: usuario });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error updating usuario', error: error.message });
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const usuario = em.getReference(Usuario, id);
    em.remove(usuario);
    await em.flush();
    res.status(200).json({
      message: 'Usuario eliminada exitosamente',
      data: usuario,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Error deleting usuario', error: error.message });
  }
}

export { sanitizeUsuarioInput, findAll, findOne, deleteOne, add, update };
