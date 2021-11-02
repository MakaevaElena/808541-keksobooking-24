import { showAlert } from './utils/util.js';
// import { getFilteredOffers } from './filter.js';

const getData = (onSuccess, onFail, callback) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      else {
        onFail();
      }
    })
    .then((serverData) => {

      onSuccess(serverData,callback);
    })
    .catch(() => {
      onFail(showAlert('данные с сревера не получены'));
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
