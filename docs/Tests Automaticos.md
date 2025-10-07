# Tests Automatizados

- Vitest: Framework de testing
- React Testing Library: Para renderizado y queries de componentes
- Playwright: Framework de testing E2E
- Chromium: Navegador para ejecutar las pruebas
- Servidor local: Requiere backend (puerto 3000) y frontend (puerto 5173) activos

## Test de Integración

### Descripción

El test de integración verifica la comunicación correcta entre el frontend y el backend de la aplicación, específicamente probando el endpoint de la API de Centros de Atención.

### Archivo

`frontend/src/test/integracion.test.js`

### Comando de ejecución

```bash
cd frontend
pnpm test integracion
```

### Resultados



## Test Unitario

### Descripción

El test unitario prueba el componente MinimapaCentros de forma aislada, verificando su renderizado y comportamiento sin dependencias externas.
Debe Validar que el componente: Se renderice correctamente con los datos proporcionados, Muestre la lista de centros médicos, Permita la selección de un centro mediante clic, Muestre información detallada del centro seleccionado, Integre correctamente el mapa de Leaflet.

### Archivo

frontend/src/components/MinimapaCentros.test.jsx

### Comando de ejecución

```bash
cd frontend
pnpm test MinimapaCentros
```

### Resultados

![Test Unitario](image-1.png)

## Test End-to-End (E2E)

### Descripción

El test E2E simula el comportamiento de un usuario real navegando e interactuando con el minimapa de centros médicos en el navegador.
Debe verificar el flujo completo de usuario: Navegación a la página de centros de atención, Visualización del mapa interactivo de OpenStreetMap, Selección de centros médicos desde la lista, Geocodificación automática de direcciones, Visualización de marcadores en el mapa.

### Archivo

frontend/e2e/minimapaCentros.spec.js

### Comando de ejecución

```bash
cd frontend
pnpm test:e2e
```

### Resultados

![Test E2E](image-2.png)
