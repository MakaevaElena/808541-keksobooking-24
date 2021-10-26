import { adForm } from './form.js';
import { popupAdsByTemp } from './getSameElements.js';

const DEFAULT_LAT_LNG = {
  lat: 35.65952,
  lng: 139.78179,
};
const RANGE_NUM = 5;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 10;
const ICON = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const MARKER = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};
const address = adForm.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');

const map = L.map('map-canvas')
  .on('load', () => {
    address.value = `${DEFAULT_LAT_LNG.lat},${DEFAULT_LAT_LNG.lng}`;
  })
  .setView(DEFAULT_LAT_LNG, 10);

L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const mainPinIcon = L.icon(ICON);

const mainPinMarker = L.marker(
  DEFAULT_LAT_LNG,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

mainPinMarker.on('move', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(RANGE_NUM)}, ${lng.toFixed(RANGE_NUM)}`;
});

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng(DEFAULT_LAT_LNG);
  map.setView(DEFAULT_LAT_LNG, ZOOM);
  address.value = `${DEFAULT_LAT_LNG.lat},${DEFAULT_LAT_LNG.lng}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (points) => {
  for (let i = 0; i < points.length; i++) {
    const lat = points[i].location.lat;
    const lng = points[i].location.lng;
    const icon = L.icon(MARKER);

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker.addTo(markerGroup)
      .bindPopup(popupAdsByTemp(points[i]));
  }
};
export { createMarker };
