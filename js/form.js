import { isEscapeKey, checkIfDuplicate } from './utils.js';

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
  regex: 'хэш-тег начинается с символа # (решётка), cостоит из букв и чисел и не может содержать пробелы,  спецсимволы (#, @, $ и т. п.), ' +
  'символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д., максимальная длина одного хэш-тега 20 символов, включая #',
  dublicate: 'один и тот же хэш-тег не может быть использован дважды',
  lengthLimit: 'нельзя указать больше пяти хэш-тегов',
  filled: 'хештег не может быть пустым и содержать пробел',
  firstSymbol: 'хештег должен начинаться с #',
  unique: 'хештеги не могут повторяться',
  valid: '',
};

const onUploadEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !evt.target.closest('.img-upload__text')) {
    evt.preventDefault();
    closeUploadModal();
  }
};

const checkHashtag = (hashtags) => {
  const filledHashtags = hashtags.filter((element) => element === '');
  const uniqueHashtags = new Set(filledHashtags);
  const duplicate = checkIfDuplicate(hashtags);
  // проверки массива
  if (!hashtags === filledHashtags) {
    return { state: 'invalid', error: 'filled' };
  } else if (duplicate) {
    return { state: 'invalid', error: 'dublicate' };
  } else if (!hashtags === uniqueHashtags) {
    return { state: 'invalid', error: 'unique' };
  } else if (hashtags.length > MAX_HASHTAGS_VALUE) {
    return { state: 'invalid', error: 'lengthLimit' };
  } else if (hashtags.length > 0) {
    return { state: 'valid', error: ''};
  }
  else {
    // проверка каждого хештега - вот эти проверки не работают
    for (let i = 0; i < hashtags.length; i++) {
      const hashtag = hashtags[i];
      if (!hashtag.startsWith('#')) {
        return { state: 'invalid', error: 'firstSymbol' };
      } else if (!regex.test(hashtag)) {
        return { state: 'invalid', error: 'regex' };
      } else {
        return { state: 'valid', error: ''};
      }
    }
  }
};

const onHashtagInput = (evt) => {
  const  hashtags = evt.target.value.toLowerCase().split(' ');
  const validationState = checkHashtag(hashtags);
  if (validationState.state === 'invalid') {
    hashtagInput.setCustomValidity('произошла ошибка но я не могу написать словарик на js и поэтому догадайтесь сами какая');
    //  hashtagInput.setCustomValidity(validationErrors[validationState.error]);

    //и вот тут не происходить присвоение
    // switch (validationState.error) {
    //   case 'regex':
    //     hashtagInput.setCustomValidity(validationErrors['regex']);
    //     break;
    //   case 'filled':
    //     hashtagInput.setCustomValidity(validationErrors['filled']);
    //     break;
    //   case 'dublicate':
    //     hashtagInput.setCustomValidity(validationErrors['dublicate']);
    //     break;
    //   case 'firstSymbol':
    //     hashtagInput.setCustomValidity(validationErrors['firstSymbol']);
    //     break;
    //   case 'lengthLimit':
    //     hashtagInput.setCustomValidity(validationErrors['lengthLimit']);
    //     break;
    // }
  } else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
};

// валидация хештегов
// const checkНashtag = () => {
//   const  hashtags = hashtagInput.value.toLowerCase().split(' ');
//   const filledHashtags = hashtags.filter((element) => element === '');
//   const uniqueHashtags = new Set(filledHashtags);

//   const duplicate = checkIfDuplicate(hashtags);
//   console.log(duplicate);

//   if (hashtags.length > MAX_HASHTAGS_VALUE){
//     hashtagInput.setCustomValidity(validationErrors.lengthLimit);
//   } else if (!hashtags === filledHashtags) {
//     hashtagInput.setCustomValidity('нельзя писать пустые хэштеги');
//   } else if (duplicate) {
//     hashtagInput.setCustomValidity(validationErrors.dublicate);
//   } else if (hashtags.length) {
//     for (let i = 0; i < hashtags.length; i++) {
//       const hashtag = hashtags[i];
//       if (!regex.test(hashtag)){
//         hashtagInput.setCustomValidity(validationErrors.regex);}
//     }
//   } else {hashtagInput.setCustomValidity('');}

//   hashtagInput.reportValidity('');

// };


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
  closeButton.addEventListener('click', closeUploadModal);
}

function closeUploadModal() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onUploadEscKeydown);
  form.reset();
  descriptionInput.removeEventListener('input', descriptionInputIsValid);
  closeButton.removeEventListener('click', closeUploadModal);
  previewImg.className = 'effects__preview--none';
  hashtagInput.removeEventListener('input', onHashtagInput);
}


uploadFile.addEventListener('change', onUploadFileChange);

const initUploadFile = () => {
  uploadFile.addEventListener('change', onUploadFileChange);
};


export { initUploadFile };
