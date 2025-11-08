import { use, useEffect, useState } from "react";
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery} from "../hooks/useTurnos";
import "../pages/Admin.css";
import { useForm, useWatch } from "react-hook-form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabTurnoFiltrar from "../components/tabsAdmins/Turno/TabTurnoFiltrar";
import TabTurnoModificar from "../components/tabsAdmins/Turno/TabTurnoModificar";
import TabTurnoAgregar from "../components/tabsAdmins/Turno/TabTurnoAgregar";
import TabTurnoEliminar from "../components/tabsAdmins/Turno/TabTurnoEliminar";
import { useTiposAnalisis } from "../hooks/useTiposAnalisis.js";
import { useCentros } from "../hooks/useCentros.js";
import { usePaciente } from "../hooks/usePacientes.js";
import axiosInstance from '../helpers/api';

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

const allTimeSlots = generateTimeSlots(7, 19, 15);

function TurnoAdmin() {
const [turnosFiltrados, setTurnosFiltrados] = useState([]);
const { isLoading, isError, error, turnos = [] ,refetch} = useTurnos();
const {  pacientes = [] } = usePaciente();
const {  tipos = [] } = useTiposAnalisis();
const {  centros = [] } = useCentros();
const [turnoDetalleId, setTurnoDetalleId] = useState(null);
const [showModal, setShowModal] = useState(false);
const [horariosDisponibles, setHorariosDisponibles] = useState([]);

const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmitting: isSubmittingAdd }, control: controlAdd } = useForm({ mode: "onBlur" });
const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmitting: isSubmittingModify }, control: controlModify } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmitting: isSubmittingDelete } } = useForm({ mode: "onBlur" });
const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errors: errorsFilter, isSubmitting: isSubmittingFilter } } = useForm({ mode: "onBlur" });

const fechaHoraReserva = useWatch({
		control: controlAdd,
		name: "fechaHoraReserva"
});


const fechaHoraReservaModify = useWatch({
		control: controlModify, 
		name: "fechaHoraReserva"
});
  
const handleDetalleClick = async (id) => {
	setTurnoDetalleId(id);
	setShowModal(true);
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
	}, [fechaHoraReserva, fechaHoraReservaModify]); 

const onSubmitDelete = async (data) => {
try {
	const id = data.id; 
	await deleteTurnos(id);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al registrar:", error);
}
};

