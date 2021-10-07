// Получение случайного целого числа в заданном интервале, включительно
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  if (min >= max || min < 0) {
    return false;
  }
  min = Math.ceil(min); // округление вверх
  max = Math.floor(max); // округление вниз
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
getRandomIntInclusive(3, 8); // Временный вызов функции

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

function getRandomArbitrary(min, max, count) {
  if (min >= max || min < 0) {
    return false;
  }
  const RandomNum = Math.random() * (max - min) + min; // получаем случайное число в интервале.
  return RandomNum.toFixed(count); // toFixed() округляет дробную часть до count знаков после запятой.
}
getRandomArbitrary(3.45, 96.567, 2); // Временный вызов функции

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_OUTS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TITLES = [
  'Сдам квартиру',
  'Квартира около метро',
  'Квартира в тихом центре',
];

const DESCRIPTIONS = [
  'Самый уютный номер',
  'Номер для молодоженов',
  'Тихие и комфортные номера для Вас',
];

const MAX_ROOMS = 10;
const MAX_GUESTS = 15;
const MAX_PRICE = 100000;
const COUNT_OFFERS = 10;

const LOCATION = {
  lat: {
    min: 35.65000,
    max: 35.70000,
  },
  lng: {
    min: 139.70000,
    max: 139.80000,
  },
  round: 5,
};


const USERS_COUNT = 10;
const userIdList = [];
for (let id = 1; id <= USERS_COUNT; id++) {
  if (id < 10) {
    id = `0${id}`;
  }
  userIdList.push(id);
}

const createAuthor = () => {
  const number = userIdList.shift();
  return {
    avatar: `img/avatars/user${number}.png`,
  };
};

// функция по поиску случайного элемента в переданном массиве.
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

// функция создания перемешанного массива случайной длины
const createSlicedArray = (array) => {
  // const newArray = array.slice();   // полное копирование массива в новый массив
  const randomLenght = getRandomIntInclusive(1, array.length); // случайное число в пределах длины массива
  return _.shuffle(array).slice(0, randomLenght); // перемешать и обрезать случайную длину.
};

const createLocation = () => ({
  lat: getRandomArbitrary(LOCATION.lat.min, LOCATION.lat.max, LOCATION.round),
  lng: getRandomArbitrary(LOCATION.lng.min, LOCATION.lng.max, LOCATION.round),
}
);

const createOffer = (location) => ({
  title: getRandomArrayElement(TITLES),
  address: `${location.lat},${location.lng}`,

  price: getRandomIntInclusive(1, MAX_PRICE),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomIntInclusive(1, MAX_ROOMS),
  guests: getRandomIntInclusive(1, MAX_GUESTS),
  checkin: getRandomArrayElement(CHECKIN_OUTS),
  checkout: getRandomArrayElement(CHECKIN_OUTS),
  features: createSlicedArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: createSlicedArray(PHOTOS),
}
);

//функция возвращает обьекты(данные) все вместе, для одного случайного обьявления.
const createAdvertisment = () => {
  const newLocation = createLocation();
  const newAuthor = createAuthor();
  const newOffer = createOffer(newLocation);
  return {
    author: newAuthor,
    offer: newOffer,
    location: newLocation,
  };
};

// сгенерировать случайные объекты(обьявления) и заполнить ими массив.
const similarAdvertisments = Array.from({ length: COUNT_OFFERS }, createAdvertisment);

similarAdvertisments;   // временное использование.

