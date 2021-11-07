import { GLOSSARY_TYPES } from './data.js';

const IMG_WIDTH = 45;
const IMG_HEIGHT = 40;
const OFFER_KEYS = {
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

const similarCardsTemplate = document.querySelector('#card').content.querySelector('.popup');

const getCards = (dataList) => {
  const element = similarCardsTemplate.cloneNode(true);
  const cardFeaturesList = element.querySelector('.popup__features');
  const cardFeatures = cardFeaturesList.querySelectorAll('.popup__feature');
  const cardPhotoList = element.querySelector('.popup__photos');
  const cardPhotos = cardPhotoList.querySelector('.popup__photo');

  Object.keys(dataList.offer).forEach((key) => {
    if (!key) {
      element.querySelector(`.popup__${OFFER_KEYS[key]}`).classList.add('hidden');
    }
  });

  element.querySelector('.popup__title').textContent = dataList.offer.title;
  element.querySelector('.popup__text--address').textContent = dataList.offer.address;
  element.querySelector('.popup__text--price').textContent = `${dataList.offer.price}₽/ночь`;
  element.querySelector('.popup__type').textContent = GLOSSARY_TYPES[dataList.offer.type].rus;
  element.querySelector('.popup__text--capacity').textContent = `${dataList.offer.rooms} комнаты для ${dataList.offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${dataList.offer.checkin}, выезд до ${dataList.offer.checkout}`;
  element.querySelector('.popup__description').textContent = dataList.offer.description;

  cardFeatures.forEach((cardFeature) => {
    if (dataList.offer.features) {
      const isNessesary = dataList.offer.features.some(
        (feature) => cardFeature.classList.contains(`popup__feature--${feature}`));
      if (!isNessesary) {
        cardFeature.remove();
      }
    }
  });

  if (dataList.offer.photos) {
    for (let i = 0; i < dataList.offer.photos.length; i++) {
      const img = document.createElement('img');
      img.classList.add('popup__photo');
      img.src = dataList.offer.photos[i];
      img.alt = 'Фотография жилья';
      img.width = IMG_WIDTH;
      img.height = IMG_HEIGHT;
      cardPhotoList.appendChild(img);
    }
  }
  cardPhotos.remove();

  if (!dataList.author.avatar) {
    element.querySelector('.popup__avatar').classList.add('hidden');
  }
  element.querySelector('.popup__avatar').src = dataList.author.avatar;
  return element;

};

export { getCards };
