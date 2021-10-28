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

// функция по поиску случайного элемента в переданном массиве.
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

// функция создания перемешанного массива случайной длины
const createSlicedArray = (array) => {
  // const newArray = array.slice();   // полное копирование массива в новый массив
  const randomLenght = getRandomIntInclusive(1, array.length); // случайное число в пределах длины массива
  return _.shuffle(array).slice(0, randomLenght); // перемешать и обрезать случайную длину.
};

const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { getRandomIntInclusive, getRandomArbitrary, getRandomArrayElement, createSlicedArray, showAlert };
