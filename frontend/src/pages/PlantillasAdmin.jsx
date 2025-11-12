import { useForm } from "react-hook-form";
import "../pages/Admin.css";
import Tabs from "react-bootstrap/esm/Tabs";
import { Tab } from "bootstrap";
import { useEffect, useState } from "react";
import axiosInstance from "../helpers/api";
import TabPlantillaModificar from "../components/tabsAdmins/Plantilla/TabPlantillaModificar";
import TabPlantillaAgregar from "../components/tabsAdmins/Plantilla/TabPlantillaAgregar";
import TabPlantillaEliminar from "../components/tabsAdmins/Plantilla/TabPlantillaEliminar";
import { addPlantillas,deletePlantillas,modifyPlantillas, usePlantillasAnalisis, } from "../hooks/usePlantillasAnalisis";

function PlantillasAdmin() {
const { register: registerModify, handleSubmit: handleSubmitModify, formState: { errors: errorsModify, isSubmittingModify } } = useForm({ mode: "onBlur" });
const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmittingAdd } } = useForm({ mode: "onBlur" });
const { register: registerDelete, handleSubmit: handleSubmitDelete, formState: { errors: errorsDelete, isSubmittingDelete }, } = useForm({ mode: "onBlur" });
//3 forms distintos pq se solapan los errores y los botones
const [plantillaAnalisis, setPlantillaAnalisis] = useState([]);

useEffect(() => {
		const getDatos = async () => {
			try {
				const plantillaAnalisis = await axiosInstance.get('/plantillaAnalisis'); 
				setPlantillaAnalisis(plantillaAnalisis.data.data);
			} catch (error) {
				console.error("Error al obtener los datos:", error);
			}
		};
		getDatos();
	}, []);

const onSubmitModify = async (data) => {
try { 
	await modifyPlantillas(data);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al modificar:", error);
}
};

const onSubmitAdd = async (data) => {
try { 
	await addPlantillas(data);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al agregar:", error);
}
};

const onSubmitDelete = async (data) => {
try { 
	await deletePlantillas(data);
	refetch(); 
} 
catch (error) {
	console.error("Fallo al eliminar:", error);
}
};


const { isLoading, isError, error, plantillas = [] , refetch } = usePlantillasAnalisis();

	if (isLoading) {
		return (
			<div style={pageStyles.containerCentered}>
				<p style={pageStyles.message}>Cargando plantillas...</p>
				<div style={pageStyles.spinner}></div>
			</div>
		);
	}

	if (isError) {
		return (
			<div style={pageStyles.containerCentered}>
				<p style={pageStyles.errorMessage}>Ha ocurrido un error y no se pudieron obtener los tipos: {error.message}</p>
			</div>
		);
	}

	return (
		<div style={pageStyles.container}>
			<h1 style={pageStyles.header}>Nuestras Plantillas de Análisis</h1>
			<Tabs
			defaultActiveKey="modificar"
			id="justify-tab-example"
			className="mb-3"
			justify
			style={{marginTop:"30px"}}
			>
			<Tab eventKey="modificar" title="Modificar">
				<TabPlantillaModificar
					registerModify={registerModify}
					handleSubmitModify={handleSubmitModify}
					errorsModify={errorsModify}
					isSubmittingModify={isSubmittingModify}
					plantillas={plantillas}
					onSubmitModify={onSubmitModify}
				/>
			</Tab>

			<Tab eventKey="agregar" title="Agregar">
				<TabPlantillaAgregar
					registerAdd={registerAdd}
					handleSubmitAdd={handleSubmitAdd}
					errorsAdd={errorsAdd}
					isSubmittingAdd={isSubmittingAdd}
					onSubmitAdd={onSubmitAdd}
				/>
			</Tab>

			<Tab eventKey="eliminar" title="Eliminar">
				<TabPlantillaEliminar
					registerDelete={registerDelete}
					handleSubmitDelete={handleSubmitDelete}
					errorsDelete={errorsDelete}
					isSubmittingDelete={isSubmittingDelete}
					plantillas={plantillas}
					onSubmitDelete={onSubmitDelete}
				/>
			</Tab>
			</Tabs>
			<div style={pageStyles.grid}>
			{plantillas.length === 0 ? (
					<div style={pageStyles.containerCentered}>
						<p style={pageStyles.message}>No se encontraron plantillas.</p>
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
									<th>Hs. Ayuno</th>
									<th>Preparación</th>
									<th>Tiempo Previsto</th>
									<th>Fecha Desde</th>
								</tr>
							</thead>
							<tbody>
							{plantillas.map((ta) => (
								<tr key={ta.id}>
									<td>{ta.id}</td>
									<td>{ta.hsAyuno}</td>
									<td>{ta.preparacion}</td>
									<td>{ta.tiempoPrevisto.toString()} días</td>
									<td>{new Date(ta.fechaDesde).toLocaleDateString()}</td>
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

export default PlantillasAdmin;
