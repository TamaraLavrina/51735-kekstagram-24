const pictures = document.querySelector('.pictures');
const picItem  = document.querySelector('.pic-template')
  .content
  .querySelector('.picture');

const renderThumbnail = (photo) => {
  const newPicItem = picItem.cloneNode(true);
  const image = newPicItem.querySelector('.picture__img');
  const picItemLikes = newPicItem.querySelector('.picture__likes');
  const picComments = newPicItem.querySelector('.picture__comments');
  image.src = photo.url;
  picItemLikes.textContent = photo.likes;
  picComments.textContent = photo.comments.length;
  newPicItem.dataset.id = photo.id;
  newPicItem.dataset.description = photo.description;

  return newPicItem;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newPicItem = renderThumbnail(photo);
    fragment.appendChild(newPicItem);
  });

  pictures.appendChild(fragment);
};

export { renderThumbnails };
