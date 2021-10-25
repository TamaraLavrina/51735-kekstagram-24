import { isEscapeKey } from './utils.js';

const uploadPictureControl = document.querySelector('.img-upload__control');
const uploadPictureOverlay = document.querySelector('.img-upload__overlay');
const closeButton = uploadPictureOverlay.querySelector('.img-upload__cancel');
const hashtagInput = uploadPictureOverlay.querySelector('.text__hashtags');
const uploadPictureButton = document.querySelector('#upload-file');
const descriptionInput = uploadPictureOverlay.querySelector('.text__description');
// const regularExpressionHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const DESCRIPTION_MAXLENGTH = 140;
const MESSAGE = `Длина комментария не может быть больше ${DESCRIPTION_MAXLENGTH} символов`;

const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};

// const hashtagIsValid = (element) => regularExpressionHashtag.test(element);
const descriptionInputIsValid = () => {
  if (descriptionInput.value.length > DESCRIPTION_MAXLENGTH) {
    descriptionInput.setCustomValidity(MESSAGE);
  } else {
    descriptionInput.setCustomValidity('');
  }
  descriptionInput.reportValidity();
};

function onUploadPictureControlclick () {
  uploadPictureOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
  //hashtagInput - валидация
  descriptionInput.addEventListener('input', descriptionInputIsValid);
  closeButton.addEventListener('click', closeUploadModal);
  uploadPictureButton.removeEventListener('change', onUploadPictureControlclick);
}

uploadPictureButton.addEventListener('change', () => onUploadPictureControlclick());

function closeUploadModal() {
  uploadPictureOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
  uploadPictureButton.value = '';
  hashtagInput.value = '';
  descriptionInput.value = '';
  uploadPictureButton.addEventListener('change', onUploadPictureControlclick);
  descriptionInput.removeEventListener('input', descriptionInputIsValid);
  closeButton.removeEventListener('click', closeUploadModal);
}


uploadPictureControl.addEventListener('click', onUploadPictureControlclick);

export {
  uploadPictureControl,
  onUploadPictureControlclick };
