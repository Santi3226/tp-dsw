import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import { localidadRouter } from './localidad/localidadRoutes.js';
import { pacienteRouter } from './paciente/pacienteRoutes.js';
import { centroAtencionRouter } from './centroAtencion/centroatencionRoutes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { turnoRouter } from './turno/turnoRoutes.js';
import { tipoAnalisisRouter } from './tipoAnalisis/tipoanalisisRoutes.js';

const app = express();
app.use(express.json());

//luego de los middleware base
app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});
//antes de las rutas y middleware de negocio
app.use('/api/localidad', localidadRouter); //Manda todas las peticiones q comiencen asi al router
app.use('/api/centroAtencion', centroAtencionRouter);
app.use('/api/paciente', pacienteRouter);
app.use('/api/turno', turnoRouter);
app.use('/api/tipoAnalisis', tipoAnalisisRouter);

app.use((_, res) => {
  res.status(404).send({ error: 'Resource not found, check links' });
  return; //Si no entro en ninguna de las instucciones CRUD, que venga aca
});

await syncSchema(); //never in production

app.listen(3000, () => {
  console.log('Server activo en http://localhost:3000/');
});
