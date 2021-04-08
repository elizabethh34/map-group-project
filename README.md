# POI Map Finder

Group project, using the MapBox API to display a map where users can search for and see points of interest close to them

#### Hosted Site [https://map-group-project.netlify.app/](https://map-group-project.netlify.app/)

## Features:

- Users enter a search term into the text input and the search is done upon pressing the enter key
- The search returns a list of points of interest that match the user's search
- Clicking on one of the points of interest places a marker on the map at that location
- The map will re-centre on the new marker

## Implementation

1. Get current location, draw a map, center the map on this location and drop a marker
    - Detect the user's current position using the browser Geolocation API
    - Import the `Mapbox GL JS` JavaScript library, and it's associated JS file, as shown in the quickstart guide and the the example of displaying a simple map
    - Drop a marker indicating the users current location

2. Using users location, perform a forward geocode for points of interest, determine the distance to each and display them

    - Forward geocode a location
    - Use users current location, to help set the proximity when forward geocoding
    - Calculate the distance between 2 sets of coordinates
    - Output the list to the page

3. Users can click on a point of interest, and the map will adjust to drop a new marker and recenter on that point of interest

    - Add an event listener to your points-of-interest list
    - Remove the existing marker, drop a new marker and recenter the map
