# Propuesta TP DSW

## Grupo

### Integrantes

- 53106 - Dedich, Santiago
- 52509 - García Morichetti, Alma
- 99999 - Apellido, Nombre

### Repositorios

- [frontend app](http://hyperlinkToGihubOrGitlab)
- [backend app](http://hyperlinkToGihubOrGitlab)
  _Nota_: si utiliza un monorepo indicar un solo link con fullstack app.

## Tema

### Descripción

Un laboratorio de análisis bioquímico de la ciudad nos convoca para realizar el desarrollo de un sistema de información relacionado con la gestión de los análisis y el reporte de sus resultados. También interesa que el sistema realice el manejo de datos del cliente, junto a sus turnos para atenciones futuras.

### Modelo

![MD](https://github.com/user-attachments/assets/2364d5c0-fa1f-4f1e-bdf4-2fc688f6f970)


## Alcance Funcional

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Tipo Habitacion<br>2. CRUD Servicio   PREGUNTAR<br>3. CRUD Localidad|
|CRUD dependiente|1. CRUD Turno {Depende de} CRUD Tipo Habitacion<br>2. CRUD Paciente {Depende de} CRUD Localidad|
|Listado<br>+<br>detalle| 1. Listado de clientes filtrado por nombre, dni y edad => Detalle CRUD Cliente<br> 2. Listado de turnos filtrado por rango de fecha, muestra tipo, fecha inicio y fin estadía, estado y nombre del paciente => Detalle muestra datos completos del turno y del paciente|
|CUU/Epic|1. Reservar un turno para una extracción<br>2. Mostrar el resultado de un análisis|

Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Tipo Habitacion<br>2. CRUD Servicio<br>3. CRUD Localidad<br>4. CRUD Provincia<br>5. CRUD Habitación<br>6. CRUD Empleado<br>7. CRUD Cliente|
|CUU/Epic|1. Reservar un turno para una extracción<br>2. Realizar la confirmación de una turno<br>3. Mostrar el resultado de un análisis|

### Alcance Adicional Voluntario

| Req      | Detalle                                                                                                                                                                                                             |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Listados | 1. Informe de preferencia de recepción de resultados <br>2. Turnos filtrados por cliente muestra datos del cliente y del análisis |
| CUU/Epic | 1. Solicitud de Preparación<br>2. Cancelación de reserva                                                                                                                                                                  |
| Otros    | 1. Envío de recordatorio de turno por email                                                                                                                                                                       |
