const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const doFormDisable = (form) => {
  form.classList.add(`${form.classList[0]}--disabled`); //дописывает к первому классу

  for (const element of form.children) {
    element.classList.add('disabled');
  }

  const fieldset = form.querySelectorAll('fieldset');
  fieldset.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  const fieldsetChildren = Array.from(form.querySelectorAll('fieldset'));
  fieldsetChildren.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

const doFormActive = (form) => {
  form.classList.remove(`${form.classList[0]}--disabled`);

  for (const element of form.children) {
    element.classList.remove('disabled');
  }

  const fieldset = form.querySelectorAll('fieldset');
  fieldset.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });

  const fieldsetChildren = Array.from(form.querySelectorAll('fieldset'));
  fieldsetChildren.forEach((element) => {
    element.removeAttribute('disabled', 'disabled');
  });
};

export { adForm, mapFilters, doFormDisable, doFormActive };
