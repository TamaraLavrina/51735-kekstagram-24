const errorTemplate = document.querySelector('#error').content;
const errorMessage = errorTemplate.querySelector('.error');
const newErrorMessage = errorMessage.cloneNode(true);
const errorButton = newErrorMessage.querySelector('.error__button');
const successTemplate = document.querySelector('#success').content;
const successMessage = successTemplate.querySelector('.success');
const newSuccessMessage = successMessage.cloneNode(true);
const successButton = newSuccessMessage.querySelector('.success__button');

const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

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

const onSuccesCardEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onSuccessButtonClick();
  }
};

const showSuccesCard = () => {
  newSuccessMessage.style.zIndex = 10;
  document.body.appendChild(newSuccessMessage);
  document.addEventListener('keydown', onSuccesCardEscKeydown);
  successButton.addEventListener('click', onSuccessButtonClick);
};

function onSuccessButtonClick () {
  newSuccessMessage.style.display = 'none';
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('keydown', onSuccesCardEscKeydown);
}

const onErrorCardEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onErrorButtonClick();
  }
};

const showErrorCard = () => {
  newErrorMessage.style.zIndex = 10;
  document.body.appendChild(newErrorMessage);
  document.addEventListener('keydown', onErrorCardEscKeydown);
  errorButton.addEventListener('click', onErrorButtonClick);
};

function onErrorButtonClick () {
  newErrorMessage.style.display = 'none';
  errorButton.removeEventListener('click', onErrorButtonClick);
  document.removeEventListener('keydown', onErrorCardEscKeydown);
}

const DELAY = 500;
const debounce = (callback, timeoutDelay=DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const ERROR_MESSAGE = 'Не удалось загрузить данные. Попробуйте ещё раз';

export {
  isEscapeKey,
  showAlert,
  showSuccesCard,
  showErrorCard,
  debounce,
  ERROR_MESSAGE
};
