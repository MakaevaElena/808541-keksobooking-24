import { adForm, doFormActive, mapFilters } from './form.js';
import { getCards } from './cards.js';
import { getData } from './api.js';
import { showAlert } from './utils/util.js';
import { getFilteredOffers } from './filter.js';
import { deletePhotos } from './load-photos.js';

const DEFAULT_LAT_LNG = {
  lat: 35.65952,
  lng: 139.78179,
};
const RANGE_NUMBER = 5;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 12;
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
const inputAddress = adForm.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const map = L.map('map-canvas').setView(DEFAULT_LAT_LNG, 12);
// const map = L.map('map-canvas').on('load', onDefaultMap).setView(DEFAULT_LAT_LNG, 12);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (points) => {
  points.forEach((point) => {
    const lat = point.location.lat;
    const lng = point.location.lng;
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
      .bindPopup(getCards(point));
  });
};

const clearMarkerGroup = () => markerGroup.clearLayers();

const onDefaultMap = () => {
  doFormActive(adForm);
  doFormActive(mapFilters);
  inputAddress.value = `${DEFAULT_LAT_LNG.lat},${DEFAULT_LAT_LNG.lng}`;
  const SIMILAR_ADS_COUNT = 10;
  getData(
    (dataList) => {
      createMarker(dataList.slice(0, SIMILAR_ADS_COUNT));
      getFilteredOffers(dataList.slice());
    },
    () => showAlert('данные с сревера не получены'),
  );
};

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
  inputAddress.value = `${lat.toFixed(RANGE_NUMBER)}, ${lng.toFixed(RANGE_NUMBER)}`;
});

const clearAll = () => {
  mainPinMarker.setLatLng(DEFAULT_LAT_LNG);
  map.setView(DEFAULT_LAT_LNG, ZOOM);
  adForm.reset();
  map.closePopup();
  mapFilters.reset();
  onDefaultMap();
  deletePhotos();
};

const setReset = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearAll();
  });
};

export { setReset, clearAll, inputAddress, DEFAULT_LAT_LNG, map, onDefaultMap, clearMarkerGroup, createMarker };
