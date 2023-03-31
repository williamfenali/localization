//cria a variável map
var map;

//função para quando for permitido a localização
function success(pos) {
    //se map estiver vazio
    if (map === undefined) {
        //cria um map
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 16);
    } else {
        //se não, ele remove o mapa antigo
        map.remove();
        //cria um novo
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 16);
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //adiciona as coordenadas para o marcador
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
    // .bindPopup('Sua posição')
    // .openPopup();
};

//caso não for permitido usar a localização
function error(err) {
    alert(err)
};

//assiste a mudança de posição
var watchID = navigator.geolocation.watchPosition(success, error, {
    //habilita a precisão maior
    enableHighAccuracy: true,
});

//variável para cronometro
let cronometro;

//variavel para ver para qual esta contando o cronometro
let contagem;

//busca os placares e zera se for null
if(localStorage.getItem('esquerda') === null){
    localStorage.setItem('esquerda', 0)
}
if(localStorage.getItem('direita') === null){
    localStorage.setItem('direita', 0)
}
document.getElementById("placarEsquerda").innerHTML = localStorage.getItem('esquerda');
document.getElementById("placarDireita").innerHTML = localStorage.getItem('direita');

//verifica se tem algum time dominando, se tiver, põe DOMINADO para ele
if (localStorage.getItem('dominado') === 'esquerda') {
    document.getElementById("timeEsquerda").innerHTML = 'DOMINADO!';
    document.getElementById("timeDireita").innerHTML = 'Click';
} else if (localStorage.getItem('dominado') === 'direita') {
    document.getElementById("timeDireita").innerHTML = 'DOMINADO!';
    document.getElementById("timeEsquerda").innerHTML = 'Click';
} else {
    document.getElementById("timeEsquerda").innerHTML = 'Click';
    document.getElementById("timeDireita").innerHTML = 'Click';
}

//função para click do lado esquerdo
function cronoEsquerda() {
    if (contagem === 'esquerda') {
        alert('já esta contando')
    } else {
        //troca para esquerda o contador
        contagem = 'esquerda'
        //verifica se está dominando
        if (localStorage.getItem('dominado') === 'esquerda') {
            alert('dominado')
        } else {
            //se não estiver dominando, zera o cronometro
            clearInterval(cronometro);
            //altera o outro time para click
            document.getElementById("timeDireita").innerHTML = 'Click';
            //zera o controle de dominação
            localStorage.setItem('dominado', '')
            //inicia o novo valor para o cronometro
            let tempo = 60;
            //faz a contagem
            cronometro = setInterval(function () {
                //se o tempo chegar a zero
                if (tempo === 0) {
                    //altera para vazio a contagem
                    contagem = ''
                    //para o intervalo para não ficar contando no placar
                    clearInterval(cronometro)
                    //busca o valor do placar
                    let temp = parseInt(localStorage.getItem('esquerda'))
                    //adiciona o novo valor
                    localStorage.setItem('esquerda', temp + 1);
                    //mostra o placar novo
                    document.getElementById("placarEsquerda").innerHTML = localStorage.getItem('esquerda');
                    //mostra que está dominado
                    document.getElementById("timeEsquerda").innerHTML = 'DOMINADO!';
                    //salva o novo dominador
                    localStorage.setItem('dominado', 'esquerda')
                } else {
                    //continua a contagem
                    tempo--;
                    let segundos = tempo;
                    let formatoTempo = (segundos < 10 ? "0" + segundos + " segundos" : segundos + " segundos");
                    document.getElementById("timeEsquerda").innerHTML = formatoTempo;
                }
            }, 1000);
        }
    }
}

//função para o click do lado direito
function cronoDireita() {
    if (contagem === 'direita') {
        alert('já esta contando')
    } else {
        contagem = 'direita'
        if (localStorage.getItem('dominado') === 'direita') {
            alert('dominado')
        } else {
            clearInterval(cronometro);
            document.getElementById("timeEsquerda").innerHTML = 'Click';
            localStorage.setItem('dominado', '')
            let tempo = 60;
            cronometro = setInterval(function () {
                if (tempo === 0) {
                    clearInterval(cronometro)
                    let temp = parseInt(localStorage.getItem('direita'))
                    localStorage.setItem('direita', temp + 1);
                    document.getElementById("placarDireita").innerHTML = localStorage.getItem('direita');
                    document.getElementById("timeDireita").innerHTML = 'DOMINADO!';
                    localStorage.setItem('dominado', 'direita')
                } else {
                    tempo--;
                    let segundos = tempo;
                    let formatoTempo = (segundos < 10 ? "0" + segundos + " segundos" : segundos + " segundos");
                    document.getElementById("timeDireita").innerHTML = formatoTempo;
                }
            }, 1000);
        }
    }
}
