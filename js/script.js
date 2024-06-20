function mostrarMenu() {
    const menu = document.getElementById('menu');

    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

function mostrarMenuUsuario() {
    const menuUsuario = document.getElementById('menu-usuario');

    if (menuUsuario.style.display === 'block') {
        menuUsuario.style.display = 'none';
    } else {
        menuUsuario.style.display = 'block';
    }
}

let linkSair = document.getElementById('sair');
linkSair.addEventListener('click', function (event) {

    localStorage.clear();
    event.preventDefault();

    return window.location.href = '../index.html';
})


function showPreview(id, videoId) {
    let iframe = document.querySelector('#iframe' + id);
    let allIframes = document.querySelectorAll('iframe');
    allIframes.forEach(function (frame) {
        frame.style.display = 'none';
    });
    iframe.style.display = 'block';
    iframe.src = 'https://www.youtube.com/embed/' + videoId;
}

function login() {
    let email = document.querySelector('#emailLogin');
    let password = document.querySelector('#passwordLogin');

    let KEYPASSWORD = '123';
    let KEYEMAIL = 'empregototal@empregototal.com.br';

    if (email.value === '' || password.value === '') {
        return window.alert('Favor preencher todos os campos');
    } else if (email.value !== KEYEMAIL || password.value !== KEYPASSWORD) {
        email.value = '';
        password.value = '';
        return window.alert('Dados Incorretos!');
    }

    const usuario = {
        email: email.value,
        password: 'não disponível'
    };

    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

    return window.location.href = '../index.html';
}

let divUsuarioLogado = document.querySelector('#usuarioLogado');
let textoUsuarioLogado = document.querySelector('#emailLogado');
let loginButton = document.querySelector('#area-menu');
let areaPesquisa = document.querySelector('.area-pesquisa');
let linksLogado = document.querySelectorAll('.link-logado');

linksLogado.forEach(link => {
    link.style.display = 'none';
});

divUsuarioLogado.style.display = 'none';

let usuarioLocalStorage = localStorage.getItem('usuarioLogado');
let emailUsuarioLogado = JSON.parse(usuarioLocalStorage);

if (usuarioLocalStorage) {
    divUsuarioLogado.style.display = 'flex';
    textoUsuarioLogado.innerHTML = emailUsuarioLogado.email;
    
    linksLogado.forEach(link => {
        link.style.display = 'block';
    });

    loginButton.style.display = 'none';
} else {
    areaPesquisa.style.display = 'none';
}