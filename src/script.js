window.document.getElementById("tabelas").style.display = "flex";

function mudarPaginaTabelas() {
    window.document.getElementById("tabelas").style.display = "flex";
    window.document.getElementById("graficos").style.display = "none";
    window.document.getElementById("tendencias").style.display = "none";
    window.document.getElementById("main").style.display = "none";
}

function mudarPaginaGraficos() {
    window.document.getElementById("tabelas").style.display = "none";
    window.document.getElementById("graficos").style.display = "flex";
    window.document.getElementById("tendencias").style.display = "none";
    window.document.getElementById("main").style.display = "none";
}

function mudarPaginaTendencias() {
    window.document.getElementById("tabelas").style.display = "none";
    window.document.getElementById("graficos").style.display = "none";
    window.document.getElementById("tendencias").style.display = "flex";
    window.document.getElementById("main").style.display = "none";
}

function mudarPaginaMain() {
    window.document.getElementById("tabelas").style.display = "none";
    window.document.getElementById("graficos").style.display = "none";
    window.document.getElementById("tendencias").style.display = "none";
    window.document.getElementById("main").style.display = "flex";
}