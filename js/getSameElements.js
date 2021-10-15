import { externalData } from './data.js';

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

const similarListElement = document.querySelector('#map-canvas'); // будем временно вставлять в карту
const similarAdvertismentTemplate = document.querySelector('#card').content.querySelector('popup'); //нашли шаблон

const similarAdsByTemp = externalData();
const similarListFragment = document.createDocumentFragment(); // создали фрагмент

const popupAdsByTemp = () => {

  const element = similarAdvertismentTemplate.cloneNode(true); //клонируем шаблон

  Object.keys(similarAdsByTemp.offer).forEach((key) => { // проверка на наличие элементов
    if (!key) {
      element.querySelector(`.popup__${offerKeys[key]}`).classListAdd('hidden');
    }
  });

  element.querySelector('.popup__title').textContent = similarAdsByTemp.offer.title;
  element.querySelector('.popup__text--address').textContent = similarAdsByTemp.offer.address;
  element.querySelector('.popup__text--price').textContent = `${similarAdsByTemp.offer.price}₽/ночь`;
  element.querySelector('.popup__type').textContent = rusTypes[similarAdsByTemp.offer.type];
  element.querySelector('.popup__text--capacity').textContent = `${similarAdsByTemp.offer.rooms} комнаты для ${similarAdsByTemp.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${similarAdsByTemp.offer.checkin}, выезд до ${similarAdsByTemp.offer.checkout}`;

  // В список .popup__features выведите все доступные удобства в объявлении.
  const tempFeaturesList = similarAdvertismentTemplate.querySelectorAll('.popup__features');// нашли блок features
  const tempFeatures = tempFeaturesList.querySelectorAll('popup__feature');//нашли все элементы feature
  tempFeatures.forEach((tempFeature) => {
    const isNessesary = similarAdsByTemp.offer.features.some(
      (feature) => tempFeature.classlist.contains(`.popup__feature--${feature}`));// перебираем коллекцию popup__feature и сравниваем с входными данными.
    if (!isNessesary) {
      tempFeature.remove();
    }
  });

  element.querySelector('.popup__description').textContent = similarAdsByTemp.offer.description;

  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  const popupPhotos = similarAdvertismentTemplate.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';
  similarAdsByTemp.offer.photos.forEach((photo) => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photo;
    img.width = 45;
    img.height = 40;
    if (!img.src) {
      photo.remove();
    }
    popupPhotos.appendChild(img);
  });
  element.querySelector('.popup__photos').src = similarAdsByTemp.photos;

  if (!similarAdsByTemp.author.avatar) {
    element.querySelector('.popup__avatar').classListAdd('hidden');
  }
  element.querySelector('.popup__avatar').src = similarAdsByTemp.author.avatar;

  similarListFragment.appendChild(element);
};

similarListElement.appendChild(similarListFragment);

export { similarListElement, popupAdsByTemp };
