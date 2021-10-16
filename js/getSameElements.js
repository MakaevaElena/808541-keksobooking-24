// import { externalData } from './data.js';

const rusTypes = {    // словарь
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const offerKeys = {
  title: 'title',
  address: 'text--address',
  price: 'text--price',
  type: 'type',
  rooms: 'text--capacity',
  guests: 'text--capacity',
  checkin: 'text--time',
  checkout: 'text--time',
  features: 'features',
  description: 'description',
  photos: 'photos',
};

const similarListElement = document.querySelector('#map-canvas');
const similarAdvertismentTemplate = document.querySelector('#card').content.querySelector('.popup'); //нашли шаблон

const similarListFragment = document.createDocumentFragment(); // создали фрагмент

const popupAdsByTemp = (dataList) => {


  const element = similarAdvertismentTemplate.cloneNode(true); //клонируем шаблон

  Object.keys(dataList.offer).forEach((key) => { // проверка на наличие элементов
    if (!key) {
      element.querySelector(`.popup__${offerKeys[key]}`).classList.add('hidden');
    }
  });

  element.querySelector('.popup__title').textContent = dataList.offer.title;
  element.querySelector('.popup__text--address').textContent = dataList.offer.address;
  element.querySelector('.popup__text--price').textContent = `${dataList.offer.price}₽/ночь`;
  element.querySelector('.popup__type').textContent = rusTypes[dataList.offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${dataList.offer.rooms} комнаты для ${dataList.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${dataList.offer.checkin}, выезд до ${dataList.offer.checkout}`;

  // В список .popup__features выведите все доступные удобства в объявлении.
  const tempFeaturesList = element.querySelector('.popup__features');// нашли блок features
  const tempFeatures = tempFeaturesList.querySelectorAll('.popup__feature');//нашли все элементы feature
  tempFeatures.forEach((tempFeature) => {
    const isNessesary = dataList.offer.features.some(
      (feature) => tempFeature.classList.contains(`popup__feature--${feature}`));// перебираем коллекцию popup__feature и сравниваем с входными данными.
    if (!isNessesary) {
      tempFeature.remove();
    }
  });

  element.querySelector('.popup__description').textContent = dataList.offer.description;

  const tempPhotoList = element.querySelector('.popup__photos');
  const tempPhotos = tempPhotoList.querySelector('.popup__photo');

  // tempPhotoList.innerHTML = '';

  for (let i = 0; i < dataList.offer.photos.length; i++) {

    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = dataList.offer.photos[i];
    img.alt = 'Фотография жилья';
    img.width = 45;
    img.height = 30;

    tempPhotoList.appendChild(img);
  }
  tempPhotos.remove();

  if (!dataList.author.avatar) {
    element.querySelector('.popup__avatar').classList.add('hidden');
  }
  element.querySelector('.popup__avatar').src = dataList.author.avatar;

  similarListFragment.appendChild(element);

  similarListElement.appendChild(similarListFragment); // добавили в блок карты
};

export { popupAdsByTemp };
