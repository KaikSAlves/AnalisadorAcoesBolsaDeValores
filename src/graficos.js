


const canvasDivYield = document.getElementById('grafico-div-yield');
const canvasCotacao = document.getElementById('grafico-cotacao');
const canvasPatrimLiq = document.getElementById('grafico-patrim-liq');
const canvasCrescRec = document.getElementById('grafico-cresc-rec');

var papelAcoes = [];
var dadosDivYield = [];
var dadosCotacao = [];
var dadosCrescRec = [];
var dadosPatrimLiq = [];

var graficoDivYield = null;
var graficoCotacao = null;
var graficoCrescRec = null;
var graficoPatrimLiq = null;

var graficos = 0;

window.document.getElementById('btn-comparar').addEventListener('click', function () {
    var input1 = window.document.getElementById('input-acao-1').value.toUpperCase();
    var input2 = window.document.getElementById('input-acao-2').value.toUpperCase();
    var verificacao = 0;

    if (graficos == 1) {
        excluirGraficos();
    }

    if (input1 == '' || input2 == '') {
        document.getElementById('erro-input-vazio').style.display = "flex";
    } else {
        papelAcoes = [];
        papelAcoes = [input1, input2];
        fetch('stocks.json').then(Response => {
            Response.json().then(dados => {


                for (j = 0; j < 2; j++) {

                    for (j = 0; j < 2; j++) {

                        for (i = 0; i < dados.stocks.length; i++) {

                            if (papelAcoes[j] == (dados.stocks[i]['papel'])) {
                                dadosDivYield.push(converterParaNumero(dados.stocks[i]['divYield']));
                                dadosCotacao.push(converterParaNumero(dados.stocks[i]['cotacao']));
                                dadosCrescRec.push(converterParaNumero(dados.stocks[i]['crescRec5a']));
                                dadosPatrimLiq.push(converterParaNumero(dados.stocks[i]['patrimLiq']));

                                verificacao += 1;
                            }
                        }
                    }

                    if (verificacao => 2) {
                        criarGraficos(dadosCotacao, dadosCrescRec, dadosDivYield, dadosPatrimLiq);
                        dadosDivYield = [];
                        dadosCotacao = [];
                        dadosPatrimLiq = [];
                        dadosCrescRec = [];
                        graficos = 1;
                    } else {
                        window.document.getElementById('erro-acao-nao-encontrada').style.display = "flex"
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

function excluirGraficos() {
    graficoDivYield.destroy();
    graficoCotacao.destroy();
    graficoCrescRec.destroy();
    graficoPatrimLiq.destroy();
}

function retirarMensagemDeErro() {
    document.getElementById('erro-input-vazio').style.display = "none";
    document.getElementById('erro-acao-nao-encontrada').style.display = "none";
}

function excluirGraficos() {
    graficoDivYield.destroy();
    graficoCotacao.destroy();
    graficoCrescRec.destroy();
    graficoPatrimLiq.destroy();
}

function criarGraficos(dadosCotacao, dadosCrescRec, dadosDivYield, dadosPatrimLiq) {
    graficoDivYield = new Chart(canvasDivYield, {
        type: 'bar',
        data: {
            labels: papelAcoes,
            datasets: [{
                label: 'Div. Yield',
                data: dadosDivYield,
                borderColor: 'chocolate',
                borderWidth: 1,
                backgroundColor: 'chocolate',
                hoverBackgroundColor: 'chocolate'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    graficoCotacao = new Chart(canvasCotacao, {
        type: 'bar',
        data: {
            labels: papelAcoes,
            datasets: [{
                label: 'Cotação',
                data: dadosCotacao,
                borderColor: 'chocolate',
                borderWidth: 1,
                backgroundColor: 'chocolate',
                hoverBackgroundColor: 'chocolate'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    graficoPatrimLiq = new Chart(canvasPatrimLiq, {
        type: 'bar',
        data: {
            labels: papelAcoes,
            datasets: [{
                label: 'Patrim. Liq.',
                data: dadosPatrimLiq,
                borderColor: 'chocolate',
                borderWidth: 1,
                backgroundColor: 'chocolate',
                hoverBackgroundColor: 'chocolate'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    graficoCrescRec = new Chart(canvasCrescRec, {
        type: 'bar',
        data: {
            labels: papelAcoes,
            datasets: [{
                label: 'Cresc. Rec. 5 anos',
                data: dadosCrescRec,
                borderColor: 'chocolate',
                borderWidth: 1,
                backgroundColor: 'chocolate',
                hoverBackgroundColor: 'chocolate'
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}