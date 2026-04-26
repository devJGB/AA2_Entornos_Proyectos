const express = require("express");
const cors = require("cors");
const knex = require("knex");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a SQLite
const db = knex({
  client: "sqlite3",
  connection: {
    filename: "projects.db",
  },
  useNullAsDefault: true,
});

/// CRUD PROYECTOS ///

app.get("/projects", async (req, res) => {
  const projects = await db("projects").select("*");
  res.json(projects);
});

app.get("/projects/:id", async (req, res) => {
  const project = await db("projects")
    .select("*")
    .where({ id: req.params.id })
    .first();

  if (!project) {
    return res.status(404).json({ message: "Proyecto no encontrado." });
  }

  res.json(project);
});

app.post("/projects", async (req, res) => {
  const { name, description } = req.body;

  await db("projects").insert({
    name,
    description,
    
  });

  res.status(201).json({ message: "Proyecto creado" });
});

app.put("/projects/:id", async (req, res) => {
  const { name, description } = req.body;

  await db("projects")
    .update({ name, description })
    .where({ id: req.params.id });

  res.status(204).json({});
});

app.delete("/projects/:id", async (req, res) => {
  await db("projects").del().where({ id: req.params.id });
  res.status(204).json({});
});

/// CRUD TAREAS ///

app.get("/tasks", async (req, res) => {
  const tasks = await db("tasks").select("*");
  res.json(tasks);
});

app.get("/tasks/:id", async (req, res) => {
  const task = await db("tasks")
    .select("*")
    .where({ id: req.params.id })
    .first();

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada" });
  }

  res.json(task);
});

app.post("/tasks", async (req, res) => {
  const { project_id, title, description, is_done } = req.body;

  await db("tasks").insert({
    project_id,
    title,
    description,
    is_done: is_done ?? 0,
  });

  res.status(201).json({ message: "Tarea creada" });
});

app.put("/tasks/:id", async (req, res) => {
  const { project_id, title, description, is_done } = req.body;

  await db("tasks")
    .update({ project_id, title, description, is_done })
    .where({ id: req.params.id });

  res.status(204).json({});
});

app.delete("/tasks/:id", async (req, res) => {
  await db("tasks").del().where({ id: req.params.id });
  res.status(204).json({});
});

app.get("/projects/:id/tasks", async (req, res) => {
  const tasks = await db("tasks")
    .select("*")
    .where({ project_id: req.params.id });

  res.json(tasks);
});

app.listen(8080, () => {
  console.log("Backend iniciado en http://localhost:8080");
});
