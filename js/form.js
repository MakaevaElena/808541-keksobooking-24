const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const doFormDisable = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`); //дописывает к первому классу
  form.children.classList.add('disabled');

  form.children.forEach((element) => {
    element.classList.add('disabled');
  });

  const fieldset = form.querySelectorAll('fieldset');
  fieldset.classList.add('disabled');
  fieldset.children.classList.add('disabled');
};

const doFormActive = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);
  form.children.classList.remove('disabled');

  form.children.forEach((element) => {
    element.classList.remove('disabled');
  });

  const fieldset = form.querySelectorAll('fieldset');
  fieldset.classList.remove('disabled');
  fieldset.children.classList.remove('disabled');
};

doFormDisable(adForm);
doFormDisable(mapFilters);
doFormActive(adForm);
doFormActive(mapFilters);

export { doFormDisable, doFormActive };
