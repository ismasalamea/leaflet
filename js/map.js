//Definimos la coordenada central y el zoom
var map = L.map('map').setView([-2.8866116,-79.1509034], 11);
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 25
}).addTo(map);
L.control.scale().addTo(map);

// Marker para agregar marcadores de una capa difrenciado por una capa

///////////////////////////////////////////
/*function PoIstile(feature, latlng) {
    switch(feature.properties["TIPO"]) 
    {
        case "Personas adultas mayores":
            var fontanaIcon = new L.AwesomeMarkers.icon({
                icon: 'star',
                markerColor: 'blue',
                className: 'awesome-marker'
              });
                return L.marker(latlng, {icon: fontanaIcon});
    
        case "Servicios para toda la poblacion":
            var chiesaIcon = new L.AwesomeMarkers.icon({
                icon: 'glass',
                markerColor: 'green',
                className: 'awesome-marker'
              });    
                return L.marker(latlng, {icon: chiesaIcon});     
        default:         
            var normal = new L.AwesomeMarkers.icon({
                icon: 'flag',
                markerColor: 'orange',
                className: 'awesome-marker'
            });    
                return L.marker(latlng, {icon: normal});     
    };       
}*/;

// geoJSON para agregar capas desde formato JSON 


L.geoJSON(parroquias, { onEachFeature: tooltip }) 
    .addTo(map);
    L.geoJSON(centros, {onEachFeature: popup}).addTo(map);

    //L.geoJSON(centros, { pointToLayer: PoIstile, onEachFeature: popup }) 
//    .addTo(map);
    

    
// Crear un popup de la entidades de la capa geoJSON
function popup(feature, layer) { 
    if (feature.properties && feature.properties.INSTITUCIO) 
    { 
        layer.bindPopup(
        `<b>TIPO:</b> ${feature.properties.TIPO} <br/>
        <b>INSTITUCION:</b> ${feature.properties.INSTITUCIO }<br/>
        <b>TELEFONO:</b> ${feature.properties.TELEFONO}<br/> 
        <b>CONTACTO:</b> ${feature.properties.CONTACTO}<br/> 
        <b>CORREO:</b> ${feature.properties.CORREO}<br/></p>`
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

