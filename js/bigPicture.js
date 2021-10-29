import { isEscapeKey } from './utils.js';
import { isEnterKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
//const loader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');
const buttonClose =  bigPicture.querySelector('.big-picture__cancel');
const picturesContainer = document.querySelector('.pictures');
//const commentsShowCount = document.querySelector('.comments-show-count'); //hh

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

const renderBigPicture = ({url, likes, comments, description}) => {
  bigPic.src = url;
  bigPicLikes.textContent = likes;
  bigPicComments.textContent = comments.length;
  bigPicDescription.textContent = description;
  commentsList.innerHTML='';

  comments.map((element) => renderComment(element));
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
