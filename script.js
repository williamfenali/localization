//cria a variável map
var map;

const bases = [
    { name: 'KVA', latitude: -12.529288, longitude: -55.705107, team: '', color: 'black' },
    { name: 'CQB', latitude: -12.529632, longitude: -55.705098, team: '', color: 'black' },
    { name: 'Mesquita', latitude: -12.528969, longitude: -55.706164, team: '', color: 'black' },
    { name: 'Tobogã', latitude: -12.528897, longitude: -55.705208, team: '', color: 'black' },
    { name: 'Brejo', latitude: -12.529923, longitude: -55.705884, team: '', color: 'black' },
]

const spawns = [
    { latitude: -12.528027, longitude: -55.706165, team: 'Vermelho', color: 'red' },
    { latitude: -12.529943, longitude: -55.705404, team: 'Azul', color: 'blue' }
]

//função para quando for permitido a localização
function success(pos) {
    //se map estiver vazio
    if (map === undefined) {
        //cria um map
        // map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 20);
        map = L.map('map').setView([-12.528765, -55.704615], 20);
    } else {
        //se não, ele remove o mapa antigo
        map.remove();
        //cria um novo
        // map = L.map('map').setView([pos.coords.latitude, pos.coords.longitude], 20);
        map = L.map('map').setView([-12.528765, -55.704615], 20);
    }

    //direitos autorais
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    //adiciona as coordenadas para o marcador
    // L.marker([pos.coords.latitude, pos.coords.longitude], {icon: L.icon({iconUrl: 'https://github.com/google/material-design-icons/blob/master/png/maps/navigation/materialicons/18dp/2x/baseline_navigation_black_18dp.png?raw=true'})}).addTo(map);
    L.marker([-12.528765, -55.704615], { icon: L.icon({ iconUrl: 'https://github.com/google/material-design-icons/blob/master/png/maps/navigation/materialicons/18dp/2x/baseline_navigation_black_18dp.png?raw=true' }) }).addTo(map);
    // .bindPopup('Sua posição')
    // .openPopup();

    //adiciona os marcadores de bases
    bases.forEach((base) => {
        L.marker([base.latitude, base.longitude], { icon: L.icon({ iconUrl: `https://github.com/williamfenali/icons/blob/main/marker_${base.color}.png?raw=true`, iconSize: [30, 30] }) })
            .bindPopup(base.name)
            .addTo(map)
    })

    //adiciona os marcadores de spawns
    spawns.forEach((spawn) => {
        L.marker([spawn.latitude, spawn.longitude], { icon: L.icon({ iconUrl: `https://github.com/williamfenali/icons/blob/main/home_${spawn.color}.png?raw=true`,iconSize: [30, 30] }) })
            .bindPopup(spawn.team)
            .addTo(map)
    })
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
