# Instrucciones de Instalación

## Requisitos Previos

### Software Requerido
- **Node.js** (versión 18 o superior)
- **pnpm** (versión 10.14.0 o superior)
- **MySQL** (versión 8.0 o superior)
- **Git**

### Stack Tecnológico
### Backend
- Node.js + Express + TypeScript
- MikroORM + MySQL
- JWT Authentication
### Frontend
- React 19 + TypeScript
- Vite (bundler)
- React Router DOM
- React Bootstrap + Bootstrap 5
- Axios (HTTP client)
- React Query (TanStack Query)
- React Hook Form

### Servicios Externos
- Cuenta de email para envío de notificaciones (Gmail, Outlook, etc.)

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Santi3226/tp-dsw.git
cd tp-dsw
```

### 2. Cambiar a la Rama de Desarrollo

```bash
git checkout dev
```

### 3. Instalar Dependencias

#### Backend
```bash
cd backend
pnpm install
```

#### Frontend
```bash
cd ../frontend
pnpm install
```

### 4. Configuración de Variables de Entorno

Crear archivo `.env` en la raiz del directorio `backend`:

```bash
cd backend
cp .env.example .env  # Si existe un archivo de ejemplo
# O crear el archivo .env directamente
touch .env
```

#### Contenido del archivo `.env`:

```env
# Mailer
SMTP_HOST= Host del Mail
SMTP_PORT= Puerto
SMTP_USER= Usuario del Mail
SMTP_PASS= Contraseña del Mail 

# JWT
claveJWT = Clave para JWT

# BD
clientUrl = URL de BD
dbName = laboratorio

# API Keys
GOOGLE_MAPS_API_KEY=tu_google_maps_api_key
```

### 5. Compilar TypeScript

```bash
cd backend
pnpm run build
```

### 6. Configurar Base de Datos

#### Generar/Actualizar Schema
El sistema utiliza MikroORM para gestión automática del schema:

```bash
# El schema se actualiza automáticamente al iniciar la aplicación
# Esto está configurado en orm.ts con syncSchema()
```

#### Para recrear completamente el schema
Descomenta las líneas en `src/shared/db/orm.ts`:
```typescript
await generator.dropSchema(); // Descomentar para eliminar schema
await generator.createSchema(); // Descomentar para crear schema nuevo
```

## Ejecución

### Modo Desarrollo

#### Backend
```bash
cd backend
pnpm run start:dev
```
Esto iniciará el servidor con hot-reload en `http://localhost:3000`

#### Frontend
```bash
cd frontend
pnpm run dev
```
Esto iniciará el frontend con Vite en `http://localhost:5173`

### Ejecutar Ambos Servicios Simultáneamente
Para desarrollo, abre dos terminales:

**Terminal 1 (Backend):**
```bash
cd backend
pnpm run start:dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
pnpm run dev
```

### Scripts Disponibles

#### Backend
```json
{
  "build": "tsc -p ./tsconfig.json",
  "start:dev": "tsc-watch --noClear -p ./tsconfig.json --onSuccess \"node ./dist/app.js\""
}
```

#### Frontend
```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview"
}
```

- `pnpm run dev` - Servidor de desarrollo con hot-reload (puerto 5173)
- `pnpm run build` - Build de producción
- `pnpm run preview` - Preview del build de producción

## Estructura del Proyecto

```
tp-dsw/
├── backend/
│   ├── src/
│   │   ├── centroAtencion/
│   │   ├── localidad/
│   │   ├── paciente/
│   │   ├── turno/
│   │   ├── tipoAnalisis/
│   │   ├── plantillaAnalisis/
│   │   ├── parametroAnalisis/
│   │   ├── resultadoAnalisis/
│   │   ├── politica/
│   │   ├── usuario/
│   │   ├── shared/
│   │   │   └── db/
│   │   │       └── orm.ts
│   │   ├── app.ts
│   │   └── cron.ts
│   ├── dist/ (generado)
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── helpers/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── providers/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── dist/ (generado)
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .env
├── README.md
└── .gitignore
```

## Configuración de Desarrollo

### URLs por Defecto
- **Backend API**: `http://localhost:3000`
- **Frontend**: `http://localhost:5173`

### 1. Configurar CORS
En desarrollo, CORS está configurado para permitir cualquier origen:
```typescript
res.setHeader('Access-Control-Allow-Origin', '*');
```

**En producción, cambiar por dominios específicos:**
```typescript
// Backend CORS
res.setHeader('Access-Control-Allow-Origin', 'https://tu-frontend-dominio.com');
```

### Error de Conexión a Base de Datos
1. Verificar que MySQL esté ejecutándose
2. Comprobar credenciales en `.env`
3. Confirmar que la base de datos existe
4. Verificar permisos del usuario

### Problemas de Compilación Frontend
```bash
# Limpiar cache de Vite
cd frontend
rm -rf node_modules/.vite
rm -rf dist
pnpm run build
```

### Error de Conexión Frontend-Backend
1. Verificar que ambos servicios estén ejecutándose
2. Comprobar la URL de la API en `.env` del frontend
3. Verificar configuración de CORS en el backend
4. Revisar la consola del navegador para errores de red


### Error de Compilación TypeScript (Backend)
```bash
# Limpiar dist y recompilar
cd backend
rm -rf dist
pnpm run build
```

### Problemas con dependencias
```bash
# Limpiar cache y reinstalar
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```