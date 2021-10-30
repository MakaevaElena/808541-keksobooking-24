import './getSameElements.js';
import { setUserFormSubmit, adForm, mapFilters, doFormDisable } from './form.js';
import { setReset, clearAll, map, afterLoad } from './map.js';

doFormDisable(adForm);
doFormDisable(mapFilters);
map.on('load', afterLoad());

setReset();
setUserFormSubmit(clearAll);
