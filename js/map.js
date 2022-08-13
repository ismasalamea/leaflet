//Definimos la coordenada central y el zoom
var map = L.map('map').setView([-2.8866116,-79.1509034], 11);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 25
}).addTo(map);
L.control.scale().addTo(map);

// Marker para agregar marcadores de una capa
L.marker([-2.8866116,-78.9856034]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
///////////////////////////////////////////

// geoJSON para agregar capas desde formato JSON 
L.geoJSON(parroquias).addTo(map);
L.geoJSON(centros).addTo(map);

///////////////////////


L.geoJSON(parroquias, { onEachFeature: tooltip }) 
    .addTo(map);

L.geoJSON(centros, { onEachFeature: popup }) 
    .addTo(map);

    
// Crear un popup de la entidades de la capa geoJSON
function popup(feature, layer) { 
    if (feature.properties && feature.properties.INSTITUCIO) 
    { 
        layer.bindPopup(
        "<B>TIPO:</B> " + feature.properties.TIPO + "<br/>" +
        "<B>INSTITUCION:</B> " + feature.properties.INSTITUCIO + "<br/>" + 
        "<B>TELEFONO:</B> " + feature.properties.TELEFONO + "<br/>" + 
        "<B>CONTACTO:</B> " + feature.properties.CONTACTO + "<br/>" + 
        "<B>CORREO:</B> " + feature.properties.CORREO + "<br/>" 
        ); 
    } 
}
///Crear un tooltip (label) de la entidades de la capa geoJSON
function tooltip(feature, layer) { 
    if (feature.properties && feature.properties.DPA_DESPAR) 
    { 
        layer.bindTooltip(feature.properties.DPA_DESPAR, {permanent: true, direction: "center", className: "my-labels"}); 
    } 
}

