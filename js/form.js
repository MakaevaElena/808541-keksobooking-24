import { GLOSSARY_TYPES } from './data.js';
import { sendData } from './api.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const title = adForm.querySelector('#title');
const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_ROOMS = '100';
const MIN_GUESTS = '0';

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

type.addEventListener('change', () => {
  price.style = '';
  if (Number(price.value) < Number(GLOSSARY_TYPES[type.value].price)) {
    price.setCustomValidity(`Цена должна быть не менее ${Number(GLOSSARY_TYPES[type.value].price)}`);
  }
  if (Number(price.value) > Number(price.max)) {
    price.setCustomValidity(`Цена должна быть не более ${Number(price.max)}`);
  }
  price.setCustomValidity('');
  price.reportValidity();
});

const compareCapacitiAndRoomNumber = () => {
  roomNumber.setCustomValidity('');
  roomNumber.style = '';
  capacity.setCustomValidity('');
  capacity.style = '';

  if (Number(roomNumber.value) < Number(capacity.value) && roomNumber.value !== MAX_ROOMS) {
    roomNumber.setCustomValidity('количество комнат недостаточно');
    roomNumber.style = 'border: 2px solid red';
  }
  if (roomNumber.value === MAX_ROOMS && capacity.value !== MIN_GUESTS) {
    roomNumber.setCustomValidity('вариант 100 комнат только "не для гостей"');
  }
  if (capacity.value === MIN_GUESTS && roomNumber.value !== MAX_ROOMS) {
    capacity.setCustomValidity('выберите количество комнат');
  }
  roomNumber.reportValidity();
  capacity.reportValidity();
};

roomNumber.addEventListener('change', () => { compareCapacitiAndRoomNumber(); });
capacity.addEventListener('change', () => { compareCapacitiAndRoomNumber(); });


timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});
timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

const successMessageEscape = (evt) => {
  const popupSuccess = document.querySelector('.success');
  evt.preventDefault();
  if (evt.key === 'Escape') {
    popupSuccess.remove();
  }
  popupSuccess.remove();
  document.removeEventListener('keydown', successMessageEscape);
  document.removeEventListener('click', successMessageEscape);
};

const errorMessageEscape = (evt) => {
  const popupError = document.querySelector('.error');
  evt.preventDefault();
  if (evt.key === 'Escape') {
    popupError.remove();
  }
  popupError.remove();
  document.removeEventListener('keydown', errorMessageEscape);
  document.removeEventListener('click', errorMessageEscape);
};

const successMesage = document.querySelector('#success')
  .content;
const createSuccessMesage = () => {
  const successPopUp = successMesage.cloneNode(true);
  document.addEventListener('keydown', successMessageEscape);
  document.addEventListener('click', successMessageEscape);
  document.body.appendChild(successPopUp);
};

const errorMesage = document.querySelector('#error')
  .content;
const createErrorMesage = () => {
  const errorPopUp = errorMesage.cloneNode(true);
  document.addEventListener('keydown', errorMessageEscape);
  document.addEventListener('click', errorMessageEscape);
  document.body.appendChild(errorPopUp);
};

const setUserFormSubmit = (callback) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => createSuccessMesage(),
      () => createErrorMesage(),
      new FormData(evt.target),
    );
    callback();
  });
};

export { setUserFormSubmit, adForm, mapFilters, doFormDisable, doFormActive };
