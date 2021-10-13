import { similarAdvertisments } from './data.js';

const similarListElement = document.querySelector('#map-canvas'); // будем временно вставлять в карту
const similarAdvertismentTemplate = document.querySelector('#card').content.querySelector('popup'); //нашли шаблон

const similarAdvertismentsByTemp = similarAdvertisments();
const similarListFragment = document.createDocumentFragment(); // создали фрагмент

similarAdvertismentsByTemp.forEach((offer, author) => {
  const element = similarAdvertismentTemplate.cloneNode(true); //клонируем шаблон
  element.querySelector('.popup__title').textContent = offer.title;
  element.querySelector('.popup__text--address').textContent = offer.address;
  element.querySelector('.popup__text--price').textContent = `${offer.price}₽/ночь`;

  // В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:

  // const rusTypes = {   //как соотнести ?
  //   flat: Квартира,
  //   bungalow: Бунгало,
  //   house: Дом,
  //   palace: Дворец,
  //   hotel: Отель,
  // };

  element.querySelector('.popup__type').textContent = offer.type;

  element.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  element.querySelector('.popup__features').textContent = offer.features;
  element.querySelector('.popup__description').textContent = offer.description;

  // Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  element.querySelector('.popup__photos').src = offer.photos;

  //Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
  element.querySelector('.popup__avatar').src = author.avatar;


  //Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  if (!offer.description) {
    element.querySelector('.popup__description').classListAdd('visually-hidden');
  }

  similarListFragment.appendChild(element);
});

similarListElement.appendChild(similarListFragment);

