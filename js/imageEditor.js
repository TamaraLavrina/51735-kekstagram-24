const form = document.querySelector('.img-upload__form');
const sizeScaleControl = form.querySelector('.scale__control--value');
const previewImg = form.querySelector('.img-upload__preview img');
const buttonPlus = form.querySelector('.scale__control--bigger');
const buttonMinus = form.querySelector('.scale__control--smaller');
const sliderElement = form.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const sliderBar = document.querySelector('.img-upload__effect-level');
const effectsList = form.querySelector('.effects__list');
const MAX_VALUE = 100;
const STEP = 25;
const MIN_VALUE = 25;

// изменить размер изображения
let sizeValue = sizeScaleControl.value;
const increaseSize = () => {

  if (parseInt(sizeScaleControl.value, 10) !== MAX_VALUE) {
    sizeValue= `${parseInt(sizeValue, 10) + STEP}%`;
    previewImg.style.transform = `scale(${parseInt(sizeValue, 10) / MAX_VALUE})`;
    sizeScaleControl.value = sizeValue;
  }
};

const decreaseSize =  () => {

  if (parseInt(sizeScaleControl.value, 10) !== MIN_VALUE) {
    sizeValue = `${parseInt(sizeValue, 10) - STEP}%`;
    previewImg.style.transform = `scale(${parseInt(sizeValue, 10) / MAX_VALUE})`;
    sizeScaleControl.value = sizeValue;
  }
};

// изненение стилей в зависимости от выбранного эффекта
const changeEffectLevel = () => {

  if (previewImg.classList.contains('effects__preview--none')) {
    sliderBar.classList.add('hidden');
    previewImg.style.setProperty('filter', 'unset');
    effectLevel.value = '';
  } else  {
    sliderElement.classList.remove('hidden');
    sliderBar.classList.remove('hidden');
  }

  switch(previewImg.className) { //c contains - не работает
    case 'effects__preview--chrome':
      previewImg.style.filter = `grayscale(${effectLevel.value})`;
      break;

    case 'effects__preview--sepia':
      previewImg.style.filter = `sepia(${effectLevel.value})`;
      break;

    case 'effects__preview--marvin':
      previewImg.style.filter = `invert(${effectLevel.value}%)`;
      break;

    case 'effects__preview--phobos':
      previewImg.style.filter = `blur(${effectLevel.value}px)`;
      break;

    case 'effects__preview--heat':
      previewImg.style.filter =`brightness(${effectLevel.value})`;
      break;

    case 'effects__preview--none':
      previewImg.style.filter ='';
      break;
  }
};

//cлайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderElement.noUiSlider.on('update', (values, handle) => {
  effectLevel.value = values[handle];
  changeEffectLevel();
});

const setSliderEffect = (evt) => {
  const effect = evt.target.value;

  if (evt.target.matches('input[type="radio"]')) {
    previewImg.className = `effects__preview--${effect}`;
  }

  if (previewImg.className === !'effects__preview--none') {
    sliderBar.classList.remove('hidden');
    sliderElement.classList.remove('hidden');
  }

  // if (previewImg.className === 'effects__preview--none') {
  //   sliderBar.classList.add('hidden');
  //   sliderElement.classList.add('hidden');
  // }
  switch(effect) {

    case 'chrome':
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1,
      });
      break;

    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;

    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;

    default:
      sliderBar.classList.add('hidden');
  }

  sliderElement.noUiSlider.set(100);
};

const setImageEditor = () => {
  sliderBar.classList.add('hidden');
  sliderElement.classList.add('hidden');
  form.addEventListener('change',  setSliderEffect);
  effectsList.addEventListener('change',  changeEffectLevel);
  buttonPlus.addEventListener('click', increaseSize);
  buttonMinus.addEventListener('click', decreaseSize);
};

export { setImageEditor };
