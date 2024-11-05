// Eports event emitters used on the server

import { EventEmitter } from "events";
const stringEmitter = new EventEmitter();
stringEmitter.setMaxListeners(100);
export default stringEmitter;
