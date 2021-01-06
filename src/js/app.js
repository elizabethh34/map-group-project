const search = document.getElementById('search');
const pointsOfInterest = document.querySelector('.points-of-interest');
let map;
let marker;
let markersArray = [];
let latitude;
let longitude;

search.onsubmit = event => { 
  event.preventDefault();
  const input = event.target.querySelector('input');
  getStore(input.value, longitude, latitude); 
  input.value = '';
}

function getGeoLocation() {
  if (navigator.geolocation) {
    console.log('supported');
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    console.log('not supported')
  }
}

function onSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  mapboxgl.accessToken = 'pk.eyJ1IjoiY2hvd3MyMyIsImEiOiJja2pmZ3NudjEyNXo0MnluMDBmMnZyeWR4In0.7uCSt7JWoiQmAHMjQy7nyg';
  map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11', 
  center: [longitude, latitude],
  zoom: 12
  });
  marker = new mapboxgl.Marker()
  .setLngLat([longitude, latitude])
  .addTo(map);
  markersArray.push(marker);
}

function onError(error) {
  console.log(error)
}

getGeoLocation();
function getStore(search_text, long, lat) {
  fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search_text}.json?types=poi&limit=10&proximity=${long},${lat}&access_token=pk.eyJ1IjoiY2hvd3MyMyIsImEiOiJja2pmZ3NudjEyNXo0MnluMDBmMnZyeWR4In0.7uCSt7JWoiQmAHMjQy7nyg
  `).then(response => {
    response.json().then(data => {
      createStore(data.features)
    })
  })
}

//from stack overflow
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2-lat1);  // deg2rad below
  const dLon = deg2rad(lon2-lon1); 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d.toFixed(1);
}
//from stack overflow
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function createStore(data) {
  pointsOfInterest.innerHTML = '';
  for(const value in data) {
    pointsOfInterest.insertAdjacentHTML('beforeend',
    `<li class="poi" data-long="${data[value].center[0]}" data-lat="${data[value].center[1]}">
      <ul>
        <li class="name">${data[value].text}
        </li><li class="street-address">${data[value].properties.address}
        </li><li class="distance">${getDistanceFromLatLonInKm(latitude, longitude, data[value].center[1], data[value].center[0])} KM
      </li></ul>
    </li>
    `)
  }
}

function removeMarkers(markersArray) {
  markersArray.forEach(item => {
    item.remove();
  })
}

function createNewMarker(long, lat) {
  const newMarker = new mapboxgl.Marker()
  .setLngLat([long, lat])
  .addTo(map);
  markersArray.push(newMarker)
}

pointsOfInterest.addEventListener('click', e => {
  let selectedItem = e.target.closest('.poi');
  const long = selectedItem.getAttribute('data-long');
  const lat = selectedItem.getAttribute('data-lat');
  removeMarkers(markersArray);
  createNewMarker(long, lat);
  
  map.flyTo({
    center: [
      long,
      lat
    ]
  })
});

