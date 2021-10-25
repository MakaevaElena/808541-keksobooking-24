import { externalData } from './data.js';
import { adForm } from './form.js';
import { popupAdsByTemp } from './getSameElements.js';


const resetButton = document.querySelector('#reset');
const address = adForm.querySelector('#address');

// const createMap = () => {
// подставляем карту в блок map-canvas
const map = L.map('map-canvas')
  .on('load', () => { // подсписка на события
  })
  .setView({ //параметры отображения карты — центр и масштаб.
    lat: 35.65952,
    lng: 139.78179,
  }, 10);

// изображения карт
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({// добавили свою иконку svg
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker( //добавление метки
  {
    lat: 35.65952,
    lng: 139.78179,
  },
  {
    draggable: true,
    icon: mainPinIcon, // заменили на свою иконку
  },
);

mainPinMarker.addTo(map); //добавить метку на карту

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});

resetButton.addEventListener('click', () => { //вернуть иконку на исходное место
  mainPinMarker.setLatLng({
    lat: 35.65952,
    lng: 139.78179,
  });
  map.setView({//вернуть исходный масштаб
    lat: 35.65952,
    lng: 139.78179,
  }, 16);
});

// mainPinMarker.remove(); //удалить метку с карты

const markerGroup = L.layerGroup().addTo(map); //создание отдельного слоя для меток

const createMarker = (points) => {//добавление своей иконки для меток
  for (let i = 0; i < externalData.length; i++) {
    const lat = points[i].location.lat;
    const lng = points[i].location.lng;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
  // points.forEach((point) => {
  //   const lat = point.location.lat;
  //   const lng = point.location.lng;
  //   const icon = L.icon({
  //     iconUrl: 'img/pin.svg',
  //     iconSize: [40, 40],
  //     iconAnchor: [20, 40],
  //   });

  //   const marker = L.marker(//создание всех меток
  //     {
  //       lat,
  //       lng,
  //     },
  //     {
  //       icon,
  //     },
  //   );
  //   marker.addTo(markerGroup) //добавление всех меток на карту map / в слой markerGroup
  //     .bindPopup(popupAdsByTemp(point));//привяжем к каждой нашей метке балун
  // });

  // markerGroup.clearLayers(); // удалить слой с метками
  // };
};
export { createMarker };
