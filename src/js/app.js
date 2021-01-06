function findUserLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    const {latitude, longitude} = position.coords;
    mapboxgl.accessToken = 'pk.eyJ1IjoiZWxpemFiZXRoaDM0IiwiYSI6ImNramxpcnlpZjhnaTAyd3J4NWQ1aXBqZWUifQ.PfmZO1A6KHl_x89CFCUjjg';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [longitude, latitude],
    zoom: 12
    });
    var marker = new mapboxgl.Marker()
    .setLngLat([longitude, latitude])
    .addTo(map)
  });  
}




findUserLocation();


