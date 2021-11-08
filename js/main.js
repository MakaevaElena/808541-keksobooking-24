import './cards.js';
import { setUserFormSubmit, adForm, mapFilters, doFormDisable } from './form.js';
import { setReset, clearAll, map, onDefaultMap } from './map.js';
import './load-photos.js';

doFormDisable(adForm);
doFormDisable(mapFilters);
map.on('load', onDefaultMap());

setReset();
setUserFormSubmit(clearAll);
