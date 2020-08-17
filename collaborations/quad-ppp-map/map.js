var mymap = L.map('mapid').setView([34.060716, -118.445345], 15);

L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      'pk.eyJ1Ijoia2FuZHJld3oiLCJhIjoiY2tkdzR5cHh1MWxybDJ0bnV3NGJranE5dyJ9.8_eKzn7R-rcIWyjOFYq5Zg',
  }
).addTo(mymap);

const getIconByColor = color => {
  return new L.Icon({
    iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

let group1 = [];
let group2 = [];
let group3 = [];
let group4 = [];
let group5 = [];

geojsonFeature.features.map(feature => {
  let iconColor;
  switch (feature.properties.LoanRange) {
    case '$150,000-350,000':
      group1.push(
        L.marker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { icon: getIconByColor('red') }
        )
      );
      break;
    case '$350,000-1 million':
      group2.push(
        L.marker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { icon: getIconByColor('orange') }
        )
      );
      break;
    case '$1-2 million':
      group3.push(
        L.marker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { icon: getIconByColor('yellow') }
        )
      );
      break;
    case '$2-5 million':
      group4.push(
        L.marker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { icon: getIconByColor('green') }
        )
      );
      break;
    case '$5-10 million':
      group5.push(
        L.marker(
          [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
          { icon: getIconByColor('blue') }
        )
      );
      break;
    default:
      iconColor = 'black';
  }
});

var overlays = {
  '$150,000-350,000 loan': L.layerGroup(group1).addTo(mymap),
  '$350,000-1 million loan': L.layerGroup(group2).addTo(mymap),
  '$1-2 million loan': L.layerGroup(group3).addTo(mymap),
  '$2-5 million loan': L.layerGroup(group4).addTo(mymap),
  '$5-10 million loan': L.layerGroup(group5).addTo(mymap),
};

L.control.layers(null, overlays, { collapsed: false }).addTo(mymap);

// places deleted bc wack addresses:
// MYNHD inc
// lesenfants inc
// fresher corn grill
// stealth software technologies
// medqia llc
// southern ca tennis association
