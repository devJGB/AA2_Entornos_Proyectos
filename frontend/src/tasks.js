import axios from "axios";

// URL del backend
const API_URL = "http://localhost:8080";

// Leer project_id desde querystring
const params = new URLSearchParams(window.location.search);
const projectId = params.get("project_id");
const projectName = params.get("name");

// Elementos DOM
const tasksDiv = document.getElementById("tasks");
const taskForm = document.getElementById("task-form");
const taskIdInput = document.getElementById("task-id");
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description"); 
const taskDoneInput = document.getElementById("task-done");
const taskCancelBtn = document.getElementById("cancel-task-edit");
const tasksTitle = document.getElementById("tasks-title");

// Si no hay project_id
if (!projectId) {
  tasksTitle.textContent = "Proyecto no especificado";
  tasksDiv.innerHTML = "<p>Falta el ID del proyecto.</p>";
}

// Título dinámico
if (projectName) {
  tasksTitle.textContent = `Tareas de: ${projectName}`;
}

// Cargar tareas por proyecto
async function loadTasks() {
  if (!projectId) return;

  const res = await axios.get(`${API_URL}/projects/${projectId}/tasks`);
  const tasks = res.data;

  if (tasks.length === 0) {
    tasksDiv.innerHTML = "<p>No hay tareas para este Proyecto</p>";
    return;
  }

  tasksDiv.innerHTML = `
    <ul>
      ${tasks
        .map(
          (t) => `
            <li>
              <div>
                <strong>${t.title}</strong> 
                - ${t.description ?? ""}
                - ${t.is_done ? "✅ Hecha" : "❌ Pendiente"}
              </div>
              <div class="btn-group">
                <button data-id="${t.id}" class="btn-edit-task">Editar</button>
                <button data-id="${t.id}" class="btn-delete-task">Eliminar</button>
              </div>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

// Crear o editar tarea
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!projectId) return;

  const id = taskIdInput.value;
  const payload = {
    project_id: Number(projectId),
    title: taskTitleInput.value,
    description: taskDescriptionInput.value, 
    is_done: taskDoneInput.checked ? 1 : 0,
  };

  if (id) {
    await axios.put(`${API_URL}/tasks/${id}`, payload);
  } else {
    await axios.post(`${API_URL}/tasks`, payload);
  }

  taskForm.reset();
  taskIdInput.value = "";
  loadTasks();
});

// Cancelar edición tarea
taskCancelBtn.addEventListener("click", () => {
  taskForm.reset();
  taskIdInput.value = "";
});

// Editar o eliminar tarea
tasksDiv.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("btn-delete-task")) {
    await axios.delete(`${API_URL}/tasks/${id}`);
    loadTasks();
  }

  if (e.target.classList.contains("btn-edit-task")) {
    const res = await axios.get(`${API_URL}/tasks/${id}`);
    const task = res.data;

    taskIdInput.value = task.id;
    taskTitleInput.value = task.title;
    taskDescriptionInput.value = task.description ?? ""; 
    taskDoneInput.checked = task.is_done === 1;
  }
});

// Cargar al iniciar
loadTasks();