var arrayDeTitulos = new Array("papel", "cotacao", "divYield", "patrimLiq");
var tabela = document.getElementById("tabela-de-acoes");

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
        var codHtml = `<td class "Titulo" value = "${option.value}">${option.textContent}</td>`;
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
    window.document.getElementById('btn-baixar-xls').style.display = 'block';

    const selectFiltro = window.document.getElementById("filtros-tabela").value;
    const selectOrder = window.document.getElementById("ordem-tabela").value;

    var maiorQueNum = window.document.getElementById("maior-que").value;
    var menorQueNum = window.document.getElementById("menor-que").value;

    if (maiorQueNum == "") {
        maiorQueNum = -999999999999;
    }

    if (menorQueNum == "") {
        menorQueNum = 99999999999999;
    }
    //TODO: arrumar essa bomba de ordenar por crescente ou decrescente
    limparTabela();
    fetch("stocks.json").then((Response => {
        Response.json().then((dados) => {

            //ordenar com filto e crescente ou decrescente
            if (selectFiltro !== "nenhum") {
                if (selectOrder == "decrescente") {
                    dados.stocks.sort((a, b) => converterParaNumero(a[selectFiltro]) - converterParaNumero(b[selectFiltro]));;
                } else if (selectOrder == "crescente") {
                    dados.stocks.sort((a, b) => converterParaNumero(b[selectFiltro]) - converterParaNumero(a[selectFiltro]));;
                }

            }
            for (i = 0; i <= dados.stocks.length; i++) {
                //dados.stocks.map((stock => {

                //filtro de numeros (maior que e menor que)    
                if (selectFiltro !== "nenhum") {
                    if (converterParaNumero(dados.stocks[i][selectFiltro]) > maiorQueNum && converterParaNumero(dados.stocks[i][selectFiltro]) < menorQueNum) {
                        adicionarItem(dados);
                    }
                } else {
                    adicionarItem(dados);
                }

                /*
                //condicoes de parada
                if (i >= 100) {
                    break;
                }
                 }));
                */
            }
        });
    }));;

});

window.document.getElementById('btn-baixar-xls').addEventListener('click', function () {
    extrairXls();
    window.document.getElementById('btn-baixar-xls').style.display = "none";
});

window.document.getElementById('buscar-acoes').addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        limparTabela();
        mudarPaginaTabelas();
        fetch('stocks.json').then(Response => {
            Response.json().then(dados => {
                for (i = 0; i < dados.stocks.length; i++) {
                    if (dados.stocks[i]["papel"] == document.getElementById('buscar-acoes').value.toUpperCase()) {
                        adicionarItem(dados);
                    }
                }
            });
        });

    }
});

function converterParaNumero(str) {

    str = str.replace(/\./g, "");
    str = str.replace(",", ".");

    return parseFloat(str)
}

function adicionarItem(dados) {
    linhaTabela = `<tr id = "${i}"></tr>`
    tabela.innerHTML += linhaTabela;

    arrayDeTitulos.forEach(titulo => {

        var info = dados.stocks[i][titulo];
        var linha = document.getElementById(i).innerHTML += `<td>${info}<td//>`;

    });
}

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

function extrairXls() {
    var divTabela = document.getElementById('divTabela');

    var dados = new Blob(['\ufeff' + divTabela.outerHTML], { type: 'application/vnd.ms-excel' });
    var url = window.URL.createObjectURL(dados);

    var a = document.createElement('a');

    a.href = url;

    a.download = 'Dados acoes';

    a.click();

}