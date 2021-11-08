import { showAlert } from './utils.js';

const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте ещё раз');
    });
};


function sendData(onSuccess, onFail, body) {
  return fetch(
    'https://245.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
}


export { getData, sendData };
