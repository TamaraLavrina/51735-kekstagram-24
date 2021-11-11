import { renderThumbnails } from './thumbnails.js';
import { setPictureListener }  from './big-picture.js';
import { initUploadFile, setUserFormSubmit, onCloseButtonClick }  from './form.js';
import { getData } from'./data.js';
import { uploadUserPhoto } from './preview.js';
import { setFilters } from './filter.js';

getData((photos) => {
  renderThumbnails(photos);
  setPictureListener(photos);
  setFilters(photos);
});

initUploadFile();
uploadUserPhoto();
setUserFormSubmit(onCloseButtonClick);


