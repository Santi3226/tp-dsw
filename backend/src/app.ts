import 'reflect-metadata';
import express from 'express';
import { localidadRouter } from './localidad/localidadRoutes.js';
import { pacienteRouter } from './paciente/pacienteRoutes.js';
import { centroAtencionRouter } from './centroAtencion/centroatencionRoutes.js';
import { orm, syncSchema } from './shared/db/orm.js';
import { RequestContext } from '@mikro-orm/core';
import { turnoRouter } from './turno/turnoRoutes.js';
import { tipoAnalisisRouter } from './tipoAnalisis/tipoanalisisRoutes.js';
import { plantillaAnalisisRouter } from './plantillaAnalisis/plantillaanalisisRoutes.js';
import { parametroAnalisisRouter } from './parametroAnalisis/parametroanalisisRoutes.js';
import { resultadoAnalisisRouter } from './resultadoAnalisis/resultadoanalisisRoutes.js';
import { politicaRouter } from './politica/politicaRoutes.js';
import { usuarioRouter } from './usuario/usuarioRoutes.js';
import { recordatoriosDiarios, recordatoriosPrevistos } from './cron.js';

const app = express();

app.use(express.json());

//luego de los middleware base
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //Mas adelante cambiar el * por el localhost
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next(); //Se debe agregar JWT para validacion de usuarios q realizan peticiones
    }
});

app.use((req, res, next) => {
  RequestContext.create(orm.em, next);
});

app.use(express.static('public'));

//antes de las rutas y middleware de negocio
app.use('/api/localidad', localidadRouter); //Manda todas las peticiones q comiencen asi al router
app.use('/api/centroAtencion', centroAtencionRouter);
app.use('/api/paciente', pacienteRouter);
app.use('/api/turno', turnoRouter);
app.use('/api/tipoAnalisis', tipoAnalisisRouter);
app.use('/api/plantillaAnalisis', plantillaAnalisisRouter);
app.use('/api/parametroAnalisis', parametroAnalisisRouter);
app.use('/api/resultadoAnalisis', resultadoAnalisisRouter);
app.use('/api/politica', politicaRouter);
app.use('/api/usuario', usuarioRouter);

app.use((_, res) => {
  res.status(404).send({ error: 'Resource not found, check links' });
  return; //Si no entro en ninguna de las instucciones CRUD, que venga aca
});

//await syncSchema();

recordatoriosDiarios();
recordatoriosPrevistos();

app.listen(3000, () => {
  console.log('Server activo en puerto 3000 y http://localhost:3000/api');
});
