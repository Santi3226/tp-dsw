# Propuesta TP DSW

## Grupo

### Integrantes

- 53106 - Dedich, Santiago

### Repositorios

- [frontend app](https://github.com/Santi3226/tp-dsw/tree/main/frontend)
- [backend app](https://github.com/Santi3226/tp-dsw/tree/main/backend)

## Tema

### Descripción

Un laboratorio de análisis bioquímico de la ciudad nos convoca para realizar el desarrollo de un sistema de información relacionado con la gestión de los análisis y el reporte de sus resultados. También interesa que el sistema realice el manejo de datos del cliente, junto a sus turnos para atenciones futuras.

### Modelo

<img width="982" height="682" alt="imagen" src="https://github.com/user-attachments/assets/8480bc97-f496-41bc-89bb-3f712a501f70" />

## Alcance Funcional

### Alcance Mínimo

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Localidad<br>2. CRUD PlantillaAnalisis<br>3. CRUD ParametroAnalisis|
|CRUD dependiente|1. CRUD CentroAtencion {Depende de} CRUD Localidad<br>2. CRUD TipoAnalisis {Depende de} CRUD PlantiilaAnalisis y ParametroAnalisis|
|Listado<br>+<br>detalle| 1. Listado de pacientes filtrado por nombre, dni y edad => Detalle CRUD Paciente<br> 2. Listado de turnos filtrado por rango de fecha, muestra tipo del analisis, fecha de reserva y extracción y nombre del paciente => Detalle muestra datos completos del turno y del paciente|
|CUU/Epic|1. Reservar un turno para la extracción<br>2. Cargar los resultados de un analisis|

Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Paciente<br>2. CRUD Turno<br>3. CRUD CentroAtencion<br>4. CRUD TipoAnalisis<br>5. CRUD ResultadoAnalisis<br>6. CRUD ParametroAnalisis<br>7. CRUD PlantillaAnalisis<br>8. CRUD Localidad|
|CUU/Epic|1. Reservar un turno para la extracción<br>2. Cargar los resultados de un analisis<br>3. Mostrar el resultado de un análisis|

### Alcance Adicional Voluntario

| Req      | Detalle                                                                                                                           |
| :------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| Listados | 1. Informe de preferencia de recepción de resultados <br>2. Turnos filtrados por cliente muestra datos del cliente y del análisis |
| CUU/Epic | 1. Carga de Plantillas de Análisis<br>2. Cancelación de reserva                                                                   |
| Otros    | 1. Envío de recordatorios por email (al crear un turno, notificando dias previos y avisando sobre turnos previstos)               |

