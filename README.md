# AA2 - Proyectos y Tareas
Aplicación web para gestionar **proyectos** y **tareas** con un backend REST y un frontend web.  
Base de datos en **SQLite**.

## Funcionalidades
- CRUD completo de **proyectos**.
- CRUD completo de **tareas**.
- Relación 1:N: un proyecto tiene muchas tareas (`tasks.project_id`).
- Validación en backend con **express-validator**.
- Validación en frontend antes de enviar formularios.

## Estructura
- `backend/`: API REST (Node.js + Express + Knex + SQLite)
- `frontend/`: HTML, CSS y JavaScript (Parcel)

## Requisitos
- Node.js (LTS)
- npm
- DB Browser for SQLite (opcional para crear/ver la BD)

## Base de datos
Archivo: `backend/projects.db`

Tablas:
- `projects`
  - `id` INTEGER (PK, Autoincrement)
  - `name` TEXT (Not Null)
  - `description` TEXT
- `tasks`
  - `id` INTEGER (PK, Autoincrement)
  - `project_id` INTEGER (Not Null)
  - `title` TEXT (Not Null)
  - `description` TEXT
  - `is_done` INTEGER (Default 0)

## Instalación y puesta en marcha

### Backend
1. Entrar en la carpeta:
   ```
   cd backend
   ```
2. Instalar dependencias:
   ```
   npm install
   ```
3. Instalar validaciones backend:
   ```
   npm install express-validator
   ```
4. Crear la base de datos `backend/projects.db` con las tablas indicadas.
5. Iniciar servidor:
   ```
   npm start
   ```
   Backend en: `http://localhost:8080`

### Frontend (Parcel)
1. Entrar en la carpeta:
   ```
   cd frontend
   ```
2. Instalar dependencias:
   ```
   npm install
   ```
3. Iniciar:
   ```
   npm start -- src/index.html src/task.html
   ```
   Parcel mostrará la URL (normalmente `http://localhost:1234`).

## Uso de la aplicación
1. En la página de proyectos, crea un proyecto.
2. Pulsa **“Tareas”** en un proyecto para ir a su lista de tareas.
3. En la página de tareas, crea, edita o elimina tareas del proyecto.

## Validaciones
Backend (express-validator):
- `projects`: `name` obligatorio.
- `tasks`: `project_id` válido, `title` obligatorio, `is_done` 0/1.

Frontend:
- `projects`: nombre obligatorio.
- `tasks`: título obligatorio.

## API (resumen)
- `GET /projects`
- `GET /projects/:id`
- `POST /projects`
- `PUT /projects/:id`
- `DELETE /projects/:id`
- `GET /tasks`
- `GET /tasks/:id`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`
- `GET /projects/:id/tasks`

## Tecnologías
- Node.js + Express
- Knex + SQLite
- HTML + JavaScript

## Dependencias backend
- express
- express-validator
- knex
- sqlite3
- cors
