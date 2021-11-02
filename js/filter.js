import { debounce } from './utils/debounce.js';
import { clearMarkerGroup, createMarker } from './map.js';

const DELAY = 500;
const MAX_OFFERS = 10;

const DEFAULT_TYPE = 'any';

const mapFilters = document.querySelector('.map__filters');
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');

const housingFeatures = mapFilters.querySelector('#housing-features');
const featureChecked = housingFeatures.querySelectorAll('[type="checkbox"]:checked');

const getFilteredOffers = (offers) => {

  const filterTypes = (cards) => {
    if (housingType.value === DEFAULT_TYPE) {
      return cards;
    }
    if (housingType.value !== DEFAULT_TYPE) {
      cards = cards.filter((card) =>
        card.offer.type === housingType.value || housingType.value === DEFAULT_TYPE);
      return cards;
    }
  };

  const PriceRange = {
    LOW: 10000,
    MIDDLE: 50000,
  };

  const filterPrice = (cards) => {
    if (housingPrice.value === DEFAULT_TYPE) {
      return cards;
    }

    if (housingPrice.value === 'low') {
      cards = cards.filter((card) =>
        card.offer.price < PriceRange.LOW);
      return cards;
    }
    if (housingPrice.value === 'middle') {
      cards = cards.filter((card) =>
        card.offer.price >= PriceRange.LOW && card.offer.price < PriceRange.MIDDLE);
      return cards;
    }
    if (housingPrice.value === 'high') {
      cards = cards.filter((card) =>
        card.offer.price >= PriceRange.MIDDLE);
      return cards;
    }
    return true;
  };

  const filterRooms = (cards) => {
    if (housingRooms.value !== DEFAULT_TYPE) {
      cards = cards.filter((card) =>
        Number(card.offer.rooms) === Number(housingRooms.value));
    }
    return cards;
  };

  const filterGuests = (cards) => {
    if (housingGuests.value !== DEFAULT_TYPE) {
      cards = cards.filter((card) =>
        Number(card.offer.guests) === Number(housingGuests.value));
    }
    return cards;
  };

  const filterFeatures = (cards) => {

    featureChecked.forEach((element) => {//не работает фильтр features
      cards = cards.filter((card) =>
        card.offer.features === element.value);
      return cards;
    });
  };

  const updateFilter = (filter) => {
    clearMarkerGroup();
    createMarker(filter(offers));
    offers
      .slice(0, MAX_OFFERS); //не обрезается до 10
  };

  housingType.addEventListener('change', () => { debounce(updateFilter(filterTypes), DELAY); });
  housingPrice.addEventListener('change', () => { debounce(updateFilter(filterPrice), DELAY); });
  housingRooms.addEventListener('change', () => { debounce(updateFilter(filterRooms), DELAY); });
  housingGuests.addEventListener('change', () => { debounce(updateFilter(filterGuests), DELAY); });
  housingFeatures.forEach((element) =>
    element.addEventListener('click', debounce(updateFilter(filterFeatures), DELAY)));
};

export { getFilteredOffers };
