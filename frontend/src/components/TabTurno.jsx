import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axiosInstance from '../helpers/api';
import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../hooks/useAuth.js";
import '../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Tab.css';
import { useEffect, useState } from 'react';
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery} from "../hooks/useTurnos";
import { usePolitica } from '../hooks/usePolitica.js';
import { useCentros } from '../hooks/useCentros.js';
import { useTiposAnalisis } from '../hooks/useTiposAnalisis.js';
import TabTurnoGestion from './tabsUsers/TabTurnoGestion';
import TabTurnoRegistrar from './tabsUsers/TabTurnoRegistrar';
import TabTurnoResultados from './tabsUsers/TabTurnoResultados';

const generateTimeSlots = (horaInicio, horaFin, intervalo) => {
  const horarios = [];
  let horaActual = horaInicio;
  let minutoActual = 0;
  while (horaActual < horaFin || (horaActual === horaFin && minutoActual === 0)) {
    horarios.push(`${String(horaActual).padStart(2, '0')}:${String(minutoActual).padStart(2, '0')}`);
    minutoActual += intervalo;
    if (minutoActual >= 60) {
      minutoActual = 0;
      horaActual += 1;
    }
  }
  return horarios;
};

const allTimeSlots = generateTimeSlots(7, 19, 15); // Deberia invocar politica pero no anda

function TabTurno(props) {
  const { user } = useAuth();
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmitting: isSubmittingAdd }, control } = useForm({ mode: "onBlur" });
  const {  centros = [] } = useCentros();
  const {  tipos = [] } = useTiposAnalisis();
  const { isLoading, isError, error, turnos = [], refetch } = useTurnos();
  const { politicas = [] } = usePolitica();
  const [horariosDisponibles, setHorariosDisponibles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [turnoAEliminarId, setTurnoAEliminarId] = useState(null);
  const [resultadosId, setResultadosId] = useState(null);
  const [turnosPaciente, setTurnosPaciente] = useState([]);
  const [turnosFiltradosGestion, setTurnosFiltradosGestion] = useState([]);
  const [turnosFiltradosResultados, setTurnosFiltradosResultados] = useState([]);

  // Utiliza useWatch para observar los cambios en el campo de fecha
  const fechaHoraReserva = useWatch({
    control,
    name: "fechaHoraReserva"
  });

  const onSubmitAdd = async (data) => {
    try {
      data.fechaHoraReserva = `${data.fechaHoraReserva}T${data.horaReserva}:00`;
      data.paciente = user.paciente.id;
      data.email = user.email;
      await addTurnos(data);
      refetch(); 
    } catch (error) {
      console.error("Fallo al registrar:", error);
    }
  };

  const handleEliminarClick = (id) => {
    setTurnoAEliminarId(id);
    setShowModal(true);
  };

  const handleResultadosClick = (id) => {
    setResultadosId(id);
    setShowModal(true);
  };

  const handleCerrarModal = () => {
    setShowModal(false);
    setTurnoAEliminarId(null);
    setResultadosId(null);
  };

  const handleConfirmarEliminacion = async () => {
    const data = {
      id: turnoAEliminarId,
      estado: "Anulado",
    };
    await modifyTurnos(data);
    refetch();
    handleCerrarModal();
  };

  useEffect(() => {
     if (!fechaHoraReserva) return; // Early return si no hay fecha
     
     const turnosFecha = async () => {
       try {
         const data = { fechaHoraReserva: fechaHoraReserva ? fechaHoraReserva : fechaHoraReservaModify };
         const response = await getTurnosQuery(data);
         
         const occupiedTimes = response
           .filter(turno => turno.estado !== "Anulado")
           .map(turno => {
             const date = new Date(turno.fechaHoraReserva);
             const hour = String(date.getHours()).padStart(2, '0');
             const minute = String(date.getMinutes()).padStart(2, '0');
             return `${hour}:${minute}`;
           });
 
         const availableSlots = allTimeSlots.filter(
           slot => !occupiedTimes.includes(slot)
         );
         setHorariosDisponibles(availableSlots);
       } catch (error) {
         console.error("Error al obtener los turnos:", error);
       }
     };
     turnosFecha();
  }, [fechaHoraReserva]);

useEffect(() => {
    if (Array.isArray(turnos)) {
      setTurnosPaciente(turnos); //La primera vez llena el arreglo con todos los turnos, desp se actaliza con los filtros
    }
  else if (!isLoading) {
      setTurnosPaciente([]);
    }
  }, [turnos, isLoading]); // Depende de turnos e isLoading

// Agrega un nuevo useEffect para filtrar cuando turnosPaciente cambie:
useEffect(() => {
  if (turnosPaciente.length > 0) 
    {
    const turnosGestion = turnosPaciente.filter(
      turno => (turno.estado === "Pendiente" || turno.estado === "Confirmado") 
      && turno.paciente.id === user.paciente.id
    );
    setTurnosFiltradosGestion(turnosGestion);

    const turnosResultados = turnosPaciente.filter(
      turno => turno.estado === "Resultado"
      && turno.paciente.id === user.paciente.id
    );

    setTurnosFiltradosResultados(turnosResultados);
  }
  if (!Array.isArray(turnosPaciente) || turnosPaciente.length === 0) {
    setTurnosFiltradosGestion([]);
    setTurnosFiltradosResultados([]);
  }
  
}, [turnosPaciente]);



  const { inicio } = props;
  return (
    <Tabs
      defaultActiveKey={inicio}
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="gestiondeturnos" title="Gestión de Turnos">
        <TabTurnoGestion turnosFiltradosGestion={turnosFiltradosGestion} onEliminarClick={handleEliminarClick} />
      </Tab>
      <Tab eventKey="registrarturno" title="Registrar Turno">
        <TabTurnoRegistrar tipos={tipos} centros={centros} registerAdd={registerAdd} handleSubmitAdd={handleSubmitAdd} onSubmitAdd={onSubmitAdd} errorsAdd={errorsAdd} isSubmittingAdd={isSubmittingAdd} horariosDisponibles={horariosDisponibles} watchFecha={fechaHoraReserva} />
      </Tab>
      <Tab eventKey="resultados" title="Resultados">
        <TabTurnoResultados turnosFiltradosResultados={turnosFiltradosResultados} onResultadosClick={handleResultadosClick} />
      </Tab>
    </Tabs>
  );
}

export { TabTurno };