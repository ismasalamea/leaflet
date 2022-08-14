//Definimos la coordenada central y el zoom
let config = {
  minZoom: 7,
  maxZoom: 18,
  // https://github.com/Leaflet/Leaflet.fullscreen
  fullscreenControl: true,
};
// magnification with which the map will start
const zoom = 11;
// co-ordinates
const lat = -2.8866116;
const lng = -79.1509034;

// calling map
const map = L.map('map', config).setView([lat, lng], zoom);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 25
}).addTo(map);
L.control.scale().addTo(map);

//map.on('click', function(e) {
//    alert(e.latlng);
//} );

function clickZoom(e) {
// con zoom
//  map.setView(e.target.getLatLng(), zoom);
//sin zoom
  map.setView(e.target.getLatLng());
  // pantTo version
  // map.panTo(e.target.getLatLng());
}

// geoJSON para agregar capas desde formato JSON 


L.geoJSON(parroquias, { onEachFeature: tooltip }).addTo(map);

L.geoJSON(centros, {onEachFeature: popup}).addTo(map);
    
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
	layer.on("click", clickZoom);
    } 
}
///Crear un tooltip (label) de la entidades de la capa geoJSON
function tooltip(feature, layer) { 
    if (feature.properties && feature.properties.DPA_DESPAR) 
    { 
        layer.bindTooltip(feature.properties.DPA_DESPAR, {permanent: true, direction: "center", className: "my-labels"}); 
    } 
}



//L.geoJSON(centros, { pointToLayer: PoIstile, onEachFeature: popup }) 
//    .addTo(map);


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
};*/


/// BOTON HOME
const icono ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z' /></svg>";

// create custom button
const customControl = L.Control.extend({
  // button position
  options: {
    position: "topleft",
  },

  // method
  onAdd: function (map) {
    console.log(map.getCenter());
    // create button
    const btn = L.DomUtil.create("button");
    btn.title = "back to home";
    btn.innerHTML = icono;
    btn.className += "leaflet-bar back-to-home hidden";
    return btn;
  },
});

// adding new button to map controll
map.addControl(new customControl());

// on drag end
map.on("moveend", getCenterOfMap);

const buttonBackToHome = document.querySelector(".back-to-home");

function getCenterOfMap() {
  buttonBackToHome.classList.remove("hidden");

  buttonBackToHome.addEventListener("click", () => {
    map.flyTo([lat, lng], zoom);
  });

  map.on("moveend", () => {
    const { lat: latCenter, lng: lngCenter } = map.getCenter();

    const latC = latCenter.toFixed(3) * 1;
    const lngC = lngCenter.toFixed(3) * 1;

    const defaultCoordinate = [+lat.toFixed(3), +lng.toFixed(3)];

    const centerCoordinate = [latC, lngC];

    if (compareToArrays(centerCoordinate, defaultCoordinate)) {
      buttonBackToHome.classList.add("hidden");
    }
  });
}

const compareToArrays = (a, b) => JSON.stringify(a) === JSON.stringify(b);
