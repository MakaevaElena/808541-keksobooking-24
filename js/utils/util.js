const ALERT_SHOW_TIME = 5000;

function getRandomIntInclusive(min, max) {
  if (min >= max || min < 0) {
    return false;
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomIntInclusive(3, 8);

function getRandomArbitrary(min, max, count) {
  if (min >= max || min < 0) {
    return false;
  }
  const RandomNum = Math.random() * (max - min) + min;
  return RandomNum.toFixed(count);
}
getRandomArbitrary(3.45, 96.567, 2);

const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

const createSlicedArray = (array) => {

  const randomLenght = getRandomIntInclusive(1, array.length);
  return _.shuffle(array).slice(0, randomLenght);
};

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
