import { renderThumbnails } from './thumbnails.js';
import { setPictureListener }  from './bigPicture.js';
import { setImageEditor }  from './imageEditor.js';
import { initUploadFile, setUserFormSubmit, onCloseButtonClick }  from './form.js';
import { getData } from'./data.js';

getData((photos) => {
  renderThumbnails(photos);
  setPictureListener(photos);
});

initUploadFile();
setImageEditor();
setUserFormSubmit(onCloseButtonClick);
