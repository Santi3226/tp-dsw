# Documentación de API

## Información General

Esta API REST está desarrollada con Node.js, Express y TypeScript, utilizando MikroORM como ORM y MySQL como base de datos. Proporciona endpoints para la gestión de un sistema para un laboratorio bioquímico que incluye pacientes, turnos, centros de atención, análisis médicos y más.

### Base URL

```
http://localhost:3000/api
https://laboratorio-dsw.onrender.com
```

### Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Incluye el token en el header de autorización:

```
Authorization: Bearer <your-jwt-token>
```

### Formato de Respuesta

Todas las respuestas siguen el siguiente formato:

```json
{
  "message": "Descripción del resultado",
  "data": "Datos solicitados o creados",
  "error": "Mensaje de error (solo si aplica)"
}
```

## Endpoints Principales

### Localidades

Gestión de localidades geográficas.

**Base URL:** `/api/localidad`

| Método    | Endpoint | Descripción                      |
| --------- | -------- | -------------------------------- |
| GET       | `/`      | Obtener todas las localidades    |
| GET       | `/:id`   | Obtener una localidad específica |
| POST      | `/`      | Crear nueva localidad            |
| PUT/PATCH | `/:id`   | Actualizar localidad             |
| DELETE    | `/:id`   | Eliminar localidad               |

### Centros de Atención

Gestión de centros médicos y clínicas.

**Base URL:** `/api/centroAtencion`

| Método    | Endpoint | Descripción                           |
| --------- | -------- | ------------------------------------- |
| GET       | `/`      | Obtener todos los centros de atención |
| GET       | `/:id`   | Obtener un centro específico          |
| POST      | `/`      | Crear nuevo centro de atención        |
| PUT/PATCH | `/:id`   | Actualizar centro de atención         |
| DELETE    | `/:id`   | Eliminar centro de atención           |

### Pacientes

Gestión completa de pacientes del sistema.

**Base URL:** `/api/paciente`

#### Endpoints

| Método    | Endpoint  | Descripción                     |
| --------- | --------- | ------------------------------- |
| GET       | `/`       | Obtener todos los pacientes     |
| GET       | `/filter` | Filtrar pacientes por criterios |
| GET       | `/:id`    | Obtener un paciente específico  |
| POST      | `/`       | Crear nuevo paciente            |
| PUT/PATCH | `/:id`    | Actualizar paciente             |
| DELETE    | `/:id`    | Eliminar paciente               |

#### Modelo de Datos - Paciente

```json
{
  "id": "number",
  "nombre": "string",
  "apellido": "string",
  "dni": "string",
  "fechaNacimiento": "date",
  "telefono": "string",
  "email": "string",
  "direccion": "string",
  "turnos": "Turno[]"
}
```

#### Ejemplos de Uso

**Crear Paciente:**

```bash
POST /api/paciente
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "dni": "12345678",
  "fechaNacimiento": "1990-05-15",
  "telefono": "+541234567890",
  "email": "juan.perez@email.com",
  "direccion": "Av. Principal 123"
}
```

**Filtrar Pacientes:**

```bash
GET /api/paciente/filter?nombre=Juan&edad=30
```

Parámetros de filtro disponibles:

- `nombre`: Búsqueda parcial por nombre
- `dni`: Búsqueda exacta por DNI
- `edad`: Filtro por edad específica

### Turnos

Sistema de gestión de turnos médicos.

**Base URL:** `/api/turno`

| Método    | Endpoint | Descripción                 |
| --------- | -------- | --------------------------- |
| GET       | `/`      | Obtener todos los turnos    |
| GET       | `/:id`   | Obtener un turno específico |
| POST      | `/`      | Crear nuevo turno           |
| PUT/PATCH | `/:id`   | Actualizar turno            |
| DELETE    | `/:id`   | Eliminar turno              |

### Tipos de Análisis

Gestión de tipos de análisis médicos disponibles.

**Base URL:** `/api/tipoAnalisis`

| Método    | Endpoint | Descripción                         |
| --------- | -------- | ----------------------------------- |
| GET       | `/`      | Obtener todos los tipos de análisis |
| GET       | `/:id`   | Obtener un tipo específico          |
| POST      | `/`      | Crear nuevo tipo de análisis        |
| PUT/PATCH | `/:id`   | Actualizar tipo de análisis         |
| DELETE    | `/:id`   | Eliminar tipo de análisis           |

