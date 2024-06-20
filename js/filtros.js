import vagas from '../data/vagas.js';

const area = document.querySelector('#profissional');
const modelo = document.querySelector('#modelo');
const data = document.querySelector('#data');
const contrato = document.querySelector('#contrato');
const pcd = document.querySelector('#pcd');
const salario = document.querySelector('#salario');
const limparFiltros = document.querySelector('#limparFiltros');

let vagasFiltradas;

document.addEventListener('DOMContentLoaded', (e) => {
    e.stopPropagation();

    const vagasContainer = document.querySelector('#jobs-container');

    function exibirVagas(vagas) {
        vagasContainer.innerHTML = '';

        if (vagas.length === 0) {
            vagasContainer.innerHTML = '<p>Nenhuma vaga encontrada.</p>';
            return;
        }

        vagas.forEach((vaga) => {
            const vagaDiv = document.createElement('div');

            const vagaHTML = `
                <h3>${vaga.title}</h3>
                <p><strong>Empresa:</strong> ${vaga.company}</p>
                <p><strong>Localização:</strong> ${vaga.location}</p>
                <p><strong>Descrição:</strong> ${vaga.description}</p>
                <p><strong>Requisitos:</strong> ${vaga.requirements.join(', ')}</p>
                <p><strong>Salário:</strong> ${vaga.salary}</p>
                <p><strong>Email de contato:</strong> ${vaga.contact_email}</p>
                <button>Enviar currículo</button>
            `;

            vagaDiv.innerHTML = vagaHTML;
            vagasContainer.appendChild(vagaDiv);
        });
    }

    exibirVagas(vagas.jobs);

    area.addEventListener('change', () => { 
        let opcao = area.value.toLowerCase();
        let vagasFiltradasArea = filtrarArea(vagas.jobs, opcao);
        
        exibirVagas(vagasFiltradasArea);
    });

    modelo.addEventListener('change', () => {
        let opcao = modelo.value.toLowerCase();
        let vagasFiltradasModelo;

        vagasFiltradasModelo = filtrarModelo(vagas.jobs, opcao);
        exibirVagas(vagasFiltradasModelo);

        if(vagasFiltradas) {
            vagasFiltradasModelo = filtrarModelo(vagasFiltradasModelo, opcao);
            exibirVagas(vagasFiltradasModelo);
        }
    });

    data.addEventListener('change', () => {
        let opcao = data.value.toLowerCase();
        let vagasFiltradasData;
        
        vagasFiltradasData = filtrarData(vagas.jobs, opcao);
        exibirVagas(vagasFiltradasData);

        if(vagasFiltradas) {
            vagasFiltradasData = filtrarData(vagasFiltradas, opcao);
            exibirVagas(vagasFiltradasData);
        }
    });

    contrato.addEventListener('change', () => {
        let opcao = contrato.value.toLowerCase();
        let vagasFiltradasContrato;

        vagasFiltradasContrato = filtrarContrato(vagas.jobs, opcao);
        exibirVagas(vagasFiltradasContrato);

        if(vagasFiltradas) {
            vagasFiltradasContrato = filtrarContrato(vagasFiltradas, opcao);
            exibirVagas(vagasFiltradasContrato);            
        }  
    });

    pcd.addEventListener('change', () => {
        let opcao = pcd.value.toLowerCase();
        let vagasFiltradasPcd;
        
        vagasFiltradasPcd = filtrarPcd(vagas.jobs, opcao);
        exibirVagas(vagasFiltradasPcd);

        if(vagasFiltradas) {
            vagasFiltradasPcd = filtrarPcd(vagasFiltradas, opcao);
            
            exibirVagas(vagasFiltradasPcd);
        }       
    });

    salario.addEventListener('change', () => {
        let opcao = salario.value.toLowerCase();
        let vagasFiltradasSalario;

        vagasFiltradasSalario = filtrarSalario(vagas.jobs, opcao);
        exibirVagas(vagasFiltradasSalario);

        if(vagasFiltradas) {
            vagasFiltradasSalario = filtrarSalario(vagasFiltradas, opcao);
            exibirVagas(vagasFiltradasSalario);
        }
        
    });

    limparFiltros.addEventListener('change', (e) => {
        let opcao = limparFiltros.value.toLowerCase();

        if(opcao === 'limpar') {
            location.reload();            
        }
    } )

    function filtrarArea(vagas, opcao) {
        vagasFiltradas = vagas.filter((vaga) => vaga.job_area.toLowerCase() === opcao);

        return vagasFiltradas;
    }

    function filtrarModelo(vagas, opcao) {
        vagasFiltradas = vagas.filter((vaga) => vaga.job_model.toLowerCase() === opcao);

        return vagasFiltradas;
    }

    function filtrarData(vagas, opcao) {
        let dataAtual = new Date()
        let vagasAtualizadasData = [];

        if (opcao === "semana") {
            const ultimaSemana = new Date();
            ultimaSemana.setDate(dataAtual.getDate() - 7);
            vagasAtualizadasData = vagas.filter(vaga => new Date(vaga.publication_date) >= ultimaSemana);
        } else if (opcao === "mes") {
            const ultimoMes = new Date();
            ultimoMes.setMonth(dataAtual.getMonth() - 1);
            vagasAtualizadasData = vagas.filter(vaga => new Date(vaga.publication_date) >= ultimoMes);
        } else if (opcao === "todos") {
            vagasAtualizadasData = vagas;
        }

        return vagasAtualizadasData;
    }

    function filtrarContrato(vagas, opcao) {
        vagasFiltradas = vagas.filter((vaga) => vaga.contract === opcao);

        return vagasFiltradas;
    }

    function filtrarPcd(vagas, opcao) {
        let opcaoBoolean = opcao === 'sim' ? true : false;
        vagasFiltradas = vagas.filter((vaga) => vaga.pcd === opcaoBoolean);

        return vagasFiltradas;
    }

    function filtrarSalario(vagas, opcao) {
        if (opcao === 'mil') {
            vagasFiltradas = vagas.filter((vaga) => {
                const salarioNumerico = extrairSalarioNumerico(vaga.salary);
                return salarioNumerico <= 1000;
            });
        } else if (opcao === 'miladois') {
            vagasFiltradas = vagas.filter((vaga) => {
                const salarioNumerico = extrairSalarioNumerico(vaga.salary);
                return salarioNumerico > 1000 && salarioNumerico <= 2001;
            });
        } else if (opcao === 'acimadois') {
            vagasFiltradas = vagas.filter((vaga) => {
                const salarioNumerico = extrairSalarioNumerico(vaga.salary);
                return salarioNumerico > 2000;
            });
        }
        
        return vagasFiltradas;
    }

    function extrairSalarioNumerico(salario) {
        const salarioLimpo = salario.replace(/[^\d,-]/g, '').replace(',', '.');


        const salarioNumerico = parseFloat(salarioLimpo);

        return salarioNumerico;
    }

});