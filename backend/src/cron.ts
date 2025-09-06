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
                    await sendNotification(turno.paciente.usuario.email || "Usuario", '¡Mañana es tu turno en Laboratorio Genérico!, recorda leer la preparación para tu visita y revisar el horario para evitar demoras!', 'Turno Proximo');
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

export {recordatoriosDiarios}