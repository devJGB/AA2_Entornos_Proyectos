# AA2 - Proyectos y Tareas

Aplicación web para gestionar **proyectos** y **tareas** con un backend REST y un frontend web.  
Base de datos en **SQLite**.

## Estructura
- `backend/`: API REST (Node.js + Express + Knex + SQLite)
- `frontend/`: HTML, CSS y JavaScript

## Requisitos
- Node.js (LTS)
- npm
- DB Browser for SQLite (instalado)

## Instalar SQLite (DB Browser)
1. Descargar e instalar **DB Browser for SQLite**.
2. Abrir el programa para crear la base de datos `projects.db`.

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
3. Crear base de datos con DB Browser:
   - Archivo: `backend/projects.db`
   - Tabla `projects`:
     - `id` INTEGER (PK, Autoincrement)
     - `name` TEXT (Not Null)
     - `description` TEXT
   - Tabla `tasks`:
     - `id` INTEGER (PK, Autoincrement)
     - `project_id` INTEGER (Not Null)
     - `title` TEXT (Not Null)
     - `is_done` INTEGER (Default 0)
4. Iniciar servidor:
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
   npm start
   ```
   Parcel mostrará la URL (normalmente `http://localhost:1234`).

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

## Tecnologías
- Node.js + Express
- Knex + SQLite
- HTML + JavaScript

## Dependencias backend
Paquetes instalados:
- express
- knex
- sqlite3
- cors
