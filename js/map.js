import { externalData } from './data.js';
import { adForm } from './form.js';
import { popupAdsByTemp } from './getSameElements.js';

const MAIN_ICON_URL = 'img/main-pin.svg';
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANHOR = [26, 52];
const MARKER_URL = 'img/pin.svg';
const MARKER_SIZE = [40, 40];
const MARKER_ANHOR = [20, 40];
const resetButton = document.querySelector('#reset');
const address = adForm.querySelector('#address');
const MAIN_LAT = 35.65952;
const MAIN_LNG = 139.78179;
const RANGE_NUM = 5;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 16;

const map = L.map('map-canvas')
  .on('load', () => { // подсписка на события
  })
  .setView({ //параметры отображения карты — центр и масштаб.
    lat: MAIN_LAT,
    lng: 139.78179,
  }, 10);

// изображения карт
L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const mainPinIcon = L.icon({// добавили свою иконку svg
  iconUrl: MAIN_ICON_URL,
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANHOR,
});

const mainPinMarker = L.marker( //добавление метки
  {
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon, // заменили на свою иконку
  },
);

mainPinMarker.addTo(map); //добавить метку на карту

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(RANGE_NUM)}, ${lng.toFixed(RANGE_NUM)}`;
});

resetButton.addEventListener('click', () => { //вернуть иконку на исходное место
  mainPinMarker.setLatLng({
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  });
  map.setView({//вернуть исходный масштаб
    lat: MAIN_LAT,
    lng: MAIN_LNG,
  }, ZOOM);
});

// mainPinMarker.remove(); //удалить метку с карты

const markerGroup = L.layerGroup().addTo(map); //создание отдельного слоя для меток

const createMarker = (points) => {//добавление своей иконки для меток
  for (let i = 0; i < externalData.length; i++) {
    const lat = points[i].location.lat;
    const lng = points[i].location.lng;
    const icon = L.icon({
      iconUrl: MARKER_URL,
      iconSize: MARKER_SIZE,
      iconAnchor: MARKER_ANHOR,
    });

    const marker = L.marker(//создание всех меток
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker.addTo(markerGroup) //добавление всех меток на карту map / в слой markerGroup
      .bindPopup(popupAdsByTemp(points[i]));//привяжем к каждой нашей метке балун
  }
};
export { createMarker };
