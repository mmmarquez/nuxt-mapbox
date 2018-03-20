var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");
const TOKEN =
  "pk.eyJ1IjoibW1hcnF1ZXoiLCJhIjoiY2plenp2ZHFvMGhnYjMzcWpyd2lib3JneSJ9.LtpATcB-wkLUvZJy7ghkSQ";
mapboxgl.accessToken = TOKEN;
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/light-v9",
  center: [-77.04, 38.907],
  zoom: 0
});

export default map;
