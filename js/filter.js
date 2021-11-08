import { renderThumbnails } from './thumbnails.js';
import { debounce} from './debounce.js';

const filtersForm = document.querySelector('.img-filters__form');
const pictures = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const defaultButton = filters.querySelector('#filter-default');
const randomtButton = filters.querySelector('#filter-random');
const discussedButton = filters.querySelector('#filter-discussed');
const RANDOM_NUMBER_PHOTO = 10;


const removeOldPics = () => {
  Array.from(pictures.children).forEach((item) => {
    if(item.classList.contains('picture')) {
      item.remove();
    }
  });
};

const onDefaultButtonClick = (copyData) => {
  removeOldPics();
  renderThumbnails(copyData);
};

const comparePhotos = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;
  return commentsB - commentsA;
};

const onDiscussedButtonClick = (copyData) => {
  removeOldPics();
  const sorted = copyData.sort(comparePhotos);
  renderThumbnails(sorted);
};

const onRandomtButtonClick = (copyData) => {
  removeOldPics();
  const randomTen = copyData.sort(() => Math.random() - Math.random()).slice(0, RANDOM_NUMBER_PHOTO);
  renderThumbnails(randomTen);
};

const markAsActive = (evt) => {
  if (!evt.target.closest('.img-filters__button')){
    return;
  }

  for(let i = 0; i < filtersForm.children.length; i++){
    filtersForm.children[i].classList.remove('img-filters__button--active');
  }

  evt.target.classList.add('img-filters__button--active');
};

const setFilters = (data) => {
  filters.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', debounce(() => onDefaultButtonClick(data)));
  randomtButton.addEventListener('click', debounce(() => onRandomtButtonClick(data)));
  discussedButton.addEventListener('click', debounce(()=> onDiscussedButtonClick(data)));
  filtersForm.addEventListener('click', markAsActive);
};

export { setFilters };

