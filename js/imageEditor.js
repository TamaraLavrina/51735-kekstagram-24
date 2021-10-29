const form = document.querySelector('.img-upload__form');
const sizeScaleControl = form.querySelector('.scale__control--value');
const previewImg = form.querySelector('.img-upload__preview img');
const buttonPlus = form.querySelector('.scale__control--bigger');
const buttonMinus = form.querySelector('.scale__control--smaller');
const MAX_VALUE = 100;
const STEP = 25;
const MIN_VALUE = 25;

// изменить размер изображения
let value = sizeScaleControl.value;
const increaseSize = () => {

  if (parseInt(sizeScaleControl.value, 10) !== MAX_VALUE) {
    value = `${parseInt(value, 10) + STEP}%`;
    previewImg.style.transform = `scale(${parseInt(value, 10) / MAX_VALUE})`;
    sizeScaleControl.value = value;
  }
};

const decreaseSize =  () => {

  if (parseInt(sizeScaleControl.value, 10) !== MIN_VALUE) {
    value = `${parseInt(value, 10) - STEP}%`;
    previewImg.style.transform = `scale(${parseInt(value, 10) / MAX_VALUE})`;
    sizeScaleControl.value = value;
  }
};

//применить эффекты
const onFilterEffectChange = (evt) =>{

  if (evt.target.matches('input[type="radio"]')) {
    const effect = evt.target.value;
    previewImg.className = `effects__preview--${effect}`;
  }
};

const setImageEditor = () => {
  form.addEventListener('change',  onFilterEffectChange);
  buttonPlus.addEventListener('click', increaseSize);
  buttonMinus.addEventListener('click', decreaseSize);
};

export { setImageEditor };
