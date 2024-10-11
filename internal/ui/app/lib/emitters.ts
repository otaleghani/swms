import mitt from "mitt";
import { EventEmitter } from "events";

const stringEmitter = new EventEmitter();

export default stringEmitter;
export const emitter = mitt();
