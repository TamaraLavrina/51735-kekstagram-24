import { isEscapeKey } from './utils.js';

const COMMENTS_TO_SHOW = 5;

const bigPicture = document.querySelector('.big-picture');
const loader = bigPicture.querySelector('.social__comments-loader');
const commentsCounterBlock = bigPicture.querySelector('.social__comment-count');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const buttonClose =  bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const shownCommentsCounter = bigPicture.querySelector('.comments-count--shown');
const allComments = bigPicture.querySelector('.comments-count--all');
const bigPic = bigPicture.querySelector('.big-picture__img img');
const bigPicLikes = bigPicture.querySelector('.likes-count');
const bigPicDescription = bigPicture.querySelector('.social__caption');

let displayedComments = COMMENTS_TO_SHOW;
let currentComments = [];

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

const onButtonCloseClick = () => closeModal();

const openModal = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  buttonClose.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', onPopupEscKeydown );
};

const renderComment = (comment) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentsList.appendChild(newComment);
};

const onLoaderCommentsClick = () => {
  const addComments = currentComments.slice(displayedComments, displayedComments + COMMENTS_TO_SHOW);
  displayedComments = displayedComments + COMMENTS_TO_SHOW;
  addComments.map((element) => renderComment(element));
  shownCommentsCounter.textContent = displayedComments;

  if (displayedComments >= currentComments.length) {
    shownCommentsCounter.textContent = currentComments.length;
    loader.classList.add('hidden');
  }
};

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPic.src = url;
  bigPicLikes.textContent = likes;
  bigPicDescription.textContent = description;
  commentsList.innerHTML = '';
  currentComments = comments;
  allComments.textContent = currentComments.length;
  displayedComments = COMMENTS_TO_SHOW;

  if (currentComments.length <= COMMENTS_TO_SHOW) {
    currentComments.map(renderComment);
    loader.classList.add('hidden');
    commentsCounterBlock.classList.add('hidden');
  } else {
    currentComments.slice(0, COMMENTS_TO_SHOW).map(renderComment);
    shownCommentsCounter.textContent = displayedComments;
    loader.addEventListener('click', onLoaderCommentsClick);
  }
};

function closeModal() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsCounterBlock.classList.remove('hidden');
  displayedComments = COMMENTS_TO_SHOW;
  currentComments = [];
  buttonClose.removeEventListener('click', onButtonCloseClick);
  loader.classList.remove('hidden');
  loader.removeEventListener('click', onLoaderCommentsClick);
}

const onPictureClick = (evt, pictures) => {
  if (!evt.target.closest('.picture')) {
    return;
  }

  const id = evt.target.closest('.picture').dataset.id;
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
