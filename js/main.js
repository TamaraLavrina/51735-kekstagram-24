import { renderThumbnails } from './thumbnails.js';
import { setPictureListener }  from './bigPicture.js';
import { setImageEditor }  from './imageEditor.js';
import { initUploadFile, setUserFormSubmit, onCloseButtonClick }  from './form.js';
import { getData } from'./data.js';
import { uploadUserPhoto } from './preview.js';
import { setFilters } from './filter.js';


getData((photos) => {
  renderThumbnails(photos);
  setPictureListener(photos);
  const copyData = photos.slice();
  setFilters(copyData);
});

initUploadFile();
uploadUserPhoto();
setImageEditor();
setUserFormSubmit(onCloseButtonClick);


