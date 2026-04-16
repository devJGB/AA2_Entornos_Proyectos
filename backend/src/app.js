// Importamos Express, cors y knex para bbdd para crear el serbidot HHTp
const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();
app.use(cors());
app.use(express.json());

// creo la bbdd
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: 'projects.db'
    },
    useNullAsDefault: true
});

/// CRUD PROYECTOS ///

// Obtener todos los proyectos
app.get('/projects', async (req , res) => {
    const projects = (await db('projects')).select('*');
    res.json(projects);
});

// Obtener un proyecto por id
app.get('/projects/:id', async (req, res) => {
    const project = await db('projects')
    .select('*')
    .where({id: req.params.id})
    .first();

    if(!project) {
        return res.status(404).json({ message: 'Proyecto no encontrado.'});
    }

    res.json(project);
});

// Crear un proyecto
app.post('/projects', async (req, res) => {
    const {name , description } = req.body;

    await db('projects').insert({
        name,
        description,
    });

    res.status(201).json({message: 'Proyecto creado'});
});

// Actualizar un proyecto
app.put('projects/:id', async (req, res) => {
    const { name, description} = req.body;

    await db('projects')
        .update({name, description})
        .where({id: req.params.id});

        res.status(204).json({});  
});

// Eliminar un proyecto
app.delete('/project/:id', async (req, res) => {
    await db('projects').del().where({id: req.params.id});
    res.status(204).json({});
});

/// CRUD TAREAS ///

// Obtener todas las tareas
app.get('/task', async (req, res) => {
    const tasks = await db('tasks').select('*');
    res.json(tasks);
});

// Obtener una tarea por id
app.get('/task/:id', async (req, res) => {
    const task = await db('task')
        .select('*')
        .where({id: req.params.id})
        .first();

        if(!task) {
            return res.status(404).json({message: 'Tarea no encontrada'});
        }
        res.json(task);
});

// Crear una tarea
app.post('/task', async (req, res) => {
    const { project_id, title, is_done} = req.body;

    await db('tasks').insert({
        project_id,
        title,
        is_done: is_done ?? 0,
    });

    res.status(201).json({message: 'Tarea creada'});
});

// Actualizar una tarea
app.put('/tasks/:id', async (req, res) => {
    const {project_id, title, is_done} = req.body;

    await db('task')
        .update({project_id, title, is_done})
        .where({id: req.params.id});

        res.status(204).json({});
});

// Eliminar tarea
app.delete('/tasks/id', async (req, res) => {
    await db('task').del().where({id: req.params.id});
    res.status(204).json({});
});

// Obtener tareas por poyectos
app.get('/projects/:id/task', async (req, res) => {
    const tasks = await db('tasks')
        .select('*')
        .where({project_id: req.params.id});

        res.json(tasks);
});