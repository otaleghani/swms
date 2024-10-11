// Create and export the different web worker used in the application
const streamer = new Worker("/workers/streamer.js");
export default streamer;
