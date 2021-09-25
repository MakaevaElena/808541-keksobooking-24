// Получение случайного целого числа в заданном интервале, включительно
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomIntInclusive(min, max) {
  if (min >= max && min < 0) {
    return false;
  }
  min = Math.ceil(min); // округление вверх
  max = Math.floor(max); // округление вниз
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
getRandomIntInclusive(); // Временный вызов функции


//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed

function getRandomArbitrary(min, max, count) {
  if (min >= max && min < 0) {
    return false;
  }
  const RandomNum = Math.random() * (max - min) + min; // получаем случайное число в интервале.
  return RandomNum.toFixed(count); // toFixed() округляет дробную часть до count знаков после запятой.
}
getRandomArbitrary(); // Временный вызов функции
