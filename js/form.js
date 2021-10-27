
import { isEscapeKey } from './utils.js';


const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('.img-upload__cancel');
const hashtagInput = form.querySelector('.text__hashtags');
const uploadFile = form.querySelector('#upload-file');
const descriptionInput = form.querySelector('.text__description');
const previewImg = form.querySelector('.img-upload__preview img');
const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const DESCRIPTION_MAXLENGTH = 140;
const buttonPlus = form.querySelector('.scale__control--bigger');
const buttonMinus = form.querySelector('.scale__control--smaller');
const sizeScaleControl = form.querySelector('.scale__control--value');


const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadModal();
  }
};


const stopPropogation = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};


// валидация хештегов
const hashtagIsValid = (element) => regex.test(element);
const hasDuplicatedItem = (array) => array.map((item) => item.toLowerCase()).some((item, index) => array.indexOf(item) < index);

const checkEveryHashtag = (item) => {
  item.toLowerCase();

  if(!hashtagIsValid(item)){
    hashtagInput.setCustomValidity('хэш-тег начинается с символа # (решётка), cостоит из букв и чисел и не может содержать пробелы,  спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., максимальная длина одного хэш-тега 20 символов, включая #');
  }

  else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
};


const hashtagValidate = () => {
  const hashtags = hashtagInput.value.split(' ');
  hashtags.forEach((element) => checkEveryHashtag(element));

  if (hasDuplicatedItem(hashtags)) {
    hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
  }

  else if(hashtags.length > 5){
    hashtagInput.setCustomValidity('нельзя указать больше пяти хэш-тего');
  }

  else{
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
};

// валидация описания
const descriptionInputIsValid = () => {
  const valueLength = descriptionInput.value.length;

  if (valueLength > DESCRIPTION_MAXLENGTH) {
    descriptionInput.setCustomValidity(`Удалите лишние ${valueLength - DESCRIPTION_MAXLENGTH} симв.`);
  }

  else {
    descriptionInput.setCustomValidity('');
  }

  descriptionInput.reportValidity();
};

// изменить размер изображения
let value = sizeScaleControl.value;

const increaseSize = () => {
  if (parseInt(sizeScaleControl.value, 10) !== 100) {
    value = `${parseInt(value, 10) + 25}%`;
    previewImg.style.transform = `scale(${parseInt(value, 10)/100})`;
    sizeScaleControl.value = value;
  }

};
const decreaseSize =  () => {
  if (parseInt(sizeScaleControl.value, 10) !==25) {
    value = `${parseInt(value, 10) - 25}%`;
    previewImg.style.transform = `scale(${parseInt(value, 10)/100})`;
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
function onUploadFileChange () {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onUploadEscKeydown);
  hashtagInput.addEventListener('input', hashtagValidate);
  descriptionInput.addEventListener('input', descriptionInputIsValid);
  closeButton.addEventListener('click', closeUploadModal);
  form.removeEventListener('change', onUploadFileChange);
  form.addEventListener('change',  onFilterEffectChange);
  buttonPlus.addEventListener('click', increaseSize);
  buttonMinus.addEventListener('click', decreaseSize);
  descriptionInput.addEventListener('keydown', stopPropogation);
  hashtagInput.addEventListener('keydown', stopPropogation);
}


function closeUploadModal() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
  form.reset();
  descriptionInput.removeEventListener('input', descriptionInputIsValid);
  closeButton.removeEventListener('click', closeUploadModal);
  previewImg.className = 'effects__preview--none';
  hashtagInput.removeEventListener('input', hashtagValidate);
  descriptionInput.removeEventListener('keydown', stopPropogation);
  hashtagInput.removeEventListener('keydown', stopPropogation);
}


uploadFile.addEventListener('change', onUploadFileChange);

export { onUploadFileChange };
