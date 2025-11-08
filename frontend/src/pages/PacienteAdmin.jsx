import { useForm } from "react-hook-form";
import {usePaciente, deletePaciente, modifyPaciente, addPaciente, getPacienteQuery} from "../hooks/usePacientes";
import "../pages/Admin.css";
import { Tab } from "bootstrap";
import Tabs from "react-bootstrap/Tabs";
import { useEffect, useState } from "react";
import TabPacienteFiltrar from "../components/tabsAdmins/Paciente/TabPacienteFiltrar";
import TabPacienteModificar from "../components/tabsAdmins/Paciente/TabPacienteModificar";
import TabPacienteAgregar from "../components/tabsAdmins/Paciente/TabPacienteAgregar";
import TabPacienteEliminar from "../components/tabsAdmins/Paciente/TabPacienteEliminar";

function PacienteAdmin() {

const [pacientesFiltrados, setPacientesFiltrados] = useState([]); //Definicion del estado
const { isLoading, isError, error, pacientes, refetch } = usePaciente(); //Traida de todos los pacientes

const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmittingModify } } = useForm({ mode: "onBlur" });
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmittingAdd } } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmittingDelete }, } = useForm({ mode: "onBlur" });
const { register: registerFilter, handleSubmit: handleSubmitFilter, formState: { errors: errorsFilter, isSubmittingFilter }, } = useForm({ mode: "onBlur" });

const onSubmitDelete = async (data) => {
try {
	const id = data.id; 
	await deletePaciente(id);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al registrar:", error);
}
};

const onSubmitModify = async (data) => {
try { 
	await modifyPaciente(data);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try { 
	await addPaciente(data);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al agregar:", error);
}
};

const onSubmitFilter = async (data) => {
	try {
		const response = await getPacienteQuery(data); //Filtrado condicional
		setPacientesFiltrados(response || []); 
	} catch (error) {
		console.error("Fallo al filtrar:", error);
	}
};

useEffect(() => {
		if (Array.isArray(pacientes)) {
			setPacientesFiltrados(pacientes); //La primera vez llena el arreglo con todos los pacientes, desp se actaliza con los filtros
		}
	}, [pacientes]);

	if (isLoading) {
		return (
			<div style={pageStyles.containerCentered}>
				<p style={pageStyles.message}>Cargando pacientes...</p>
				<div style={pageStyles.spinner}></div>
			</div>
		);
	}

	if (isError) {
		return (
			<div style={pageStyles.containerCentered}>
				<p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los pacientes: {error.message}</p>
			</div>
		);
	}

	return (
		<div style={pageStyles.container}>
			<h1 style={pageStyles.header}>Nuestros Pacientes</h1>
			<Tabs
			defaultActiveKey="filtrar"
			id="justify-tab-example"
			className="mb-3"
			justify
			style={{marginTop:"30px"}}
		>
		<Tab eventKey="filtrar" title="Filtrar">
			<TabPacienteFiltrar
				registerFilter={registerFilter}
				handleSubmitFilter={handleSubmitFilter(onSubmitFilter)}
				errorsFilter={errorsFilter}
				isSubmittingFilter={isSubmittingFilter}
			/>
		</Tab>

			<Tab eventKey="modificar" title="Modificar">
				<TabPacienteModificar
					registerModify={registerModify}
					handleSubmitModify={handleSubmitModify}
					errorsModify={errorsModify}
					isSubmittingModify={isSubmittingModify}
					pacientes={pacientes}
					onSubmitModify={onSubmitModify}
				/>
			</Tab>
			<Tab eventKey="agregar" title="Agregar">
				<TabPacienteAgregar
					registerAdd={registerAdd}
					handleSubmitAdd={handleSubmitAdd}
					errorsAdd={errorsAdd}
					isSubmittingAdd={isSubmittingAdd}
					onSubmitAdd={onSubmitAdd}
				/>
			</Tab>
			<Tab eventKey="eliminar" title="Eliminar">
				<TabPacienteEliminar
					registerDelete={registerDelete}
					handleSubmitDelete={handleSubmitDelete}
					errorsDelete={errorsDelete}
					isSubmittingDelete={isSubmittingDelete}
					pacientes={pacientes}
					onSubmitDelete={onSubmitDelete}
				/>
			</Tab>
		</Tabs>
			<div style={pageStyles.grid}>
				{pacientesFiltrados.length === 0 ? (
					<div style={pageStyles.containerCentered}>
						<p style={pageStyles.message}>No se encontraron pacientes.</p>
						<button id="login" type="button" className="login-btn" onClick={() => window.location.reload()}>
							Limpiar filtros
						</button>
					</div>
				) : (
					<table className="table" style={{display: "block",
              
							maxWidth: "fit-content",
							margin: "0 auto",
							overflowX: "auto",
							whiteSpace: "nowrap"}}>
						<thead>
							<tr>
								<th>Id</th>
								<th>Nombre</th>
								<th>DNI</th>
								<th>Direccion</th>
								<th>Telefono</th>
								<th>Fecha de Nacimiento</th>
							</tr>
						</thead>
						<tbody>
							{pacientesFiltrados.map((paciente) => (
								<tr key={paciente.id}>
									<td>{paciente.id}</td>
									<td>{paciente.nombre + " " + paciente.apellido}</td>
									<td>{paciente.dni}</td>
									<td>{paciente.direccion}</td>
									<td>{paciente.telefono}</td>
									<td>{new Date(paciente.fechaNacimiento).toLocaleDateString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
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
	table: {
		justifyItems:"center"
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
		gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", // Diseño responsivo en cuadrícula
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
		// Un spinner CSS simple
		border: "4px solid rgba(0, 0, 0, 0.1)",
		borderLeftColor: "#007bff",
		borderRadius: "50%",
		width: "40px",
		height: "40px",
		animation: "spin 1s linear infinite",
		margin: "30px auto",
	},
	retryButton: {
		backgroundColor: "#ffc107",
		color: "black",
		border: "none",
		padding: "10px 20px",
		borderRadius: "5px",
		cursor: "pointer",
		marginTop: "20px",
		fontSize: "1em",
		transition: "background-color 0.2s ease-in-out",
	},
};

export default PacienteAdmin;
