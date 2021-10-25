// import { getRandomInteger, checkMaxLength } from './utils.js';
import { generatePics } from './picDescription.js';
import { renderThumbnails } from './thumbnails.js';
import { setPictureListener }  from './bigPicture.js';
import { uploadPictureControl,  onUploadPictureControlclick } from './form.js';


const PICS_AMOUNT = 25;
const pictures = generatePics(PICS_AMOUNT);

renderThumbnails(pictures);

setPictureListener(pictures);
uploadPictureControl.addEventListener('click', onUploadPictureControlclick);