const onSubmitModify = async (data) => {
try { 
	await modifyTurnos(data);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try {
	data.fechaHoraReserva = `${data.fechaHoraReserva}T${data.horaReserva}:00`;
	const response = await axiosInstance.get("paciente/"+data.paciente);
	const email = await axiosInstance.get("usuario/"+response.data.data.usuario);
  //No hace falta separar pq si falla el get teoricamente no llega a esta línea
	data.email = email.data.data.email;
	await addTurnos(data);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al agregar:", error);
}
};

const onSubmitFilter = async (data) => {
	try {
		const response = await getTurnosQuery(data); //Filtrado condicional
		setTurnosFiltrados(response || []); 
	} catch (error) {
		console.error("Fallo al filtrar:", error);
	}
};

useEffect(() => {
		if (Array.isArray(turnos)) {
			setTurnosFiltrados(turnos); //La primera vez llena el arreglo con todos los turnos, desp se actaliza con los filtros
		}
	else if (!isLoading) {
			setTurnosFiltrados([]);
		}
	}, [turnos, isLoading]);

	if (isLoading) {
		return (
			<div style={pageStyles.containerCentered}>
				<p style={pageStyles.message}>Cargando turnos...</p>
				<div style={pageStyles.spinner}></div>
			</div>
		);
	}

	if (isError) {
		return (
			<div style={pageStyles.containerCentered}>
				<p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los turnos: {error.message}</p>
			</div>
		);
	}

	return (
		<div>
			<h1 style={pageStyles.header}>Nuestros Turnos</h1>
			<Tabs
			defaultActiveKey="filtrar"
			id="justify-tab-example"
			className="mb-3"
			justify
			style={{marginTop:"30px"}}
		>
		<Tab eventKey="filtrar" title="Filtrar">
			<TabTurnoFiltrar
				registerFilter={registerFilter}
				handleSubmitFilter={handleSubmitFilter(onSubmitFilter)}
				errorsFilter={errorsFilter}
				isSubmittingFilter={isSubmittingFilter}
				pacientes={pacientes}
			/>
		</Tab>
			<Tab eventKey="modificar" title="Modificar">
				<TabTurnoModificar
					registerModify={registerModify}
					handleSubmitModify={handleSubmitModify(onSubmitModify)}
					errorsModify={errorsModify}
					isSubmittingModify={isSubmittingModify}
					turnos={turnos}
					tipos={tipos}
					centros={centros}
					pacientes={pacientes}
					horariosDisponibles={horariosDisponibles}
					fechaHoraReservaModify={fechaHoraReservaModify}
				/>
			</Tab>
			<Tab eventKey="agregar" title="Agregar">
				<TabTurnoAgregar
					registerAdd={registerAdd}
					handleSubmitAdd={handleSubmitAdd(onSubmitAdd)}
					errorsAdd={errorsAdd}
					isSubmittingAdd={isSubmittingAdd}
					tipos={tipos}
					centros={centros}
					pacientes={pacientes}
					horariosDisponibles={horariosDisponibles}
					fechaHoraReserva={fechaHoraReserva}
				/>
			</Tab>
			<Tab eventKey="eliminar" title="Eliminar">
				<TabTurnoEliminar
					registerDelete={registerDelete}
					handleSubmitDelete={handleSubmitDelete(onSubmitDelete)}
					errorsDelete={errorsDelete}
					isSubmittingDelete={isSubmittingDelete}
					turnos={turnos}
				/>
			</Tab>
		</Tabs>
		      <div style={pageStyles.grid}>
      {turnosFiltrados.length === 0 ? (
        <div style={pageStyles.containerCentered}>
          <p style={pageStyles.message}>No se encontraron turnos.</p>
          <button id="login" type="button" className="login-btn" onClick={() => window.location.reload()}>
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <table className="table responsive-table">
          <thead>
            <tr>
              <th>Numero de Turno</th>
              <th>Paciente</th>
                  <th>Tipo de Analisis</th>
                  <th>Centro de Atencion</th>
                  <th>Fecha y Hora Reserva</th>
                  <th>Fecha y Hora Extraccion</th>
                  <th>Estado</th>
                  <th>Observación</th>
                  <th>Recibe Mail</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
              {turnosFiltrados.map((turno) => (
                <tr key={turno.id}>
                  <td>{turno.id}</td>
                  <td>{turno.paciente?.apellido + ", " + turno.paciente?.nombre}</td>
                  <td>{turno.tipoAnalisis?.nombre}</td>
                  <td>{turno.centroAtencion?.nombre}</td>
                  <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                  <td>{turno.fechaHoraExtraccion && new Date(turno.fechaHoraExtraccion).toLocaleString() !== "31/12/1969, 09:00:00" ? new Date(turno.fechaHoraExtraccion).toLocaleString() : "-"}</td>
                  <td>{turno.estado}</td>
                  <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                  <td>{turno.recibeMail ? "Si" : "No"}</td>
                  {<td><button style={{background:"none", color:"blue", fontStyle:"underline"}} onClick={() => handleDetalleClick(turno.id)}>Ver Detalle</button></td>}
                </tr>
              ))}
            </tbody>
            </table>
          )}
      </div>
      {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
            <div className="detalle-modal">
              <h4 style={{fontWeight: 'bold', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                Detalles del turno</h4>
              <div style={{ marginTop: '20px' }}>
                {turnoDetalleId && (() => {
                const turno = turnosFiltrados.find((t) => t.id === Number(turnoDetalleId));
                if (!turno) return null;
                return (
                  <div className="turno-detalle-grid">
                    <div className="form-group">
                      <label>
                        Paciente: {turno.paciente?.nombre}, {turno.paciente?.apellido}
                      </label>
                      <label>
                        DNI: {turno.paciente?.dni} 
                      </label>
                      <label>
                        Fecha Nac: {turno.paciente?.fechaNacimiento ? new Date(turno.paciente.fechaNacimiento).toLocaleDateString() : "-"}
                      </label>
                      <label>
                        Dirección: {turno.paciente?.direccion}
                      </label>
                    </div>
                    <div className="form-group">
                      <label>
                      Tel: {turno.paciente?.telefono}
                      </label>
                      <label>
                        Tipo de Análisis: {turno.tipoAnalisis?.nombre} 
                      </label>
                      <label>
                        Importe: {turno.tipoAnalisis?.importe}
                      </label>
                      <label>
                      Plantilla: {turno.tipoAnalisis?.plantillaAnalisis}
                      </label>
                    </div>
                  </div>
                );
              })()}
                <button onClick={() => setShowModal(false)} className='login-btn' style={{ backgroundColor: 'red', marginTop: '20px' }}>
                  Volver
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
	);
}

const pageStyles = {
	container: {
		fontFamily: "Arial, sans-serif",
		maxWidth: "1200px",
		margin: "0 auto",
		textAlign: "center",
	},
	containerCentered: {
		fontFamily: "Arial, sans-serif",
		maxWidth: "1200px",
		margin: "0 auto",
		textAlign: "center",
	},
	header: {
		fontSize: "2.2rem",
		fontWeight: "700",
		color: "#2c3e50",
		marginBottom: "0.5rem",
	},
	grid: {
		marginTop:"50px",
		display: "flex",
		gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
		justifyItems: "center",
	},
	message: {
		fontSize: "1.2em",
		color: "#666",
		padding: "50px 0",
	},
	errorMessage: {
		fontSize: "1.2em",
		color: "#e74c3c",
		padding: "50px 0",
	},
	spinner: {
		border: "4px solid rgba(0, 0, 0, 0.1)",
		borderLeftColor: "#007bff",
		borderRadius: "50%",
		width: "40px",
		height: "40px",
		animation: "spin 1s linear infinite",
		margin: "30px auto",
	},
};

export default TurnoAdmin;