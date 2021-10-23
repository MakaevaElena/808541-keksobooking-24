import { externalData } from './data.js';
// import { popupAdsByTemp } from './getSameElements';
// import { adForm } from './form';

const resetButton = document.querySelector('#reset');
// const address = adForm.querySelector('#address');

const createMap = () => {
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

  // mainPinMarker.on('moveend', (evt) => {//текущие координаты в поле формы
  // });

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

  const points = [//создание меток
    {
      title: 'Футура',
      lat: externalData[1].location.lat,
      lng: externalData[1].location.lng,
    },
    {
      title: 'Шаверма',
      lat: externalData[2].location.lat,
      lng: externalData[2].location.lng,
    },
    {
      title: 'Франк',
      lat: externalData[3].location.lat,
      lng: externalData[3].location.lng,
    },
    {
      title: 'Ginza',
      lat: externalData[4].location.lat,
      lng: externalData[4].location.lng,
    },
  ];
  //получение DOM-элемента для балуна из разметки.
  // const createCustomPopup = (point) => {
  //   const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
  //   const popupElement = balloonTemplate.cloneNode(true);

  //   popupElement.querySelector('.balloon__title').textContent = point.title;
  //   popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;

  //   return popupElement;
  // };

  const createCustomPopup = (point) => {
    // console.log(point);
    const balloonTemplate = document.querySelector('#card').content.querySelector('.popup'); //нашли шаблон
    const popupElement = balloonTemplate.cloneNode(true);
    popupElement.querySelector('.popup__title').textContent = point.title;
    popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.lat}, ${point.lng}`;
    popupElement.querySelector('.popup__text--price').textContent = `${point.price}₽/ночь`;

    // popupElement.querySelector('.popup__type').textContent = GLOSSARY_TYPES[point.type].rus;
    // popupElement.querySelector('.popup__text--capacity').textContent = `${point.rooms} комнаты для ${point.guests} гостей`;
    // popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.checkin}, выезд до ${point.checkout}`;
    // const tempFeaturesList = popupElement.querySelector('.popup__features');// нашли блок features
    // const tempFeatures = tempFeaturesList.querySelectorAll('.popup__feature');//нашли все элементы feature
    // tempFeatures.forEach((tempFeature) => {
    //   const isNessesary = point.features.some(
    //     (feature) => tempFeature.classList.contains(`popup__feature--${feature}`));// перебираем коллекцию popup__feature и сравниваем с входными данными.
    //   if (!isNessesary) {
    //     tempFeature.remove();
    //   }
    // });
    return popupElement;
  };

  const markerGroup = L.layerGroup().addTo(map); //создание отдельного слоя для меток

  const createMarker = (point) => {//добавление своей иконки для меток
    const { lat, lng } = point;
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
      .bindPopup(createCustomPopup(point)); //привяжем к каждой нашей метке балун

    // console.log(point);
  };
  // points.forEach((point) => {
  //   createMarker(point);
  // });

  // markerGroup.clearLayers(); // удалить слой с метками

  //фильтр: удалить один слой, показать другой слой
  const nextButton = document.querySelector('#next');

  points.slice(0, points.length / 2).forEach((point) => {
    createMarker(point);
  });

  nextButton.addEventListener('click', () => {
    markerGroup.clearLayers();
    points.slice(points.length / 2).forEach((point) => {
      createMarker(point);
    });
    nextButton.remove();
  });
};

export { createMap };
