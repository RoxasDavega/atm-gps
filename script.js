mapboxgl.accessToken =
  "pk.eyJ1IjoiYXppenJvc3lpZCIsImEiOiJjbGE2cmJzdXAwNjg4M3ZzMHN4MTR5OGt4In0.oXST-z4oqfBHGDi3eXXPUg";

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);
}

function errorLocation() {
  setupMap([-7.79, 110.36]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/streets-v12", // style URL
    center: center,
    zoom: 15,
  });

  map.on("load", () => {
    // Add a GeoJSON source with 3 points.
    map.addSource("points", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [-7.79, 110.36],
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [-90.3295, -0.6344],
            },
          },
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: [-91.3403, 0.0164],
            },
          },
        ],
      },
    });
    // Add a circle layer
    map.addLayer({
      id: "circle",
      type: "circle",
      source: "points",
      paint: {
        "circle-color": "#4264fb",
        "circle-radius": 8,
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    });

    // Center the map on the coordinates of any clicked circle from the 'circle' layer.
    map.on("click", "circle", (e) => {
      map.flyTo({
        center: e.features[0].geometry.coordinates,
      });
    });

    // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
    map.on("mouseenter", "circle", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "circle", () => {
      map.getCanvas().style.cursor = "";
    });
  });
  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav);
}
