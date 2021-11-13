import { isEscapeKey, showErrorCard } from './utils.js';
import { showSuccesCard } from './utils.js';
import { sendData } from'./api.js';
import { resetSize, removeSlider } from'./image-editor.js';
import { initImageEditor }  from './image-editor.js';

const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const uploadFile = form.querySelector('#upload-file');
const descriptionInput = form.querySelector('.text__description');
const previewImg = form.querySelector('.img-upload__preview img');
const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const DESCRIPTION_MAXLENGTH = 140;
const MAX_HASHTAGS_VALUE = 5;
const validationErrors = {
  regex: 'хэш-тег начинается с # (решётка), cостоит из букв и чисел и не может содержать пробелы и спецсимволы (#, @, $ и т. п., знаки пунктиуации, эмодзи), ' +
  'максимальная длина хэш-тега 20 символов, включая #',
  duplicate: 'один и тот же хэш-тег не может быть использован дважды',
  lengthLimit: 'нельзя указать больше пяти хэш-тегов',
  valid: '',
};

const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.img-upload__text')) {
    evt.preventDefault();
    onCloseButtonClick();
  }
};

const validateHashtags = (hashtags) => {
  const filledHashtags = hashtags.filter((element) => element !== '');
  const isDuplicateHashtag = new Set(filledHashtags).size !== filledHashtags.length;

  if (isDuplicateHashtag) {
    return { state: 'invalid', error: 'duplicate' };
  }

  if (filledHashtags.length > MAX_HASHTAGS_VALUE) {
    return { state: 'invalid', error: 'lengthLimit' };
  }

  for (let i = 0; i < filledHashtags.length; i++) {
    const hashtag = filledHashtags[i];

    if (!regex.test(hashtag)) {
      return { state: 'invalid', error: 'regex' };
    }
  }

  return { state: 'valid', error: ''};
};

const onHashtagInput = (evt) => {
  const  hashtags = evt.target.value.toLowerCase().trim().split(' ');
  const validationState = validateHashtags(hashtags);
  if (validationState.state === 'invalid') {
    hashtagInput.setCustomValidity(validationErrors[validationState.error]);
  } else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
};

// валидация описания
const descriptionInputIsValid = () => {
  const valueLength = descriptionInput.value.length;

  if (valueLength > DESCRIPTION_MAXLENGTH) {
    descriptionInput.setCustomValidity(`Удалите лишние ${valueLength - DESCRIPTION_MAXLENGTH} симв.`);
  }  else {
    descriptionInput.setCustomValidity('');
  }

  descriptionInput.reportValidity();
};

function onUploadFileChange () {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
  hashtagInput.addEventListener('input',  onHashtagInput);
  descriptionInput.addEventListener('input', descriptionInputIsValid);
  closeButton.addEventListener('click', onCloseButtonClick);
  initImageEditor();
  // effectsList.addEventListener('change', onEffectsListChange);
}

function onCloseButtonClick() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
  form.reset();
  resetSize();
  removeSlider();
  descriptionInput.removeEventListener('input', descriptionInputIsValid);
  closeButton.removeEventListener('click', onCloseButtonClick);
  previewImg.className = 'effects__preview--none';
  hashtagInput.removeEventListener('input', onHashtagInput);
}

const initUploadFile = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
};

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => { onSuccess(); form.reset(); showSuccesCard(); },
      () => showErrorCard(),
      new FormData(evt.target),
    );
  });
};

export { initUploadFile,
  onCloseButtonClick,
  setUserFormSubmit
};
