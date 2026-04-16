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
})