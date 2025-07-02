// db.js
import localForage from 'localforage';
export const db = localForage.createInstance({name: 'pwa-db'});
