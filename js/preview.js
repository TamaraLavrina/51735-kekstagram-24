const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const userPhotoUpload = document.querySelector('.img-upload input[type=file]');
const preview = document.querySelector('.img-upload__preview img');

const previewUserPhoto = () => {
  const file = userPhotoUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};


const uploadUserPhoto = () => {
  userPhotoUpload.addEventListener('change', previewUserPhoto);
};

export { uploadUserPhoto };
