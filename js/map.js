import { adForm, doFormActive, mapFilters } from './form.js';
import { getCards } from './cards.js';
import { getData } from './api.js';
import { showAlert } from './utils/util.js';
import { getFilteredOffers } from './filter.js';
import { deletePhotos } from './load-photos.js';

const RANGE_NUMBER = 5;
const ZOOM = 12;
const SIMILAR_ADS_COUNT = 10;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const DEFAULT_LAT_LNG = {
  lat: 35.65952,
  lng: 139.78179,
};
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

const markerGroup = L.layerGroup();

const createMarker = (points) => {
  points.forEach((point) => {
    const lat = point.location.lat;
    const lng = point.location.lng;
    const icon = L.icon(MARKER);
    const marker = L.marker({
      lat,
      lng,
    }, {
      icon,
    });
    marker.addTo(markerGroup)
      .bindPopup(getCards(point));
  });
};

const onDefaultMap = () => {
  inputAddress.value = `${DEFAULT_LAT_LNG.lat},${DEFAULT_LAT_LNG.lng}`;
  getData(
    (dataList) => {
      createMarker(dataList.slice(0, SIMILAR_ADS_COUNT));
      getFilteredOffers(dataList.slice());
      doFormActive(adForm);
      doFormActive(mapFilters);
    },
    () => showAlert('данные с сревера не получены'),
  );
};

const map = L.map('map-canvas').on('load', onDefaultMap).setView(DEFAULT_LAT_LNG, ZOOM);

markerGroup.addTo(map);
const clearMarkerGroup = () => markerGroup.clearLayers();

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

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  inputAddress.value = `${lat.toFixed(RANGE_NUMBER)}, ${lng.toFixed(RANGE_NUMBER)}`;
  map.setView(evt.target.getLatLng(), ZOOM);
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

export { setReset, clearAll, clearMarkerGroup, createMarker };
