import { useForm, useWatch } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth.js";
import '../../pages/Register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Tab.css';
import { useEffect, useMemo, useState } from 'react';
import {useTurnos, deleteTurnos, addTurnos, modifyTurnos, getTurnosQuery} from "../../hooks/useTurnos";

const TabTurnoGestion = () => {
  const { user } = useAuth();
  const { register: registerAdd, handleSubmit: handleSubmitAdd, formState: { errors: errorsAdd, isSubmitting: isSubmittingAdd }, control } = useForm({ mode: "onBlur" });
  const { isLoading, isError, error, turnos = [], refetch } = useTurnos();
  const [showModal, setShowModal] = useState(false);
  const [turnoAEliminarId, setTurnoAEliminarId] = useState(null);
  const [turnosPaciente, setTurnosPaciente] = useState([]);
  
  const handleCerrarModal = () => {
    setShowModal(false);
    setTurnoAEliminarId(null);
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

  const handleEliminarClick = (id) => {
    setTurnoAEliminarId(id);
    setShowModal(true);
  };

  const turnosFiltradosGestion = useMemo(() => {
    if (!Array.isArray(turnos) || !user?.paciente?.id) return [];
    return turnos.filter(
      (turno) =>
        (turno.estado === "Pendiente" || turno.estado === "Confirmado") &&
        turno.paciente?.id === user.paciente.id
    );
  }, [turnos, user?.paciente?.id]);

  return (
    <>
      <h2 className='titulo'>Mis turnos</h2>
      {turnosFiltradosGestion.length > 0 ? (
        <div style={{ marginTop: '20px', overflowX: 'scroll'}}>
          <table className="table">
            <thead>
              <tr>
                <th>Número de Turno</th>
                <th>Tipo de Análisis</th>
                <th>Centro de Atención</th>
                <th>Fecha y Hora</th>
                <th>Estado</th>
                <th>Observación</th>
                <th>Recibe Mail</th>
                <th>Cancelar Turno</th>
              </tr>
            </thead>
            <tbody style={{ verticalAlign: 'middle' }}>
              {turnosFiltradosGestion.map((turno) => {
                if (turno.estado === "Anulado") {
                  return null;
                }
                return (
                  <tr key={turno.id}>
                    <td>{turno.id}</td>
                    <td>{turno.tipoAnalisis?.nombre || '-'}</td>
                    <td>{turno.centroAtencion?.nombre || '-'}</td>
                    <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                    <td>{turno.estado}</td>
                    <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                    <td>{turno.recibeMail ? "Sí" : "No"}</td>
                    <td>
                      <button
                        onClick={() => handleEliminarClick(turno.id)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'red',
                          cursor: 'pointer',
                          fontSize: '20px',
                          fontStyle: 'underline'
                        }}
                      >
                        ❌
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p style={{ marginTop: "30px" }}>No tienes turnos registrados.</p>
      )}
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
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
              minWidth: '300px'
            }}>
              <h4 style={{fontWeight: 'bold', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'}}>
                Confirmar Cancelación</h4>
              <p>
                ¿Estás seguro de que quieres cancelar este turno?</p>
              <div style={{ marginTop: '20px' }}>
                <button onClick={handleCerrarModal} className='login-btn' style={{ backgroundColor: 'red' }}>
                  Volver
                </button>
                 <button onClick={handleConfirmarEliminacion} className='login-btn' style={{ marginLeft: '10px' }}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default TabTurnoGestion;
