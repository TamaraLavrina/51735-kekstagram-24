import { generatePics } from './picDescription.js';

const PICS_AMOUNT = 25;
const similarPics = generatePics(PICS_AMOUNT);

const renderThumbnails = () => {
  const pictures = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();
  similarPics.forEach((pic) => {
    const picItem  = document.querySelector('.pic-template')
      .content
      .querySelector('.picture');
    const newPicItem = picItem.cloneNode(true);

    const image = newPicItem.querySelector('.picture__img');
    image.src = pic.url;
    const picItemLikes = newPicItem.querySelector('.picture__likes');
    picItemLikes.textContent = pic.likes;

    const picComments = newPicItem.querySelector('.picture__comments');
    picComments.textContent = pic.comments.length;
    fragment.appendChild(newPicItem);
  });
  pictures.appendChild(fragment);
};

export { renderThumbnails };
