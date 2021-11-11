import { isEscapeKey } from './utils.js';
// import { isEnterKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const loader = bigPicture.querySelector('.social__comments-loader');
const commentsCounterBlock = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const buttonClose =  bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const shownCommentsCounter = bigPicture.querySelector('.comments-count--shown');
const allComments = bigPicture.querySelector('.comments-count--all');
const COMMENTS_TO_SHOW = 5;
const bigPic = bigPicture.querySelector('.big-picture__img img');
const bigPicLikes = bigPicture.querySelector('.likes-count');
// const bigPicComments = bigPicture.querySelector('.comments-count');
const bigPicDescription = bigPicture.querySelector('.social__caption');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', closeModal);
  document.addEventListener('keydown', onPopupEscKeydown );
};

const renderComment = (comment) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentsList.appendChild(newComment);
};

//Cчетчик  комментариев
let displayedComments = COMMENTS_TO_SHOW;
const onLoaderCommentsClick = (comments) => {
  const addComments = comments.slice(displayedComments, displayedComments + COMMENTS_TO_SHOW);
  const shownComments = displayedComments  + COMMENTS_TO_SHOW;
  addComments.map((element) => renderComment(element));
  shownCommentsCounter.textContent = shownComments;

  if (shownComments >= comments.length) {
    shownCommentsCounter.textContent = comments.length;
    loader.classList.add('hidden');
  }
  displayedComments += COMMENTS_TO_SHOW;
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPic.src = url;
  bigPicLikes.textContent = likes;
  // bigPicComments.textContent = comments.length;
  bigPicDescription.textContent = description;
  commentsList.innerHTML = '';
  allComments.textContent = comments.length;
  displayedComments = COMMENTS_TO_SHOW;


  if (comments.lenght <= COMMENTS_TO_SHOW) {
    comments.map((element) => renderComment(element));
    loader.classList.add('hidden');
    commentsCounterBlock.classList.add('hidden');
  } else {
    const firstComments = comments.slice(0, COMMENTS_TO_SHOW);
    firstComments.map((element) => renderComment(element));
    loader.addEventListener('click', () => onLoaderCommentsClick(comments));
  }
};

function closeModal() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  loader.removeEventListener('click', () => onLoaderCommentsClick());
  displayedComments = COMMENTS_TO_SHOW;//как обнулить значение? оно сохраняется в новом большом фото
}

const onPictureClick = (evt, pictures) => {
  if (!evt.target.closest('.picture')){
    return;
  }

  const id = evt.target.closest('a').dataset.id;
  const currentPhoto = pictures.find((item) => item.id === Number(id));

  if (currentPhoto) {
    renderBigPicture(currentPhoto);
    openModal();
  }
};

const setPictureListener = (data) => {
  picturesContainer.addEventListener('click', (evt) => onPictureClick(evt, data));
};

export { setPictureListener };
