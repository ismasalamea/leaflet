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
   // map.setView(e.target.getLatLng(), zoom);
  //sin zoom
  //  map.setView(e.target.getLatLng());
    // pantTo version
     map.panTo(e.target.getLatLng());
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
          <b>DIRECCION:</b> ${feature.properties.DIRECCION}<br/> 
          <b>TELEFONO:</b> ${feature.properties.TELEFONO}<br/> 
          <b>CORREO:</b> ${feature.properties.CORREO}<br/>
          <b>HORARIO:</b> ${feature.properties.HORARIO}<br/>
          <b>TIPO DE SERVICIO:</b> ${feature.properties.SERVICIO}<br/>` 
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
 // const icono ="<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M32 18.451L16 6.031 0 18.451v-5.064L16 .967l16 12.42zM28 18v12h-8v-8h-8v8H4V18l12-9z' /></svg>";
  const icono = "Inicio"
  // create custom button
  const customControl = L.Control.extend({
    // button position
    options: {
      position: "topleft",
    },
  
    // method
    onAdd: function (map) {
      //console.log(map.getCenter());
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


// create legend
const banner = L.control({ position: "bottomleft" });

banner.onAdd = function () {
    let div = L.DomUtil.create("div", "description");
    L.DomEvent.disableClickPropagation(div);
    const text =
        "<p width='20%'><b>Consejo Cantonal de Proteccion de Derechos</b> <br> Establecimientos de proteccion de derechos para jovenes, <br> Mujeres en situacion de violencia, Niños y niñas en situacion de vulnerabilidad...</p>";
    div.insertAdjacentHTML("beforeend", text);
    return div;
};

banner.addTo(map);










// async function to load geojson
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}


let geojsonOpts = {
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: L.divIcon({
                className: feature.properties.amenity,
                iconSize: L.point(8, 8),
                html: feature.properties.amenity[0].toUpperCase(),
                popupAnchor: [3, -5],
            }),
        })
            .bindPopup(
                feature.properties.amenity +
                "<br><b>" +
                feature.properties.name +
                "</b>"
            )
            .on("click", clickZoom);
    },
};

// fetching data from geojson
const poiLayers = L.layerGroup().addTo(map);

// add data to geoJSON layer and add to LayerGroup
["centros"].map((json) => {
    fetchData(`js/${json}.json`).then((data) => {
        L.geoJSON(data, geojsonOpts).addTo(poiLayers);
    });
});

// Autocomplete
// configurate https://github.com/tomik23/autocomplete#configuration-of-the-plugin
// --------------------------------------------------

new Autocomplete("multi-layer-serch", {
    cache: true,
    selectFirst: true,

    onSearch: ({ currentValue }) => {
        let places = []; // array of places

        /**
         * Get places from geojson and push them to places array
         */
        poiLayers.eachLayer(function (layer) {
            if (layer instanceof L.LayerGroup) {
                layer.eachLayer(function (layer) {
                    if (layer instanceof L.Marker) {
                        places.push(layer.feature);
                    }
                });
            }
        });

        // filter places by currentValue
        return places
            .sort((a, b) => a.properties.name.localeCompare(b.properties.name))
            .filter((element) =>
                element.properties.name.match(new RegExp(currentValue, "i"))
            );
    },

    // render the list of places
    onResults: ({ currentValue, matches, template }) => {
        // checking if we have results if we don't
        // take data from the noResults method
        return matches === 0
            ? template
            : matches
                .map((element) => {
                    return `
              <li class="place">
                <div>${element.properties.name.replace(
                        new RegExp(currentValue, "i"),
                        (str) => `<mark>${str}</mark>`
                    )}</div>
                <div class="place-item ${element.properties.amenity}">${element.properties.amenity
                        }</div>
              </li> `;
                })
                .join("");
    },

    // fly to the place and open popup
    onSubmit: ({ object }) => {
        const cord = object.geometry.coordinates.reverse();

        // fly to coordinates
        map.flyTo(cord);

        // find marker in the layer and open it
        poiLayers.eachLayer(function (layer) {
            layer.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    if (layer.feature.id === object.id) {
                        layer.openPopup();
                    }
                }
            });
        });

        // map.eachLayer(function (layer) {
        //   if (layer.options && layer.options.pane === "markerPane") {
        //     if (layer.feature.id === object.id) {
        //       layer.openPopup();
        //     }
        //   }
        // });
    },

    // no results
    noResults: ({ currentValue, template }) =>
        template(`<li>No results found: "${currentValue}"</li>`),
});

// --------------------------------------------------
// legends

// the control element is placed in the bottom right corner
const legend = L.control({
    position: "bottomright",
});

// color table
const color = ["be4dff", "ff8146", "ff3939"];

// table of texts that will appear in the popup and legend
const label = ["bar", "pharmacy", "restaurant"];

const rows = [];
legend.onAdd = function () {
    // we create a div with a legend class
    const div = L.DomUtil.create("div", "legend");

    L.DomEvent.disableClickPropagation(div);

    color.map((item, index) => {
        rows.push(`
        <div class="row" style="margin: 1px auto;">
          <i style="background: #${item}"></i>${label[index]}
        </div>  
    `);
    });
    div.innerHTML = rows.join("");
    return div;
};

// we are adding a legend to the map
legend.addTo(map);