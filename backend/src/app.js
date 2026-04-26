const express = require("express");
const cors = require("cors");
const knex = require("knex");
const { body, param, validationResult } = require("express-validator");

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

// Middleware para devolver errores de validación
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/// CRUD PROYECTOS ///

// Listar proyectos
app.get("/projects", async (req, res) => {
  const projects = await db("projects").select("*");
  res.json(projects);
});

// Obtener proyecto por id (validar id)
app.get(
  "/projects/:id",
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation,
  async (req, res) => {
    const project = await db("projects")
      .select("*")
      .where({ id: req.params.id })
      .first();

    if (!project) {
      return res.status(404).json({ message: "Proyecto no encontrado." });
    }

    res.json(project);
  }
);

// Crear proyecto (validar name)
app.post(
  "/projects",
  [
    body("name").trim().notEmpty().withMessage("El nombre es obligatorio"),
    body("description")
      .optional()
      .isString()
      .withMessage("La descripción debe ser texto"),
  ],
  handleValidation,
  async (req, res) => {
    const { name, description } = req.body;

    await db("projects").insert({
      name,
      description,
    });

    res.status(201).json({ message: "Proyecto creado" });
  }
);

// Editar proyecto (validar id + name)
app.put(
  "/projects/:id",
  [
    param("id").isInt({ min: 1 }).withMessage("ID inválido"),
    body("name").trim().notEmpty().withMessage("El nombre es obligatorio"),
    body("description")
      .optional()
      .isString()
      .withMessage("La descripción debe ser texto"),
  ],
  handleValidation,
  async (req, res) => {
    const { name, description } = req.body;

    await db("projects")
      .update({ name, description })
      .where({ id: req.params.id });

    res.status(204).json({});
  }
);

// Eliminar proyecto (validar id)
app.delete(
  "/projects/:id",
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation,
  async (req, res) => {
    await db("projects").del().where({ id: req.params.id });
    res.status(204).json({});
  }
);

/// CRUD TAREAS ///

// Listar tareas
app.get("/tasks", async (req, res) => {
  const tasks = await db("tasks").select("*");
  res.json(tasks);
});

// Obtener tarea por id (validar id)
app.get(
  "/tasks/:id",
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation,
  async (req, res) => {
    const task = await db("tasks")
      .select("*")
      .where({ id: req.params.id })
      .first();

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(task);
  }
);

// Crear tarea (validar campos)
app.post(
  "/tasks",
  [
    body("project_id")
      .isInt({ min: 1 })
      .withMessage("project_id inválido"),
    body("title").trim().notEmpty().withMessage("El título es obligatorio"),
    body("description")
      .optional()
      .isString()
      .withMessage("La descripción debe ser texto"),
    body("is_done")
      .optional()
      .isInt({ min: 0, max: 1 })
      .withMessage("is_done debe ser 0 o 1"),
  ],
  handleValidation,
  async (req, res) => {
    const { project_id, title, description, is_done } = req.body;

    await db("tasks").insert({
      project_id,
      title,
      description,
      is_done: is_done ?? 0,
    });

    res.status(201).json({ message: "Tarea creada" });
  }
);

// Editar tarea (validar id + campos)
app.put(
  "/tasks/:id",
  [
    param("id").isInt({ min: 1 }).withMessage("ID inválido"),
    body("project_id")
      .isInt({ min: 1 })
      .withMessage("project_id inválido"),
    body("title").trim().notEmpty().withMessage("El título es obligatorio"),
    body("description")
      .optional()
      .isString()
      .withMessage("La descripción debe ser texto"),
    body("is_done")
      .optional()
      .isInt({ min: 0, max: 1 })
      .withMessage("is_done debe ser 0 o 1"),
  ],
  handleValidation,
  async (req, res) => {
    const { project_id, title, description, is_done } = req.body;

    await db("tasks")
      .update({ project_id, title, description, is_done })
      .where({ id: req.params.id });

    res.status(204).json({});
  }
);

// Eliminar tarea (validar id)
app.delete(
  "/tasks/:id",
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation,
  async (req, res) => {
    await db("tasks").del().where({ id: req.params.id });
    res.status(204).json({});
  }
);

// Listar tareas por proyecto (validar id)
app.get(
  "/projects/:id/tasks",
  [param("id").isInt({ min: 1 }).withMessage("ID inválido")],
  handleValidation,
  async (req, res) => {
    const tasks = await db("tasks")
      .select("*")
      .where({ project_id: req.params.id });

    res.json(tasks);
  }
);

app.listen(8080, () => {
  console.log("Backend iniciado en http://localhost:8080");
});