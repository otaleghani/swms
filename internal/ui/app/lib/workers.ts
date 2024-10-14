// Create and export the different web worker used in the application
//let streamer: Worker;
let streamer = new Worker("/workers/streamer.js");
export default streamer;
