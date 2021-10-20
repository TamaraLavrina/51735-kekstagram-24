import { generatePics } from './picDescription.js';

const pictures = generatePics(25);

const bigPicture = document.querySelector('.big-picture');
// const commentCount = bigPicture.querySelector('.social__comment-count');
const loader = bigPicture.querySelector('.comments-loader');
const commentsList = bigPicture.querySelector('.social__comments');
const commentItem = bigPicture.querySelector('.social__comment');

const openModal = () => {
  bigPicture.classList.remove('hidden');
  // commentCount.classList.add('hidden');
  loader.classList.add('hidden');
  document.body.classList.add('modal-open');
};

const getCurrentPhoto = (evt) => {
  const checkedPicture = evt.target;
  const checkedItem = checkedPicture.closest('a');
  const indexOfObject = checkedItem.dataset.id;
  const currentPhotoObject = pictures[indexOfObject-1];
  return currentPhotoObject;
};

const showFullPicture = (item) => {
  bigPicture.querySelector('.big-picture__img img').src = item.url;
  bigPicture.querySelector('.likes-count').textContent = item.likes;
  bigPicture.querySelector('.comments-count').textContent = item.comments.length;
  bigPicture.querySelector('.social__caption').textContent = item.description;
  commentsList.innerHTML='';
  item.comments.map((element) => {
    const newComment = commentItem.cloneNode(true);
    newComment.querySelector('.social__picture').src = element.avatar;
    newComment.querySelector('.social__picture').alt = element.name;
    newComment.querySelector('.social__text').textContent = element.message;
    commentsList.appendChild(newComment);
  });
};

const onPictureClick = (evt) => {
  openModal();
  const currentPic = getCurrentPhoto(evt);
  showFullPicture(currentPic);
};


export { onPictureClick };
