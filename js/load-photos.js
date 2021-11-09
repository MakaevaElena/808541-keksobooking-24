const IMG_WIDTH = 70;
const IMG_HEIGHT = 70;
const AVATAR_SRC = 'img/muffin-grey.svg';
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooser = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((filetypes) => fileName.endsWith(filetypes));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const photoChooser = document.querySelector('.ad-form__input');
const photoContainer = document.querySelector('.ad-form__photo');

photoChooser.addEventListener('change', () => {
  const photo = photoChooser.files[0];
  const photoName = photo.name.toLowerCase();
  const matches = FILE_TYPES.some((filetypes) => photoName.endsWith(filetypes));

  if (matches) {
    const img = document.createElement('img');
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.alt = 'фото жилья';
    img.src = URL.createObjectURL(photo);
    photoContainer.appendChild(img);
  }
});

const deletePhotos = () => {
  avatarPreview.src = AVATAR_SRC;
  photoContainer.innerHTML = '';
};

export { deletePhotos };

