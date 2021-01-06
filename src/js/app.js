function findUserLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const {latitude, longitude} = position.coords;
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpemFiZXRoaDM0IiwiYSI6ImNramxpcnlpZjhnaTAyd3J4NWQ1aXBqZWUifQ.PfmZO1A6KHl_x89CFCUjjg';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [longitude, latitude], // starting position [lng, lat]
    zoom: 12 // starting zoom
    });
  });  
}

findUserLocation();


