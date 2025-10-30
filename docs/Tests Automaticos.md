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

<img width="963" height="230" alt="Test integracion" src="https://github.com/user-attachments/assets/35e9ea7a-38b4-49b7-b559-a33dfaa86bb8" />

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

<img width="955" height="241" alt="Test Unitario" src="https://github.com/user-attachments/assets/a1600cea-915f-4e8c-89e4-0578ca427e8d" />

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

<img width="1094" height="172" alt="Test E2E" src="https://github.com/user-attachments/assets/e97bc84a-7346-4d91-a0c8-071836b97958" />

## Test Automatizado

### Descripción

Un test automatizado es un proceso que utiliza herramientas de software para ejecutar pruebas predefinidas en una aplicación, en nuestro caso probar el funcionamiento de el controlador de Centros de Atencion. Se centra en verificar el correcto funcionamiento del software, como la validación de funcionalidades, pruebas de regresión y pruebas de interfaz de usuario. Dado que nos referimos a un test simple solo se analizaran las peticiones y respuestas contra el backend.

### Archivo

backend/test/centroAtencion.test.ts

### Comando de ejecución

```bash
cd backend
pnpm test
```

### Resultados
