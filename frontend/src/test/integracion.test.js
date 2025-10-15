import { describe, it, expect } from 'vitest';
import axiosInstance from "../helpers/api";

describe('Test de Integración - API de Centros', () => {

  it('debe obtener centros desde el backend', async () => {
    const response = await axiosInstance.get('/centroAtencion');
    const data = response.data;

    expect(response.status).toBe(200);
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
  });

  it('debe obtener un centro específico por ID', async () => {
    const listResponse = await axiosInstance.get('/centroAtencion');
    const listData = listResponse.data;

    if (listData.data && listData.data.length > 0) {
      const primerCentroId = listData.data[0].id;

      const response = await axiosInstance.get(`/centroAtencion/${primerCentroId}`);
      const data = response.data;

      expect(response.status).toBe(200);
      expect(data.data).toHaveProperty('id', primerCentroId);
      expect(data.data).toHaveProperty('nombre');
      expect(data.data).toHaveProperty('domicilio');
    }
  });

  it('debe retornar error 404 para centro inexistente', async () => {
    const response = await fetch('http://localhost:3000/api/centroAtencion/99999'); //Tengo q usar fetch pq axios tira error automatico
    expect(response.status).toBe(404);
  });
});