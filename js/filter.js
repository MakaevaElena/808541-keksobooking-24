import { debounce } from './utils/debounce.js';
import { clearMarkerGroup, createMarker } from './map.js';
import { mapFilters } from './form.js';

const DELAY = 500;
const MAX_OFFERS = 10;
const DEFAULT_TYPE = 'any';
const housingType = mapFilters.querySelector('#housing-type');
const housingPrice = mapFilters.querySelector('#housing-price');
const housingRooms = mapFilters.querySelector('#housing-rooms');
const housingGuests = mapFilters.querySelector('#housing-guests');
const housingFeatures = mapFilters.querySelector('#housing-features');

const PriceRange = {
  LOW: 10000,
  MIDDLE: 50000,
};

const getFilteredOffers = (offers) => {

  const filterTypes = (card) => housingType.value === DEFAULT_TYPE || housingType.value === card.offer.type;

  const filterPrice = (card) => {
    switch (housingPrice.value) {
      case DEFAULT_TYPE: return true;
      case 'low': return card.offer.price < PriceRange.LOW;
      case 'middle': return card.offer.price >= PriceRange.LOW && card.offer.price < PriceRange.MIDDLE;
      case 'high': return card.offer.price >= PriceRange.MIDDLE;
      default: return false;
    }
  };

  const filterRooms = (card) => housingRooms.value === DEFAULT_TYPE || Number(card.offer.rooms) === Number(housingRooms.value);

  const filterGuests = (card) => housingGuests.value === DEFAULT_TYPE || Number(card.offer.guests) === Number(housingGuests.value);

  const filterFeatures = (card) => {
    const featuresChecked = housingFeatures.querySelectorAll('[type="checkbox"]:checked');
    const featureList = Array.from(featuresChecked);

    if (card.offer.features) {
      if (featureList.length > 0) {
        for (const feature of featureList) {
          if (!card.offer.features.includes(feature.value)) {
            return false;
          }
        }
      }
      return true;
    }
    return true;
  };

  const updateFilter = () => {
    clearMarkerGroup();
    const filteredOffers = offers
      // .slice()
      .filter((offer) =>
        filterTypes(offer) && filterPrice(offer) && filterRooms(offer) && filterGuests(offer) && filterFeatures(offer))
      .slice(0, MAX_OFFERS);
    createMarker(filteredOffers);

    mapFilters.removeEventListener('change', () => { debounce(updateFilter(), DELAY); });
    housingFeatures.removeEventListener('click', () => { debounce(updateFilter(), DELAY); });
  };

  mapFilters.addEventListener('change', () => { debounce(updateFilter(), DELAY); });
  housingFeatures.addEventListener('click', () => { debounce(updateFilter(), DELAY); });
};

export { getFilteredOffers, mapFilters };


