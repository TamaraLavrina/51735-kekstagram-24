// import { getRandomInteger, checkMaxLength } from './utils.js';
import { generatePics } from './picDescription.js';
import { renderThumbnails } from './Thumbnails.js';
import {onPictureClick }  from './showFullPicture.js';


const PICS_AMOUNT = 25;
const pictures = generatePics(PICS_AMOUNT);

renderThumbnails(pictures);

const picturesContainer = document.querySelector('.pictures');
picturesContainer.addEventListener('click', onPictureClick);
