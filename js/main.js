import { externalData } from './data.js';
import { popupAdsByTemp } from './getSameElements.js';
import './getSameElements.js';
import { adForm, mapFilters, doFormDisable, doFormActive } from './form.js';
import { createMap } from './map.js';

popupAdsByTemp(externalData[1]);

doFormDisable(adForm);
doFormDisable(mapFilters);

// createMap(externalData[1].location);
createMap(externalData[1]);

doFormActive(adForm);
doFormActive(mapFilters);
