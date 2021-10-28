// import { getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement, createSlicedArray } from './utils/util.js';

const GLOSSARY_TYPES = {
  bungalow: {
    rus: 'Бунгало',
    price: 0,
  },
  flat: {
    rus: 'Квартира',
    price: 1000,
  },
  hotel: {
    rus: 'Отель',
    price: 3000,
  },
  house: {
    rus: 'Дом',
    price: 5000,
  },
  palace: {
    rus: 'Дворец',
    price: 10000,
  },
};

// const TYPES = [
//   'palace',
//   'flat',
//   'house',
//   'bungalow',
//   'hotel',
// ];

// const CHECKIN_OUTS = [
//   '12:00',
//   '13:00',
//   '14:00',
// ];

// const FEATURES = [
//   'wifi',
//   'dishwasher',
//   'parking',
//   'washer',
//   'elevator',
//   'conditioner',
// ];

// const PHOTOS = [
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
//   'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
// ];

// const TITLES = [
//   'Сдам квартиру',
//   'Квартира около метро',
//   'Квартира в тихом центре',
// ];

// const DESCRIPTIONS = [
//   'Самый уютный номер',
//   'Номер для молодоженов',
//   'Тихие и комфортные номера для Вас',
// ];

// const MAX_ROOMS = 10;
// const MAX_GUESTS = 15;
// const MAX_PRICE = 100000;
// const COUNT_OFFERS = 10;

// const LOCATION = {
//   lat: {
//     min: 35.65000,
//     max: 35.70000,
//   },
//   lng: {
//     min: 139.70000,
//     max: 139.80000,
//   },
//   round: 5,
// };

// const USERS_COUNT = 10;
// const userIdList = [];
// for (let id = 1; id <= USERS_COUNT; id++) {
//   if (id < 10) {
//     id = `0${id}`;
//   }
//   userIdList.push(id);
// }

// const createAuthor = () => {
//   const number = userIdList.shift();
//   return {
//     avatar: `img/avatars/user${number}.png`,
//   };
// };

// const createLocation = () => ({
//   lat: getRandomArbitrary(LOCATION.lat.min, LOCATION.lat.max, LOCATION.round),
//   lng: getRandomArbitrary(LOCATION.lng.min, LOCATION.lng.max, LOCATION.round),
// }
// );

// const createOffer = (location) => ({
//   title: getRandomArrayElement(TITLES),
//   address: `${location.lat},${location.lng}`,

//   price: getRandomIntInclusive(1, MAX_PRICE),
//   type: getRandomArrayElement(TYPES),
//   rooms: getRandomIntInclusive(1, MAX_ROOMS),
//   guests: getRandomIntInclusive(1, MAX_GUESTS),
//   checkin: getRandomArrayElement(CHECKIN_OUTS),
//   checkout: getRandomArrayElement(CHECKIN_OUTS),
//   features: createSlicedArray(FEATURES),
//   description: getRandomArrayElement(DESCRIPTIONS),
//   photos: createSlicedArray(PHOTOS),
// }
// );

//функция возвращает обьекты(данные) все вместе, для одного случайного обьявления.
// const createAdvertisment = () => {
//   const newLocation = createLocation();
//   const newAuthor = createAuthor();
//   const newOffer = createOffer(newLocation);
//   return {
//     author: newAuthor,
//     offer: newOffer,
//     location: newLocation,
//   };
// };

// сгенерировать случайные объекты(обьявления) и заполнить ими массив.
// const externalData = Array.from({ length: COUNT_OFFERS }, createAdvertisment);

// export { externalData, GLOSSARY_TYPES };
export { GLOSSARY_TYPES };
