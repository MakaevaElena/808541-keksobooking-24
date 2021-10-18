import { externalData } from './data.js';
import { popupAdsByTemp } from './getSameElements.js';
import './getSameElements.js';
import { adForm, mapFilters, doFormDisable, doFormActive } from './form.js';

popupAdsByTemp(externalData[1]);

doFormDisable(adForm);
doFormDisable(mapFilters);
doFormActive(adForm);
doFormActive(mapFilters);
