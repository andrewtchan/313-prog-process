import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import Circle from 'ol/geom/Circle.js';
import {Vector as VectorSource} from 'ol/source.js';
import Feature from 'ol/Feature';
import { Style, Fill } from 'ol/style';

// set points
const points = [[-120.670375, 35.272506], [-120.670375, 35.272506], 
                [-115.243175, 36.255298], [-115.243175, 36.255298], [-115.243175, 36.255298],
                [-82.322315, 29.688158],
                [-122.568455, 38.106061]]

// create a hash map with key=coordinates, value=count
// this assumes the coordinates are 'standardized', so everyone from the Bay
// Area will have inputted the same coordinates (big simplifying assumption for
// this assignment)
const coordMap = {};
points.forEach(point => {
  const coordString = point.toString();

  if (coordMap.hasOwnProperty(coordString)) {
    coordMap[coordString]++;
  } else {
    coordMap[coordString] = 1;
  }
})

// iterate over hash map, creating array of features with different colors/sizes
const features = [];
for (let coord in coordMap) {
  let feature;
  if (coordMap[coord] === 1) {
    feature = new Feature({
      geometry: new Circle(coord.split(",").map(parseFloat), 0.4)
    })

    feature.setStyle(
      new Style({
        fill: new Fill({
          color: 'rgba(255, 0, 0, 0.5)', // red
        }),
      })
    );
  } else if (coordMap[coord] === 2) {
    feature = new Feature({
      geometry: new Circle(coord.split(",").map(parseFloat), 0.6)
    })

    feature.setStyle(
      new Style({
        fill: new Fill({
          color: 'rgba(0, 255, 0, 0.5)', // blue
        }),
      })
    );
  } else {
    feature = new Feature({
      geometry: new Circle(coord.split(",").map(parseFloat), 0.8)
    })

    feature.setStyle(
      new Style({
        fill: new Fill({
          color: 'rgba(0, 0, 255, 0.5)', // green
        }),
      })
    );
  }

  features.push(feature);
}

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    })
  ],
  view: new View({
    center: [-120.670375, 35.272506],
    zoom: 5,
    projection: 'EPSG:4326'
  })
});
