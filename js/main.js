import { renderThumbnails } from './thumbnails.js';
import { setPictureListener }  from './big-picture.js';
import { initUploadFile, setUserFormSubmit, onCloseButtonClick }  from './form.js';
import { getData } from'./api.js';
import { uploadUserPhoto } from './preview.js';
import { setFilters } from './filter.js';
import { showAlert, ERROR_MESSAGE } from './utils.js';

const onDataLoad = (photos) => {
  renderThumbnails(photos);
  setPictureListener(photos);
  setFilters(photos);
};

const onDataError = () => {
  showAlert(ERROR_MESSAGE);
};

getData(onDataLoad, onDataError);

initUploadFile();
uploadUserPhoto();
setUserFormSubmit(onCloseButtonClick);


