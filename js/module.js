import vagas from '../data/vagas.js';

const jobsContainer = document.getElementById("jobs-container");
const paginationContainer = document.getElementById("pagination-container");

const MAX_VAGAS = 5;
let currentPage = 1;
const totalPages = Math.ceil(vagas.jobs.length / MAX_VAGAS);

function renderJobs(page) {
    jobsContainer.innerHTML = '';
    const startIndex = (page - 1) * MAX_VAGAS;
    const endIndex = page * MAX_VAGAS;
    const jobsToDisplay = vagas.jobs.slice(startIndex, endIndex);

    jobsToDisplay.forEach(job => {
        const jobElement = document.createElement("div");
        jobElement.classList.add("job");

        jobElement.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Empresa:</strong> ${job.company}</p>
            <p><strong>Localização:</strong> ${job.location}</p>
            <p><strong>Descrição:</strong> ${job.description}</p>
            <p><strong>Requisitos:</strong> ${job.requirements.join(', ')}</p>
            <p><strong>Salário:</strong> ${job.salary}</p>
            <p><strong>Contato:</strong> <a href="mailto:${job.contact_email}">${job.contact_email}</a></p>
            <button>Enviar currículo</button>
        `;

        jobsContainer.appendChild(jobElement);
    });

    renderPagination();
}

function renderPagination() {
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-button');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderJobs(currentPage);
        });
        paginationContainer.appendChild(pageButton);
    }
}

renderJobs(currentPage);