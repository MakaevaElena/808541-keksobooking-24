import './getSameElements.js';
import { adForm, mapFilters, doFormDisable, doFormActive } from './form.js';
import { createMarker } from './map.js';
import { getData } from './api.js';
import { showAlert } from './utils/util.js';

const SIMILAR_ADS_COUNT = 5;

doFormDisable(adForm);
doFormDisable(mapFilters);

doFormActive(adForm);
doFormActive(mapFilters);

// getData((dataList) => {
//   createMarker(dataList.slice(0, SIMILAR_ADS_COUNT));
// });

getData(
  (dataList) => createMarker(dataList.slice(0, SIMILAR_ADS_COUNT)),
  () => showAlert('данные с сревера не получены'),
);
