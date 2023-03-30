//para alterar o que está em h2
let h2 = document.querySelector('h2')
//cria a variável map
var map

//função para quando for permitido a localização
function success(pos) {
    //altera o valor do h2
    h2.textContent = `Latitude: ${pos.coords.latitude}, Longitude: ${pos.coords.longitude}`

    //se map estiver vazio
    if (map === undefined) {
        //cria um map
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 14)
    } else {
        //se não, ele remove o mapa antigo
        map.remove()
        //cria um novo
        map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 14)
    }

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //adiciona as coordenadas para o marcador
    L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
    // .bindPopup('Sua posição')
    // .openPopup();
}

//caso não for permitido usar a localização
function error(err) {
    h2.textContent = err
}

//assiste a mudança de posição
var watchID = navigator.geolocation.watchPosition(success, error, {
    //habilita a precisão maior
    enableHighAccuracy: true,
})
