// import { getRandomInteger, checkMaxLength } from './utils.js';
import { generatePics } from './picDescription.js';
import { renderThumbnails } from './thumbnails.js';
import { setPictureListener }  from './bigPicture.js';
import  { setImageEditor }  from './imageEditor.js';
import  { initUploadFile }  from './form.js';

const PICS_AMOUNT = 25;
const pictures = generatePics(PICS_AMOUNT);

renderThumbnails(pictures);
setPictureListener(pictures);
initUploadFile();
setImageEditor();

