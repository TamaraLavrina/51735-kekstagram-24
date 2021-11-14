import { renderThumbnails } from './thumbnails.js';
import { debounce} from './utils.js';

const RANDOM_NUMBER_PHOTO = 10;

const filtersForm = document.querySelector('.img-filters__form');
const pictures = document.querySelector('.pictures');
const filters = document.querySelector('.img-filters');
const buttons = filtersForm.querySelectorAll('.img-filters__button');
const ACTIVE_CLASS = 'img-filters__button--active';

const removeOldPics = () => {
  Array.from(pictures.children).forEach((item) => {
    if(item.classList.contains('picture')) {
      item.remove();
    }
  });
};

const onDefaultButtonClick = (data) => {
  renderThumbnails(data);
};

const onDiscussedButtonClick = (data) => {
  const sorted = data.sort((a, b) => b.comments.length - a.comments.length);
  renderThumbnails(sorted);
};

const onRandomtButtonClick = (data) => {
  const randomTen = data.sort(() => Math.random() - Math.random()).slice(0, RANDOM_NUMBER_PHOTO);
  renderThumbnails(randomTen);
};

const onFilterFormChange = (evt, data) => {
  if (!evt.target.closest('.img-filters__button')){
    return;
  }

  const copyData = data.slice();
  buttons.forEach((button) => button.classList.remove(ACTIVE_CLASS));
  evt.target.classList.add(ACTIVE_CLASS);
  removeOldPics();

  const filterID = evt.target.getAttribute('id');
  switch(filterID) {
    case 'filter-discussed':
      onDiscussedButtonClick(copyData);
      break;

    case 'filter-random':
      onRandomtButtonClick(copyData);
      break;

    case 'filter-default':
      onDefaultButtonClick(copyData);
      break;
  }
};

const setFilters = (data) => {
  filters.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', debounce((evt)=> onFilterFormChange(evt, data)));
};

export { setFilters };

