import { externalData } from './data.js';
// import { popupAdsByTemp } from './getSameElements.js';
import './getSameElements.js';
import { adForm, mapFilters, doFormDisable, doFormActive } from './form.js';
import { createMarker } from './map.js';


doFormDisable(adForm);
doFormDisable(mapFilters);

createMarker(externalData);

doFormActive(adForm);
doFormActive(mapFilters);
