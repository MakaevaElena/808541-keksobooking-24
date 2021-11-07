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
    img.width = 70;
    img.height = 70;
    img.alt = 'фото жилья';
    img.src = URL.createObjectURL(photo);
    photoContainer.appendChild(img);
  }
});

const deletePhotos = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoContainer.innerHTML = '';
};

export { deletePhotos };

