import { externalData } from './data.js';
import { popupAdsByTemp } from './getSameElements.js';
import './getSameElements.js';
import { adForm, mapFilters, doFormDisable, doFormActive } from './form.js';
import { createMarker } from './map.js';

popupAdsByTemp(externalData[1]);

doFormDisable(adForm);
doFormDisable(mapFilters);

// createMap(externalData[1]);
createMarker(externalData);

doFormActive(adForm);
doFormActive(mapFilters);
