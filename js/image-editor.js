import{ EFFECTS_DATA } from './effects-data.js';

const MAX_VALUE_DEFAULT = 100;
const STEP = 25;
const MIN_VALUE = 25;

const form = document.querySelector('.img-upload__form');
const sizeScaleControl = form.querySelector('.scale__control--value');
const previewImg = form.querySelector('.img-upload__preview img');
const buttonPlus = form.querySelector('.scale__control--bigger');
const buttonMinus = form.querySelector('.scale__control--smaller');
const sliderElement = form.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level__value');
const sliderBar = form.querySelector('.img-upload__effect-level');
const effectsList = form.querySelector('.effects__list');

let sizeValue = sizeScaleControl.value;
const increaseSize = () => {
  if (parseInt(sizeScaleControl.value, 10) !== MAX_VALUE_DEFAULT) {
    sizeValue= `${parseInt(sizeValue, 10) + STEP}%`;
    previewImg.style.transform = `scale(${parseInt(sizeValue, 10) / MAX_VALUE_DEFAULT})`;
    sizeScaleControl.value = sizeValue;
  }
};

const decreaseSize =  () => {
  if (parseInt(sizeScaleControl.value, 10) !== MIN_VALUE) {
    sizeValue = `${parseInt(sizeValue, 10) - STEP}%`;
    previewImg.style.transform = `scale(${parseInt(sizeValue, 10) / MAX_VALUE_DEFAULT})`;
    sizeScaleControl.value = sizeValue;
  }
};

const resetSize = () => {
  sizeScaleControl.value = MAX_VALUE_DEFAULT;
  previewImg.style.transform = `scale(${ MAX_VALUE_DEFAULT/MAX_VALUE_DEFAULT })`;
  buttonPlus.removeEventListener('click', increaseSize);
  buttonMinus.removeEventListener('click', decreaseSize);
};

const onEffectsListChange = (evt) => {
  const effect = evt.target.value;
  previewImg.className = `effects__preview--${effect}`;
  sizeScaleControl.value = MAX_VALUE_DEFAULT;
  previewImg.style.transform = `scale(${ MAX_VALUE_DEFAULT/MAX_VALUE_DEFAULT })`;

  if (previewImg.classList.contains('effects__preview--none')) {
    sliderBar.classList.add('hidden');
    effectLevel.value = 'unset';
    previewImg.style.filter = 'unset';
  } else {
    sliderBar.classList.remove('hidden');
  }

  if (typeof EFFECTS_DATA[effect]  === 'undefined') {
    return;
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: EFFECTS_DATA[effect].min,
      max: EFFECTS_DATA[effect].max,
    },
    start: EFFECTS_DATA[effect].start,
    step: EFFECTS_DATA[effect].step,
  });

  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevel.value = values[handle];
    previewImg.style.filter = `${EFFECTS_DATA[effect].filter}(${effectLevel.value}`;

    if (effect === 'phobos') {
      previewImg.style.filter = `${EFFECTS_DATA[effect].filter}(${effectLevel.value}px`;
    }

    if (effect === 'marvin') {
      previewImg.style.filter = `${EFFECTS_DATA[effect].filter}(${effectLevel.value}%`;
    }
  });
};

const setSlider = () => {
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

  sliderBar.classList.add('hidden');
  effectsList.addEventListener('change', onEffectsListChange);
};

const initImageEditor = () => {
  setSlider();
  buttonPlus.addEventListener('click', increaseSize);
  buttonMinus.addEventListener('click', decreaseSize);
};

const removeSlider = () => {
  sliderElement.noUiSlider.destroy();
  previewImg.style.filter = 'unset';
  previewImg.className = 'img-upload__preview';
  effectLevel.value = 'unset';
};

export {removeSlider, initImageEditor, resetSize};

