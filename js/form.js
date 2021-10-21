const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const doFormDisable = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`);

  const formChildren = Array.from(form.children);   //преобразование в массив
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
title.addEventListener('input', () => {
  if (title.value.length > 100) {
    title.setCustomValidity('Заголовок должен быть меньше 100');
  }
  else if (title.value.length < 30) {
    title.setCustomValidity('Заголовок должен быть больше 30');
  }
  else {
    title.setCustomValidity('');
    title.style = '';
  }
  title.reportValidity();
});

const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');

const selectMinPrice = () => {
  price.min = MIN_PRICE[type.value];
  price.placeholder = MIN_PRICE[type.value];
};
type.addEventListener('change', selectMinPrice);

type.addEventListener('change', () => {
  if (price.value < MIN_PRICE[type.value]) {
    price.setCustomValidity(`Цена должна быть не менее ${MIN_PRICE[type.value]}`);
  }
  else if (price.value > price.max) {
    price.setCustomValidity(`Цена должна быть не более ${price.max}`);
  }
  else {
    price.setCustomValidity('');
    price.style = '';
  }
  price.reportValidity();
});


const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

// console.log(typeof (roomNumber.value));
// console.log(capacity.value);

roomNumber.addEventListener('change', () => {

  if (Number(roomNumber.value) < Number(capacity.value)) {

    roomNumber.setCustomValidity('количество комнат недостаточно');
    roomNumber.style = 'border: 2px solid red';
  }
  else {
    roomNumber.setCustomValidity('');
    roomNumber.style = '';
  }
  roomNumber.reportValidity();
});

capacity.addEventListener('change', () => {

  if (Number(roomNumber.value) < Number(capacity.value)) {

    capacity.setCustomValidity('для указанного количества гостей комнат недостаточно');
    capacity.style = 'border: 2px solid red';
  }

  else {
    capacity.setCustomValidity('');
    capacity.style = '';
  }
  capacity.reportValidity();
});

export { adForm, mapFilters, doFormDisable, doFormActive };
