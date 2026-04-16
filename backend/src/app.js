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