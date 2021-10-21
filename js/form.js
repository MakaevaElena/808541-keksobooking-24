import { GLOSSARY_TYPES } from './data.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const doFormDisable = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

function doFormActive(form) {
  form.classList.remove(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);
  formChildren.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
}

// ВАЛИДАЦИЯ ФОРМЫ
const title = adForm.querySelector('#title');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_GUESTS = '100';
const MIN_GUESTS = '0';

const selectMinPrice = () => {
  price.min = GLOSSARY_TYPES[type.value].price;
  price.placeholder = GLOSSARY_TYPES[type.value].price;
};
type.addEventListener('change', selectMinPrice);

title.addEventListener('input', () => {
  title.setCustomValidity('');
  title.style = '';
  if (title.value.length > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Заголовок должен быть меньше ${MAX_TITLE_LENGTH}`);
  }
  if (title.value.length < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Заголовок должен быть больше ${MIN_TITLE_LENGTH}`);
  }
  title.reportValidity();
});
//синхронизация типа жилья и цены за ночь
type.addEventListener('change', () => {
  price.setCustomValidity('');
  price.style = '';
  if (Number(price.value) < Number(GLOSSARY_TYPES[type.value].price)) {
    price.setCustomValidity(`Цена должна быть не менее ${Number(GLOSSARY_TYPES[type.value].price)}`);
  }
  if (Number(price.value) > Number(price.max)) {
    price.setCustomValidity(`Цена должна быть не более ${Number(price.max)}`);
  }
  price.reportValidity();
});

roomNumber.addEventListener('change', () => {
  roomNumber.setCustomValidity('');
  roomNumber.style = '';
  if (Number(roomNumber.value) < Number(capacity.value)) {
    roomNumber.setCustomValidity('количество комнат недостаточно');
    roomNumber.style = 'border: 2px solid red';
  }
  if (roomNumber.value === MAX_GUESTS) {
    capacity.value = MIN_GUESTS;
    capacity.setCustomValidity('не для гостей');
  }
  roomNumber.reportValidity();
});

capacity.addEventListener('change', () => {
  capacity.setCustomValidity('');
  capacity.style = '';
  if (Number(roomNumber.value) < Number(capacity.value)) {
    capacity.setCustomValidity('для указанного количества гостей комнат недостаточно');
    capacity.style = 'border: 2px solid red';
  }
  if (roomNumber.value === MAX_GUESTS) {
    capacity.value = MIN_GUESTS;
    capacity.setCustomValidity('не для гостей');
    roomNumber.setCustomValidity('не для гостей');
  }
  capacity.reportValidity();
});
// синхронизация времени
timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

export { adForm, mapFilters, doFormDisable, doFormActive };
