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
const createSliceArray = (array) => {
  // const newArray = array.slice();   // полное копирование массива в новый массив
  const randomLenght = getRandomIntInclusive(1, array.length); // случайное число в пределах длины массива
  return _.shuffle(array).slice(0, randomLenght); // перемешать и обрезать случайную длину.
};

const createLocation = () => ({                     //arrow-body-style
  lat: getRandomArbitrary(35.65000, 35.70000, 5),
  lng: getRandomArbitrary(139.70000, 139.80000, 5),
}
);

const createOffer = () => ({
  title: getRandomArrayElement(TITLES),
  adress: createLocation(),
  price: getRandomIntInclusive(1, MAX_PRICE),
  type: getRandomArrayElement(TYPES),
  rooms: getRandomIntInclusive(1, MAX_ROOMS),
  guests: getRandomIntInclusive(1, MAX_GUESTS),
  checkin: getRandomArrayElement(CHECKIN_OUTS),
  checkout: getRandomArrayElement(CHECKIN_OUTS),
  features: createSliceArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTIONS),
  photos: createSliceArray(PHOTOS),
}
);

// функция возвращает обьекты(данные) все вместе, для одного случайного обьявления.
const createAdvertisment = () => {
  const newLocation = createLocation();
  const newAuthor = createAuthor();
  const newOffer = createOffer();
  return {
    author: newAuthor,
    offer: newOffer,
    location: newLocation,
  };
};

// сгенерировать случайные объекты(обьявления) и заполнить ими массив.
const similarAdvertisments = Array.from({ length: COUNT_OFFERS }, createAdvertisment);

similarAdvertisments;   // временное использование.

