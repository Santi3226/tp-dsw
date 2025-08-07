import { NextFunction, Request, Response } from 'express';
import { Usuario } from './usuarioEntity.js';
import { orm } from '../shared/db/orm.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const claveJWT = 'claveJWTProvisional';
const em = orm.em; //EntityManager
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

function sanitizeUsuarioInput(req: Request, res: Response, next: NextFunction) {
  const { email, contraseña, role, paciente } = req.body;
  // Validación: Asegurarse de que la contraseña existe
  try {
    if (contraseña !== undefined) {
      const hash = bcrypt.hashSync(contraseña, salt);
      req.body.sanitizedInput = {
        email: email,
        contraseña: hash,
        role: role,
        paciente: paciente,
      };
    } else {
      req.body.sanitizedInput = {
        email: email,
        role: role,
        paciente: paciente,
      };
    }
    Object.keys(req.body.sanitizedInput).forEach((key) => {
      if (
        req.body.sanitizedInput[key] === undefined
      )
        delete req.body.sanitizedInput[key]; //Si falta algun campo lo deja como estaba
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al procesar la contraseña.' });
    return;
  }
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

async function login(req: Request, res: Response) {
  try {
    const { email, contraseña } = req.body;
    const usuario = await em.findOne(
      Usuario,
      { email },
      { populate: ['paciente'] }
    );

    if (!usuario || !contraseña) {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
    if (usuario) {
      const contraseñaCheck = await bcrypt.compare(
        contraseña,
        usuario.contraseña
      );
      if (!contraseñaCheck) {
        res.status(401).json({ message: 'Credenciales inválidas' });
      }
      console.log(usuario);
      const payload = {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        paciente: usuario.paciente,
      };
      const token = jwt.sign(payload, claveJWT, { expiresIn: '1h' });
      res.status(200).json({
        message: 'Usuario encontrado: ',
        token,
      });
    }
  } catch (error: any) {
    console.error('Error de servidor:', error);
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
    em.assign(usuario, req.body.sanitizedInput);
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

export {
  sanitizeUsuarioInput,
  findAll,
  findOne,
  deleteOne,
  add,
  update,
  login,
};
