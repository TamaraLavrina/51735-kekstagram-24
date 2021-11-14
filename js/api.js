const API_URL = 'https://24.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(`${API_URL}/data`)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => fetch(
  API_URL,
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

export { getData, sendData };
