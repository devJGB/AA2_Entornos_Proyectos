// usamos axios para hacer peticiones http
import axios from 'axios';

// Url backend
const API_URL = 'http:/localhots:8080';

// Ref contenedor html donde pintamoslos poryectos
const projectsDiv = document.getElementById('projects');

// Función para cargar losp royectos desde el backend
async function loadProjects() {
    //petición GET a /projects
    const response = await axios.get(`${API_URL}/projects`);
    const projects = response.data;

    // Si no hay proyectos
    if(projects.length == 0) {
        projectsDiv.innerHTML = '<p>No hay proyectos en tu lista.</p>';
        return;
    }

    // Si hay proyectos,los pintamos
    projectsDiv.innerHTML = `
    <ul>
    ${projects.map((p) =>
        `<li><strong>${p.name}</strong> * ${p.description ?? ""}</li>`
    )
    .join('')}
    </ul>
    `;
}

//Ejecutamos la app
loadProjects();