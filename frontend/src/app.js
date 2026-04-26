import axios from "axios";

// URL del backend
const API_URL = "http://localhost:8080";

// Elementos del DOM
const projectsDiv = document.getElementById("projects");
const form = document.getElementById("project-form");
const idInput = document.getElementById("project-id");
const nameInput = document.getElementById("project-name");
const descInput = document.getElementById("project-description");
const cancelBtn = document.getElementById("cancel-edit");

// Cargar proyectos
async function loadProjects() {
  const res = await axios.get(`${API_URL}/projects`);
  const projects = res.data;

  if (projects.length === 0) {
    projectsDiv.innerHTML = "<p>No hay proyectos en tu lista.</p>";
    return;
  }

  projectsDiv.innerHTML = `
    <ul>
      ${projects
        .map(
          (p) => `
            <li>
              <div>
                <strong>${p.name}</strong> - ${p.description ?? ""}
              </div>
              <div class="btn-group">
                <!-- Botón para ir a tareas del proyecto -->
                <a class="btn-view-tasks" href="./task.html?project_id=${p.id}&name=${encodeURIComponent(
                  p.name
                )}">
                  Tareas
                </a>
                <button data-id="${p.id}" class="btn-edit">Editar</button>
                <button data-id="${p.id}" class="btn-delete">Eliminar</button>
              </div>
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

// Crear o editar proyecto
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = idInput.value;
  const payload = {
    name: nameInput.value,
    description: descInput.value,
  };

  if (id) {
    await axios.put(`${API_URL}/projects/${id}`, payload);
  } else {
    await axios.post(`${API_URL}/projects`, payload);
  }

  form.reset();
  idInput.value = "";
  loadProjects();
});

// Cancelar edición
cancelBtn.addEventListener("click", () => {
  form.reset();
  idInput.value = "";
});

// Editar o eliminar
projectsDiv.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("btn-delete")) {
    await axios.delete(`${API_URL}/projects/${id}`);
    loadProjects();
  }

  if (e.target.classList.contains("btn-edit")) {
    const res = await axios.get(`${API_URL}/projects/${id}`);
    const project = res.data;

    idInput.value = project.id;
    nameInput.value = project.name;
    descInput.value = project.description ?? "";
  }
});

loadProjects();