### 📋 Plantillas de Análisis

Plantillas predefinidas para análisis médicos.

**Base URL:** `/api/plantillaAnalisis`

| Método    | Endpoint | Descripción                      |
| --------- | -------- | -------------------------------- |
| GET       | `/`      | Obtener todas las plantillas     |
| GET       | `/:id`   | Obtener una plantilla específica |
| POST      | `/`      | Crear nueva plantilla            |
| PUT/PATCH | `/:id`   | Actualizar plantilla             |
| DELETE    | `/:id`   | Eliminar plantilla               |

### Parámetros de Análisis

Configuración de parámetros para análisis médicos.

**Base URL:** `/api/parametroAnalisis`

| Método    | Endpoint | Descripción                     |
| --------- | -------- | ------------------------------- |
| GET       | `/`      | Obtener todos los parámetros    |
| GET       | `/:id`   | Obtener un parámetro específico |
| POST      | `/`      | Crear nuevo parámetro           |
| PUT/PATCH | `/:id`   | Actualizar parámetro            |
| DELETE    | `/:id`   | Eliminar parámetro              |

### Resultados de Análisis

Gestión de resultados de análisis médicos.

**Base URL:** `/api/resultadoAnalisis`

| Método    | Endpoint | Descripción                     |
| --------- | -------- | ------------------------------- |
| GET       | `/`      | Obtener todos los resultados    |
| GET       | `/:id`   | Obtener un resultado específico |
| POST      | `/`      | Crear nuevo resultado           |
| PUT/PATCH | `/:id`   | Actualizar resultado            |
| DELETE    | `/:id`   | Eliminar resultado              |

### Políticas

Gestión de políticas del sistema.

**Base URL:** `/api/politica`

| Método    | Endpoint | Descripción                     |
| --------- | -------- | ------------------------------- |
| GET       | `/`      | Obtener todas las políticas     |
| GET       | `/:id`   | Obtener una política específica |
| POST      | `/`      | Crear nueva política            |
| PUT/PATCH | `/:id`   | Actualizar política             |
| DELETE    | `/:id`   | Eliminar política               |

### Usuarios

Gestión de usuarios del sistema.

**Base URL:** `/api/usuario`

| Método    | Endpoint | Descripción                   |
| --------- | -------- | ----------------------------- |
| GET       | `/`      | Obtener todos los usuarios    |
| GET       | `/:id`   | Obtener un usuario específico |
| POST      | `/`      | Crear nuevo usuario           |
| PUT/PATCH | `/:id`   | Actualizar usuario            |
| DELETE    | `/:id`   | Eliminar usuario              |

## Códigos de Estado HTTP

| Código | Descripción                                               |
| ------ | --------------------------------------------------------- |
| 200    | OK - Solicitud exitosa                                    |
| 201    | Created - Recurso creado exitosamente                     |
| 400    | Bad Request - Datos inválidos                             |
| 401    | Unauthorized - Token de autenticación inválido o faltante |
| 404    | Not Found - Recurso no encontrado                         |
| 500    | Internal Server Error - Error del servidor                |

## Características Adicionales

### CORS

La API está configurada para permitir solicitudes desde cualquier origen durante el desarrollo. En producción, se debe configurar para dominios específicos.

### Cron Jobs

El sistema incluye tareas programadas para recordatorios diarios.

### Upload de Archivos

Soporte para upload de archivos utilizando Multer.

### Envío de Emails

Integración con Nodemailer para envío de notificaciones por email.

### Encriptación

Utiliza bcrypt para hash de contraseñas y datos sensibles.

## Middleware de Validación

Cada endpoint utiliza middleware de sanitización que:

- Valida y limpia los datos de entrada
- Elimina campos undefined
- Aplica validaciones de seguridad específicas

## Población de Relaciones

Los endpoints GET incluyen automáticamente relaciones relevantes utilizando el parámetro `populate` de MikroORM para proporcionar datos completos.

## Manejo de Errores

Todos los endpoints incluyen manejo robusto de errores con:

- Mensajes descriptivos
- Logging de errores para debugging
- Códigos de estado HTTP apropiados
- Información adicional para desarrollo
