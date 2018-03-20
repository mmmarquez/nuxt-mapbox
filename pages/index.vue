<template>
  <section>
  <SideNav :countryData="countryData" />
  <div id='map'></div>
  </section>
</template>

<script>
import SideNav from "~/components/SideNav.vue";

var mapboxgl = require("mapbox-gl/dist/mapbox-gl.js");

const TOKEN =
  "pk.eyJ1IjoibW1hcnF1ZXoiLCJhIjoiY2plenp2ZHFvMGhnYjMzcWpyd2lib3JneSJ9.LtpATcB-wkLUvZJy7ghkSQ";

export default {
  components: {
    SideNav
  },
  computed: {
    selectCountry() {
      let index = this.$store.state.selectedCountry;
      console.log(index);
      return this.countryData[index];
    },
    selectCoordinates() {
      let coordinates = [this.selectCountry["long"], this.selectCountry["lat"]];
      return coordinates;
    }
  },
  data() {
    return {
      countryData: [
        {
          country: "Australia",
          long: 133.77513599999997,
          lat: -25.274398
        },
        {
          country: "Brazil",
          long: -51.92527999999999,
          lat: -14.235004
        },
        {
          country: "Canada",
          long: -106.34677099999999,
          lat: 56.130366
        },
        {
          country: "China",
          long: 104.19539699999996,
          lat: 35.86166000000001
        },
        {
          country: "England",
          long: -1.1743197000000691,
          lat: 52.3555177
        },
        {
          country: "France",
          long: 2.213749000000007,
          lat: 46.227638
        },
        {
          country: "India",
          long: 78.96288000000004,
          lat: 20.593684
        },
        {
          country: "Indonesia",
          long: 113.92132700000002,
          lat: -0.789275
        },
        {
          country: "Japan",
          long: 138.252924,
          lat: 36.204824
        },
        {
          country: "Mexico",
          long: -102.55278399999997,
          lat: 23.634501
        },
        {
          country: "Philippines",
          long: 121.77401699999996,
          lat: 12.879721
        },
        {
          country: "Poland",
          long: 19.14513599999998,
          lat: 51.919438
        },
        {
          country: "Singapore",
          long: 103.81983600000001,
          lat: 1.352083
        },
        {
          country: "South Africa",
          long: 22.937505999999985,
          lat: -30.559482
        },
        {
          country: "Thailand",
          long: 100.99254100000007,
          lat: 15.870032
        },
        {
          country: "Turkey",
          long: 35.243322000000035,
          lat: 38.963745
        },
        {
          country: "USA",
          long: -95.71289100000001,
          lat: 37.09024
        }
      ],
      data: {
        type: "FeatureCollection",
        features: []
      }
    };
  },
  watch: {
    selectCoordinates(val, oldVal) {
      // is triggered whenever the store state changes
      let map = this.loadMap(TOKEN);
      var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat(val)
        .setHTML(
          "<h1>Title</h1><p>Some Info.... Some Info....</p><p>Some Info.... Some Info....</p><p>Some Info.... Some Info....</p><p>Some Info....</p>"
        )
        .addTo(map);
      // map.on("load", () => {
      //   this.addMarkers(map);
      // });
      console.log("do stuff", val, oldVal);
      map.flyTo({ center: val, zoom: 4 });
      // this.addMarkers(this.loadMap(TOKEN));
      console.log(popup);
      popup.on("close", () => {
        map.flyTo({
          center: val,
          zoom: 0
        });
      });
    }
  },
  mounted() {
    let map = this.loadMap(TOKEN);

    this.countryData.forEach(x => {
      this.data.features.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [x.long, x.lat]
        },
        properties: {
          title: x.country,
          icon: "circle"
        }
      });
    });

    map.on("load", () => {
      this.addMarkers(map);
    });

    console.log(this.selectCountry);
    // map.flyTo({ center: [this.selectCountry.long, this.selectCountry.lat] });
  },
  methods: {
    loadMap(token) {
      mapboxgl.accessToken = token;
      let map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/light-v9",
        center: [-77.04, 38.907],
        zoom: 0
      });
      return map;
    },
    addMarkers(map, lat, long, country) {
      map.addLayer({
        id: "points",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: this.data.features
          }
        },
        layout: {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        }
      });
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>
