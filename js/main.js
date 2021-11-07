import './cards.js';
import { setUserFormSubmit, adForm, mapFilters, doFormDisable } from './form.js';
import { setReset, clearAll, map, toDefaultMap } from './map.js';
import './load-photos.js';

doFormDisable(adForm);
doFormDisable(mapFilters);
map.on('load', toDefaultMap());

setReset();
setUserFormSubmit(clearAll);
