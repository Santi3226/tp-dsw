import cron from "node-cron";
import { sendNotification } from "./services/notificationService.js"; 
import { Turno } from './turno/turnoEntity.js';
import { orm } from './shared/db/orm.js';

const recordatoriosDiarios = () => {
    cron.schedule('* * * * *', async () => {
        console.log('Ejecutando tarea diaria de recordatorios de turnos...');
        try {
            const hoy = new Date();
            hoy.setUTCHours(0, 0, 0, 0); // Establece el inicio del día

            const mañana = new Date(hoy);
            mañana.setUTCDate(mañana.getUTCDate() + 1); // Suma un día

            await orm.em.fork().transactional(async (em) => {
                const turnos = await em.find(
                    Turno,
                    {
                      fechaHoraReserva: {
                          $gte: hoy,
                          $lte: mañana
                      },
                      recibeMail: true,
                      notificacionEnviada: false 
                    },
                    {
                        populate: ['paciente', 'centroAtencion', 'tipoAnalisis','paciente.usuario'], 
                    }
                );
                for (const turno of turnos) {
                    await sendNotification(turno.paciente.usuario.email || "Usuario", '¡Mañana es tu turno en Laboratorio Genérico!, recorda leer la preparación para tu visita y revisar el horario para evitar demoras!', 'Turno Proximo', "prox");
                    turno.notificacionEnviada = true;
                    await em.persistAndFlush(turno);
                }
            });
        } catch (error) {
            console.error('Error en la tarea de recordatorios:', error);
        }
    });
    console.log('Scheduler de recordatorios de turnos iniciado.');
};

const recordatoriosPrevistos = () => {
    cron.schedule('0 7 * * *', async () => { // Ejecuta diariamente a las 7 AM
        console.log('Ejecutando tarea diaria de verificación de previstos...');
        try {
            await orm.em.fork().transactional(async (em) => {
                const hoy = new Date();
                hoy.setHours(0, 0, 0, 0); // Normalizar a medianoche
                
                const turnos = await em.find(
                    Turno,
                    {
                        fechaHoraExtraccion: { $ne: null } // Que tengan fecha de extracción
                    },
                    {
                        populate: ['paciente', 'centroAtencion', 'tipoAnalisis', 'tipoAnalisis.plantillaAnalisis', 'paciente.usuario'],
                    }
                );

                // Filtrar turnos donde ya pasaron los días previstos
                const turnosListos = turnos.filter(turno => {
                    const fechaExtraccion = new Date(turno.fechaHoraExtraccion);
                    fechaExtraccion.setHours(0, 0, 0, 0);
                    
                    const diasPrevistos = turno.tipoAnalisis.plantillaAnalisis.tiempoPrevisto;
                    const fechaEsperada = new Date(fechaExtraccion);
                    fechaEsperada.setDate(fechaEsperada.getDate() + diasPrevistos);
                    
                    return hoy >= fechaEsperada;
                });

                for (const turno of turnosListos) {
                    const nombrePaciente = `${turno.paciente.nombre} ${turno.paciente.apellido}`;
                    
                    await sendNotification(
                        "laboratoriogenerico@mail.com",
                        `Estimado/a Asistente, El turno N° ${turno.id}, ${turno.tipoAnalisis.nombre} del paciente ${nombrePaciente} esta disponible para evaluación o carga de resultados.`,
                        'Turno Previsto',
                        "prev"
                    );
                }
            });
        } catch (error) {
            console.error('Error en la verificación de previstos:', error);
        }
    });
    console.log('Scheduler de verificación de previstos iniciado.');
};

export {recordatoriosDiarios, recordatoriosPrevistos}