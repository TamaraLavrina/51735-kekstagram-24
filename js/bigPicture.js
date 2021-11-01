import { isEscapeKey } from './utils.js';
import { isEnterKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const loader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const buttonClose =  bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
const shownCommentsCounter = bigPicture.querySelector('.comments-count--shown');
const allComments = bigPicture.querySelector('.comments-count--all');
const COMMENTS_TO_SHOW = 5;

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

function closeModal() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  // loader.removeEventListener('click', onGetNewComments());
}

const bigPic = bigPicture.querySelector('.big-picture__img img');
const bigPicLikes = bigPicture.querySelector('.likes-count');
const bigPicComments = bigPicture.querySelector('.comments-count');
const bigPicDescription = bigPicture.querySelector('.social__caption');

const renderComment = (comment) => {
  const newComment = commentItem.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  commentsList.appendChild(newComment);
};

// let icount = 0;
// function getNewComments(comments) {
//   const start = icount;
//   const end = start + COMMENTS_TO_SHOW;
//   const shownComments = comments.slice(start, end);
//   shownComments.map((element) => renderComment(element));
// }

const Showcomments = (comments) => {
  const allCommentsToShow = comments.length;
  if (allCommentsToShow <= COMMENTS_TO_SHOW) {
    shownCommentsCounter.textContent = allCommentsToShow;
    allComments.textContent = allCommentsToShow;
    loader.classList.add('hidden');
  } else {
    shownCommentsCounter.textContent = COMMENTS_TO_SHOW;//описать обновление
    allComments.textContent = comments.length;
    loader.classList.remove('hidden');
    // loader.addEventListener('click', onLoaderButtonClick(comments));
  }
};

// function onLoaderButtonClick(comments) {
//   commentsList.innerHTML='';
//   getNewComments(comments);
//   Showcomments(comments);
//   icount =+ COMMENTS_TO_SHOW;
// }

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPic.src = url;
  bigPicLikes.textContent = likes;
  bigPicComments.textContent = comments.length;
  bigPicDescription.textContent = description;
  commentsList.innerHTML='';

  if (comments.length <= COMMENTS_TO_SHOW) {
    comments.map((element) => renderComment(element));
    Showcomments(comments);
  } else {
    comments.slice(0, 5).map((element) => renderComment(element));
    // loader.addEventListener('click', onLoaderButtonClick(comments));
  }
};

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
  picturesContainer.addEventListener('keydown', (evt) => {

    if (isEnterKey(evt)) {
      onPictureClick();
    }
  });
};

export { setPictureListener };
