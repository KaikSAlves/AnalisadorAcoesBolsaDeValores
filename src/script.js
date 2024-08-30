var arrayDeTitulos = new Array("papel", "cotacao", "divYield", "patrimLiq");
var tabela = document.getElementById("tabela-de-acoes");
window.document.getElementById("tabelas").style.display = "flex";
var pesquisaFeita = false;


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

function adicionarTituloTabela(option) {
    var tr = window.document.getElementById("titulos-tabela");
    var tds = tr.getElementsByTagName("td");
    var verificacao;
    for (var i = 0; i < tds.length; i++) {
        if (tds[i].textContent == option.textContent) {
            verificacao = false;
            break;
        } else {
            verificacao = true;
        }
    }


    if (verificacao) {
        arrayDeTitulos.push(option.value);
        var codHtml = `<td value = "${option.value}">${option.textContent}</td>`;
        tr.innerHTML += codHtml;
    }
}

function removerTituloTabela(option) {
    var tr = window.document.getElementById("titulos-tabela");
    var tds = tr.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
        if (tds[i].textContent == option.textContent) {
            arrayDeTitulos = arrayDeTitulos.filter(item => item !== option.value);
            tds[i].remove();
            break;
        }
    }
}

window.document.getElementById("botao-adicionar").addEventListener("click", function () {
    limparTabela();
    var select = window.document.getElementById("colunas-tabela");
    var valorElementoString = select.value.toString();
    var options = select.getElementsByTagName("option");

    for (i = 0; i <= options.length; i++) {
        if (options[i].value == valorElementoString) {
            elemento = options[i].textContent;
            adicionarTituloTabela(options[i]);
            adicionarFiltro(options[i]);

        }
    }
});

window.document.getElementById("botao-remover").addEventListener("click", function () {
    limparTabela();
    var select = window.document.getElementById("colunas-tabela");
    var valorElementoString = select.value;
    var options = select.getElementsByTagName("option");

    for (i = 0; i <= options.length; i++) {
        if (options[i].value == valorElementoString) {
            removerTituloTabela(options[i]);
            removerFiltro(options[i])
        }
    }
});

window.document.getElementById("botao-buscar").addEventListener("click", function () {
    const selectFiltro = window.document.getElementById("filtros-tabela").value;
    const selectOrder = window.document.getElementById("ordem-tabela").value;
    var verificacaoFiltros = true;
    var maiorQueNum = window.document.getElementById("maior-que");
    var menorQueNum = window.document.getElementById("menor-que");

    //TODO: arrumar essa bomba de ordenar por crescente ou decrescente
    limparTabela();
    fetch("stocks.json").then((Response => {
        Response.json().then((dados) => {

            //ordenar com filto e crescente ou decrescente
            if (selectFiltro !== "nenhum") {
                arrayStocks = dados.stocks;
                if (selectOrder == "decrescente") {
                    dados.stocks.sort((a, b) => parseFloat(a[selectFiltro]) - parseFloat(b[selectFiltro]));;
                } else if (selectOrder == "crescente") {
                    dados.stocks.sort((a, b) => parseFloat(b[selectFiltro]) - parseFloat(a[selectFiltro]));;
                }

                //visualizar se possui entrada de dados dos inputs
            }
            for (i = 0; i <= dados.stocks.length; i++) {
                //dados.stocks.map((stock => {

                linhaTabela = `<tr id = "${i}"><tr/>`
                tabela.innerHTML += linhaTabela;

                arrayDeTitulos.forEach(titulo => {


                    var info = dados.stocks[i][titulo];
                    
                    //casos: possuir maiorQue e menorQue
                    //      possuir menorQue mas nao MaiorQue
                    //      possuir maiorQue e nao MenorQue

                    var linha = document.getElementById(i).innerHTML += `<td>${info}<td//>`;
                });

                //condicoes de parada
                if (i >= 100) {
                    break;
                }
                //}));
            }
        });
    }));


});

function limparTabela() {
    const linhas = tabela.getElementsByTagName('tr');

    while (linhas.length > 1) {
        tabela.deleteRow(1);
    }
}

function adicionarFiltro(option) {
    var select = window.document.getElementById("filtros-tabela");
    var options = select.getElementsByTagName("option");
    var verificacao = true
    for (const op of options) {
        if (op.textContent == option.textContent) {
            verificacao = false;
        }
    }

    if (verificacao) {
        select.innerHTML += `<option value = "${option.value}">${option.textContent}<option/>`
    }

    removerOptionsEmBranco();
}

function removerFiltro(option) {
    var select = window.document.getElementById("filtros-tabela");
    var options = select.getElementsByTagName("option");

    for (i = 0; i <= options.length; i++) {
        if (options[i].textContent == option.textContent) {
            options[i].remove();
        }
    }
}

function removerOptionsEmBranco() {
    var select = window.document.getElementById("filtros-tabela");
    var options = select.getElementsByTagName("option");

    for (i = 0; i <= options.length; i++) {
        if (options[i].textContent == "") {
            options[i].remove();
        }
    }

}